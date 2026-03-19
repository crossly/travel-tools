import { TIPPING_COUNTRIES, TIPPING_REGIONS, type TippingCountryProfile, type TippingTone } from '@/data/tipping'
import type { Locale, PhraseRegion } from '@/lib/types'

export type TippingCategoryId =
  | 'restaurant'
  | 'cafe'
  | 'bar'
  | 'taxi'
  | 'hotel'
  | 'guide'
  | 'porter'
  | 'delivery'

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

export { TIPPING_REGIONS }

export interface TippingCountrySummary {
  country: string
  slug: string
  region: PhraseRegion
  flag: string
  title: string
  description: string
  headlineRule: string
  reviewedAt: string
}

export interface TippingCountryPack extends TippingCountrySummary {
  rules: Record<TippingCategoryId, string>
  notes: string[]
  verificationNote: string
}

type LocalizedCopy = Record<Locale, string>

const COUNTRY_NAME_FORMATTERS = new Map<Locale, Intl.DisplayNames>()
const COUNTRY_SUMMARY_CACHE = new Map<string, TippingCountrySummary[]>()
const COUNTRY_PACK_CACHE = new Map<string, TippingCountryPack | null>()

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

function copy(locale: Locale, zh: string, en: string) {
  return locale === 'zh-CN' ? zh : en
}

function buildHeadlineRule(locale: Locale, country: string, tone: TippingTone) {
  const copyMap: Record<TippingTone, LocalizedCopy> = {
    'no-tip': {
      'zh-CN': `{country} 通常不需要小费。`,
      'en-US': `Tipping is usually not expected in {country}.`,
    },
    'round-up': {
      'zh-CN': `在 {country}，四舍五入通常就够了。`,
      'en-US': `Rounding up is usually enough in {country}.`,
    },
    customary: {
      'zh-CN': `{country} 常见少量现金小费。`,
      'en-US': `Small cash tips are common in {country}.`,
    },
    mixed: {
      'zh-CN': `先看账单；{country} 的小费习惯会因场景而异。`,
      'en-US': `Check the bill first; tipping in {country} depends on the setting.`,
    },
  }

  return copyMap[tone][locale].replace('{country}', country)
}

function buildDescription(locale: Locale, country: string, tone: TippingTone) {
  if (tone === 'no-tip') {
    return copy(locale, `${country} 的小费速查。`, `Quick tipping guidance for ${country}.`)
  }

  if (tone === 'round-up') {
    return copy(locale, `${country} 通常只要四舍五入或留少量零钱。`, `Rounding up or leaving a small amount is usually enough in ${country}.`)
  }

  if (tone === 'customary') {
    return copy(locale, `${country} 常见少量现金小费。`, `Small cash tips are common in ${country}.`)
  }

  return copy(locale, `${country} 的小费习惯会因场景而异。`, `Tipping in ${country} depends on the setting.`)
}

