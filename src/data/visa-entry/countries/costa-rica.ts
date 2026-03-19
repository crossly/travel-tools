import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "costa-rica",
  "country": "Costa Rica",
  "region": "americas",
  "flag": "🇨🇷",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Costa Rican migration and customs checks",
  "entryOverview": "Costa Rica is easier to read as Costa Rican migration and customs checks plus Ministry of Finance / customs; Dirección General de Migración y Extranjería handles the main entry decision. Health notices are usually tracked by Ministry of Health.",
  "commonEntryPaths": [
    "Costa Rican migration and customs checks is the practical checkpoint travelers usually open before boarding.",
    "Dirección General de Migración y Extranjería covers the entry permission side.",
    "Ministry of Finance / customs covers what can be brought through the border."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Ministry of Finance / customs is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "Ministry of Health is the place to re-check any temporary health notice before travel.",
  "officialSources": [
    {
      "kind": "immigration",
      "label": "Dirección General de Migración y Extranjería",
      "href": "https://migracion.go.cr/"
    },
    {
      "kind": "customs",
      "label": "Ministry of Finance / customs",
      "href": "https://www.hacienda.go.cr/"
    },
    {
      "kind": "health",
      "label": "Ministry of Health",
      "href": "https://www.ministeriodesalud.go.cr/"
    }
  ]
}

export default country
