import { describe, expect, it, vi } from 'vitest'

describe('local apps guide loading', () => {
  it('builds summaries without eagerly importing the full guide catalog and still loads a country guide on demand', async () => {
    vi.resetModules()

    vi.doMock('@/data/local-apps/guides', () => {
      throw new Error('full local app guide catalog should stay off the summary path')
    })

    const { listLocalAppCountrySummaries, getLocalAppGuide } = await import('@/lib/local-apps')

    const summaries = listLocalAppCountrySummaries('en-US')
    expect(summaries.length).toBeGreaterThan(0)
    expect(summaries.some((summary) => summary.slug === 'japan')).toBe(true)

    const guide = await getLocalAppGuide('en-US', 'japan')
    expect(guide?.slug).toBe('japan')
    expect(guide?.categories.length).toBeGreaterThan(0)
  })
})
