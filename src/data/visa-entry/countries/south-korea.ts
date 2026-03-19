import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "south-korea",
  "country": "South Korea",
  "region": "asia",
  "flag": "🇰🇷",
  "lastReviewed": "2026-03-19",
  "specialFlow": "K-ETA and e-Arrival Card checks",
  "entryOverview": "South Korea splits the traveler flow across HiKorea immigration services, e-Arrival Card, and Korea Customs Service. Health notices are usually tracked by Q-CODE.",
  "commonEntryPaths": [
    "HiKorea immigration services handles the official entry rules.",
    "Korea Customs Service handles declaration thresholds and traveler reporting.",
    "Q-CODE is the place to re-check any temporary health notice."
  ],
  "arrivalCard": "e-Arrival Card is the place to check any pre-arrival form or arrival-card step.",
  "customsDeclaration": "Korea Customs Service is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "Q-CODE is the place to re-check any temporary health notice before travel.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "HiKorea immigration services",
      "href": "https://www.hikorea.go.kr/"
    },
    {
      "kind": "arrival",
      "label": "e-Arrival Card",
      "href": "https://www.e-arrivalcard.go.kr/"
    },
    {
      "kind": "customs",
      "label": "Korea Customs Service",
      "href": "https://www.customs.go.kr/"
    },
    {
      "kind": "health",
      "label": "Q-CODE",
      "href": "https://www.q-code.go.kr/"
    }
  ]
}

export default country
