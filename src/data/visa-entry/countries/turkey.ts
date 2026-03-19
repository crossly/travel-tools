import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "turkey",
  "country": "Turkey",
  "region": "middle-east",
  "flag": "🇹🇷",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Turkey eVisa",
  "entryOverview": "Turkey is easier to read as Turkey eVisa plus Ministry of Trade; Turkey eVisa portal handles the main entry decision. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Turkey eVisa is the practical checkpoint travelers usually open before boarding.",
    "Turkey eVisa portal covers the entry permission side.",
    "Ministry of Trade covers what can be brought through the border."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Ministry of Trade is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Turkey eVisa portal",
      "href": "https://www.evisa.gov.tr/"
    },
    {
      "kind": "immigration",
      "label": "Directorate General of Migration Management",
      "href": "https://en.goc.gov.tr/"
    },
    {
      "kind": "customs",
      "label": "Ministry of Trade",
      "href": "https://www.ticaret.gov.tr/"
    }
  ]
}

export default country
