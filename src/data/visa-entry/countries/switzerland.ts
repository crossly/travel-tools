import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "switzerland",
  "country": "Switzerland",
  "region": "europe",
  "flag": "🇨🇭",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Swiss visa and border guidance",
  "entryOverview": "Switzerland is easier to read as Swiss visa and border guidance plus Swiss Customs; State Secretariat for Migration handles the main entry decision. Health notices are usually tracked by Federal Office of Public Health.",
  "commonEntryPaths": [
    "Swiss visa and border guidance is the practical checkpoint travelers usually open before boarding.",
    "State Secretariat for Migration covers the entry permission side.",
    "Swiss Customs covers what can be brought through the border."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Swiss Customs is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "Federal Office of Public Health is the place to re-check any temporary health notice before travel.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "State Secretariat for Migration",
      "href": "https://www.sem.admin.ch/sem/en/home.html"
    },
    {
      "kind": "customs",
      "label": "Swiss Customs",
      "href": "https://www.bazg.admin.ch/bazg/en/home.html"
    },
    {
      "kind": "health",
      "label": "Federal Office of Public Health",
      "href": "https://www.bag.admin.ch/bag/en/home.html"
    }
  ]
}

export default country
