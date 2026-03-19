import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "cambodia",
  "country": "Cambodia",
  "region": "asia",
  "flag": "🇰🇭",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Cambodia eVisa",
  "entryOverview": "Cambodia keeps the visa question on Cambodia eVisa, while Cambodia Customs and Excise covers the border declaration side. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Cambodia eVisa is the main page for the visa or entry decision.",
    "A separate arrival card is not typically required for ordinary tourist entry.",
    "Cambodia Customs and Excise is the border-side reference for declarations and traveler forms."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Cambodia Customs and Excise is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Cambodia eVisa",
      "href": "https://www.evisa.gov.kh/"
    },
    {
      "kind": "immigration",
      "label": "General Department of Immigration",
      "href": "https://immigration.gov.kh/"
    },
    {
      "kind": "customs",
      "label": "Cambodia Customs and Excise",
      "href": "https://www.customs.gov.kh/"
    }
  ]
}

export default country
