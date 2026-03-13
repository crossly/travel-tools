import phraseDefinitionsRaw from '@/data/travel-phrases/phrase-definitions.json'
import argentinaRaw from '@/data/travel-phrases/argentina.json'
import brazilRaw from '@/data/travel-phrases/brazil.json'
import cambodiaRaw from '@/data/travel-phrases/cambodia.json'
import canadaRaw from '@/data/travel-phrases/canada.json'
import chileRaw from '@/data/travel-phrases/chile.json'
import chinaRaw from '@/data/travel-phrases/china.json'
import franceRaw from '@/data/travel-phrases/france.json'
import germanyRaw from '@/data/travel-phrases/germany.json'
import greeceRaw from '@/data/travel-phrases/greece.json'
import indonesiaRaw from '@/data/travel-phrases/indonesia.json'
import italyRaw from '@/data/travel-phrases/italy.json'
import japanRaw from '@/data/travel-phrases/japan.json'
import kenyaRaw from '@/data/travel-phrases/kenya.json'
import malaysiaRaw from '@/data/travel-phrases/malaysia.json'
import mauritiusRaw from '@/data/travel-phrases/mauritius.json'
import mexicoRaw from '@/data/travel-phrases/mexico.json'
import moroccoRaw from '@/data/travel-phrases/morocco.json'
import netherlandsRaw from '@/data/travel-phrases/netherlands.json'
import peruRaw from '@/data/travel-phrases/peru.json'
import portugalRaw from '@/data/travel-phrases/portugal.json'
import southKoreaRaw from '@/data/travel-phrases/south-korea.json'
import southAfricaRaw from '@/data/travel-phrases/south-africa.json'
import spainRaw from '@/data/travel-phrases/spain.json'
import tanzaniaRaw from '@/data/travel-phrases/tanzania.json'
import thailandRaw from '@/data/travel-phrases/thailand.json'
import unitedStatesRaw from '@/data/travel-phrases/united-states.json'
import vietnamRaw from '@/data/travel-phrases/vietnam.json'
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

export const PHRASE_CATEGORIES: PhraseCategory[] = ['basics', 'transport', 'hotel', 'dining', 'shopping', 'emergency']
export const PHRASE_REGIONS: Array<PhraseRegion | 'all'> = ['all', 'asia', 'europe', 'americas', 'africa']

const phraseDefinitions = phraseDefinitionsRaw as RawPhraseDefinition[]
const rawCountryPacks = [
  japanRaw,
  southKoreaRaw,
  thailandRaw,
  vietnamRaw,
  indonesiaRaw,
  cambodiaRaw,
  chinaRaw,
  malaysiaRaw,
  franceRaw,
  germanyRaw,
  italyRaw,
  spainRaw,
  portugalRaw,
  greeceRaw,
  netherlandsRaw,
  unitedStatesRaw,
  canadaRaw,
  mexicoRaw,
  brazilRaw,
  argentinaRaw,
  chileRaw,
  peruRaw,
  moroccoRaw,
  southAfricaRaw,
  kenyaRaw,
  tanzaniaRaw,
  mauritiusRaw,
] as RawPhraseCountryPack[]

const definitionMap = new Map(phraseDefinitions.map((definition) => [definition.id, definition]))
const rawPackMap = new Map(rawCountryPacks.map((pack) => [pack.slug, pack]))

function buildCountryTitle(locale: Locale, country: string) {
  return translate(locale, 'phrases.countryPageTitle', { country })
}

function buildCountryDescription(locale: Locale, country: string) {
  return translate(locale, 'phrases.countryPageDescription', { country })
}

export function buildPhraseAudioPath(country: string, phraseId: string) {
  return `/api/phrase-audio/${country}/${phraseId}`
}

export function getAllRawPhraseCountryPacks() {
  return rawCountryPacks
}

export function getRawPhraseCountryPack(country: string) {
  return rawPackMap.get(country) ?? null
}

export function listPhraseCountrySummaries(locale: Locale, region: PhraseRegion | 'all' = 'all'): PhraseCountrySummary[] {
  return rawCountryPacks
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
      phraseCount: pack.phrases.length,
      hasAudio: pack.phrases.every((phrase) => Boolean(phrase.audioKey)),
    }))
}

export function getPhraseCountryPack(locale: Locale, country: string): PhraseCountryPack | null {
  const pack = rawPackMap.get(country)
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
