import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "taiwan",
  "country": "Taiwan",
  "region": "asia",
  "flag": "🇹🇼",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Taiwan eVisa and arrival checks",
  "entryOverview": "For Taiwan, the practical route is National Immigration Agency first and Taiwan Customs Administration second. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "The entry question sits with National Immigration Agency.",
    "A separate arrival card is not typically called for on the main official pages.",
    "Taiwan Customs Administration stays useful for cash, tobacco, alcohol, and restricted goods."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Taiwan Customs Administration is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "immigration",
      "label": "National Immigration Agency",
      "href": "https://www.immigration.gov.tw/"
    },
    {
      "kind": "visa",
      "label": "Taiwan eVisa portal",
      "href": "https://evisaweb.mofa.gov.tw/"
    },
    {
      "kind": "customs",
      "label": "Taiwan Customs Administration",
      "href": "https://web.customs.gov.tw/"
    }
  ]
}

export default country
