import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "morocco",
  "country": "Morocco",
  "region": "africa",
  "flag": "🇲🇦",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Moroccan entry and customs notices",
  "entryOverview": "Morocco splits the traveler flow across Acces Maroc and Moroccan Customs. Health notices are usually tracked by Ministry of Health and Social Protection.",
  "commonEntryPaths": [
    "Acces Maroc handles the official entry rules.",
    "Moroccan Customs handles declaration thresholds and traveler reporting.",
    "Ministry of Health and Social Protection is the place to re-check any temporary health notice."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Moroccan Customs is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "Ministry of Health and Social Protection is the place to re-check any temporary health notice before travel.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Acces Maroc",
      "href": "https://www.acces-maroc.ma/"
    },
    {
      "kind": "customs",
      "label": "Moroccan Customs",
      "href": "https://www.douane.gov.ma/"
    },
    {
      "kind": "health",
      "label": "Ministry of Health and Social Protection",
      "href": "https://www.sante.gov.ma/"
    }
  ]
}

export default country
