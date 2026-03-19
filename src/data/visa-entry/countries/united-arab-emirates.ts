import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "united-arab-emirates",
  "country": "United Arab Emirates",
  "region": "middle-east",
  "flag": "🇦🇪",
  "lastReviewed": "2026-03-19",
  "specialFlow": "ICP Smart Services entry flow",
  "entryOverview": "For United Arab Emirates, the practical route is ICP Smart Services first and Dubai Customs second. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "The entry question sits with ICP Smart Services.",
    "A separate arrival card is not typically called for on the main official pages.",
    "Dubai Customs stays useful for cash, tobacco, alcohol, and restricted goods."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Dubai Customs covers the border-side declaration rules for routine visitor trips.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "ICP Smart Services",
      "href": "https://icp.gov.ae/en/"
    },
    {
      "kind": "visa",
      "label": "Ministry of Foreign Affairs",
      "href": "https://www.mofa.gov.ae/en"
    },
    {
      "kind": "customs",
      "label": "Dubai Customs",
      "href": "https://www.dubaicustoms.gov.ae/"
    }
  ]
}

export default country
