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
    expect(validateVisaEntryDestinationDirectory()).toEqual([])
  })

  it('builds a country guide with entry paths, declaration checks, and official links', () => {
    const guide = getVisaEntryDestinationGuide('en-US', 'japan')

    expect(guide).not.toBeNull()
    expect(guide?.country).toBe('Japan')
    expect(guide?.commonEntryPaths.length).toBe(3)
    expect(guide?.arrivalCard).toContain('arrival')
    expect(guide?.customsDeclaration).toContain('customs')
    expect(guide?.healthDeclaration).toContain('health')
    expect(guide?.officialLinks.length).toBeGreaterThanOrEqual(1)
    expect(guide?.verificationNote).toContain('official')
  })
})
