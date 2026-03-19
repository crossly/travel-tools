import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "chile",
  "country": "Chile",
  "region": "americas",
  "flag": "🇨🇱",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Chile migration and customs checks",
  "entryOverview": "For Chile, the practical route is Servicio Nacional de Migraciones first and Chilean Customs second. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "The entry question sits with Servicio Nacional de Migraciones.",
    "A separate arrival card is not typically called for on the main official pages.",
    "Chilean Customs stays useful for cash, tobacco, alcohol, and restricted goods."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Chilean Customs is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "immigration",
      "label": "Servicio Nacional de Migraciones",
      "href": "https://serviciomigraciones.cl/"
    },
    {
      "kind": "customs",
      "label": "Chilean Customs",
      "href": "https://www.aduana.cl/"
    }
  ]
}

export default country
