import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "france",
  "country": "France",
  "region": "europe",
  "flag": "🇫🇷",
  "lastReviewed": "2026-03-19",
  "specialFlow": "France-Visas portal",
  "entryOverview": "France splits the traveler flow across France-Visas and French Customs. Health notices are usually tracked by Ministry of Health and Prevention.",
  "commonEntryPaths": [
    "France-Visas handles the official entry rules.",
    "French Customs handles declaration thresholds and traveler reporting.",
    "Ministry of Health and Prevention is the place to re-check any temporary health notice."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "French Customs is the place to confirm what needs declaring before you fly.",
  "healthDeclaration": "The Ministry of Health and Prevention is the official place for any temporary health notice.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "France-Visas",
      "href": "https://france-visas.gouv.fr/"
    },
    {
      "kind": "customs",
      "label": "French Customs",
      "href": "https://www.douane.gouv.fr/"
    },
    {
      "kind": "visa",
      "label": "Ministry of the Interior",
      "href": "https://www.interieur.gouv.fr/"
    },
    {
      "kind": "health",
      "label": "Ministry of Health and Prevention",
      "href": "https://sante.gouv.fr/"
    }
  ]
}

export default country
