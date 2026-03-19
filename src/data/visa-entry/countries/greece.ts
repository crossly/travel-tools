import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "greece",
  "country": "Greece",
  "region": "europe",
  "flag": "🇬🇷",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Greek visa and border checks",
  "entryOverview": "Greece is easier to read as Greek visa and border checks plus AADE customs information; Greek Ministry of Foreign Affairs handles the main entry decision. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Greek visa and border checks is the practical checkpoint travelers usually open before boarding.",
    "Greek Ministry of Foreign Affairs covers the entry permission side.",
    "AADE customs information covers what can be brought through the border."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "AADE customs information is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Greek Ministry of Foreign Affairs",
      "href": "https://www.mfa.gr/en/"
    },
    {
      "kind": "customs",
      "label": "AADE customs information",
      "href": "https://www.aade.gr/en/customs"
    }
  ]
}

export default country
