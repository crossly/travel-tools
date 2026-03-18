import { describe, expect, it } from 'vitest'
import { countReadyLocalAppCountries, getLocalAppGuide, listLocalAppCountrySummaries, listReadyLocalAppCountrySlugs } from '@/lib/local-apps'

describe('local apps content', () => {
  it('keeps the ready-country count aligned with the ready slugs', () => {
    expect(countReadyLocalAppCountries()).toBe(listReadyLocalAppCountrySlugs().length)
  })

  it('keeps country flags as emoji in local app summaries', () => {
    const japan = listLocalAppCountrySummaries('en-US').find((summary) => summary.slug === 'japan')

    expect(japan?.flag).toBe('🇯🇵')
  })

  it('builds ready guides from tracked countries with valid https links', async () => {
    const summaries = listLocalAppCountrySummaries('en-US')
    const trackedSlugSet = new Set(summaries.map((summary) => summary.slug))

    for (const slug of listReadyLocalAppCountrySlugs()) {
      expect(trackedSlugSet.has(slug)).toBe(true)

      const guide = await getLocalAppGuide('en-US', slug)
      expect(guide).not.toBeNull()
      expect(guide?.categories.length).toBeGreaterThan(0)

      for (const category of guide?.categories ?? []) {
        expect(category.apps.length).toBeGreaterThan(0)

        for (const app of category.apps) {
          expect(app.links.length).toBeGreaterThan(0)
          for (const link of app.links) {
            expect(link.url.startsWith('https://')).toBe(true)
          }
        }
      }
    }
  })

  it('marks the latest expanded countries as ready guides', async () => {
    for (const slug of ['spain', 'portugal', 'mexico', 'brazil', 'united-states', 'australia']) {
      const guide = await getLocalAppGuide('en-US', slug)
      expect(guide).not.toBeNull()
      expect(guide?.categories.some((category) => category.id === 'shopping')).toBe(true)
      expect(guide?.categories.some((category) => category.id === 'food-discovery')).toBe(true)
      expect(guide?.categories.some((category) => category.id === 'stays')).toBe(true)
    }
  })
})
