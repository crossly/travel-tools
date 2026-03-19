import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "canada",
  "country": "Canada",
  "region": "americas",
  "flag": "🇨🇦",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Visit Canada and CBSA checks",
  "entryOverview": "Canada is easier to read as Visit Canada and CBSA checks plus CBSA travel guidance; Visit Canada handles the main entry decision. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Visit Canada and CBSA checks is the practical checkpoint travelers usually open before boarding.",
    "Visit Canada covers the entry permission side.",
    "CBSA travel guidance covers what can be brought through the border."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "CBSA travel guidance is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Visit Canada",
      "href": "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html"
    },
    {
      "kind": "customs",
      "label": "CBSA travel guidance",
      "href": "https://www.cbsa-asfc.gc.ca/travel-voyage/menu-eng.html"
    }
  ]
}

export default country
