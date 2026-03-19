import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "peru",
  "country": "Peru",
  "region": "americas",
  "flag": "🇵🇪",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Peruvian migration and customs checks",
  "entryOverview": "For Peru, the practical route is Migraciones Perú first and SUNAT customs guidance second. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "The entry question sits with Migraciones Perú.",
    "A separate arrival card is not typically called for on the main official pages.",
    "SUNAT customs guidance stays useful for cash, tobacco, alcohol, and restricted goods."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "SUNAT customs guidance is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "immigration",
      "label": "Migraciones Perú",
      "href": "https://www.gob.pe/migraciones"
    },
    {
      "kind": "customs",
      "label": "SUNAT customs guidance",
      "href": "https://www.sunat.gob.pe/"
    }
  ]
}

export default country
