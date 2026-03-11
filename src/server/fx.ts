import { getCurrencyForCountry, getCurrencyForTimezone, getCurrencyInfo, supportedCurrencies } from '@/lib/currencies'
import { CANONICAL_RATES_BASE, RATES_TTL, buildRatesResult, deriveRatesResult, type FrankfurterResponse, type RatesResult } from '@/lib/fx'

function ratesCacheKey(base: string) {
  return `rates:${base.toUpperCase()}`
}

async function storeRatesResult(env: CloudflareEnv, result: RatesResult) {
  const payload = JSON.stringify(result)
  await Promise.all([
    env.RATES_KV.put(ratesCacheKey(result.base), payload, { expirationTtl: RATES_TTL }),
    env.RATES_KV.put(`rates_backup:${result.base}`, payload),
  ])
}

async function fetchLatestRates(env: CloudflareEnv, base: string) {
  const response = await fetch(`${env.FX_API_BASE_URL || 'https://api.frankfurter.app'}/latest?base=${base}`)
  if (!response.ok) throw new Error(`Frankfurter API error: ${response.status}`)
  const data = (await response.json()) as FrankfurterResponse
  return buildRatesResult(data)
}

async function getCachedRates(env: CloudflareEnv, base: string) {
  const normalizedBase = base.toUpperCase()
  const cached = (await env.RATES_KV.get(ratesCacheKey(normalizedBase), 'json')) as RatesResult | null
  if (cached) return cached

  if (normalizedBase !== CANONICAL_RATES_BASE) {
    const canonical = (await env.RATES_KV.get(ratesCacheKey(CANONICAL_RATES_BASE), 'json')) as RatesResult | null
    const derived = canonical ? deriveRatesResult(canonical, normalizedBase) : null
    if (derived) {
      await env.RATES_KV.put(ratesCacheKey(normalizedBase), JSON.stringify(derived), { expirationTtl: RATES_TTL })
      return derived
    }
  }

  return null
}

async function getBackupRates(env: CloudflareEnv, base: string) {
  const backup = (await env.RATES_KV.get(`rates_backup:${base.toUpperCase()}`, 'json')) as RatesResult | null
  if (backup) return backup

  if (base.toUpperCase() !== CANONICAL_RATES_BASE) {
    const canonical = (await env.RATES_KV.get(`rates_backup:${CANONICAL_RATES_BASE}`, 'json')) as RatesResult | null
    return canonical ? deriveRatesResult(canonical, base) : null
  }

  return null
}

function isLatestRequestDay(day: string) {
  return day === 'latest' || day === new Date().toISOString().slice(0, 10)
}

async function getLatestRateFromCache(env: CloudflareEnv, from: string, to: string) {
  const direct = await getCachedRates(env, from)
  const rate = direct?.rates[to]
  if (rate && !Number.isNaN(rate)) return rate

  const canonical = from === CANONICAL_RATES_BASE ? direct : await getCachedRates(env, CANONICAL_RATES_BASE)
  const derived = canonical ? deriveRatesResult(canonical, from) : null
  const derivedRate = derived?.rates[to]
  if (derivedRate && !Number.isNaN(derivedRate)) return derivedRate

  return null
}

export async function syncLatestRates(env: CloudflareEnv) {
  const canonical = await fetchLatestRates(env, CANONICAL_RATES_BASE)
  await storeRatesResult(env, canonical)

  const derivedEntries = supportedCurrencies
    .map((base) => deriveRatesResult(canonical, base))
    .filter((entry): entry is RatesResult => Boolean(entry))

  await Promise.all(derivedEntries.map((entry) => storeRatesResult(env, entry)))

  return {
    base: canonical.base,
    date: canonical.date,
    syncedCurrencies: derivedEntries.length + 1,
  }
}

export function detectCurrencyFromRequest(request: Request) {
  const cf = request as Request & { cf?: IncomingRequestCfProperties }
  const country = cf.cf?.country || 'US'
  const ipCurrency = getCurrencyForCountry(country)
  const query = new URL(request.url).searchParams
  const tz = query.get('tz') || ''
  const tzCurrency = tz ? getCurrencyForTimezone(tz) : null
  const currency = tzCurrency && tzCurrency !== ipCurrency ? tzCurrency : ipCurrency
  const info = getCurrencyInfo(currency)

  return {
    country,
    currency,
    name: info.name,
    flag: info.flag,
    symbol: info.symbol,
    tz,
    tzCurrency: tzCurrency || null,
    detectedVia: tzCurrency && tzCurrency !== ipCurrency ? 'timezone' : 'ip',
  }
}

export async function getRates(env: CloudflareEnv, base: string) {
  if (!supportedCurrencies.includes(base)) {
    return { status: 400, body: { error: `Unsupported base currency: ${base}` } }
  }

  const cached = await getCachedRates(env, base)
  if (cached) {
    return { status: 200, body: { ...cached, cached: true } }
  }

  try {
    const canonical = await fetchLatestRates(env, CANONICAL_RATES_BASE)
    await storeRatesResult(env, canonical)
    const result = base === CANONICAL_RATES_BASE ? canonical : deriveRatesResult(canonical, base)
    if (!result) throw new Error('FX_RATE_UNAVAILABLE')
    await storeRatesResult(env, result)
    return { status: 200, body: { ...result, cached: false } }
  } catch {
    const backup = await getBackupRates(env, base)
    if (backup) {
      return { status: 200, body: { ...backup, cached: true, stale: true } }
    }
    return { status: 500, body: { error: 'FX_FETCH_FAILED' } }
  }
}

export async function fetchFxRate(env: CloudflareEnv, from: string, to: string, spentAt: string) {
  if (from === to) return 1

  const day = spentAt.slice(0, 10)
  const cacheKey = `fx:${from}:${to}:${day}`
  const cached = await env.APP_KV.get(cacheKey)
  if (cached) return Number(cached)

  if (isLatestRequestDay(day)) {
    const cachedLatestRate = await getLatestRateFromCache(env, from, to)
    if (cachedLatestRate) {
      await env.APP_KV.put(cacheKey, String(cachedLatestRate), { expirationTtl: 60 * 60 * 24 * 7 })
      return cachedLatestRate
    }
  }

  const baseUrl = env.FX_API_BASE_URL || 'https://api.frankfurter.app'
  const datePath = /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : 'latest'
  const url = `${baseUrl}/${datePath}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
  const response = await fetch(url)
  if (!response.ok) throw new Error('FX_FETCH_FAILED')
  const data = (await response.json()) as { rates?: Record<string, number> }
  const rate = data.rates?.[to]
  if (!rate || Number.isNaN(rate)) throw new Error('FX_RATE_UNAVAILABLE')
  await env.APP_KV.put(cacheKey, String(rate), { expirationTtl: 60 * 60 * 24 * 7 })
  return rate
}
