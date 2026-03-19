import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "spain",
  "country": "Spain",
  "region": "europe",
  "flag": "🇪🇸",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Spanish consular and customs checks",
  "entryOverview": "Spain keeps the visa question on Spanish Ministry of Foreign Affairs, while Spanish Tax Agency customs portal covers the border declaration side. Health notices are usually tracked by Ministry of Health.",
  "commonEntryPaths": [
    "Spanish Ministry of Foreign Affairs is the main page for the visa or entry decision.",
    "A separate arrival card is not typically required for ordinary tourist entry.",
    "Spanish Tax Agency customs portal is the border-side reference for declarations and traveler forms."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Spanish Tax Agency customs portal is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "Ministry of Health is the place to re-check any temporary health notice before travel.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Spanish Ministry of Foreign Affairs",
      "href": "https://www.exteriores.gob.es/en/Pages/index.aspx"
    },
    {
      "kind": "customs",
      "label": "Spanish Tax Agency customs portal",
      "href": "https://sede.agenciatributaria.gob.es/"
    },
    {
      "kind": "health",
      "label": "Ministry of Health",
      "href": "https://www.sanidad.gob.es/"
    }
  ]
}

export default country
