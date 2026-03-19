import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "egypt",
  "country": "Egypt",
  "region": "africa",
  "flag": "🇪🇬",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Egypt eVisa and entry notices",
  "entryOverview": "For Egypt, the practical route is Egypt eVisa portal first and Egypt Customs second. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "The entry question sits with Egypt eVisa portal.",
    "A separate arrival card is not typically called for on the main official pages.",
    "Egypt Customs stays useful for cash, tobacco, alcohol, and restricted goods."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Egypt Customs is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Egypt eVisa portal",
      "href": "https://www.visa2egypt.gov.eg/"
    },
    {
      "kind": "immigration",
      "label": "Ministry of Interior",
      "href": "https://www.moi.gov.eg/"
    },
    {
      "kind": "customs",
      "label": "Egypt Customs",
      "href": "https://www.customs.gov.eg/"
    }
  ]
}

export default country
