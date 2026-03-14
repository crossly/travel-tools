import { describe, expect, it } from 'vitest'
import {
  FEATURED_COUNTRY_SLUGS,
  getAllRawPhraseCountryPacks,
  getPhraseCountryPack,
  listPhraseCountrySummaries,
  selectFeaturedPhraseCountrySummaries,
  listRawPhraseCountrySummaries,
  validateRawPhraseCountryPack,
} from '@/lib/travel-phrases'

describe('travel phrase content', () => {
  const GENERIC_INTRO = /^Built for trips in .* with quick phrase support for /
  const GENERIC_TEASER = /^Useful for everyday travel situations in /
  const GENERIC_TIP = /^Start with short .* phrases for greetings, directions, and simple requests\.$/
  const GENERIC_FAQ_ANSWER = /^Transport, dining, and hotel phrases cover most first-day situations in /

  it('accepts country-owned primary phrase inventories with localized phrase metadata', () => {
    const customPack = {
      country: {
        'en-US': 'Testland',
        'zh-CN': '测试国',
      },
      slug: 'testland',
      region: 'asia' as const,
      languageName: {
        'en-US': 'Testese',
        'zh-CN': '测试语',
      },
      languageCode: 'ja-JP',
      flag: '🏳️',
      description: {
        'en-US': 'Testland travel phrases for station exits and kiosks.',
        'zh-CN': '测试国旅行短语，围绕地铁出口和自助点餐机等场景整理。',
      },
      intro: {
        'en-US': 'Built for Testland station exits and self-order kiosks. Phrase cards help when you need quick local wording.',
        'zh-CN': '这套测试国短语优先覆盖地铁出口和自助点餐机场景。需要快速展示本地表达时，短语卡会更省事。',
      },
      teaser: {
        'en-US': 'Built for Testland exits, kiosks, and local service counters.',
        'zh-CN': '适合测试国的出口、自助机和服务柜台沟通。',
      },
      travelTips: {
        'en-US': [
          'Keep station exit phrases ready.',
          'Use short local requests at kiosks.',
          'Show the phrase card with the address when needed.',
        ],
        'zh-CN': [
          '先备好地铁出口相关短语。',
          '在自助机前优先用简短本地表达。',
          '必要时把地址和短语卡一起展示。',
        ],
      },
      highlights: {
        'en-US': ['Station exits', 'Self-order kiosks', 'Driver-ready addresses'],
        'zh-CN': ['地铁出口', '自助点餐机', '司机可直接看的地址'],
      },
      featured: false,
      relatedSlugs: ['japan', 'south-korea', 'taiwan'],
      faq: [
        {
          question: {
            'en-US': 'Which phrases matter most in Testland?',
            'zh-CN': '在测试国最该先准备哪些短语？',
          },
          answer: {
            'en-US': 'Transport, dining, and kiosk phrases matter first.',
            'zh-CN': '优先准备交通、餐饮和自助机场景短语。',
          },
        },
      ],
      phrases: [
        {
          id: 'station_exit_2',
          category: 'transport',
          nativeText: '2번 출구는 어디예요?',
          translation: {
            'en-US': 'Where is exit 2?',
            'zh-CN': '2号出口在哪里？',
          },
          romanization: 'Ibeon chulguneun eodiyeyo?',
          audioKey: 'travel-phrases/testland/station_exit_2.mp3',
          ttsHint: 'Keep the number clear and natural.',
        },
        {
          id: 'reload_card_here',
          category: 'transport',
          nativeText: '여기서 카드 충전할 수 있어요?',
          translation: {
            'en-US': 'Can I reload my card here?',
            'zh-CN': '这里可以充值交通卡吗？',
          },
          romanization: 'Yeogiseo kadeu chungjeonhal su isseoyo?',
          audioKey: 'travel-phrases/testland/reload_card_here.mp3',
        },
        {
          id: 'kiosk_english_option',
          category: 'dining',
          nativeText: '영어 메뉴로 바꿀 수 있어요?',
          translation: {
            'en-US': 'Can I switch this kiosk to English?',
            'zh-CN': '这个自助机可以切换成英文吗？',
          },
          romanization: 'Yeongeo menyuro bakkul su isseoyo?',
          audioKey: 'travel-phrases/testland/kiosk_english_option.mp3',
        },
        {
          id: 'less_ice_drink',
          category: 'dining',
          nativeText: '음료는 얼음 적게 해 주세요',
          translation: {
            'en-US': 'Please make the drink with less ice.',
            'zh-CN': '饮料请少冰。',
          },
          romanization: 'Eumnyoneun eoreum jeokge hae juseyo',
          audioKey: 'travel-phrases/testland/less_ice_drink.mp3',
        },
        {
          id: 'driver_use_this_address',
          category: 'transport',
          nativeText: '기사님, 이 주소로 가 주세요',
          translation: {
            'en-US': 'Driver, please go to this address.',
            'zh-CN': '司机，请去这个地址。',
          },
          romanization: 'Gisanim, i jusoro ga juseyo',
          audioKey: 'travel-phrases/testland/driver_use_this_address.mp3',
        },
        {
          id: 'hotel_late_arrival',
          category: 'hotel',
          nativeText: '늦게 도착할 예정이에요',
          translation: {
            'en-US': 'I will arrive late.',
            'zh-CN': '我会晚一点到。',
          },
          romanization: 'Neutge dochakal yejeong-ieyo',
          audioKey: 'travel-phrases/testland/hotel_late_arrival.mp3',
        },
      ],
    }

    expect(validateRawPhraseCountryPack(customPack)).toEqual([])
  })

  it('validates extra phrases with the same localized metadata rules as primary phrases', () => {
    const invalidExtraPack = {
      country: {
        'en-US': 'Extra Testland',
        'zh-CN': '补充测试国',
      },
      slug: 'extra-testland',
      region: 'asia' as const,
      languageName: {
        'en-US': 'Testese',
        'zh-CN': '测试语',
      },
      languageCode: 'ja-JP',
      flag: '🏳️',
      description: {
        'en-US': 'Extra Testland travel phrases.',
        'zh-CN': '补充测试国旅行短语。',
      },
      intro: {
        'en-US': 'Built for extra phrase validation.',
        'zh-CN': '用于校验补充短语约束。',
      },
      teaser: {
        'en-US': 'Useful for extra phrase validation.',
        'zh-CN': '适合测试补充短语校验。',
      },
      travelTips: {
        'en-US': ['Keep a short local phrase ready.'],
        'zh-CN': ['先准备一句简短本地表达。'],
      },
      highlights: {
        'en-US': ['Validation coverage'],
        'zh-CN': ['校验覆盖'],
      },
      featured: false,
      relatedSlugs: ['japan', 'south-korea'],
      faq: [
        {
          question: {
            'en-US': 'Does this pack validate extras?',
            'zh-CN': '这个包会校验补充短语吗？',
          },
          answer: {
            'en-US': 'Yes, it should validate categories, translations, and audio keys.',
            'zh-CN': '会，应该校验分类、翻译和音频键。',
          },
        },
      ],
      phrases: [
        {
          id: 'hello_local',
          category: 'basics',
          nativeText: 'こんにちは',
          translation: {
            'en-US': 'Hello',
            'zh-CN': '你好',
          },
          romanization: 'Konnichiwa',
          audioKey: 'travel-phrases/extra-testland/hello_local.mp3',
        },
      ],
      extraPhrases: [
        {
          id: 'bonus_phrase',
          category: 'unknown' as any,
          nativeText: '追加です',
          translation: {
            'en-US': '',
            'zh-CN': '这是补充短语。',
          },
          romanization: 'Tsuika desu',
          audioKey: 'bonus-audio.mp3',
        },
      ],
    }

    expect(validateRawPhraseCountryPack(invalidExtraPack)).toEqual(expect.arrayContaining([
      'extra-testland: invalid category for extra phrase "bonus_phrase"',
      'extra-testland: missing localized translation for extra phrase "bonus_phrase"',
      'extra-testland: invalid audioKey for extra phrase "bonus_phrase"',
    ]))
  })

  it('allows partial audio coverage for owned primary phrases and extra phrases under the same validation rules', () => {
    const partialAudioPack = {
      country: {
        'en-US': 'Partial Testland',
        'zh-CN': '部分音频测试国',
      },
      slug: 'partial-testland',
      region: 'asia' as const,
      languageName: {
        'en-US': 'Testese',
        'zh-CN': '测试语',
      },
      languageCode: 'ko-KR',
      flag: '🏳️',
      description: {
        'en-US': 'Partial Testland travel phrases.',
        'zh-CN': '部分音频测试国旅行短语。',
      },
      intro: {
        'en-US': 'Built for partial audio validation.',
        'zh-CN': '用于校验部分音频场景。',
      },
      teaser: {
        'en-US': 'Useful for partial audio validation.',
        'zh-CN': '适合测试部分音频校验。',
      },
      travelTips: {
        'en-US': ['Keep a station phrase ready.'],
        'zh-CN': ['先准备一句车站短语。'],
      },
      highlights: {
        'en-US': ['Partial audio coverage'],
        'zh-CN': ['部分音频覆盖'],
      },
      featured: false,
      relatedSlugs: ['japan', 'south-korea'],
      faq: [
        {
          question: {
            'en-US': 'Can partial audio still validate?',
            'zh-CN': '部分音频也能通过校验吗？',
          },
          answer: {
            'en-US': 'Yes, as long as present audio keys are valid and missing audio stays null.',
            'zh-CN': '可以，只要已有音频键格式正确，缺失音频保持 null 即可。',
          },
        },
      ],
      phrases: [
        {
          id: 'train_platform',
          category: 'transport' as const,
          nativeText: '승강장이 어디예요?',
          translation: {
            'en-US': 'Where is the platform?',
            'zh-CN': '站台在哪里？',
          },
          romanization: 'Seunggangjangi eodiyeyo?',
          audioKey: 'travel-phrases/partial-testland/train_platform.mp3',
        },
        {
          id: 'reload_card_here',
          category: 'transport' as const,
          nativeText: '여기서 카드 충전해요?',
          translation: {
            'en-US': 'Can I reload the card here?',
            'zh-CN': '这里可以给卡充值吗？',
          },
          romanization: 'Yeogiseo kadeu chungjeonhaeyo?',
          audioKey: null,
        },
      ],
      extraPhrases: [
        {
          id: 'late_night_taxi',
          category: 'transport' as const,
          nativeText: '심야 택시는 어디서 타요?',
          translation: {
            'en-US': 'Where do I catch a late-night taxi?',
            'zh-CN': '深夜出租车在哪里坐？',
          },
          romanization: 'Simya taeksineun eodiseo tayo?',
          audioKey: null,
        },
      ],
    }

    expect(validateRawPhraseCountryPack(partialAudioPack)).toEqual([])
  })

  it('ships valid country packs with valid phrase definitions', async () => {
    const packs = await getAllRawPhraseCountryPacks()
    const summaries = listRawPhraseCountrySummaries()
    expect(packs).toHaveLength(summaries.length)
    expect(new Set(packs.map((pack) => pack.slug)).size).toBe(packs.length)

    for (const pack of packs) {
      expect(validateRawPhraseCountryPack(pack)).toEqual([])
    }
  })

  it('syncs enhanced metadata across every country pack', async () => {
    const packs = await getAllRawPhraseCountryPacks()

    for (const pack of packs) {
      expect(pack.description?.['en-US']).toBeTruthy()
      expect(pack.description?.['zh-CN']).toBeTruthy()
      expect(pack.intro?.['en-US']).toBeTruthy()
      expect(pack.intro?.['zh-CN']).toBeTruthy()
      expect(pack.teaser?.['en-US']).toBeTruthy()
      expect(pack.teaser?.['zh-CN']).toBeTruthy()
      expect(pack.travelTips?.['en-US']?.length).toBeGreaterThan(0)
      expect(pack.travelTips?.['zh-CN']?.length).toBeGreaterThan(0)
      expect(pack.highlights?.['en-US']?.length).toBeGreaterThan(0)
      expect(pack.highlights?.['zh-CN']?.length).toBeGreaterThan(0)
      expect(typeof pack.featured).toBe('boolean')
      expect(pack.relatedSlugs?.length).toBeGreaterThan(0)
      expect(pack.faq?.length).toBeGreaterThan(0)
      expect(pack.faq?.[0]?.question?.['en-US']).toBeTruthy()
      expect(pack.faq?.[0]?.answer?.['zh-CN']).toBeTruthy()
    }
  })

  it('removes the original generated template copy from every country pack', async () => {
    const packs = await getAllRawPhraseCountryPacks()

    const genericSlugs = packs
      .filter((pack) =>
        GENERIC_INTRO.test(pack.intro?.['en-US'] ?? '')
        || GENERIC_TEASER.test(pack.teaser?.['en-US'] ?? '')
        || GENERIC_TIP.test(pack.travelTips?.['en-US']?.[0] ?? '')
        || GENERIC_FAQ_ANSWER.test(pack.faq?.[0]?.answer?.['en-US'] ?? ''),
      )
      .map((pack) => pack.slug)

    expect(genericSlugs).toEqual([])
  })

  it('localizes country packs for the active site locale', async () => {
    const englishPack = await getPhraseCountryPack('en-US', 'japan')
    const chinesePack = await getPhraseCountryPack('zh-CN', 'japan')
    const cambodiaPack = await getPhraseCountryPack('en-US', 'cambodia')
    const malaysiaPack = await getPhraseCountryPack('en-US', 'malaysia')
    const chinaPack = await getPhraseCountryPack('zh-CN', 'china')
    const uaePack = await getPhraseCountryPack('en-US', 'united-arab-emirates')

    expect(englishPack?.title).toBe('Japan Travel Phrases')
    expect(chinesePack?.title).toBe('日本旅行短语卡')
    expect(englishPack?.phrases.length).toBeGreaterThan(20)
    expect(englishPack?.audioCoverage).toBe('partial')
    expect(cambodiaPack?.audioCoverage).toBe('none')
    expect(malaysiaPack?.audioCoverage).toBe('all')
    expect(chinaPack?.audioCoverage).toBe('all')
    expect(cambodiaPack?.phrases.every((phrase) => phrase.audioKey === null)).toBe(true)
    expect(malaysiaPack?.phrases.every((phrase) => Boolean(phrase.audioKey))).toBe(true)
    expect(chinesePack?.phrases[0]?.translation).toBe('你好')
    expect(englishPack?.intro).toContain('rail stations')
    expect(chinesePack?.intro).toContain('礼貌')
    expect(englishPack?.travelTips.some((tip) => tip.includes('IC card'))).toBe(true)
    expect(englishPack?.extraPhrases.map((phrase) => phrase.id)).toContain('suica_ok')
    expect(englishPack?.extraPhrases[0]?.category).toBe('transport')
    expect(englishPack?.seoDescription).toContain('rail, restaurants, and convenience stores')
    expect(englishPack?.faq[0]?.question).toContain('Do I need')
    expect(englishPack?.faq[0]?.answer).toContain('English')
    expect(englishPack?.relatedCountries.map((country) => country.slug)).toContain('south-korea')
    expect(uaePack?.travelTips.some((tip) => tip.includes('Friday'))).toBe(true)
    expect(uaePack?.extraPhrases.map((phrase) => phrase.id)).toContain('family_section')
  })

  it('ships hand-authored localized landing-page copy for priority countries', async () => {
    const thailandPack = await getPhraseCountryPack('en-US', 'thailand')
    const koreaPack = await getPhraseCountryPack('en-US', 'south-korea')
    const singaporePack = await getPhraseCountryPack('en-US', 'singapore')
    const francePack = await getPhraseCountryPack('en-US', 'france')
    const italyPack = await getPhraseCountryPack('en-US', 'italy')
    const spainPack = await getPhraseCountryPack('en-US', 'spain')
    const summaries = listPhraseCountrySummaries('en-US')

    expect(thailandPack?.travelTips.some((tip) => tip.includes('BTS') || tip.includes('Grab'))).toBe(true)
    expect(koreaPack?.travelTips.some((tip) => tip.includes('T-money') || tip.includes('Naver Map'))).toBe(true)
    expect(singaporePack?.travelTips.some((tip) => tip.includes('hawker') || tip.includes('MRT'))).toBe(true)
    expect(francePack?.intro).toContain('SNCF')
    expect(italyPack?.travelTips.some((tip) => tip.includes('coperto') || tip.includes('Trenitalia'))).toBe(true)
    expect(spainPack?.travelTips.some((tip) => tip.includes('Renfe') || tip.includes('menu del dia'))).toBe(true)

    for (const slug of ['thailand', 'south-korea', 'singapore', 'france']) {
      expect(summaries.find((pack) => pack.slug === slug)?.featured).toBe(true)
    }

    for (const slug of ['italy', 'spain']) {
      expect(summaries.find((pack) => pack.slug === slug)?.featured).toBe(false)
    }

    expect(summaries.find((pack) => pack.slug === 'thailand')?.teaser).toContain('BTS')
    expect(summaries.find((pack) => pack.slug === 'south-korea')?.highlights).toContain('T-money and Kakao T')
    expect(summaries.find((pack) => pack.slug === 'singapore')?.highlights).toContain('Hawker centres and MRT')
    expect(summaries.find((pack) => pack.slug === 'france')?.highlights).toContain('SNCF and cafe etiquette')
    expect(summaries.find((pack) => pack.slug === 'italy')?.highlights).toContain('Trains, coperto, and coffee bar etiquette')
    expect(summaries.find((pack) => pack.slug === 'spain')?.highlights).toContain('Renfe, tapas timing, and menu del dia')
  })

  it('ships a third batch of country-specific copy without over-expanding featured packs', async () => {
    const malaysiaPack = await getPhraseCountryPack('en-US', 'malaysia')
    const vietnamPack = await getPhraseCountryPack('en-US', 'vietnam')
    const taiwanPack = await getPhraseCountryPack('en-US', 'taiwan')
    const hongKongPack = await getPhraseCountryPack('en-US', 'hong-kong')
    const germanyPack = await getPhraseCountryPack('en-US', 'germany')
    const portugalPack = await getPhraseCountryPack('en-US', 'portugal')
    const summaries = listPhraseCountrySummaries('en-US')

    expect(malaysiaPack?.travelTips.some((tip) => tip.includes("Touch 'n Go") || tip.includes('mamak'))).toBe(true)
    expect(vietnamPack?.travelTips.some((tip) => tip.includes('Grab') || tip.includes('sleeper bus'))).toBe(true)
    expect(taiwanPack?.travelTips.some((tip) => tip.includes('EasyCard') || tip.includes('night market'))).toBe(true)
    expect(hongKongPack?.travelTips.some((tip) => tip.includes('Octopus') || tip.includes('MTR'))).toBe(true)
    expect(germanyPack?.travelTips.some((tip) => tip.includes('DB') || tip.includes('cash'))).toBe(true)
    expect(portugalPack?.travelTips.some((tip) => tip.includes('tram') || tip.includes('Multibanco'))).toBe(true)

    for (const slug of ['malaysia', 'vietnam', 'taiwan', 'hong-kong', 'germany', 'portugal']) {
      expect(summaries.find((pack) => pack.slug === slug)?.featured).toBe(false)
    }

    expect(summaries.find((pack) => pack.slug === 'malaysia')?.highlights).toContain("Touch 'n Go and mamak stops")
    expect(summaries.find((pack) => pack.slug === 'vietnam')?.highlights).toContain('Grab, sleeper buses, and street-food basics')
    expect(summaries.find((pack) => pack.slug === 'taiwan')?.highlights).toContain('EasyCard, TRA, and night markets')
    expect(summaries.find((pack) => pack.slug === 'hong-kong')?.highlights).toContain('Octopus, MTR, and cha chaan teng orders')
    expect(summaries.find((pack) => pack.slug === 'germany')?.highlights).toContain('DB trains, cash questions, and bakery stops')
    expect(summaries.find((pack) => pack.slug === 'portugal')?.highlights).toContain('Trams, Multibanco, and cafe counters')
  })

  it('expands every country pack beyond the old shared 42-phrase inventory', () => {
    const summaries = listRawPhraseCountrySummaries()
    for (const summary of summaries) {
      expect(summary.phraseCount).toBeGreaterThanOrEqual(54)
    }
    expect(new Set(summaries.map((summary) => summary.phraseCount)).size).toBeGreaterThanOrEqual(3)
  })

  it('ships a lightweight country index for summaries', () => {
    const summaries = listRawPhraseCountrySummaries()
    const localizedSummaries = listPhraseCountrySummaries('en-US')
    const featuredSummaries = selectFeaturedPhraseCountrySummaries(localizedSummaries)
    const featuredJapan = localizedSummaries.find((pack) => pack.slug === 'japan')
    expect(new Set(summaries.map((pack) => pack.slug)).size).toBe(summaries.length)
    expect(summaries.some((pack) => pack.slug === 'china' && pack.phraseCount > 20)).toBe(true)
    expect(summaries.some((pack) => pack.slug === 'malaysia' && pack.audioCoverage === 'all')).toBe(true)
    expect(summaries.some((pack) => pack.slug === 'japan' && pack.audioCoverage === 'partial')).toBe(true)
    expect(summaries.some((pack) => pack.slug === 'cambodia' && pack.audioCoverage === 'none')).toBe(true)
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
    expect(summaries.some((pack) => pack.slug === 'china' && pack.featured === true)).toBe(true)
    expect(featuredSummaries.map((pack) => pack.slug)).toEqual(FEATURED_COUNTRY_SLUGS)
    expect(localizedSummaries.filter((pack) => pack.featured)).toHaveLength(FEATURED_COUNTRY_SLUGS.length)
    expect(new Set(localizedSummaries.filter((pack) => pack.featured).map((pack) => pack.slug))).toEqual(new Set(FEATURED_COUNTRY_SLUGS))
    expect(featuredJapan?.featured).toBe(true)
    expect(featuredJapan?.teaser).toContain('rail')
    expect(featuredJapan?.highlights).toContain('IC cards')
  })
})
