import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "singapore",
  "country": "Singapore",
  "region": "asia",
  "flag": "🇸🇬",
  "lastReviewed": "2026-03-19",
  "specialFlow": "SG Arrival Card and ICA checks",
  "entryOverview": "Singapore is easier to read as SG Arrival Card and ICA checks plus Singapore Customs; Immigration and Checkpoints Authority entry page handles the main entry decision, and SG Arrival Card shows up when a pre-arrival form is needed. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "SG Arrival Card and ICA checks is the practical checkpoint travelers usually open before boarding.",
    "Immigration and Checkpoints Authority entry page covers the entry permission side.",
    "Singapore Customs covers what can be brought through the border."
  ],
  "arrivalCard": "SG Arrival Card is the place to check any pre-arrival form or arrival-card step.",
  "customsDeclaration": "Singapore Customs is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "immigration",
      "label": "Immigration and Checkpoints Authority entry page",
      "href": "https://www.ica.gov.sg/enter-transit-depart/entry-into-singapore"
    },
    {
      "kind": "arrival",
      "label": "SG Arrival Card",
      "href": "https://eservices.ica.gov.sg/sgarrivalcard/"
    },
    {
      "kind": "customs",
      "label": "Singapore Customs",
      "href": "https://www.customs.gov.sg/"
    }
  ]
}

export default country
