import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "south-africa",
  "country": "South Africa",
  "region": "africa",
  "flag": "🇿🇦",
  "lastReviewed": "2026-03-19",
  "specialFlow": "South African immigration and customs checks",
  "entryOverview": "For South Africa, the practical route is Department of Home Affairs first and SARS customs and excise second. Health notices are usually tracked by National Department of Health.",
  "commonEntryPaths": [
    "The entry question sits with Department of Home Affairs.",
    "A separate arrival card is not typically called for on the main official pages.",
    "SARS customs and excise stays useful for cash, tobacco, alcohol, and restricted goods."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "SARS customs and excise is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "National Department of Health is the place to re-check any temporary health notice before travel.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Department of Home Affairs",
      "href": "https://www.dha.gov.za/"
    },
    {
      "kind": "customs",
      "label": "SARS customs and excise",
      "href": "https://www.sars.gov.za/customs-and-excise/"
    },
    {
      "kind": "health",
      "label": "National Department of Health",
      "href": "https://www.health.gov.za/"
    }
  ]
}

export default country