function buildCategoryRule(locale: Locale, country: string, tone: TippingTone, category: TippingCategoryId) {
  const templates: Record<TippingTone, Record<TippingCategoryId, LocalizedCopy>> = {
    'no-tip': {
      restaurant: {
        'zh-CN': `通常不用给；如果服务特别好，可四舍五入或留一点零钱。`,
        'en-US': `Usually not required; round up or leave a small amount only when service stands out.`,
      },
      cafe: {
        'zh-CN': `咖啡馆一般不用给，留零钱即可。`,
        'en-US': `Usually not expected in cafes; keeping the change is fine.`,
      },
      bar: {
        'zh-CN': `酒吧多半不用给，点单时直接按账单结算就行。`,
        'en-US': `Bars usually do not expect tips; paying the bill is enough.`,
      },
      taxi: {
        'zh-CN': `出租车通常不用额外给，只有特别帮忙时再考虑四舍五入。`,
        'en-US': `Taxis usually do not expect extra tip; round up only if needed.`,
      },
      hotel: {
        'zh-CN': `酒店小费通常只在行李、门童等特别服务时出现。`,
        'en-US': `Hotel tips are usually limited to luggage or standout service.`,
      },
      guide: {
        'zh-CN': `导游或包车服务若帮你省了很多时间，可留少量现金表示感谢。`,
        'en-US': `For guides or private drivers, a small cash thank-you is a reasonable gesture.`,
      },
      porter: {
        'zh-CN': `行李员若提供帮助，少量现金即可。`,
        'en-US': `A small cash thank-you is enough for porters.`,
      },
      delivery: {
        'zh-CN': `外卖或送餐一般不用额外给。`,
        'en-US': `Delivery usually does not require an extra tip.`,
      },
    },
    'round-up': {
      restaurant: {
        'zh-CN': `先看账单，通常四舍五入或留 5% 左右就够了。`,
        'en-US': `Check the bill first; rounding up or leaving about 5% is usually enough.`,
      },
      cafe: {
        'zh-CN': `咖啡馆多半只需四舍五入。`,
        'en-US': `Cafes usually only need a small round-up.`,
      },
      bar: {
        'zh-CN': `酒吧一般四舍五入即可。`,
        'en-US': `Bars usually only need a round-up.`,
      },
      taxi: {
        'zh-CN': `出租车可直接凑整，通常不用多给。`,
        'en-US': `Taxis can usually be rounded up without more.`,
      },
      hotel: {
        'zh-CN': `酒店服务若比较到位，少量零钱即可。`,
        'en-US': `A small coin tip is enough when hotel service feels extra helpful.`,
      },
      guide: {
        'zh-CN': `导游服务若连续一整天，少量现金比大额更常见。`,
        'en-US': `For guides, a small cash tip is more typical than a large amount.`,
      },
      porter: {
        'zh-CN': `行李员通常给少量零钱即可。`,
        'en-US': `Porters usually only need a small coin tip.`,
      },
      delivery: {
        'zh-CN': `送餐和外卖通常只要四舍五入。`,
        'en-US': `Delivery usually only needs a round-up.`,
      },
    },
    customary: {
      restaurant: {
        'zh-CN': `通常会留 10% 左右；先看账单有没有服务费。`,
        'en-US': `About 10% is common; check the bill for a service charge first.`,
      },
      cafe: {
        'zh-CN': `咖啡馆若是桌边服务，留少量现金会比较自然。`,
        'en-US': `For table service, a small cash tip is usually fine.`,
      },
      bar: {
        'zh-CN': `吧台若有调酒或桌边服务，可留一点现金。`,
        'en-US': `For bar service, a small cash tip is usually appreciated.`,
      },
      taxi: {
        'zh-CN': `出租车可四舍五入，长距离或特别帮忙时再多留一点。`,
        'en-US': `Round up for taxis, and add a little more for longer rides or extra help.`,
      },
      hotel: {
        'zh-CN': `酒店行李和客房服务常会给少量现金。`,
        'en-US': `Hotel porters and housekeeping often get a small cash tip.`,
      },
      guide: {
        'zh-CN': `导游通常会给更明确的小费；按半天或全天服务来加。`,
        'en-US': `Guides often expect a clearer cash tip, usually scaled to half-day or full-day service.`,
      },
      porter: {
        'zh-CN': `行李员通常给少量现金表示感谢。`,
        'en-US': `A small cash tip is common for porters.`,
      },
      delivery: {
        'zh-CN': `外卖或送餐通常给少量现金或四舍五入。`,
        'en-US': `Delivery usually gets a small cash tip or a round-up.`,
      },
    },
    mixed: {
      restaurant: {
        'zh-CN': `先看账单；多数场景四舍五入就够，服务很好的地方可留少量现金。`,
        'en-US': `Check the bill first; round up in most places and leave a small cash tip when service stands out.`,
      },
      cafe: {
        'zh-CN': `咖啡馆通常不用多给，零钱或四舍五入即可。`,
        'en-US': `Cafes usually only need a small round-up or change left behind.`,
      },
      bar: {
        'zh-CN': `酒吧看服务场景，通常少量现金就够。`,
        'en-US': `Bars usually only need a small cash tip depending on the service style.`,
      },
      taxi: {
        'zh-CN': `出租车可直接凑整，特别服务时再多给一点。`,
        'en-US': `Taxis can usually be rounded up, with a little extra for standout help.`,
      },
      hotel: {
        'zh-CN': `酒店服务可视情况给少量现金。`,
        'en-US': `Hotel service can usually be tipped with a small cash amount when appropriate.`,
      },
      guide: {
        'zh-CN': `导游或司机若陪你一整天，少量现金很常见。`,
        'en-US': `For full-day guides or drivers, a small cash tip is common.`,
      },
      porter: {
        'zh-CN': `行李员一般给少量零钱即可。`,
        'en-US': `Porters usually only need a small coin tip.`,
      },
      delivery: {
        'zh-CN': `外卖或送餐可四舍五入；看当地习惯再补一点。`,
        'en-US': `Delivery can usually be rounded up, with a little extra depending on local custom.`,
      },
    },
  }

  return templates[tone][category][locale].replace('{country}', country)
}

