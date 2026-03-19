import { TIPPING_COUNTRIES, TIPPING_REGIONS, type TippingCategoryId, type TippingCountryDefinition, type TippingCopy, type TippingSource } from '@/data/tipping'
import type { Locale, PhraseRegion } from '@/lib/types'

export { TIPPING_REGIONS }

export const TIPPING_CATEGORY_IDS: TippingCategoryId[] = [
  'restaurant',
  'cafe',
  'bar',
  'taxi',
  'hotel',
  'guide',
  'porter',
  'delivery',
]

export interface TippingCountrySummary {
  country: string
  slug: string
  region: PhraseRegion
  flag: string
  title: string
  description: string
  headlineRule: string
  lastReviewed: string
  sourceCount: number
}

export interface TippingCountryPack extends TippingCountrySummary {
  rules: Record<TippingCategoryId, string>
  notes: string[]
  sources: Array<{ label: string; href: string }>
}

const COUNTRY_NAME_FORMATTERS = new Map<Locale, Intl.DisplayNames>()
const COUNTRY_SUMMARY_CACHE = new Map<string, TippingCountrySummary[]>()
const COUNTRY_PACK_CACHE = new Map<string, TippingCountryPack | null>()

function localize(copy: TippingCopy, locale: Locale) {
  return copy[locale]
}

function getCountryName(locale: Locale, countryCode: string) {
  let formatter = COUNTRY_NAME_FORMATTERS.get(locale)
  if (!formatter) {
    formatter = new Intl.DisplayNames([locale], { type: 'region' })
    COUNTRY_NAME_FORMATTERS.set(locale, formatter)
  }

  return formatter.of(countryCode) ?? countryCode
}

function getCountryFlag(countryCode: string) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (character) => String.fromCodePoint(127397 + character.charCodeAt(0)))
}

function localizeSource(source: TippingSource, locale: Locale) {
  return {
    label: localize(source.label, locale),
    href: source.href,
  }
}

export function buildTippingCountrySources(def: TippingCountryDefinition, locale: Locale) {
  const sources = def.sources.map((source) => localizeSource(source, locale))

  const deduped: Array<{ label: string; href: string }> = []
  const seen = new Set<string>()

  for (const source of sources) {
    if (seen.has(source.href)) continue
    seen.add(source.href)
    deduped.push(source)
  }

  return deduped
}

function buildSummary(locale: Locale, def: TippingCountryDefinition): TippingCountrySummary {
  const country = getCountryName(locale, def.countryCode)

  return {
    country,
    slug: def.slug,
    region: def.region,
    flag: def.flag,
    title: localize(def.title, locale),
    description: localize(def.description, locale),
    headlineRule: localize(def.headlineRule, locale),
    lastReviewed: def.lastReviewed,
    sourceCount: buildTippingCountrySources(def, locale).length,
  }
}

function buildPack(locale: Locale, def: TippingCountryDefinition): TippingCountryPack {
  const summary = buildSummary(locale, def)

  return {
    ...summary,
    rules: TIPPING_CATEGORY_IDS.reduce((rules, category) => {
      rules[category] = localize(def.rules[category], locale)
      return rules
    }, {} as Record<TippingCategoryId, string>),
    notes: def.notes.map((note) => localize(note, locale)),
    sources: buildTippingCountrySources(def, locale),
  }
}

function normalizeContent(value: string) {
  return value
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '')
}

function stripCountryMarkers(value: string, def: TippingCountryDefinition) {
  const markers = [
    def.countryCode,
    def.slug,
    def.countryCode.toLowerCase(),
    def.slug.replace(/-/g, ''),
    def.slug.replace(/-/g, ' '),
    def.slug.replace(/-/g, '_'),
    def.slug.split('-').join(''),
    getCountryName('en-US', def.countryCode),
    getCountryName('zh-CN', def.countryCode),
  ]

  let result = value
  for (const marker of markers) {
    if (!marker) continue
    const escaped = marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    result = result.replace(new RegExp(escaped, 'gi'), '')
  }
  return result
}

function fingerprintDefinition(def: TippingCountryDefinition) {
  const locales: Locale[] = ['zh-CN', 'en-US']
  const fields = [
    ...locales.flatMap((locale) => [
      localize(def.title, locale),
      localize(def.description, locale),
      localize(def.headlineRule, locale),
      ...TIPPING_CATEGORY_IDS.map((category) => localize(def.rules[category], locale)),
      ...def.notes.map((note) => localize(note, locale)),
      ...def.sources.map((source) => localize(source.label, locale)),
    ]),
  ]

  return normalizeContent(fields.map((field) => stripCountryMarkers(field, def)).join('|'))
}

function hasTemplateLikeText(value: string, def: TippingCountryDefinition) {
  const lower = value.toLowerCase()
  const badFragments = [
    '{country}',
    '{percent}',
    'template',
    'placeholder',
    'tone',
  ]

  return badFragments.some((fragment) => lower.includes(fragment))
    || normalizeContent(stripCountryMarkers(value, def)).length < 4
}

