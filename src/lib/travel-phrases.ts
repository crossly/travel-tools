import phraseDefinitionsRaw from '@/data/travel-phrases/phrase-definitions.json'
import phraseCountryIndexRaw from '@/data/travel-phrases/index.json'
import { translate } from '@/lib/i18n'
import { PHRASE_REGIONS } from '@/lib/phrase-regions'
import type {
  Locale,
  PhraseAudioCoverage,
  PhraseCard,
  PhraseCategory,
  PhraseCountryPack,
  PhraseCountrySummary,
  PhraseFaqItem,
  PhraseRegion,
} from '@/lib/types'

type LocalizedCopy = Record<Locale, string>
type LocalizedList = Record<Locale, string[]>

type RawPhraseDefinition = {
  id: string
  category: PhraseCategory
  translation: LocalizedCopy
}

type RawPhraseEntry = {
  id: string
  nativeText: string
  romanization: string | null
  audioKey: string | null
}

type RawOwnedPhraseEntry = RawPhraseEntry & {
  category: PhraseCategory
  translation: LocalizedCopy
  usageNote?: LocalizedCopy
  ttsHint?: string
}

type RawLocalizedPhraseEntry = RawOwnedPhraseEntry

type RawFaqEntry = {
  question: LocalizedCopy
  answer: LocalizedCopy
}

type RawPhraseCountryPack = {
  country: LocalizedCopy
  slug: string
  region: PhraseRegion
  languageName: LocalizedCopy
  languageCode: string
  flag: string
  description?: LocalizedCopy
  intro?: LocalizedCopy
  travelTips?: LocalizedList
  teaser?: LocalizedCopy
  highlights?: LocalizedList
  featured?: boolean
  relatedSlugs?: string[]
  faq?: RawFaqEntry[]
  phrases: Array<RawPhraseEntry | RawOwnedPhraseEntry>
  extraPhrases?: RawLocalizedPhraseEntry[]
}

type RawPhraseCountrySummary = {
  country: LocalizedCopy
  slug: string
  region: PhraseRegion
  languageName: LocalizedCopy
  languageCode: string
  flag: string
  description?: LocalizedCopy
  teaser?: LocalizedCopy
  highlights?: LocalizedList
  featured?: boolean
  phraseCount: number
  audioCoverage: PhraseAudioCoverage
}

export const FEATURED_COUNTRY_SLUGS = [
  'japan',
  'china',
  'south-korea',
  'thailand',
  'singapore',
  'france',
  'united-arab-emirates',
] as const

export const MAX_FEATURED_COUNTRY_PACKS = FEATURED_COUNTRY_SLUGS.length

export const PHRASE_CATEGORIES: PhraseCategory[] = ['basics', 'transport', 'hotel', 'dining', 'shopping', 'emergency']
export { PHRASE_REGIONS }

const phraseDefinitions = phraseDefinitionsRaw as RawPhraseDefinition[]
const phraseCountryIndex = phraseCountryIndexRaw as RawPhraseCountrySummary[]
const rawCountryModules = import.meta.glob([
  '../data/travel-phrases/*.json',
  '!../data/travel-phrases/index.json',
  '!../data/travel-phrases/phrase-definitions.json',
]) as Record<
  string,
  () => Promise<{ default: RawPhraseCountryPack }>
>

const definitionMap = new Map(phraseDefinitions.map((definition) => [definition.id, definition]))
const rawPackCache = new Map<string, RawPhraseCountryPack>()
const featuredCountryRank = new Map(FEATURED_COUNTRY_SLUGS.map((slug, index) => [slug, index]))

function resolveAudioCoverage(entries: Array<{ audioKey: string | null }> = []): PhraseAudioCoverage {
  if (!entries.length) {
    return 'none'
  }

  const audioCount = entries.filter((entry) => Boolean(entry.audioKey)).length
  if (audioCount === 0) {
    return 'none'
  }
  if (audioCount === entries.length) {
    return 'all'
  }
  return 'partial'
}

function buildCountryTitle(locale: Locale, country: string) {
  return translate(locale, 'phrases.countryPageTitle', { country })
}

function buildCountryDescription(locale: Locale, country: string, description?: LocalizedCopy) {
  return description?.[locale] ?? translate(locale, 'phrases.countryPageDescription', { country })
}

function buildCountryIntro(locale: Locale, description: string, intro?: LocalizedCopy) {
  return intro?.[locale] ?? description
}

