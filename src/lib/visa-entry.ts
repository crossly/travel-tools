import '@/lib/i18n/messages/visa-entry'
import { translate } from '@/lib/i18n'
import { VISA_ENTRY_DESTINATIONS, type VisaEntryCountryRecord, type VisaEntrySource } from '@/data/visa-entry'
import type { Locale, PhraseRegion } from '@/lib/types'

export type VisaEntryRegionFilter = 'all' | PhraseRegion

export const VISA_ENTRY_REGIONS: VisaEntryRegionFilter[] = ['all', 'asia', 'europe', 'americas', 'africa', 'middle-east', 'oceania']

export type VisaEntryLink = VisaEntrySource

export type VisaEntryDestinationSummary = VisaEntryCountryRecord & {
  title: string
  summary: string
  teaser: string
  commonEntryPathPreview: string
}

export type VisaEntryDestinationGuide = VisaEntryDestinationSummary & {
  description: string
  commonEntryPaths: string[]
  arrivalCard: string
  customsDeclaration: string
  healthDeclaration: string
  officialLinks: VisaEntryLink[]
  verificationNote: string
  lastReviewed: string
}

function getPreviewText(destination: VisaEntryCountryRecord) {
  return destination.commonEntryPaths[0] ?? destination.specialFlow
}

function buildSummaryRecord(locale: Locale, destination: VisaEntryCountryRecord): VisaEntryDestinationSummary {
  return {
    ...destination,
    title: translate(locale, 'visaEntry.countryTitle', { country: destination.country }),
    summary: destination.entryOverview,
    teaser: destination.specialFlow,
    commonEntryPathPreview: getPreviewText(destination),
  }
}

function buildGuide(locale: Locale, destination: VisaEntryCountryRecord): VisaEntryDestinationGuide {
  const summary = buildSummaryRecord(locale, destination)

  return {
    ...summary,
    description: destination.entryOverview,
    commonEntryPaths: destination.commonEntryPaths,
    arrivalCard: destination.arrivalCard,
    customsDeclaration: destination.customsDeclaration,
    healthDeclaration: destination.healthDeclaration,
    officialLinks: destination.officialSources,
    verificationNote: locale === 'zh-CN'
      ? `最近核对：${destination.lastReviewed}`
      : `Last reviewed: ${destination.lastReviewed}`,
    lastReviewed: destination.lastReviewed,
  }
}

export function countVisaEntryDestinations() {
  return VISA_ENTRY_DESTINATIONS.length
}

export function listVisaEntryDestinationSummaries(locale: Locale, region: VisaEntryRegionFilter = 'all') {
  return VISA_ENTRY_DESTINATIONS
    .filter((destination) => region === 'all' || destination.region === region)
    .map((destination) => buildSummaryRecord(locale, destination))
}

export function getVisaEntryDestinationSummary(locale: Locale, slug: string) {
  const destination = VISA_ENTRY_DESTINATIONS.find((entry) => entry.slug === slug)
  return destination ? buildSummaryRecord(locale, destination) : null
}

export function getVisaEntryDestinationGuide(locale: Locale, slug: string) {
  const destination = VISA_ENTRY_DESTINATIONS.find((entry) => entry.slug === slug)
  return destination ? buildGuide(locale, destination) : null
}

function isOfficialSourceHref(href: string) {
  try {
    const { hostname } = new URL(href)
    const blockedHosts = ['iatatravelcentre.com', 'travel.state.gov']
    const trustedTokens = [
      'gov',
      'gouv',
      'gob',
      'go.',
      'canada.ca',
      'netherlandsworldwide',
      'bmeia',
      'bmf',
      'auswaertiges-amt',
      'aade',
      'acces-maroc',
      'aduana',
      'hacienda',
      'admin',
      'mfa',
      'mofa',
      'mre',
      'moi',
      'cbsa',
      'abf',
      'mhlw',
      'immi',
      'immigration',
      'customs',
      'border',
      'passport',
      'health',
      'homeaffairs',
      'douane',
      'zoll',
      'cbp',
      'cbic',
      'mra',
      'sars',
      'dian',
      'sunat',
      'aima',
      'inm',
      'migracion',
      'visa',
      'evisa',
      'visto',
      'esteri',
      'travellerdeclaration',
      'interieur',
      'sem',
      'bazg',
      'bag',
      'dubaicustoms',
      'migraciones',
      'passport',
      'goc',
      'go.tz',
      'go.ke',
      'govmu',
      'gov.sg',
      'gov.hk',
      'govt',
    ]

    if (!href.startsWith('https://')) return false
    if (blockedHosts.some((host) => hostname.includes(host))) return false

    return trustedTokens.some((token) => hostname.includes(token))
  } catch {
    return false
  }
}

export function validateVisaEntryDestinationDirectory() {
  const errors: string[] = []
  const seenSlugs = new Set<string>()

  if (VISA_ENTRY_DESTINATIONS.length !== 41) {
    errors.push(`visa-entry: expected 41 destinations, received ${VISA_ENTRY_DESTINATIONS.length}`)
  }

  for (const destination of VISA_ENTRY_DESTINATIONS) {
    if (seenSlugs.has(destination.slug)) {
      errors.push(`visa-entry: duplicate destination slug "${destination.slug}"`)
      continue
    }
    seenSlugs.add(destination.slug)

    if (!destination.country) {
      errors.push(`visa-entry: missing country for "${destination.slug}"`)
    }
    if (!destination.flag) {
      errors.push(`visa-entry: missing flag for "${destination.slug}"`)
    }
    if (!destination.lastReviewed) {
      errors.push(`visa-entry: missing lastReviewed for "${destination.slug}"`)
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(destination.lastReviewed)) {
      errors.push(`visa-entry: invalid lastReviewed for "${destination.slug}"`)
    }
    if (!destination.specialFlow) {
      errors.push(`visa-entry: missing specialFlow for "${destination.slug}"`)
    }
    if (!destination.entryOverview) {
      errors.push(`visa-entry: missing entryOverview for "${destination.slug}"`)
    }
    if (!destination.commonEntryPaths.length) {
      errors.push(`visa-entry: missing commonEntryPaths for "${destination.slug}"`)
    }
    if (destination.officialSources.length < 2 || destination.officialSources.length > 5) {
      errors.push(`visa-entry: expected 2-5 officialSources for "${destination.slug}", received ${destination.officialSources.length}`)
    }
    for (const source of destination.officialSources) {
      if (!source.label || !source.href) {
        errors.push(`visa-entry: invalid source for "${destination.slug}"`)
      } else if (!isOfficialSourceHref(source.href)) {
        errors.push(`visa-entry: non-official source href for "${destination.slug}": ${source.href}`)
      }
    }
    if (!VISA_ENTRY_REGIONS.includes(destination.region)) {
      errors.push(`visa-entry: invalid region for "${destination.slug}"`)
    }
  }

  return errors
}
