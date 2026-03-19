import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "italy",
  "country": "Italy",
  "region": "europe",
  "flag": "🇮🇹",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Visto per l Italia",
  "entryOverview": "Italy is easier to read as Visto per l Italia plus Italian Customs and Monopolies Agency; Visto per l Italia handles the main entry decision. Health notices are usually tracked by Ministry of Health.",
  "commonEntryPaths": [
    "Visto per l Italia is the practical checkpoint travelers usually open before boarding.",
    "Visto per l Italia covers the entry permission side.",
    "Italian Customs and Monopolies Agency covers what can be brought through the border."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Italian Customs and Monopolies Agency is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "Ministry of Health is the place to re-check any temporary health notice before travel.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Visto per l Italia",
      "href": "https://vistoperitalia.esteri.it/"
    },
    {
      "kind": "customs",
      "label": "Italian Customs and Monopolies Agency",
      "href": "https://www.adm.gov.it/portale/"
    },
    {
      "kind": "health",
      "label": "Ministry of Health",
      "href": "https://www.salute.gov.it/"
    }
  ]
}

export default country
