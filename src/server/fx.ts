import { getCurrencyForCountry, getCurrencyForTimezone, getCurrencyInfo } from '@/lib/currency-detect'
import { supportedCurrencies } from '@/lib/currencies'
import { RATES_TTL, buildRatesResult, deriveRatesResult, type FrankfurterResponse, type FxProviderName, type RatesResult } from '@/lib/fx'

const FRANKFURTER_CANONICAL_BASE = 'EUR'
const OPEN_EXCHANGE_RATES_CANONICAL_BASE = 'USD'
const CANONICAL_RATES_KEY = 'rates:__canonical__'
const CANONICAL_BACKUP_KEY = 'rates_backup:__canonical__'
const FX_PAIR_TTL = 60 * 60 * 24 * 7

type FxProvider = {
  name: FxProviderName
  canonicalBase: string
  fetchLatest: (env: CloudflareEnv) => Promise<RatesResult>
  fetchHistoricalRate: (env: CloudflareEnv, from: string, to: string, day: string) => Promise<number>
}

function ratesCacheKey(base: string) {
  return `rates:${base.toUpperCase()}`
}

function getOpenExchangeRatesBase(env: CloudflareEnv) {
  return env.OPEN_EXCHANGE_RATES_API_BASE || 'https://openexchangerates.org/api'
}

