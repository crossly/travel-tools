import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "mexico",
  "country": "Mexico",
  "region": "americas",
  "flag": "🇲🇽",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Mexican migration and customs checks",
  "entryOverview": "For Mexico, the practical route is Instituto Nacional de Migración first and SAT customs and border guidance second. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "The entry question sits with Instituto Nacional de Migración.",
    "A separate arrival card is not typically called for on the main official pages.",
    "SAT customs and border guidance stays useful for cash, tobacco, alcohol, and restricted goods."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "SAT customs and border guidance is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "immigration",
      "label": "Instituto Nacional de Migración",
      "href": "https://www.gob.mx/inm"
    },
    {
      "kind": "customs",
      "label": "SAT customs and border guidance",
      "href": "https://www.sat.gob.mx/"
    }
  ]
}

export default country
