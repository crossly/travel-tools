import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "kenya",
  "country": "Kenya",
  "region": "africa",
  "flag": "🇰🇪",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Kenya eVisa and immigration checks",
  "entryOverview": "Kenya splits the traveler flow across Kenya eVisa and Kenya Revenue Authority. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Kenya eVisa handles the official entry rules.",
    "Kenya Revenue Authority handles declaration thresholds and traveler reporting.",
    "A separate health declaration is not typically required for routine tourist visits."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Kenya Revenue Authority is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Kenya eVisa",
      "href": "https://evisa.go.ke/"
    },
    {
      "kind": "immigration",
      "label": "Department of Immigration Services",
      "href": "https://www.immigration.go.ke/"
    },
    {
      "kind": "customs",
      "label": "Kenya Revenue Authority",
      "href": "https://www.kra.go.ke/"
    }
  ]
}

export default country
