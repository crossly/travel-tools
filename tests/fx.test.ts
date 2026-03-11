import { describe, expect, it } from 'vitest'
import { buildRatesResult } from '@/lib/fx'

describe('buildRatesResult', () => {
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
})
