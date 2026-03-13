import { describe, expect, it } from 'vitest'
import { getAllRawPhraseCountryPacks, getPhraseCountryPack, validateRawPhraseCountryPack } from '@/lib/travel-phrases'

describe('travel phrase content', () => {
  it('ships 20 country packs with valid phrase definitions', () => {
    const packs = getAllRawPhraseCountryPacks()
    expect(packs).toHaveLength(20)

    for (const pack of packs) {
      expect(validateRawPhraseCountryPack(pack)).toEqual([])
    }
  })

  it('localizes country packs for the active site locale', () => {
    const englishPack = getPhraseCountryPack('en-US', 'japan')
    const chinesePack = getPhraseCountryPack('zh-CN', 'japan')
    const cambodiaPack = getPhraseCountryPack('en-US', 'cambodia')

    expect(englishPack?.title).toBe('Japan Travel Phrases')
    expect(chinesePack?.title).toBe('日本旅行短语卡')
    expect(englishPack?.phrases).toHaveLength(36)
    expect(englishPack?.hasAudio).toBe(true)
    expect(cambodiaPack?.hasAudio).toBe(false)
    expect(cambodiaPack?.phrases.every((phrase) => phrase.audioKey === null)).toBe(true)
    expect(chinesePack?.phrases[0]?.translation).toBe('你好')
  })
})
