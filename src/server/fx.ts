import { getCurrencyForCountry, getCurrencyForTimezone, getCurrencyInfo, supportedCurrencies } from '@/lib/currencies'
import { RATES_TTL, buildRatesResult, type FrankfurterResponse, type RatesResult } from '@/lib/fx'

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

  const kvKey = `rates:${base}`
  const cached = (await env.RATES_KV.get(kvKey, 'json')) as RatesResult | null
  if (cached) {
    return { status: 200, body: { ...cached, cached: true } }
  }

  try {
    const response = await fetch(`${env.FX_API_BASE_URL || 'https://api.frankfurter.app'}/latest?base=${base}`)
    if (!response.ok) throw new Error(`Frankfurter API error: ${response.status}`)
    const data = (await response.json()) as FrankfurterResponse
    const result = buildRatesResult(data)
    await env.RATES_KV.put(kvKey, JSON.stringify(result), { expirationTtl: RATES_TTL })
    await env.RATES_KV.put(`rates_backup:${base}`, JSON.stringify(result))
    return { status: 200, body: { ...result, cached: false } }
  } catch {
    const backup = (await env.RATES_KV.get(`rates_backup:${base}`, 'json')) as RatesResult | null
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
