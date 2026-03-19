import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "austria",
  "country": "Austria",
  "region": "europe",
  "flag": "🇦🇹",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Austrian visa and entry guidance",
  "entryOverview": "For Austria, the practical route is Austrian Foreign Ministry first and Austrian customs information second. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "The entry question sits with Austrian Foreign Ministry.",
    "A separate arrival card is not typically called for on the main official pages.",
    "Austrian customs information stays useful for cash, tobacco, alcohol, and restricted goods."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Austrian customs information is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Austrian Foreign Ministry",
      "href": "https://www.bmeia.gv.at/en/"
    },
    {
      "kind": "customs",
      "label": "Austrian customs information",
      "href": "https://www.bmf.gv.at/en/topics/customs.html"
    }
  ]
}

export default country
