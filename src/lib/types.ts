export type Locale = 'zh-CN' | 'en-US'
export type SiteTheme = 'light' | 'dark' | 'system'
export type PhraseCategory = 'basics' | 'transport' | 'hotel' | 'dining' | 'shopping' | 'emergency'
export type PhraseRegion = 'asia' | 'europe' | 'americas' | 'africa' | 'middle-east' | 'oceania'
export type PhraseAudioCoverage = 'all' | 'partial' | 'none'
export type PackingSectionId = 'documents' | 'clothing' | 'toiletries' | 'electronics' | 'medicine' | 'misc'
export type JetLagIntensity = 'light' | 'moderate' | 'heavy'
export type JetLagDirection = 'east' | 'west' | 'same'
export type JetLagLightTiming = 'morning' | 'afternoon' | 'balanced'
export type LocalAppCategoryId =
  | 'ride-hailing'
  | 'maps'
  | 'payments'
  | 'shopping'
  | 'food-discovery'
  | 'food-delivery'
  | 'stays'
export type LocalAppPlatformId = 'official' | 'ios' | 'android'

export type ToolDefinition = {
  id: string
  slug: 'currency' | 'split-bill' | 'travel-phrases' | 'packing-list' | 'jet-lag' | 'local-apps'
  nameKey: string
  entryPath: string
}

export interface PackingItem {
  id: string
  label: string
  builtinKey: string | null
  quantity: number
  checked: boolean
  note: string
  builtIn: boolean
}

export interface PackingSection {
  id: PackingSectionId
  items: PackingItem[]
}

export interface PackingList {
  id: string
  name: string
  templateId: string
  createdAt: string
  updatedAt: string
  sections: PackingSection[]
}

export interface PackingTemplate {
  id: string
  nameKey: string
  descriptionKey: string
}

export interface JetLagPrefs {
  originTimeZone: string
  destinationTimeZone: string
  departureAt: string
  arrivalAt: string
  intensity: JetLagIntensity
}

export interface JetLagTimezoneOption {
  value: string
  label: string
}

export interface JetLagPlan {
  selectedIntensity: JetLagIntensity
  recommendedIntensity: JetLagIntensity
  direction: JetLagDirection
  lightTiming: JetLagLightTiming
  hourDifference: number
  flightDurationHours: number
  recoveryDays: number
  arrivalLocalHour: number
  sleepAnchorHour: number
  napCutoffHour: number
  napMinutes: number
  caffeineDelayHours: number
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

export interface LocalAppPlatformLink {
  platform: LocalAppPlatformId
  url: string
}

export interface LocalAppRecommendation {
  id: string
  name: string
  summary: string
  reason: string
  recommended: boolean
  links: LocalAppPlatformLink[]
}

export interface LocalAppCategory {
  id: LocalAppCategoryId
  summary: string
  apps: LocalAppRecommendation[]
}

export interface LocalAppCountrySummary {
  country: string
  slug: string
  region: PhraseRegion
  flag: string
  ready: boolean
  title: string
  description: string
  highlights: string[]
  categoryIds: LocalAppCategoryId[]
  categoryCount: number
  appCount: number
}

export interface LocalAppGuide {
  country: string
  slug: string
  region: PhraseRegion
  flag: string
  title: string
  description: string
  intro: string
  highlights: string[]
  categoryCount: number
  appCount: number
  categories: LocalAppCategory[]
  cautions: string[]
  relatedCountries: LocalAppCountrySummary[]
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