function buildCountryTeaser(locale: Locale, description: string, teaser?: LocalizedCopy) {
  return teaser?.[locale] ?? description
}

function buildCountrySeoKeywords(locale: Locale, country: string, languageName: string) {
  const keywords = locale === 'zh-CN'
    ? [
        `${country}旅行短语`,
        `${country}旅游短语`,
        `${languageName}旅行短语`,
        `${country}点餐短语`,
        `${country}酒店短语`,
        `${country}交通短语`,
        `${country}应急短语`,
      ]
    : [
        `${country} travel phrases`,
        `${languageName} travel phrases`,
        `${country} phrase cards`,
        `${country} restaurant phrases`,
        `${country} hotel phrases`,
        `${country} transport phrases`,
        `${country} emergency phrases`,
      ]

  return [...new Set(keywords)]
}

function mapExtraPhrase(locale: Locale, entry: RawLocalizedPhraseEntry): PhraseCard {
  return {
    id: entry.id,
    category: entry.category,
    nativeText: entry.nativeText,
    translation: entry.translation[locale],
    romanization: entry.romanization,
    audioKey: entry.audioKey,
  }
}

function isOwnedPhraseEntry(entry: RawPhraseEntry | RawOwnedPhraseEntry): entry is RawOwnedPhraseEntry {
  return 'category' in entry && 'translation' in entry
}

function validateOwnedPhraseEntry(
  errors: string[],
  pack: RawPhraseCountryPack,
  entry: RawOwnedPhraseEntry,
  options?: {
    label?: string
    audioCoverage?: PhraseAudioCoverage
  },
) {
  const label = options?.label ?? `"${entry.id}"`

  if (!PHRASE_CATEGORIES.includes(entry.category)) {
    errors.push(`${pack.slug}: invalid category for ${label}`)
  }

  if (!entry.translation?.['en-US'] || !entry.translation?.['zh-CN']) {
    errors.push(`${pack.slug}: missing localized translation for ${label}`)
  }

  const expectedAudioKey = `travel-phrases/${pack.slug}/${entry.id}.mp3`
  const audioCoverage = options?.audioCoverage ?? 'none'
  if (audioCoverage === 'all') {
    if (entry.audioKey === null) {
      errors.push(`${pack.slug}: missing audioKey for ${label}`)
    } else if (entry.audioKey !== expectedAudioKey) {
      errors.push(`${pack.slug}: invalid audioKey for ${label}`)
    }
  } else if (audioCoverage === 'none') {
    if (entry.audioKey !== null) {
      errors.push(`${pack.slug}: audioKey must be null for ${label}`)
    }
  } else if (entry.audioKey !== null && entry.audioKey !== expectedAudioKey) {
    errors.push(`${pack.slug}: invalid audioKey for ${label}`)
  }

  const usesLatinScript = /^[\p{Script=Latin}\p{P}\p{S}\p{N}\s]+$/u.test(entry.nativeText)
  if (!usesLatinScript && !entry.romanization) {
    errors.push(`${pack.slug}: missing romanization for ${label}`)
  }
  if (usesLatinScript && entry.romanization) {
    errors.push(`${pack.slug}: romanization must be null for ${label}`)
  }
}

function mapPhraseEntry(locale: Locale, entry: RawPhraseEntry | RawOwnedPhraseEntry): PhraseCard {
  if (isOwnedPhraseEntry(entry)) {
    return {
      id: entry.id,
      category: entry.category,
      nativeText: entry.nativeText,
      translation: entry.translation[locale],
      romanization: entry.romanization,
      audioKey: entry.audioKey,
    }
  }

  const definition = definitionMap.get(entry.id)
  if (!definition) {
    throw new Error(`Unknown phrase definition: ${entry.id}`)
  }

  return {
    id: entry.id,
    category: definition.category,
    nativeText: entry.nativeText,
    translation: definition.translation[locale],
    romanization: entry.romanization,
    audioKey: entry.audioKey,
  }
}

function mapFaqEntry(locale: Locale, entry: RawFaqEntry): PhraseFaqItem {
  return {
    question: entry.question[locale],
    answer: entry.answer[locale],
  }
}

