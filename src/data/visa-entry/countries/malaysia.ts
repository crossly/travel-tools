import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "malaysia",
  "country": "Malaysia",
  "region": "asia",
  "flag": "🇲🇾",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Malaysia Digital Arrival Card",
  "entryOverview": "Malaysia keeps the visa question on Malaysia eVisa portal, while Royal Malaysian Customs Department covers the border declaration side. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Malaysia eVisa portal is the main page for the visa or entry decision.",
    "A separate arrival card is not typically required for ordinary tourist entry.",
    "Royal Malaysian Customs Department is the border-side reference for declarations and traveler forms."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Royal Malaysian Customs Department is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Malaysia eVisa portal",
      "href": "https://malaysiavisa.imi.gov.my/"
    },
    {
      "kind": "immigration",
      "label": "Immigration Department of Malaysia",
      "href": "https://www.imi.gov.my/"
    },
    {
      "kind": "customs",
      "label": "Royal Malaysian Customs Department",
      "href": "https://www.customs.gov.my/"
    }
  ]
}

export default country
