import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "argentina",
  "country": "Argentina",
  "region": "americas",
  "flag": "🇦🇷",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Argentine migration and customs checks",
  "entryOverview": "Argentina keeps the visa question on Dirección Nacional de Migraciones, while AFIP traveller guidance covers the border declaration side. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Dirección Nacional de Migraciones is the main page for the visa or entry decision.",
    "A separate arrival card is not typically required for ordinary tourist entry.",
    "AFIP traveller guidance is the border-side reference for declarations and traveler forms."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "AFIP traveller guidance is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "immigration",
      "label": "Dirección Nacional de Migraciones",
      "href": "https://www.argentina.gob.ar/interior/migraciones"
    },
    {
      "kind": "customs",
      "label": "AFIP traveller guidance",
      "href": "https://www.afip.gob.ar/viajeros/"
    }
  ]
}

export default country