export function validateTippingCountryDefinition(def: TippingCountryDefinition, locale: Locale = 'en-US') {
  const errors: string[] = []
  const sources = buildTippingCountrySources(def, locale)

  if (sources.length < 2) {
    errors.push(`${def.slug}: expected at least 2 sources`)
  }

  if (!sources.some((source) => source.href.includes('worldtravelguide.net'))) {
    errors.push(`${def.slug}: missing World Travel Guide source`)
  }

  if (!sources.some((source) => source.href.includes('wikivoyage.org'))) {
    errors.push(`${def.slug}: missing Wikivoyage source`)
  }

  const localizedFields = [
    def.title['zh-CN'],
    def.title['en-US'],
    def.description['zh-CN'],
    def.description['en-US'],
    def.headlineRule['zh-CN'],
    def.headlineRule['en-US'],
    ...TIPPING_CATEGORY_IDS.flatMap((category) => [def.rules[category]['zh-CN'], def.rules[category]['en-US']]),
    ...def.notes.flatMap((note) => [note['zh-CN'], note['en-US']]),
    ...sources.flatMap((source) => [source.label, source.href]),
  ]

  const contentFieldsByLocale: Record<Locale, string[]> = {
    'zh-CN': [
      def.title['zh-CN'],
      def.description['zh-CN'],
      def.headlineRule['zh-CN'],
      ...TIPPING_CATEGORY_IDS.map((category) => def.rules[category]['zh-CN']),
      ...def.notes.map((note) => note['zh-CN']),
    ],
    'en-US': [
      def.title['en-US'],
      def.description['en-US'],
      def.headlineRule['en-US'],
      ...TIPPING_CATEGORY_IDS.map((category) => def.rules[category]['en-US']),
      ...def.notes.map((note) => note['en-US']),
    ],
  }

  const hasTemplateLikeRepetition = (Object.entries(contentFieldsByLocale) as Array<[Locale, string[]]>)
    .some(([, fields]) => new Set(
      fields
        .map((value) => normalizeContent(stripCountryMarkers(value, def)))
        .filter(Boolean),
    ).size < 6)

  if (hasTemplateLikeRepetition) {
    errors.push(`${def.slug}: template-like repetition detected`)
  }

  for (const value of localizedFields) {
    if (!value || !value.trim()) {
      errors.push(`${def.slug}: missing tipping content`)
      break
    }

    if (hasTemplateLikeText(value, def)) {
      errors.push(`${def.slug}: template-like content detected`)
      break
    }
  }

  return errors
}

export function listTippingCountrySummaries(locale: Locale, region: PhraseRegion | 'all' = 'all') {
  const cacheKey = `${locale}:${region}`
  if (COUNTRY_SUMMARY_CACHE.has(cacheKey)) {
    return COUNTRY_SUMMARY_CACHE.get(cacheKey) ?? []
  }

  const summaries = TIPPING_COUNTRIES
    .filter((def) => region === 'all' || def.region === region)
    .map((def) => buildSummary(locale, def))

  COUNTRY_SUMMARY_CACHE.set(cacheKey, summaries)
  return summaries
}

export function getTippingCountryPack(locale: Locale, slug: string) {
  const cacheKey = `${locale}:${slug}`
  if (COUNTRY_PACK_CACHE.has(cacheKey)) {
    return COUNTRY_PACK_CACHE.get(cacheKey) ?? null
  }

  const def = TIPPING_COUNTRIES.find((item) => item.slug === slug)
  if (!def) {
    COUNTRY_PACK_CACHE.set(cacheKey, null)
    return null
  }

  const pack = buildPack(locale, def)
  COUNTRY_PACK_CACHE.set(cacheKey, pack)
  return pack
}

export function validateTippingCountryDefinitions(definitions: readonly TippingCountryDefinition[], locale: Locale = 'en-US') {
  const errors: string[] = []
  const seenSlugs = new Set<string>()
  const seenFingerprints = new Map<string, string>()

  if (definitions.length !== 41) {
    errors.push(`expected 41 tipping destinations, received ${definitions.length}`)
  }

  for (const def of definitions) {
    if (seenSlugs.has(def.slug)) {
      errors.push(`duplicate tipping slug "${def.slug}"`)
    }
    seenSlugs.add(def.slug)

    if (!def.countryCode || def.countryCode.length !== 2) {
      errors.push(`${def.slug}: invalid country code`)
    }

    if (!TIPPING_REGIONS.includes(def.region)) {
      errors.push(`${def.slug}: invalid region "${def.region}"`)
    }

    if (!def.lastReviewed) {
      errors.push(`${def.slug}: missing lastReviewed`)
    }

    errors.push(...validateTippingCountryDefinition(def, locale))

    const fingerprint = fingerprintDefinition(def)
    const previousSlug = seenFingerprints.get(fingerprint)
    if (previousSlug) {
      errors.push(`${def.slug}: duplicate-looking content matches ${previousSlug}`)
    } else {
      seenFingerprints.set(fingerprint, def.slug)
    }
  }

  return errors
}

export function validateTippingCountryRegistry() {
  return validateTippingCountryDefinitions(TIPPING_COUNTRIES)
}
