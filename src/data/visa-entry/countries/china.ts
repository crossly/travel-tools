import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "china",
  "country": "China",
  "region": "asia",
  "flag": "🇨🇳",
  "lastReviewed": "2026-03-19",
  "specialFlow": "National Immigration Administration entry notices",
  "entryOverview": "China splits the traveler flow across National Immigration Administration and China Customs. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "National Immigration Administration handles the official entry rules.",
    "China Customs handles declaration thresholds and traveler reporting.",
    "A separate health declaration is not typically required for routine tourist visits."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "China Customs is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "immigration",
      "label": "National Immigration Administration",
      "href": "https://www.nia.gov.cn/"
    },
    {
      "kind": "customs",
      "label": "China Customs",
      "href": "https://www.customs.gov.cn/"
    },
    {
      "kind": "visa",
      "label": "Ministry of Foreign Affairs visa notices",
      "href": "https://www.fmprc.gov.cn/"
    }
  ]
}

export default country
