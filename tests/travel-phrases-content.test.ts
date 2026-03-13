import { describe, expect, it } from 'vitest'
import {
  getAllRawPhraseCountryPacks,
  getPhraseCountryPack,
  listRawPhraseCountrySummaries,
  validateRawPhraseCountryPack,
} from '@/lib/travel-phrases'

describe('travel phrase content', () => {
  it('ships valid country packs with valid phrase definitions', async () => {
    const packs = await getAllRawPhraseCountryPacks()
    const summaries = listRawPhraseCountrySummaries()
    expect(packs).toHaveLength(summaries.length)
    expect(new Set(packs.map((pack) => pack.slug)).size).toBe(packs.length)

    for (const pack of packs) {
      expect(validateRawPhraseCountryPack(pack)).toEqual([])
    }
  })

  it('localizes country packs for the active site locale', async () => {
    const englishPack = await getPhraseCountryPack('en-US', 'japan')
    const chinesePack = await getPhraseCountryPack('zh-CN', 'japan')
    const cambodiaPack = await getPhraseCountryPack('en-US', 'cambodia')
    const malaysiaPack = await getPhraseCountryPack('en-US', 'malaysia')
    const chinaPack = await getPhraseCountryPack('zh-CN', 'china')

    expect(englishPack?.title).toBe('Japan Travel Phrases')
    expect(chinesePack?.title).toBe('日本旅行短语卡')
    expect(englishPack?.phrases).toHaveLength(42)
    expect(englishPack?.hasAudio).toBe(true)
    expect(cambodiaPack?.hasAudio).toBe(false)
    expect(malaysiaPack?.hasAudio).toBe(true)
    expect(chinaPack?.hasAudio).toBe(true)
    expect(cambodiaPack?.phrases.every((phrase) => phrase.audioKey === null)).toBe(true)
    expect(malaysiaPack?.phrases.every((phrase) => Boolean(phrase.audioKey))).toBe(true)
    expect(chinesePack?.phrases[0]?.translation).toBe('你好')
  })

  it('ships a lightweight country index for summaries', () => {
    const summaries = listRawPhraseCountrySummaries()
    expect(new Set(summaries.map((pack) => pack.slug)).size).toBe(summaries.length)
    expect(summaries.some((pack) => pack.slug === 'china' && pack.phraseCount === 42)).toBe(true)
    expect(summaries.some((pack) => pack.slug === 'malaysia' && pack.hasAudio === true)).toBe(true)
    expect(summaries.some((pack) => pack.slug === 'united-arab-emirates' && pack.region === 'middle-east')).toBe(true)
    expect(summaries.some((pack) => pack.slug === 'australia' && pack.region === 'oceania')).toBe(true)
    expect(summaries.some((pack) => pack.slug === 'new-zealand' && pack.region === 'oceania')).toBe(true)
    expect(summaries.some((pack) => pack.slug === 'philippines' && pack.region === 'asia')).toBe(true)
    expect(summaries.some((pack) => pack.slug === 'austria' && pack.languageCode === 'de-AT')).toBe(true)
    expect(summaries.some((pack) => pack.slug === 'colombia' && pack.languageCode === 'es-CO')).toBe(true)
    expect(summaries.some((pack) => pack.slug === 'costa-rica' && pack.languageCode === 'es-CR')).toBe(true)
    expect(summaries.some((pack) => pack.slug === 'taiwan' && pack.languageCode === 'zh-TW')).toBe(true)
    expect(summaries.some((pack) => pack.slug === 'hong-kong' && pack.languageCode === 'zh-HK')).toBe(true)
    expect(summaries.some((pack) => pack.slug === 'switzerland' && pack.languageCode === 'de-CH')).toBe(true)
    expect(summaries.some((pack) => pack.slug === 'india' && pack.languageCode === 'hi-IN')).toBe(true)
  })
})
