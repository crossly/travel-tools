import { describe, expect, it, vi } from 'vitest'
import { LOCAL_APP_GUIDE_SUMMARIES } from '@/data/local-apps/guide-summaries'

describe('local apps decoupling', () => {
  it('uses the local app roster instead of travel phrase summaries', async () => {
    vi.resetModules()

    vi.doMock('@/lib/travel-phrases', () => ({
      listRawPhraseCountrySummaries: () => [
        {
          slug: 'fake-land',
          country: {
            'en-US': 'Fake Land',
            'zh-CN': '假国',
          },
          region: 'asia',
          flag: 'FL',
        },
      ],
    }))

    const { countTrackedLocalAppCountries, listLocalAppCountrySummaries } = await import('@/lib/local-apps')
    const summaries = listLocalAppCountrySummaries('en-US')

    expect(countTrackedLocalAppCountries()).toBe(LOCAL_APP_GUIDE_SUMMARIES.length)
    expect(summaries).toHaveLength(LOCAL_APP_GUIDE_SUMMARIES.length)
    expect(summaries.some((summary) => summary.slug === 'japan')).toBe(true)
  })
})
