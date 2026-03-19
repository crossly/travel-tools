import type { PhraseRegion } from '@/lib/types'

export type VisaEntrySourceKind = 'visa' | 'immigration' | 'customs' | 'health' | 'arrival'

export type VisaEntrySource = {
  kind: VisaEntrySourceKind
  label: string
  href: string
}

export type VisaEntryCountryRecord = {
  slug: string
  country: string
  region: PhraseRegion
  flag: string
  lastReviewed: string
  specialFlow: string
  entryOverview: string
  commonEntryPaths: string[]
  arrivalCard: string
  customsDeclaration: string
  healthDeclaration: string
  officialSources: VisaEntrySource[]
}
