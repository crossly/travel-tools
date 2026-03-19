import { describe, expect, it } from 'vitest'

describe('tipping library', () => {
  it('tracks the same 41 destination countries as the travel phrases roster', async () => {
    const { listTippingCountrySummaries, validateTippingCountryRegistry } = await import('@/lib/tipping')

    const summaries = listTippingCountrySummaries('en-US')

    expect(summaries).toHaveLength(41)
    expect(summaries.map((summary) => summary.slug)).toContain('japan')
    expect(summaries.map((summary) => summary.slug)).toContain('new-zealand')
    expect(validateTippingCountryRegistry()).toEqual([])
  })

  it('returns localized country packs with source-backed content for a known destination', async () => {
    const { getTippingCountryPack } = await import('@/lib/tipping')

    const pack = getTippingCountryPack('zh-CN', 'japan')

    expect(pack?.country).toBe('日本')
    expect(pack?.region).toBe('asia')
    expect(pack?.lastReviewed).toBeTruthy()
    expect(pack?.sources.length).toBe(2)
    expect(pack?.sources[0].href).toContain('wikivoyage')
    expect(pack?.sources[1].href).toContain('worldtravelguide')
    expect(pack?.rules.restaurant).toBeTruthy()
    expect(pack?.notes.length).toBeGreaterThan(0)
  })

  it('rejects weak source coverage and template-like repetition', async () => {
    const { copy, defineTippingCountry, source } = await import('@/data/tipping')
    const { validateTippingCountryDefinitions } = await import('@/lib/tipping')

    const weakCountry = defineTippingCountry({
      slug: 'weakland',
      countryCode: 'JP',
      region: 'asia',
      flag: '🇯🇵',
      title: copy('弱样本小费速查', 'Weak sample tipping'),
      description: copy('这里是一个手工样本。', 'This is a hand-written sample.'),
      headlineRule: copy('这里是一个手工样本。', 'This is a hand-written sample.'),
      rules: {
        restaurant: copy('这里是一个手工样本。', 'This is a hand-written sample.'),
        cafe: copy('这里是一个手工样本。', 'This is a hand-written sample.'),
        bar: copy('这里是一个手工样本。', 'This is a hand-written sample.'),
        taxi: copy('这里是一个手工样本。', 'This is a hand-written sample.'),
        hotel: copy('这里是一个手工样本。', 'This is a hand-written sample.'),
        guide: copy('这里是一个手工样本。', 'This is a hand-written sample.'),
        porter: copy('这里是一个手工样本。', 'This is a hand-written sample.'),
        delivery: copy('这里是一个手工样本。', 'This is a hand-written sample.'),
      },
      notes: [copy('这里是一个手工样本。', 'This is a hand-written sample.')],
      sources: [
        source('Wikivoyage：日本', 'Wikivoyage: Japan', 'https://en.wikivoyage.org/wiki/Japan'),
      ],
      lastReviewed: '2026-03-19',
    })

    const templatedA = defineTippingCountry({
      slug: 'templated-a',
      countryCode: 'JP',
      region: 'asia',
      flag: '🇯🇵',
      title: copy('示例小费速查', 'Sample tipping'),
      description: copy('这是一个用于测试的通用条目。', 'This is a generic test entry.'),
      headlineRule: copy('这是一个用于测试的通用结论。', 'This is a generic test conclusion.'),
      rules: {
        restaurant: copy('这是一个用于测试的通用建议。', 'This is a generic restaurant suggestion.'),
        cafe: copy('这是一个用于测试的通用建议。', 'This is a generic cafe suggestion.'),
        bar: copy('这是一个用于测试的通用建议。', 'This is a generic bar suggestion.'),
        taxi: copy('这是一个用于测试的通用建议。', 'This is a generic taxi suggestion.'),
        hotel: copy('这是一个用于测试的通用建议。', 'This is a generic hotel suggestion.'),
        guide: copy('这是一个用于测试的通用建议。', 'This is a generic guide suggestion.'),
        porter: copy('这是一个用于测试的通用建议。', 'This is a generic porter suggestion.'),
        delivery: copy('这是一个用于测试的通用建议。', 'This is a generic delivery suggestion.'),
      },
      notes: [
        copy('这是一个用于测试的通用备注。', 'This is a generic test note.'),
        copy('这是一个用于测试的通用备注。', 'This is a generic test note.'),
      ],
      sources: [
        source('Wikivoyage：日本', 'Wikivoyage: Japan', 'https://en.wikivoyage.org/wiki/Japan'),
        source('World Travel Guide：日本', 'World Travel Guide: Japan', 'https://www.worldtravelguide.net/guides/asia/japan/'),
      ],
      lastReviewed: '2026-03-19',
    })

    const weakErrors = validateTippingCountryDefinitions([weakCountry])
    const templatedErrors = validateTippingCountryDefinitions([templatedA])

    expect(weakErrors).toContain('weakland: expected at least 2 sources')
    expect(weakErrors).toContain('weakland: missing World Travel Guide source')
    expect(templatedErrors).toContain('templated-a: template-like repetition detected')
  })
})
