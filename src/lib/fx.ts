export interface RatesResult {
  base: string
  date: string
  rates: Record<string, number>
  updatedAt: string
  source?: FxProviderName
}

export interface FrankfurterResponse {
  base: string
  date: string
  rates: Record<string, number>
}

export type FxProviderName = 'openexchangerates' | 'frankfurter'

export const RATES_TTL = 3600

export function buildRatesResult(data: FrankfurterResponse): RatesResult {
  return {
    base: data.base,
    date: data.date,
    rates: data.rates,
    updatedAt: new Date().toISOString(),
  }
}

export function deriveRatesResult(source: RatesResult, nextBase: string): RatesResult | null {
  const base = nextBase.toUpperCase()
  if (source.base === base) return source

  const sourceToNextBase = source.rates[base]
  if (!sourceToNextBase || Number.isNaN(sourceToNextBase)) return null

  const nextRates: Record<string, number> = {}

  for (const [currency, rate] of Object.entries(source.rates)) {
    if (currency === base) continue
    nextRates[currency] = Number((rate / sourceToNextBase).toFixed(12))
  }

  nextRates[source.base] = Number((1 / sourceToNextBase).toFixed(12))

  return {
    base,
    date: source.date,
    updatedAt: source.updatedAt,
    source: source.source,
    rates: nextRates,
  }
}
