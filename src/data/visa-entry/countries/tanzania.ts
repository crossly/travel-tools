import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "tanzania",
  "country": "Tanzania",
  "region": "africa",
  "flag": "🇹🇿",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Tanzania eVisa and immigration checks",
  "entryOverview": "Tanzania splits the traveler flow across Tanzania Immigration eServices and Tanzania Revenue Authority. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Tanzania Immigration eServices handles the official entry rules.",
    "Tanzania Revenue Authority handles declaration thresholds and traveler reporting.",
    "A separate health declaration is not typically required for routine tourist visits."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Tanzania Revenue Authority is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Tanzania Immigration eServices",
      "href": "https://eservices.immigration.go.tz/"
    },
    {
      "kind": "immigration",
      "label": "Tanzania Immigration Services Department",
      "href": "https://www.immigration.go.tz/"
    },
    {
      "kind": "customs",
      "label": "Tanzania Revenue Authority",
      "href": "https://www.tra.go.tz/"
    }
  ]
}

export default country
