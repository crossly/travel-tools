import { describe, expect, it } from 'vitest'
import { buildCurrencyCatalog, searchCurrencyCatalog } from '@/lib/currencies'

describe('currency catalog', () => {
  it('builds a broad catalog with country names and icons', () => {
    const catalog = buildCurrencyCatalog('en-US')
    const usd = catalog.find((item) => item.code === 'USD')

    expect(catalog.length).toBeGreaterThan(80)
    expect(usd).toBeTruthy()
    expect(usd?.countryName).toBeTruthy()
    expect(usd?.icon).toBeTruthy()
  })

  it('searches by currency code, name, and country', () => {
    const catalog = buildCurrencyCatalog('en-US')

    expect(searchCurrencyCatalog(catalog, 'japan').some((item) => item.code === 'JPY')).toBe(true)
    expect(searchCurrencyCatalog(catalog, 'won').some((item) => item.code === 'KRW')).toBe(true)
    expect(searchCurrencyCatalog(catalog, 'aed').some((item) => item.code === 'AED')).toBe(true)
  })
})
