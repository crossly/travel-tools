import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "australia",
  "country": "Australia",
  "region": "oceania",
  "flag": "🇦🇺",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Digital Passenger Declaration flow",
  "entryOverview": "Australia is easier to read as Digital Passenger Declaration flow plus Australian Border Force; Australian immigration and visas handles the main entry decision. Health notices are usually tracked by Biosecurity and arrivals.",
  "commonEntryPaths": [
    "Digital Passenger Declaration flow is the practical checkpoint travelers usually open before boarding.",
    "Australian immigration and visas covers the entry permission side.",
    "Australian Border Force covers what can be brought through the border."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Australian Border Force is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "Biosecurity guidance is the part to re-check if arrivals or agricultural notices change.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Australian immigration and visas",
      "href": "https://immi.homeaffairs.gov.au/"
    },
    {
      "kind": "customs",
      "label": "Australian Border Force",
      "href": "https://www.abf.gov.au/entering-and-leaving-australia"
    },
    {
      "kind": "health",
      "label": "Biosecurity and arrivals",
      "href": "https://www.agriculture.gov.au/biosecurity-trade/travelling/arriving-in-australia"
    }
  ]
}

export default country
