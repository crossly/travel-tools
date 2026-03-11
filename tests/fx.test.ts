import { afterEach, describe, expect, it, vi } from 'vitest'
import { buildRatesResult, deriveRatesResult } from '@/lib/fx'
import { fetchFxRate, getRates, syncLatestRates } from '@/server/fx'

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

function createEnv(overrides?: Partial<CloudflareEnv>) {
  return {
    APP_KV: new MemoryKV(),
    RATES_KV: new MemoryKV(),
    FX_API_BASE_URL: 'https://api.frankfurter.app',
    ...overrides,
  } as unknown as CloudflareEnv
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('fx helpers', () => {
  it('normalizes upstream payloads', () => {
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
        base: 'USD',
        date: '2026-03-11',
        updatedAt: '2026-03-11T00:00:00.000Z',
        source: 'openexchangerates',
        rates: {
          EUR: 0.9,
          CNY: 7.2,
          JPY: 150,
        },
      },
      'EUR',
    )

    expect(derived?.base).toBe('EUR')
    expect(derived?.source).toBe('openexchangerates')
    expect(derived?.rates.CNY).toBe(8)
    expect(derived?.rates.USD).toBeCloseTo(1.111111111111)
  })
})

describe('fx provider strategy', () => {
  it('uses Open Exchange Rates as the primary source when configured', async () => {
    const env = createEnv({
      OPEN_EXCHANGE_RATES_APP_ID: 'test-app-id',
    })

    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input)
        expect(url).toContain('openexchangerates.org/api/latest.json')
        return Response.json({
          base: 'USD',
          timestamp: Date.parse('2026-03-11T10:00:00Z') / 1000,
          rates: { EUR: 0.9, CNY: 7.2, JPY: 150 },
        })
      }),
    )

    const result = await syncLatestRates(env)

    expect(result.base).toBe('USD')
    expect(result.source).toBe('openexchangerates')
    const cnyRates = await env.RATES_KV.get('rates:CNY', 'json')
    expect((cnyRates as { rates: Record<string, number>; source: string }).source).toBe('openexchangerates')
  })

  it('falls back to Frankfurter when the primary source fails', async () => {
    const env = createEnv({
      OPEN_EXCHANGE_RATES_APP_ID: 'test-app-id',
    })

    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input)
        if (url.includes('openexchangerates.org')) {
          return new Response('upstream error', { status: 500 })
        }
        expect(url).toContain('api.frankfurter.app/latest?base=EUR')
        return Response.json({
          base: 'EUR',
          date: '2026-03-11',
          rates: { USD: 1.1, CNY: 7.7, JPY: 161 },
        })
      }),
    )

    const result = await syncLatestRates(env)

    expect(result.base).toBe('EUR')
    expect(result.source).toBe('frankfurter')
  })

  it('prefers local cached latest rates before remote fetch when adding expenses', async () => {
    const env = createEnv()
    await env.RATES_KV.put(
      'rates:__canonical__',
      JSON.stringify({
        base: 'EUR',
        date: '2026-03-11',
        updatedAt: '2026-03-11T00:00:00.000Z',
        source: 'frankfurter',
        rates: { USD: 1.1, CNY: 7.7 },
      }),
    )

    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)

    const today = new Date().toISOString().slice(0, 10)
    const rate = await fetchFxRate(env, 'USD', 'CNY', today)

    expect(rate).toBe(7)
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(await env.APP_KV.get(`fx:USD:CNY:${today}`)).toBe('7')
  })

  it('returns cached source metadata from the rates endpoint', async () => {
    const env = createEnv()
    await env.RATES_KV.put(
      'rates:USD',
      JSON.stringify({
        base: 'USD',
        date: '2026-03-11',
        updatedAt: '2026-03-11T00:00:00.000Z',
        source: 'openexchangerates',
        rates: { EUR: 0.9, CNY: 7.2 },
      }),
    )

    const result = await getRates(env, 'USD')

    expect(result.status).toBe(200)
    expect(result.body).toMatchObject({
      base: 'USD',
      cached: true,
      source: 'openexchangerates',
    })
  })
})
