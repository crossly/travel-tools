import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "colombia",
  "country": "Colombia",
  "region": "americas",
  "flag": "🇨🇴",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Colombia migration and customs checks",
  "entryOverview": "Colombia keeps the visa question on Migración Colombia, while DIAN customs covers the border declaration side. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Migración Colombia is the main page for the visa or entry decision.",
    "A separate arrival card is not typically required for ordinary tourist entry.",
    "DIAN customs is the border-side reference for declarations and traveler forms."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "DIAN customs is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "immigration",
      "label": "Migración Colombia",
      "href": "https://www.migracioncolombia.gov.co/"
    },
    {
      "kind": "customs",
      "label": "DIAN customs",
      "href": "https://www.dian.gov.co/"
    }
  ]
}

export default country
