import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "portugal",
  "country": "Portugal",
  "region": "europe",
  "flag": "🇵🇹",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Portuguese visa and AIMA checks",
  "entryOverview": "Portugal keeps the visa question on Portuguese visa portal, while Portuguese Tax and Customs Authority covers the border declaration side. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Portuguese visa portal is the main page for the visa or entry decision.",
    "A separate arrival card is not typically required for ordinary tourist entry.",
    "Portuguese Tax and Customs Authority is the border-side reference for declarations and traveler forms."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Portuguese Tax and Customs Authority is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Portuguese visa portal",
      "href": "https://vistos.mne.gov.pt/en/"
    },
    {
      "kind": "immigration",
      "label": "AIMA",
      "href": "https://aima.gov.pt/"
    },
    {
      "kind": "customs",
      "label": "Portuguese Tax and Customs Authority",
      "href": "https://www.at.gov.pt/"
    }
  ]
}

export default country