function buildCountrySummary(locale: Locale, pack: RawPhraseCountrySummary): PhraseCountrySummary {
  const description = buildCountryDescription(locale, pack.country[locale], pack.description)

  return {
    country: pack.country[locale],
    slug: pack.slug,
    region: pack.region,
    languageName: pack.languageName[locale],
    languageCode: pack.languageCode,
    flag: pack.flag,
    title: buildCountryTitle(locale, pack.country[locale]),
    description,
    teaser: buildCountryTeaser(locale, description, pack.teaser),
    highlights: pack.highlights?.[locale] ?? [],
    featured: Boolean(pack.featured),
    phraseCount: pack.phraseCount,
    audioCoverage: pack.audioCoverage,
  }
}

function buildRelatedCountrySummaries(
  locale: Locale,
  currentSlug: string,
  region: PhraseRegion,
  relatedSlugs?: string[],
) {
  const summaryMap = new Map(phraseCountryIndex.map((pack) => [pack.slug, pack]))

  if (relatedSlugs?.length) {
    return relatedSlugs
      .map((slug) => summaryMap.get(slug))
      .filter((pack): pack is RawPhraseCountrySummary => Boolean(pack))
      .map((pack) => buildCountrySummary(locale, pack))
  }

  return phraseCountryIndex
    .filter((pack) => pack.slug !== currentSlug && pack.region === region)
    .slice(0, 3)
    .map((pack) => buildCountrySummary(locale, pack))
}

export function buildPhraseAudioPath(country: string, phraseId: string) {
  return `/api/phrase-audio/${country}/${phraseId}`
}

export function listRawPhraseCountrySummaries() {
  return phraseCountryIndex
}

export async function getAllRawPhraseCountryPacks() {
  return Promise.all(phraseCountryIndex.map((pack) => getRawPhraseCountryPack(pack.slug))) as Promise<RawPhraseCountryPack[]>
}

export async function getRawPhraseCountryPack(country: string) {
  const cached = rawPackCache.get(country)
  if (cached) return cached

  const loader = rawCountryModules[`../data/travel-phrases/${country}.json`]
  if (!loader) return null

  const mod = await loader()
  rawPackCache.set(country, mod.default)
  return mod.default
}

export function listPhraseCountrySummaries(locale: Locale, region: PhraseRegion | 'all' = 'all'): PhraseCountrySummary[] {
  return phraseCountryIndex
    .filter((pack) => region === 'all' || pack.region === region)
    .map((pack) => buildCountrySummary(locale, pack))
}

export function selectFeaturedPhraseCountrySummaries(summaries: PhraseCountrySummary[]) {
  return summaries
    .filter((pack) => pack.featured && featuredCountryRank.has(pack.slug as typeof FEATURED_COUNTRY_SLUGS[number]))
    .sort((left, right) => {
      const leftRank = featuredCountryRank.get(left.slug as typeof FEATURED_COUNTRY_SLUGS[number]) ?? Number.MAX_SAFE_INTEGER
      const rightRank = featuredCountryRank.get(right.slug as typeof FEATURED_COUNTRY_SLUGS[number]) ?? Number.MAX_SAFE_INTEGER
      return leftRank - rightRank || left.country.localeCompare(right.country)
    })
    .slice(0, MAX_FEATURED_COUNTRY_PACKS)
}

export async function getPhraseCountryPack(locale: Locale, country: string): Promise<PhraseCountryPack | null> {
  const pack = await getRawPhraseCountryPack(country)
  if (!pack) return null

  const phrases: PhraseCard[] = pack.phrases.map((entry) => mapPhraseEntry(locale, entry))
  const extraPhrases = pack.extraPhrases?.map((entry) => mapExtraPhrase(locale, entry)) ?? []

  const countryName = pack.country[locale]
  const description = buildCountryDescription(locale, countryName, pack.description)
  const languageName = pack.languageName[locale]

  return {
    country: countryName,
    slug: pack.slug,
    region: pack.region,
    languageName,
    languageCode: pack.languageCode,
    flag: pack.flag,
    title: buildCountryTitle(locale, countryName),
    description,
    seoDescription: description,
    seoKeywords: buildCountrySeoKeywords(locale, countryName, languageName),
    teaser: buildCountryTeaser(locale, description, pack.teaser),
    intro: buildCountryIntro(locale, description, pack.intro),
    travelTips: pack.travelTips?.[locale] ?? [],
    audioCoverage: resolveAudioCoverage([...pack.phrases, ...(pack.extraPhrases ?? [])]),
    phrases,
    extraPhrases,
    faq: pack.faq?.map((entry) => mapFaqEntry(locale, entry)) ?? [],
    relatedCountries: buildRelatedCountrySummaries(locale, pack.slug, pack.region, pack.relatedSlugs),
  }
}

