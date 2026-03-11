export interface RatesResult {
  base: string
  date: string
  rates: Record<string, number>
  updatedAt: string
}

export interface FrankfurterResponse {
  base: string
  date: string
  rates: Record<string, number>
}

export const RATES_TTL = 3600

export function buildRatesResult(data: FrankfurterResponse): RatesResult {
  return {
    base: data.base,
    date: data.date,
    rates: data.rates,
    updatedAt: new Date().toISOString(),
  }
}
