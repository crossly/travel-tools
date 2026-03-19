import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "mauritius",
  "country": "Mauritius",
  "region": "africa",
  "flag": "🇲🇺",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Mauritius passport and immigration checks",
  "entryOverview": "Mauritius is easier to read as Mauritius passport and immigration checks plus Mauritius Revenue Authority customs; Passport and Immigration Office handles the main entry decision. Health notices are usually tracked by Ministry of Health and Wellness.",
  "commonEntryPaths": [
    "Mauritius passport and immigration checks is the practical checkpoint travelers usually open before boarding.",
    "Passport and Immigration Office covers the entry permission side.",
    "Mauritius Revenue Authority customs covers what can be brought through the border."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Mauritius Revenue Authority customs is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "Ministry of Health and Wellness is the place to re-check any temporary health notice before travel.",
  "officialSources": [
    {
      "kind": "immigration",
      "label": "Passport and Immigration Office",
      "href": "https://passport.govmu.org/"
    },
    {
      "kind": "customs",
      "label": "Mauritius Revenue Authority customs",
      "href": "https://www.mra.mu/"
    },
    {
      "kind": "health",
      "label": "Ministry of Health and Wellness",
      "href": "https://health.govmu.org/"
    }
  ]
}

export default country
