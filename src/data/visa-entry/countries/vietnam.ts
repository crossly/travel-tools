import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "vietnam",
  "country": "Vietnam",
  "region": "asia",
  "flag": "🇻🇳",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Vietnam eVisa and entry declaration checks",
  "entryOverview": "Vietnam keeps the visa question on Vietnam eVisa portal, while Vietnam Customs covers the border declaration side. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Vietnam eVisa portal is the main page for the visa or entry decision.",
    "A separate arrival card is not typically required for ordinary tourist entry.",
    "Vietnam Customs is the border-side reference for declarations and traveler forms."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Vietnam Customs is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Vietnam eVisa portal",
      "href": "https://evisa.xuatnhapcanh.gov.vn/"
    },
    {
      "kind": "immigration",
      "label": "Vietnam Immigration Department",
      "href": "https://xuatnhapcanh.gov.vn/"
    },
    {
      "kind": "customs",
      "label": "Vietnam Customs",
      "href": "https://www.customs.gov.vn/"
    }
  ]
}

export default country
