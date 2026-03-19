import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "philippines",
  "country": "Philippines",
  "region": "asia",
  "flag": "🇵🇭",
  "lastReviewed": "2026-03-19",
  "specialFlow": "eTravel",
  "entryOverview": "Philippines splits the traveler flow across Bureau of Immigration, Philippine eTravel, and Bureau of Customs. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Bureau of Immigration handles the official entry rules.",
    "Bureau of Customs handles declaration thresholds and traveler reporting.",
    "A separate health declaration is not typically required for routine tourist visits."
  ],
  "arrivalCard": "Philippine eTravel is the place to check any pre-arrival form or arrival-card step.",
  "customsDeclaration": "Bureau of Customs is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "arrival",
      "label": "Philippine eTravel",
      "href": "https://etravel.gov.ph/"
    },
    {
      "kind": "immigration",
      "label": "Bureau of Immigration",
      "href": "https://immigration.gov.ph/"
    },
    {
      "kind": "customs",
      "label": "Bureau of Customs",
      "href": "https://customs.gov.ph/"
    }
  ]
}

export default country
