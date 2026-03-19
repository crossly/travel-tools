import { describe, expect, it } from 'vitest'
import {
  countVisaEntryDestinations,
  getVisaEntryDestinationGuide,
  listVisaEntryDestinationSummaries,
  validateVisaEntryDestinationDirectory,
} from '@/lib/visa-entry'

describe('visa entry content', () => {
  it('keeps the destination directory aligned with travel phrases coverage', () => {
    const summaries = listVisaEntryDestinationSummaries('en-US')

    expect(countVisaEntryDestinations()).toBe(41)
    expect(summaries).toHaveLength(41)
    expect(summaries.map((summary) => summary.slug)).toContain('japan')
    expect(summaries.map((summary) => summary.slug)).toContain('united-arab-emirates')
    expect(new Set(summaries.map((summary) => summary.summary)).size).toBeGreaterThan(20)
    expect(validateVisaEntryDestinationDirectory()).toEqual([])
  })

  it('builds country guides from destination-specific official sources', () => {
    const guide = getVisaEntryDestinationGuide('en-US', 'japan')
    const france = getVisaEntryDestinationGuide('en-US', 'france')
    const uae = getVisaEntryDestinationGuide('en-US', 'united-arab-emirates')

    expect(guide).not.toBeNull()
    expect(france).not.toBeNull()
    expect(uae).not.toBeNull()
    expect(guide?.country).toBe('Japan')
    expect(guide?.specialFlow).toContain('Visit Japan Web')
    expect(guide?.officialLinks.length).toBeGreaterThanOrEqual(2)
    expect(guide?.officialLinks.every((source) => source.href.startsWith('https://'))).toBe(true)
    expect(guide?.officialLinks.some((source) => source.href.includes('mofa.go.jp'))).toBe(true)
    expect(france?.officialLinks.some((source) => source.href.includes('france-visas.gouv.fr'))).toBe(true)
    expect(france?.entryOverview.match(/France-Visas/g)).toHaveLength(1)
    expect(uae?.healthDeclaration).toContain('not typically required')
    expect(guide?.entryOverview).not.toBe(france?.entryOverview)
    expect(guide?.commonEntryPaths.length).toBe(3)
    expect(guide?.lastReviewed).toBe('2026-03-19')
    expect(guide?.verificationNote).toContain('Last reviewed')
    expect(guide?.entryOverview).not.toContain('Start with')
    expect(guide?.entryOverview).not.toContain('Use ')
    expect(guide?.entryOverview).not.toContain('Check ')
  })
})
