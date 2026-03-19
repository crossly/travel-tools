import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "india",
  "country": "India",
  "region": "asia",
  "flag": "🇮🇳",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Indian eVisa",
  "entryOverview": "India splits the traveler flow across Indian eVisa portal and Central Board of Indirect Taxes and Customs. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Indian eVisa portal handles the official entry rules.",
    "Central Board of Indirect Taxes and Customs handles declaration thresholds and traveler reporting.",
    "A separate health declaration is not typically required for routine tourist visits."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Central Board of Indirect Taxes and Customs is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Indian eVisa portal",
      "href": "https://indianvisaonline.gov.in/evisa/"
    },
    {
      "kind": "immigration",
      "label": "Bureau of Immigration",
      "href": "https://boi.gov.in/"
    },
    {
      "kind": "customs",
      "label": "Central Board of Indirect Taxes and Customs",
      "href": "https://www.cbic.gov.in/"
    }
  ]
}

export default country