export function validateRawPhraseCountryPack(pack: RawPhraseCountryPack) {
  const errors: string[] = []
  const audioCoverage = resolveAudioCoverage([...pack.phrases, ...(pack.extraPhrases ?? [])])
  const usesOwnedPhraseInventory = pack.phrases.some((entry) => isOwnedPhraseEntry(entry))

  if (!pack.description?.['en-US'] || !pack.description?.['zh-CN']) {
    errors.push(`${pack.slug}: missing localized description`)
  }

  if (!pack.intro?.['en-US'] || !pack.intro?.['zh-CN']) {
    errors.push(`${pack.slug}: missing localized intro`)
  }

  if (!pack.teaser?.['en-US'] || !pack.teaser?.['zh-CN']) {
    errors.push(`${pack.slug}: missing localized teaser`)
  }

  if (!pack.travelTips?.['en-US']?.length || !pack.travelTips?.['zh-CN']?.length) {
    errors.push(`${pack.slug}: missing localized travel tips`)
  }

  if (!pack.highlights?.['en-US']?.length || !pack.highlights?.['zh-CN']?.length) {
    errors.push(`${pack.slug}: missing localized highlights`)
  }

  if (typeof pack.featured !== 'boolean') {
    errors.push(`${pack.slug}: missing featured flag`)
  }

  if (!pack.relatedSlugs?.length) {
    errors.push(`${pack.slug}: missing related country slugs`)
  }

  if (!pack.faq?.length) {
    errors.push(`${pack.slug}: missing faq entries`)
  }

  if (!usesOwnedPhraseInventory && pack.phrases.length !== phraseDefinitions.length) {
    errors.push(`${pack.slug}: expected ${phraseDefinitions.length} phrases, received ${pack.phrases.length}`)
  }

  const seen = new Set<string>()

  for (const entry of pack.phrases) {
    if (seen.has(entry.id)) {
      errors.push(`${pack.slug}: duplicate phrase id "${entry.id}"`)
      continue
    }
    seen.add(entry.id)

    if (isOwnedPhraseEntry(entry)) {
      validateOwnedPhraseEntry(errors, pack, entry, {
        audioCoverage,
      })
    } else {
      const definition = definitionMap.get(entry.id)
      if (!definition) {
        errors.push(`${pack.slug}: unknown phrase id "${entry.id}"`)
        continue
      }
      const expectedAudioKey = `travel-phrases/${pack.slug}/${entry.id}.mp3`
      if (audioCoverage === 'all') {
        if (!entry.audioKey || entry.audioKey !== expectedAudioKey) {
          errors.push(`${pack.slug}: invalid audioKey for "${entry.id}"`)
        }
      } else if (audioCoverage === 'none') {
        if (entry.audioKey !== null) {
          errors.push(`${pack.slug}: audioKey must be null for "${entry.id}"`)
        }
      } else if (entry.audioKey !== null && entry.audioKey !== expectedAudioKey) {
        errors.push(`${pack.slug}: invalid audioKey for "${entry.id}"`)
      }
    }

    if (!isOwnedPhraseEntry(entry)) {
      const usesLatinScript = /^[\p{Script=Latin}\p{P}\p{S}\p{N}\s]+$/u.test(entry.nativeText)
      if (!usesLatinScript && !entry.romanization) {
        errors.push(`${pack.slug}: missing romanization for "${entry.id}"`)
      }
      if (usesLatinScript && entry.romanization) {
        errors.push(`${pack.slug}: romanization must be null for "${entry.id}"`)
      }
    }
  }

  const seenExtraIds = new Set<string>()

  for (const entry of pack.extraPhrases ?? []) {
    if (seen.has(entry.id) || seenExtraIds.has(entry.id)) {
      errors.push(`${pack.slug}: duplicate extra phrase id "${entry.id}"`)
      continue
    }
    seenExtraIds.add(entry.id)

    validateOwnedPhraseEntry(errors, pack, entry, {
      label: `extra phrase "${entry.id}"`,
      audioCoverage,
    })
  }

  if (!usesOwnedPhraseInventory) {
    for (const definition of phraseDefinitions) {
      if (!seen.has(definition.id)) {
        errors.push(`${pack.slug}: missing phrase "${definition.id}"`)
      }
    }
  }

  return errors
}
