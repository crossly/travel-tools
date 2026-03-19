import type { PhraseRegion } from '@/lib/types'

export type TippingTone = 'no-tip' | 'round-up' | 'customary' | 'mixed'

export interface TippingCountryProfile {
  slug: string
  countryCode: string
  region: PhraseRegion
  tone: TippingTone
  reviewedAt: string
}

export const TIPPING_REGIONS: Array<'all' | PhraseRegion> = [
  'all',
  'asia',
  'europe',
  'americas',
  'africa',
  'middle-east',
  'oceania',
]

export const TIPPING_COUNTRIES = [
  { slug: 'cambodia', countryCode: 'KH', region: 'asia', tone: 'mixed', reviewedAt: '2026-03-19' },
  { slug: 'china', countryCode: 'CN', region: 'asia', tone: 'no-tip', reviewedAt: '2026-03-19' },
  { slug: 'hong-kong', countryCode: 'HK', region: 'asia', tone: 'no-tip', reviewedAt: '2026-03-19' },
  { slug: 'india', countryCode: 'IN', region: 'asia', tone: 'customary', reviewedAt: '2026-03-19' },
  { slug: 'indonesia', countryCode: 'ID', region: 'asia', tone: 'mixed', reviewedAt: '2026-03-19' },
  { slug: 'japan', countryCode: 'JP', region: 'asia', tone: 'no-tip', reviewedAt: '2026-03-19' },
  { slug: 'malaysia', countryCode: 'MY', region: 'asia', tone: 'mixed', reviewedAt: '2026-03-19' },
  { slug: 'philippines', countryCode: 'PH', region: 'asia', tone: 'customary', reviewedAt: '2026-03-19' },
  { slug: 'singapore', countryCode: 'SG', region: 'asia', tone: 'no-tip', reviewedAt: '2026-03-19' },
  { slug: 'south-korea', countryCode: 'KR', region: 'asia', tone: 'no-tip', reviewedAt: '2026-03-19' },
  { slug: 'taiwan', countryCode: 'TW', region: 'asia', tone: 'no-tip', reviewedAt: '2026-03-19' },
  { slug: 'thailand', countryCode: 'TH', region: 'asia', tone: 'mixed', reviewedAt: '2026-03-19' },
  { slug: 'vietnam', countryCode: 'VN', region: 'asia', tone: 'mixed', reviewedAt: '2026-03-19' },
  { slug: 'turkey', countryCode: 'TR', region: 'middle-east', tone: 'mixed', reviewedAt: '2026-03-19' },
  { slug: 'united-arab-emirates', countryCode: 'AE', region: 'middle-east', tone: 'mixed', reviewedAt: '2026-03-19' },
  { slug: 'austria', countryCode: 'AT', region: 'europe', tone: 'round-up', reviewedAt: '2026-03-19' },
  { slug: 'france', countryCode: 'FR', region: 'europe', tone: 'round-up', reviewedAt: '2026-03-19' },
  { slug: 'germany', countryCode: 'DE', region: 'europe', tone: 'round-up', reviewedAt: '2026-03-19' },
  { slug: 'greece', countryCode: 'GR', region: 'europe', tone: 'round-up', reviewedAt: '2026-03-19' },
  { slug: 'italy', countryCode: 'IT', region: 'europe', tone: 'round-up', reviewedAt: '2026-03-19' },
  { slug: 'netherlands', countryCode: 'NL', region: 'europe', tone: 'round-up', reviewedAt: '2026-03-19' },
  { slug: 'portugal', countryCode: 'PT', region: 'europe', tone: 'round-up', reviewedAt: '2026-03-19' },
  { slug: 'spain', countryCode: 'ES', region: 'europe', tone: 'round-up', reviewedAt: '2026-03-19' },
  { slug: 'switzerland', countryCode: 'CH', region: 'europe', tone: 'round-up', reviewedAt: '2026-03-19' },
  { slug: 'argentina', countryCode: 'AR', region: 'americas', tone: 'customary', reviewedAt: '2026-03-19' },
  { slug: 'brazil', countryCode: 'BR', region: 'americas', tone: 'customary', reviewedAt: '2026-03-19' },
  { slug: 'canada', countryCode: 'CA', region: 'americas', tone: 'customary', reviewedAt: '2026-03-19' },
  { slug: 'chile', countryCode: 'CL', region: 'americas', tone: 'customary', reviewedAt: '2026-03-19' },
  { slug: 'colombia', countryCode: 'CO', region: 'americas', tone: 'customary', reviewedAt: '2026-03-19' },
  { slug: 'costa-rica', countryCode: 'CR', region: 'americas', tone: 'customary', reviewedAt: '2026-03-19' },
  { slug: 'mexico', countryCode: 'MX', region: 'americas', tone: 'customary', reviewedAt: '2026-03-19' },
  { slug: 'peru', countryCode: 'PE', region: 'americas', tone: 'customary', reviewedAt: '2026-03-19' },
  { slug: 'united-states', countryCode: 'US', region: 'americas', tone: 'customary', reviewedAt: '2026-03-19' },
  { slug: 'egypt', countryCode: 'EG', region: 'africa', tone: 'mixed', reviewedAt: '2026-03-19' },
  { slug: 'kenya', countryCode: 'KE', region: 'africa', tone: 'mixed', reviewedAt: '2026-03-19' },
  { slug: 'mauritius', countryCode: 'MU', region: 'africa', tone: 'mixed', reviewedAt: '2026-03-19' },
  { slug: 'morocco', countryCode: 'MA', region: 'africa', tone: 'mixed', reviewedAt: '2026-03-19' },
  { slug: 'south-africa', countryCode: 'ZA', region: 'africa', tone: 'mixed', reviewedAt: '2026-03-19' },
  { slug: 'tanzania', countryCode: 'TZ', region: 'africa', tone: 'mixed', reviewedAt: '2026-03-19' },
  { slug: 'australia', countryCode: 'AU', region: 'oceania', tone: 'no-tip', reviewedAt: '2026-03-19' },
  { slug: 'new-zealand', countryCode: 'NZ', region: 'oceania', tone: 'no-tip', reviewedAt: '2026-03-19' },
] as const satisfies readonly TippingCountryProfile[]

