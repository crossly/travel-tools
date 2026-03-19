import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "thailand",
  "country": "Thailand",
  "region": "asia",
  "flag": "🇹🇭",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Thai eVisa and immigration entry checks",
  "entryOverview": "Thailand keeps the visa question on Thai eVisa portal, while Thai Customs Department covers the border declaration side. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Thai eVisa portal is the main page for the visa or entry decision.",
    "A separate arrival card is not typically required for ordinary tourist entry.",
    "Thai Customs Department is the border-side reference for declarations and traveler forms."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Thai Customs Department is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Thai eVisa portal",
      "href": "https://www.thaievisa.go.th/"
    },
    {
      "kind": "immigration",
      "label": "Royal Thai Immigration Bureau",
      "href": "https://www.immigration.go.th/"
    },
    {
      "kind": "customs",
      "label": "Thai Customs Department",
      "href": "https://www.customs.go.th/"
    }
  ]
}

export default country
