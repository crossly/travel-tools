import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "hong-kong",
  "country": "Hong Kong",
  "region": "asia",
  "flag": "🇭🇰",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Hong Kong Immigration Department entry checks",
  "entryOverview": "For Hong Kong, the practical route is Hong Kong Immigration Department first and Hong Kong Customs and Excise Department second. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "The entry question sits with Hong Kong Immigration Department.",
    "A separate arrival card is not typically called for on the main official pages.",
    "Hong Kong Customs and Excise Department stays useful for cash, tobacco, alcohol, and restricted goods."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Hong Kong Customs and Excise Department is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "immigration",
      "label": "Hong Kong Immigration Department",
      "href": "https://www.immd.gov.hk/"
    },
    {
      "kind": "customs",
      "label": "Hong Kong Customs and Excise Department",
      "href": "https://www.customs.gov.hk/"
    }
  ]
}

export default country
