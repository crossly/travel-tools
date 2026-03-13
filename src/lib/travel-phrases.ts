import phraseDefinitionsRaw from '@/data/travel-phrases/phrase-definitions.json'
import phraseCountryIndexRaw from '@/data/travel-phrases/index.json'
import { translate } from '@/lib/i18n'
import type { Locale, PhraseCard, PhraseCategory, PhraseCountryPack, PhraseCountrySummary, PhraseRegion } from '@/lib/types'

type LocalizedCopy = Record<Locale, string>

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

type RawPhraseCountryPack = {
  country: LocalizedCopy
  slug: string
  region: PhraseRegion
  languageName: LocalizedCopy
  languageCode: string
  flag: string
  phrases: RawPhraseEntry[]
}

type RawPhraseCountrySummary = {
  country: LocalizedCopy
  slug: string
  region: PhraseRegion
  languageName: LocalizedCopy
  languageCode: string
  flag: string
  phraseCount: number
  hasAudio: boolean
}

export const PHRASE_CATEGORIES: PhraseCategory[] = ['basics', 'transport', 'hotel', 'dining', 'shopping', 'emergency']
export const PHRASE_REGIONS: Array<PhraseRegion | 'all'> = [
  'all',
  'asia',
  'middle-east',
  'europe',
  'americas',
  'africa',
  'oceania',
]

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

function buildCountryTitle(locale: Locale, country: string) {
  return translate(locale, 'phrases.countryPageTitle', { country })
}

function buildCountryDescription(locale: Locale, country: string) {
  return translate(locale, 'phrases.countryPageDescription', { country })
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
    .map((pack) => ({
      country: pack.country[locale],
      slug: pack.slug,
      region: pack.region,
      languageName: pack.languageName[locale],
      languageCode: pack.languageCode,
      flag: pack.flag,
      title: buildCountryTitle(locale, pack.country[locale]),
      description: buildCountryDescription(locale, pack.country[locale]),
      phraseCount: pack.phraseCount,
      hasAudio: pack.hasAudio,
    }))
}

export async function getPhraseCountryPack(locale: Locale, country: string): Promise<PhraseCountryPack | null> {
  const pack = await getRawPhraseCountryPack(country)
  if (!pack) return null

  const phrases: PhraseCard[] = pack.phrases.map((entry) => {
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
  })

  const countryName = pack.country[locale]

  return {
    country: countryName,
    slug: pack.slug,
    region: pack.region,
    languageName: pack.languageName[locale],
    languageCode: pack.languageCode,
    flag: pack.flag,
    title: buildCountryTitle(locale, countryName),
    description: buildCountryDescription(locale, countryName),
    hasAudio: pack.phrases.every((phrase) => Boolean(phrase.audioKey)),
    phrases,
  }
}

export function validateRawPhraseCountryPack(pack: RawPhraseCountryPack) {
  const errors: string[] = []
  const hasAnyAudio = pack.phrases.some((entry) => Boolean(entry.audioKey))
  const hasAllAudio = pack.phrases.every((entry) => Boolean(entry.audioKey))

  if (pack.phrases.length !== phraseDefinitions.length) {
    errors.push(`${pack.slug}: expected ${phraseDefinitions.length} phrases, received ${pack.phrases.length}`)
  }

  if (hasAnyAudio && !hasAllAudio) {
    errors.push(`${pack.slug}: phrases must either all include audioKey or all disable audio`)
  }

  const seen = new Set<string>()

  for (const entry of pack.phrases) {
    if (seen.has(entry.id)) {
      errors.push(`${pack.slug}: duplicate phrase id "${entry.id}"`)
      continue
    }
    seen.add(entry.id)

    const definition = definitionMap.get(entry.id)
    if (!definition) {
      errors.push(`${pack.slug}: unknown phrase id "${entry.id}"`)
      continue
    }

    const expectedAudioKey = `travel-phrases/${pack.slug}/${entry.id}.mp3`
    if (hasAllAudio) {
      if (!entry.audioKey || entry.audioKey !== expectedAudioKey) {
        errors.push(`${pack.slug}: invalid audioKey for "${entry.id}"`)
      }
    } else if (entry.audioKey !== null) {
      errors.push(`${pack.slug}: audioKey must be null for "${entry.id}"`)
    }

    const usesLatinScript = /^[\p{Script=Latin}\p{P}\p{S}\p{N}\s]+$/u.test(entry.nativeText)
    if (!usesLatinScript && !entry.romanization) {
      errors.push(`${pack.slug}: missing romanization for "${entry.id}"`)
    }
    if (usesLatinScript && entry.romanization) {
      errors.push(`${pack.slug}: romanization must be null for "${entry.id}"`)
    }
  }

  for (const definition of phraseDefinitions) {
    if (!seen.has(definition.id)) {
      errors.push(`${pack.slug}: missing phrase "${definition.id}"`)
    }
  }

  return errors
}
