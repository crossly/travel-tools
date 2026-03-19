import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "united-states",
  "country": "United States",
  "region": "americas",
  "flag": "🇺🇸",
  "lastReviewed": "2026-03-19",
  "specialFlow": "CBP travel and inspection flow",
  "entryOverview": "United States splits the traveler flow across U.S. Customs and Border Protection travel page and U.S. Customs and Border Protection travel page. Health notices are usually tracked by CDC travel health.",
  "commonEntryPaths": [
    "U.S. Customs and Border Protection travel page handles the official entry rules.",
    "U.S. Customs and Border Protection travel page handles declaration thresholds and traveler reporting.",
    "CDC travel health is the place to re-check any temporary health notice."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "U.S. Customs and Border Protection is the customs reference travelers use for declaration rules and inspection guidance.",
  "healthDeclaration": "CDC travel health is the place to re-check health notices or temporary requirements before departure.",
  "officialSources": [
    {
      "kind": "customs",
      "label": "U.S. Customs and Border Protection travel page",
      "href": "https://www.cbp.gov/travel"
    },
    {
      "kind": "customs",
      "label": "CBP international visitors",
      "href": "https://www.cbp.gov/travel/international-visitors"
    },
    {
      "kind": "health",
      "label": "CDC travel health",
      "href": "https://www.cdc.gov/travel/"
    }
  ]
}

export default country
