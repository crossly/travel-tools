import { afterEach, describe, expect, it, vi } from 'vitest'
import { CANONICAL_RATES_BASE, buildRatesResult, deriveRatesResult } from '@/lib/fx'
import { fetchFxRate, syncLatestRates } from '@/server/fx'

class MemoryKV {
  private readonly store = new Map<string, string>()

  async get(key: string, type?: 'json') {
    const value = this.store.get(key) ?? null
    if (value === null) return null
    if (type === 'json') return JSON.parse(value)
    return value
  }

  async put(key: string, value: string) {
    this.store.set(key, value)
  }
}

function createEnv() {
  return {
    APP_KV: new MemoryKV(),
    RATES_KV: new MemoryKV(),
    FX_API_BASE_URL: 'https://api.frankfurter.app',
  } as unknown as CloudflareEnv
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('fx helpers', () => {
  it('normalizes frankfurter payloads', () => {
    const result = buildRatesResult({
      base: 'USD',
      date: '2026-03-11',
      rates: { EUR: 0.91 },
    })

    expect(result.base).toBe('USD')
    expect(result.date).toBe('2026-03-11')
    expect(result.rates.EUR).toBe(0.91)
    expect(typeof result.updatedAt).toBe('string')
  })

  it('derives a new base from canonical rates', () => {
    const derived = deriveRatesResult(
      {
        base: CANONICAL_RATES_BASE,
        date: '2026-03-11',
        updatedAt: '2026-03-11T00:00:00.000Z',
        rates: {
          USD: 1.1,
          CNY: 7.7,
          JPY: 161,
        },
      },
      'USD',
    )

    expect(derived?.base).toBe('USD')
    expect(derived?.rates.CNY).toBe(7)
    expect(derived?.rates[CANONICAL_RATES_BASE]).toBeCloseTo(0.909090909091)
  })
})

describe('fx cache strategy', () => {
  it('syncs canonical rates and derived bases into KV', async () => {
    const env = createEnv()
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        Response.json({
          base: CANONICAL_RATES_BASE,
          date: '2026-03-11',
          rates: { USD: 1.1, CNY: 7.7, JPY: 161 },
        }),
      ),
    )

    const result = await syncLatestRates(env)

    expect(result.base).toBe(CANONICAL_RATES_BASE)
    expect(result.syncedCurrencies).toBeGreaterThan(1)
    const usdRates = await env.RATES_KV.get('rates:USD', 'json')
    expect((usdRates as { rates: Record<string, number> }).rates.CNY).toBe(7)
  })

  it('prefers local cached latest rates before remote fetch when adding expenses', async () => {
    const env = createEnv()
    await env.RATES_KV.put(
      `rates:${CANONICAL_RATES_BASE}`,
      JSON.stringify({
        base: CANONICAL_RATES_BASE,
        date: '2026-03-11',
        updatedAt: '2026-03-11T00:00:00.000Z',
        rates: { USD: 1.1, CNY: 7.7 },
      }),
    )

    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)

    const rate = await fetchFxRate(env, 'USD', 'CNY', new Date().toISOString().slice(0, 10))

    expect(rate).toBe(7)
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(await env.APP_KV.get(`fx:USD:CNY:${new Date().toISOString().slice(0, 10)}`)).toBe('7')
  })
})
