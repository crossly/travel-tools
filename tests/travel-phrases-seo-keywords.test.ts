import { describe, expect, it, vi } from 'vitest'

describe('travel phrase SEO keywords', () => {
  it('builds country keywords through i18n templates instead of hardcoded strings', async () => {
    vi.resetModules()

    const { getPhraseCountryPack } = await import('@/lib/travel-phrases')
    const { registerMessages } = await import('@/lib/i18n')
    registerMessages('test-phrases-seo-keywords', {
      'en-US': {
        'phrases.seoKeywordCountryTravel': '{country} registry travel',
        'phrases.seoKeywordLanguageTravel': '{languageName} registry travel',
        'phrases.seoKeywordCountryPhraseCards': '{country} registry cards',
        'phrases.seoKeywordCountryRestaurant': '{country} registry restaurant',
        'phrases.seoKeywordCountryHotel': '{country} registry hotel',
        'phrases.seoKeywordCountryTransport': '{country} registry transport',
        'phrases.seoKeywordCountryEmergency': '{country} registry emergency',
      },
      'zh-CN': {
        'phrases.seoKeywordCountryTravel': '{country}文案旅行短语',
        'phrases.seoKeywordLanguageTravel': '{languageName}文案旅行短语',
        'phrases.seoKeywordCountryPhraseCards': '{country}文案短语卡',
        'phrases.seoKeywordCountryRestaurant': '{country}文案点餐短语',
        'phrases.seoKeywordCountryHotel': '{country}文案酒店短语',
        'phrases.seoKeywordCountryTransport': '{country}文案交通短语',
        'phrases.seoKeywordCountryEmergency': '{country}文案应急短语',
      },
    })

    const pack = await getPhraseCountryPack('en-US', 'japan')

    expect(pack?.seoKeywords).toContain('Japan registry travel')
    expect(pack?.seoKeywords).toContain('Japanese registry travel')
    expect(pack?.seoKeywords).toContain('Japan registry emergency')
  })
})
