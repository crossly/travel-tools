import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "germany",
  "country": "Germany",
  "region": "europe",
  "flag": "🇩🇪",
  "lastReviewed": "2026-03-19",
  "specialFlow": "German visa service and border guidance",
  "entryOverview": "Germany keeps the visa question on Federal Foreign Office visa service, while German Customs covers the border declaration side. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Federal Foreign Office visa service is the main page for the visa or entry decision.",
    "A separate arrival card is not typically required for ordinary tourist entry.",
    "German Customs is the border-side reference for declarations and traveler forms."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "German Customs is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Federal Foreign Office visa service",
      "href": "https://www.auswaertiges-amt.de/en/"
    },
    {
      "kind": "customs",
      "label": "German Customs",
      "href": "https://www.zoll.de/EN/"
    }
  ]
}

export default country
