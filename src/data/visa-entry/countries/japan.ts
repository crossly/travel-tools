import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "japan",
  "country": "Japan",
  "region": "asia",
  "flag": "🇯🇵",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Visit Japan Web pre-arrival flow",
  "entryOverview": "For Japan, the practical route is Ministry of Foreign Affairs visa information first, Visit Japan Web if a pre-entry form is part of the trip, and Japan Customs traveller guidance second. Health notices are usually tracked by Ministry of Health, Labour and Welfare.",
  "commonEntryPaths": [
    "The entry question sits with Ministry of Foreign Affairs visa information.",
    "Visit Japan Web is the page to open for any digital arrival form or pre-entry notice.",
    "Japan Customs traveller guidance stays useful for cash, tobacco, alcohol, and restricted goods."
  ],
  "arrivalCard": "The Visit Japan Web pre-arrival flow is the pre-arrival step travelers usually complete before flying.",
  "customsDeclaration": "Japan Customs traveller guidance is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "Ministry of Health, Labour and Welfare is where temporary health notices or entry health guidance would show up.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Ministry of Foreign Affairs visa information",
      "href": "https://www.mofa.go.jp/j_info/visit/visa/index.html"
    },
    {
      "kind": "arrival",
      "label": "Visit Japan Web",
      "href": "https://www.vjw.digital.go.jp/"
    },
    {
      "kind": "customs",
      "label": "Japan Customs traveller guidance",
      "href": "https://www.customs.go.jp/english/"
    },
    {
      "kind": "health",
      "label": "Ministry of Health, Labour and Welfare",
      "href": "https://www.mhlw.go.jp/"
    }
  ]
}

export default country
