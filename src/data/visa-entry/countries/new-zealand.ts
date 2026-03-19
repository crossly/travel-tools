import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "new-zealand",
  "country": "New Zealand",
  "region": "oceania",
  "flag": "🇳🇿",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Traveller Declaration flow",
  "entryOverview": "New Zealand is easier to read as Traveller Declaration flow plus New Zealand Customs Service; Immigration New Zealand handles the main entry decision, and New Zealand Traveller Declaration shows up when a pre-arrival form is needed. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Traveller Declaration flow is the practical checkpoint travelers usually open before boarding.",
    "Immigration New Zealand covers the entry permission side.",
    "New Zealand Customs Service covers what can be brought through the border."
  ],
  "arrivalCard": "The Traveller Declaration flow is the pre-arrival step travelers usually complete before departure.",
  "customsDeclaration": "New Zealand Customs Service is the declaration reference, especially when biosecurity questions are in play.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Immigration New Zealand",
      "href": "https://www.immigration.govt.nz/"
    },
    {
      "kind": "arrival",
      "label": "New Zealand Traveller Declaration",
      "href": "https://www.travellerdeclaration.govt.nz/"
    },
    {
      "kind": "customs",
      "label": "New Zealand Customs Service",
      "href": "https://www.customs.govt.nz/"
    }
  ]
}

export default country
