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

export type TippingCopy = Record<Locale, string>

export type TippingSource = {
  label: TippingCopy
  href: string
}

export type TippingCountryDefinition = {
  slug: string
  countryCode: string
  region: PhraseRegion
  flag: string
  title: TippingCopy
  description: TippingCopy
  headlineRule: TippingCopy
  rules: Record<TippingCategoryId, TippingCopy>
  notes: TippingCopy[]
  sources: TippingSource[]
  lastReviewed: string
}

export function copy(zh: string, en: string): TippingCopy {
  return {
    'zh-CN': zh,
    'en-US': en,
  }
}

export function source(labelZh: string, labelEn: string, href: string): TippingSource {
  return {
    label: copy(labelZh, labelEn),
    href,
  }
}

export function defineTippingCountry(country: TippingCountryDefinition) {
  return country
}
