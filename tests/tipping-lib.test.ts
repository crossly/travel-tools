import { describe, expect, it } from 'vitest'

describe('tipping library', () => {
  it('tracks the same 41 destination countries as the travel phrases roster', async () => {
    const { listTippingCountrySummaries } = await import('@/lib/tipping')

    const summaries = listTippingCountrySummaries('en-US')

    expect(summaries).toHaveLength(41)
    expect(summaries.map((summary) => summary.slug)).toContain('japan')
    expect(summaries.map((summary) => summary.slug)).toContain('new-zealand')
  })

  it('returns localized country packs for a known destination', async () => {
    const { getTippingCountryPack } = await import('@/lib/tipping')

    const pack = getTippingCountryPack('zh-CN', 'japan')

    expect(pack?.country).toBe('日本')
    expect(pack?.region).toBe('asia')
    expect(pack?.rules.restaurant).toBeTruthy()
  })
})
