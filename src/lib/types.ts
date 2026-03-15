export type Locale = 'zh-CN' | 'en-US'
export type SiteTheme = 'light' | 'dark' | 'system'
export type PhraseCategory = 'basics' | 'transport' | 'hotel' | 'dining' | 'shopping' | 'emergency'
export type PhraseRegion = 'asia' | 'europe' | 'americas' | 'africa' | 'middle-east' | 'oceania'
export type PhraseAudioCoverage = 'all' | 'partial' | 'none'

export type ToolDefinition = {
  id: string
  slug: 'currency' | 'split-bill' | 'travel-phrases'
  nameKey: string
  descriptionKey: string
  entryPath: string
}

export interface PhraseCard {
  id: string
  category: PhraseCategory
  nativeText: string
  translation: string
  romanization: string | null
  audioKey: string | null
}

export interface PhraseFaqItem {
  question: string
  answer: string
}

export interface PhraseCountryPack {
  country: string
  slug: string
  region: PhraseRegion
  languageName: string
  languageCode: string
  flag: string
  title: string
  description: string
  seoDescription: string
  seoKeywords: string[]
  teaser: string
  intro: string
  travelTips: string[]
  audioCoverage: PhraseAudioCoverage
  phrases: PhraseCard[]
  extraPhrases: PhraseCard[]
  faq: PhraseFaqItem[]
  relatedCountries: PhraseCountrySummary[]
}

export interface PhraseCountrySummary {
  country: string
  slug: string
  region: PhraseRegion
  languageName: string
  languageCode: string
  flag: string
  title: string
  description: string
  teaser: string
  highlights: string[]
  featured: boolean
  phraseCount: number
  audioCoverage: PhraseAudioCoverage
}

export interface DeviceIdentity {
  deviceId: string
  displayName: string
}

export interface Trip {
  id: string
  name: string
  expenseCurrency: string
  settlementCurrency: string
  splitCount: number
  baseCurrency: string
  createdAt: string
  updatedAt: string
}

export interface Member {
  id: string
  tripId: string
  displayName: string
  deviceId: string | null
  isOwner: boolean
  joinedAt: string
}

export interface Expense {
  id: string
  tripId: string
  creatorDeviceId: string
  title: string
  note: string | null
  amountOriginal: number
  originalCurrency: string
  fxRateToBase: number
  amountBase: number
  splitCount: number
  spentAt: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface TripSnapshot {
  trip: Trip
  members: Member[]
  expenses: Expense[]
  cursor: string
}

export interface SettlementTransfer {
  fromMemberId: string
  toMemberId: string
  amountBase: number
}

export interface ExpenseConversionRow {
  expenseId: string
  title: string
  spentAt: string
  originalAmount: number
  originalCurrency: string
  fxRateToSettlement: number
  settlementAmount: number
}

export interface SettlementResponse {
  balances: Array<{ memberId: string; paid: number; owed: number; net: number }>
  transfers: SettlementTransfer[]
  summaryText: string
  currencySummary: {
    expenseCurrency: string
    settlementCurrency: string
  }
  expenseConversions: ExpenseConversionRow[]
}

export interface FxRatesResponse {
  base: string
  date: string
  rates: Record<string, number>
  updatedAt: string
  source?: 'openexchangerates' | 'frankfurter'
  cached?: boolean
  stale?: boolean
}

export interface FxDetectResponse {
  country: string
  currency: string
  name: string
  flag: string
  symbol: string
  tz: string
  tzCurrency: string | null
  detectedVia: 'timezone' | 'ip'
}
