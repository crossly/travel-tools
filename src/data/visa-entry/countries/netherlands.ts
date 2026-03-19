import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "netherlands",
  "country": "Netherlands",
  "region": "europe",
  "flag": "🇳🇱",
  "lastReviewed": "2026-03-19",
  "specialFlow": "NetherlandsWorldwide visa guidance",
  "entryOverview": "Netherlands keeps the visa question on NetherlandsWorldwide visa guidance, while Dutch Customs covers the border declaration side. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "NetherlandsWorldwide visa guidance is the main page for the visa or entry decision.",
    "A separate arrival card is not typically required for ordinary tourist entry.",
    "Dutch Customs is the border-side reference for declarations and traveler forms."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Dutch Customs is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "NetherlandsWorldwide visa guidance",
      "href": "https://www.netherlandsworldwide.nl/visa-the-netherlands"
    },
    {
      "kind": "customs",
      "label": "Dutch Customs",
      "href": "https://www.douane.nl/english/"
    }
  ]
}

export default country
