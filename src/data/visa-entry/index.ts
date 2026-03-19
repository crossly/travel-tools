import type { VisaEntryCountryRecord } from './types'

const countryModules = import.meta.glob('./countries/*.ts', { eager: true }) as Record<string, { default: VisaEntryCountryRecord }>

export const VISA_ENTRY_DESTINATIONS = Object.values(countryModules)
  .map((module) => module.default)
  .sort((left, right) => {
    if (left.region !== right.region) {
      return left.region.localeCompare(right.region)
    }

    return left.country.localeCompare(right.country)
  })

export type { VisaEntryCountryRecord, VisaEntrySource, VisaEntrySourceKind } from './types'