function getConfiguredProviders(env: CloudflareEnv): FxProvider[] {
  const providers: FxProvider[] = []

  if (env.OPEN_EXCHANGE_RATES_APP_ID) {
    providers.push({
      name: 'openexchangerates',
      canonicalBase: OPEN_EXCHANGE_RATES_CANONICAL_BASE,
      async fetchLatest(currentEnv) {
        const response = await fetch(`${getOpenExchangeRatesBase(currentEnv)}/latest.json?app_id=${encodeURIComponent(currentEnv.OPEN_EXCHANGE_RATES_APP_ID || '')}`)
        if (!response.ok) throw new Error(`Open Exchange Rates API error: ${response.status}`)
        const data = (await response.json()) as { base: string; timestamp: number; rates: Record<string, number> }
        return {
          base: (data.base || OPEN_EXCHANGE_RATES_CANONICAL_BASE).toUpperCase(),
          date: new Date(data.timestamp * 1000).toISOString().slice(0, 10),
          updatedAt: new Date().toISOString(),
          rates: Object.fromEntries(Object.entries(data.rates || {}).map(([code, value]) => [code.toUpperCase(), value])),
          source: 'openexchangerates',
        }
      },
      async fetchHistoricalRate(currentEnv, from, to, day) {
        const path = day === 'latest' ? 'latest.json' : `historical/${day}.json`
        const response = await fetch(
          `${getOpenExchangeRatesBase(currentEnv)}/${path}?app_id=${encodeURIComponent(currentEnv.OPEN_EXCHANGE_RATES_APP_ID || '')}&symbols=${encodeURIComponent(`${from},${to}`)}`,
        )
        if (!response.ok) throw new Error(`Open Exchange Rates API error: ${response.status}`)
        const data = (await response.json()) as { base?: string; rates?: Record<string, number> }
        const rates = Object.fromEntries(Object.entries(data.rates || {}).map(([code, value]) => [code.toUpperCase(), value]))
        return resolveRateFromCanonicalBase((data.base || OPEN_EXCHANGE_RATES_CANONICAL_BASE).toUpperCase(), rates, from, to)
      },
    })
  }

  providers.push({
    name: 'frankfurter',
    canonicalBase: FRANKFURTER_CANONICAL_BASE,
    async fetchLatest(currentEnv) {
      const response = await fetch(`${currentEnv.FX_API_BASE_URL || 'https://api.frankfurter.app'}/latest?base=${FRANKFURTER_CANONICAL_BASE}`)
      if (!response.ok) throw new Error(`Frankfurter API error: ${response.status}`)
      const data = (await response.json()) as FrankfurterResponse
      return {
        ...buildRatesResult(data),
        source: 'frankfurter',
      }
    },
    async fetchHistoricalRate(currentEnv, from, to, day) {
      const url = `${currentEnv.FX_API_BASE_URL || 'https://api.frankfurter.app'}/${day}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
      const response = await fetch(url)
      if (!response.ok) throw new Error(`Frankfurter API error: ${response.status}`)
      const data = (await response.json()) as { rates?: Record<string, number> }
      const rate = data.rates?.[to]
      if (!rate || Number.isNaN(rate)) throw new Error('FX_RATE_UNAVAILABLE')
      return rate
    },
  })

  return providers
}

function resolveRateFromCanonicalBase(base: string, rates: Record<string, number>, from: string, to: string) {
  if (from === to) return 1
  if (from === base) {
    const direct = rates[to]
    if (!direct || Number.isNaN(direct)) throw new Error('FX_RATE_UNAVAILABLE')
    return direct
  }
  if (to === base) {
    const reverse = rates[from]
    if (!reverse || Number.isNaN(reverse)) throw new Error('FX_RATE_UNAVAILABLE')
    return Number((1 / reverse).toFixed(12))
  }

  const fromRate = rates[from]
  const toRate = rates[to]
  if (!fromRate || !toRate || Number.isNaN(fromRate) || Number.isNaN(toRate)) throw new Error('FX_RATE_UNAVAILABLE')
  return Number((toRate / fromRate).toFixed(12))
}

async function storeRatesResult(env: CloudflareEnv, result: RatesResult, options?: { canonical?: boolean }) {
  const payload = JSON.stringify(result)
  if (options?.canonical) {
    await Promise.all([
      env.RATES_KV.put(CANONICAL_RATES_KEY, payload, { expirationTtl: RATES_TTL }),
      env.RATES_KV.put(CANONICAL_BACKUP_KEY, payload),
    ])
    return
  }

  await Promise.all([
    env.RATES_KV.put(ratesCacheKey(result.base), payload, { expirationTtl: RATES_TTL }),
    env.RATES_KV.put(`rates_backup:${result.base}`, payload),
  ])
}

async function getCanonicalRates(env: CloudflareEnv, options?: { backup?: boolean }) {
  const key = options?.backup ? CANONICAL_BACKUP_KEY : CANONICAL_RATES_KEY
  return (await env.RATES_KV.get(key, 'json')) as RatesResult | null
}

async function getCachedRates(env: CloudflareEnv, base: string) {
  const normalizedBase = base.toUpperCase()
  const cached = (await env.RATES_KV.get(ratesCacheKey(normalizedBase), 'json')) as RatesResult | null
  if (cached) return cached

  const canonical = await getCanonicalRates(env)
  if (!canonical) return null
  if (canonical.base === normalizedBase) return canonical

  const derived = deriveRatesResult(canonical, normalizedBase)
  if (derived) return derived

  return null
}

async function getBackupRates(env: CloudflareEnv, base: string) {
  const backup = (await env.RATES_KV.get(`rates_backup:${base.toUpperCase()}`, 'json')) as RatesResult | null
  if (backup) return backup

  const canonical = await getCanonicalRates(env, { backup: true })
  return canonical ? deriveRatesResult(canonical, base) : null
}

function isLatestRequestDay(day: string) {
  return day === 'latest' || day === new Date().toISOString().slice(0, 10)
}

async function getLatestRateFromCache(env: CloudflareEnv, from: string, to: string) {
  const direct = await getCachedRates(env, from)
  const directRate = direct?.rates[to]
  if (directRate && !Number.isNaN(directRate)) return directRate

  const canonical = await getCanonicalRates(env)
  const derived = canonical ? deriveRatesResult(canonical, from) : null
  const derivedRate = derived?.rates[to]
  if (derivedRate && !Number.isNaN(derivedRate)) return derivedRate

  return null
}

async function fetchLiveCanonicalRates(env: CloudflareEnv) {
  let lastError: unknown

  for (const provider of getConfiguredProviders(env)) {
    try {
      const result = await provider.fetchLatest(env)
      const canonical = {
        ...result,
        base: provider.canonicalBase,
        source: provider.name,
      }
      return canonical
    } catch (error) {
      lastError = error
    }
  }

  throw lastError instanceof Error ? lastError : new Error('FX_FETCH_FAILED')
}

async function fetchHistoricalRateFromProviders(env: CloudflareEnv, from: string, to: string, day: string) {
  let lastError: unknown

  for (const provider of getConfiguredProviders(env)) {
    try {
      return await provider.fetchHistoricalRate(env, from, to, day)
    } catch (error) {
      lastError = error
    }
  }

  throw lastError instanceof Error ? lastError : new Error('FX_FETCH_FAILED')
}

export async function syncLatestRates(env: CloudflareEnv) {
  const canonical = await fetchLiveCanonicalRates(env)
  await storeRatesResult(env, canonical, { canonical: true })

  return {
    base: canonical.base,
    date: canonical.date,
    source: canonical.source,
    syncedCurrencies: 1,
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
    await syncLatestRates(env)
    const result = await getCachedRates(env, base)
    if (!result) throw new Error('FX_RATE_UNAVAILABLE')
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
  const latestRequest = isLatestRequestDay(day)
  const cached = await env.APP_KV.get(cacheKey)
  if (cached) return Number(cached)

  if (latestRequest) {
    const cachedLatestRate = await getLatestRateFromCache(env, from, to)
    if (cachedLatestRate) {
      return cachedLatestRate
    }
  }

  const rate = await fetchHistoricalRateFromProviders(env, from, to, /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : 'latest')
  if (latestRequest) return rate

  await env.APP_KV.put(cacheKey, String(rate), { expirationTtl: FX_PAIR_TTL })
  return rate
}