function buildNotes(locale: Locale, tone: TippingTone) {
  const notes: LocalizedCopy[] = tone === 'no-tip'
    ? [
        {
          'zh-CN': '先看账单里有没有服务费或小费栏。',
          'en-US': 'Check whether service charge or a tip line is already included.',
        },
        {
          'zh-CN': '零星零钱比大额现金更自然。',
          'en-US': 'Small change usually feels more natural than a large bill.',
        },
      ]
    : tone === 'round-up'
      ? [
          {
            'zh-CN': '四舍五入通常就够。',
            'en-US': 'Rounding up is usually enough.',
          },
          {
            'zh-CN': '先看账单是否已经含服务费。',
            'en-US': 'Check whether the bill already includes a service charge.',
          },
        ]
      : tone === 'customary'
        ? [
            {
              'zh-CN': '现金小费更稳。',
              'en-US': 'Cash is usually the safest tip format.',
            },
            {
              'zh-CN': '先确认账单有没有已经包含服务费。',
              'en-US': 'Check the bill first in case service charge is already included.',
            },
          ]
        : [
            {
              'zh-CN': '先看账单再决定给不给。',
              'en-US': 'Check the bill before deciding whether to tip.',
            },
            {
              'zh-CN': '场景不同，习惯也会不同。',
              'en-US': 'The expectation changes with the setting.',
            },
          ]

  return notes.map((item) => item[locale])
}

function buildVerificationNote(locale: Locale, reviewedAt: string) {
  return copy(
    locale,
    `这是一份快速速查，最后更新时间 ${reviewedAt}。高价餐厅、包车和特殊场景请以当地说明为准。`,
    `This is a quick lookup, last reviewed on ${reviewedAt}. Check local guidance for premium dining, private drivers, or special cases.`,
  )
}

function buildCountryTitle(locale: Locale, country: string) {
  return copy(locale, `${country} 小费速查`, `Tipping in ${country}`)
}

function buildCountryDescription(locale: Locale, country: string, tone: TippingTone) {
  return copy(
    locale,
    tone === 'no-tip'
      ? `${country} 的小费速查，适合付款前快速看一眼。`
      : `${country} 的小费速查，适合付款前快速看一眼。`,
    `Quick tipping guidance for ${country}, designed for a fast check before you pay.`,
  )
}

function buildSummary(locale: Locale, profile: TippingCountryProfile): TippingCountrySummary {
  const country = getCountryName(locale, profile.countryCode)

  return {
    country,
    slug: profile.slug,
    region: profile.region,
    flag: getCountryFlag(profile.countryCode),
    title: buildCountryTitle(locale, country),
    description: buildCountryDescription(locale, country, profile.tone),
    headlineRule: buildHeadlineRule(locale, country, profile.tone),
    reviewedAt: profile.reviewedAt,
  }
}

function buildPack(locale: Locale, profile: TippingCountryProfile): TippingCountryPack {
  const summary = buildSummary(locale, profile)

  return {
    ...summary,
    rules: TIPPING_CATEGORY_IDS.reduce((rules, category) => {
      rules[category] = buildCategoryRule(locale, summary.country, profile.tone, category)
      return rules
    }, {} as Record<TippingCategoryId, string>),
    notes: buildNotes(locale, profile.tone),
    verificationNote: buildVerificationNote(locale, profile.reviewedAt),
  }
}

export function listTippingCountrySummaries(locale: Locale, region: PhraseRegion | 'all' = 'all') {
  return TIPPING_COUNTRIES
    .filter((profile) => region === 'all' || profile.region === region)
    .map((profile) => buildSummary(locale, profile))
}

export function getTippingCountryPack(locale: Locale, slug: string) {
  const cacheKey = `${locale}:${slug}`
  if (COUNTRY_PACK_CACHE.has(cacheKey)) {
    return COUNTRY_PACK_CACHE.get(cacheKey) ?? null
  }

  const profile = TIPPING_COUNTRIES.find((item) => item.slug === slug)
  if (!profile) {
    COUNTRY_PACK_CACHE.set(cacheKey, null)
    return null
  }

  const pack = buildPack(locale, profile)
  COUNTRY_PACK_CACHE.set(cacheKey, pack)
  return pack
}

export function validateTippingCountryRegistry() {
  const errors: string[] = []
  const seen = new Set<string>()

  for (const profile of TIPPING_COUNTRIES) {
    if (seen.has(profile.slug)) {
      errors.push(`duplicate tipping slug "${profile.slug}"`)
    }
    seen.add(profile.slug)

    if (!TIPPING_REGIONS.includes(profile.region)) {
      errors.push(`${profile.slug}: invalid region "${profile.region}"`)
    }

    if (!profile.countryCode || profile.countryCode.length !== 2) {
      errors.push(`${profile.slug}: invalid country code`)
    }

    if (!profile.reviewedAt) {
      errors.push(`${profile.slug}: missing reviewedAt`)
    }
  }

  if (TIPPING_COUNTRIES.length !== 41) {
    errors.push(`expected 41 tipping destinations, received ${TIPPING_COUNTRIES.length}`)
  }

  return errors
}
