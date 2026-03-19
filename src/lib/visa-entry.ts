import '@/lib/i18n/messages/visa-entry'
import { translate } from '@/lib/i18n'
import { VISA_ENTRY_DESTINATIONS, type VisaEntryDestinationRecord } from '@/data/visa-entry'
import type { Locale, PhraseRegion } from '@/lib/types'

export type VisaEntryRegionFilter = 'all' | PhraseRegion

export const VISA_ENTRY_REGIONS: VisaEntryRegionFilter[] = ['all', 'asia', 'europe', 'americas', 'africa', 'middle-east', 'oceania']

export type VisaEntryLink = {
  label: string
  href: string
}

export type VisaEntryDestinationSummary = VisaEntryDestinationRecord & {
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
}

const REGION_TEASERS: Record<PhraseRegion, Record<Locale, string>> = {
  asia: {
    'en-US': 'Useful when eVisa and arrival-card checks are common.',
    'zh-CN': '适合常见电子签与入境卡检查的目的地。',
  },
  europe: {
    'en-US': 'Useful when Schengen-style or national rules can differ by destination.',
    'zh-CN': '适合申根或国家规则差异比较明显的目的地。',
  },
  americas: {
    'en-US': 'Useful when border checks can include customs or onward-travel questions.',
    'zh-CN': '适合边检会顺带看海关和后续行程的目的地。',
  },
  africa: {
    'en-US': 'Useful when entry, customs, and health checks can change quickly.',
    'zh-CN': '适合入境、海关和健康检查变动较快的目的地。',
  },
  'middle-east': {
    'en-US': 'Useful when electronic visas and transit checks are common.',
    'zh-CN': '适合电子签和中转检查较常见的目的地。',
  },
  oceania: {
    'en-US': 'Useful when ETA-style checks and customs forms are common reminders.',
    'zh-CN': '适合常见 ETA 和海关表格提醒的目的地。',
  },
}

const REGION_ENTRY_PATHS: Record<PhraseRegion, Record<Locale, string[]>> = {
  asia: {
    'en-US': [
      'Many trips still involve a visa, eVisa, ETA, or arrival-form step.',
      'Transit rules can differ if you connect through another country.',
      'Check the airport or border process before you travel.',
    ],
    'zh-CN': [
      '很多行程仍会涉及签证、电子授权或入境表格。',
      '如果有中转，请单独核对中转国家的规则。',
      '出发前先看官方入口和航空公司提示。',
    ],
  },
  europe: {
    'en-US': [
      'Schengen and national entry rules can differ by destination.',
      'Transit checks can still apply even on short connections.',
      'Confirm your route before you head to the airport.',
    ],
    'zh-CN': [
      '申根规则和单国规则可能不同。',
      '短中转也可能需要单独核对。',
      '去机场前先确认自己的路线。',
    ],
  },
  americas: {
    'en-US': [
      'Border checks can include visa class, onward travel, and stay purpose.',
      'Transit rules can differ if you connect through another country.',
      'Check the airport or border process before you travel.',
    ],
    'zh-CN': [
      '边检可能会看签证类型、后续行程和旅行目的。',
      '如果有中转，请单独核对中转国家的规则。',
      '出发前先看机场或边检流程。',
    ],
  },
  africa: {
    'en-US': [
      'Visa, eVisa, or embassy processing can change by destination and season.',
      'Transit rules can differ if you connect through another country.',
      'Check the airport or border process before you travel.',
    ],
    'zh-CN': [
      '签证、电子签或使馆手续可能随目的地和季节变化。',
      '如果有中转，请单独核对中转国家的规则。',
      '出发前先看机场或边检流程。',
    ],
  },
  'middle-east': {
    'en-US': [
      'Electronic visas or transit checks are often the first thing to verify.',
      'Transit rules can differ if you connect through another country.',
      'Check the airport or border process before you travel.',
    ],
    'zh-CN': [
      '电子签或中转检查通常是第一件要确认的事。',
      '如果有中转，请单独核对中转国家的规则。',
      '出发前先看机场或边检流程。',
    ],
  },
  oceania: {
    'en-US': [
      'ETA-style checks or customs declarations are common reminders.',
      'Transit rules can differ if you connect through another country.',
      'Check the airport or border process before you travel.',
    ],
    'zh-CN': [
      'ETA 类检查和海关申报通常都要提前确认。',
      '如果有中转，请单独核对中转国家的规则。',
      '出发前先看机场或边检流程。',
    ],
  },
}

const VERIFICATION_NOTE: Record<Locale, string> = {
  'en-US': 'Verify the official immigration or customs site and your airline before departure.',
  'zh-CN': '出发前请核对官方移民 / 海关网站和航空公司要求。',
}

const OFFICIAL_LINK_HREFS = [
  'https://www.iatatravelcentre.com/',
  'https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages.html',
]

function buildSummary(locale: Locale, country: string) {
  return translate(locale, 'visaEntry.countrySummary', { country })
}

function capitalizeRegion(region: PhraseRegion) {
  return region
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('')
}

function getRegionLabel(locale: Locale, region: PhraseRegion) {
  return translate(locale, `phrases.region${capitalizeRegion(region)}`)
}

function buildSummaryRecord(locale: Locale, destination: VisaEntryDestinationRecord): VisaEntryDestinationSummary {
  const regionTeaser = REGION_TEASERS[destination.region][locale]

  return {
    ...destination,
    title: translate(locale, 'visaEntry.countryTitle', { country: destination.country }),
    summary: buildSummary(locale, destination.country),
    teaser: regionTeaser,
    commonEntryPathPreview: REGION_ENTRY_PATHS[destination.region][locale][0],
  }
}

function buildGuide(locale: Locale, destination: VisaEntryDestinationRecord): VisaEntryDestinationGuide {
  const summary = buildSummaryRecord(locale, destination)
  const regionLabel = getRegionLabel(locale, destination.region)
  const regionEntryPaths = REGION_ENTRY_PATHS[destination.region][locale]

  return {
    ...summary,
    description: translate(locale, 'visaEntry.description', { country: destination.country, region: regionLabel }),
    commonEntryPaths: regionEntryPaths,
    arrivalCard: translate(locale, 'visaEntry.arrivalCardBody'),
    customsDeclaration: translate(locale, 'visaEntry.customsDeclarationBody'),
    healthDeclaration: translate(locale, 'visaEntry.healthDeclarationBody'),
    officialLinks: [
      { label: translate(locale, 'visaEntry.officialLinkIata'), href: OFFICIAL_LINK_HREFS[0] },
      { label: translate(locale, 'visaEntry.officialLinkAdvice'), href: OFFICIAL_LINK_HREFS[1] },
    ],
    verificationNote: VERIFICATION_NOTE[locale],
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
    if (!VISA_ENTRY_REGIONS.includes(destination.region)) {
      errors.push(`visa-entry: invalid region for "${destination.slug}"`)
    }
  }

  return errors
}
