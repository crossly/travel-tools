import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "indonesia",
  "country": "Indonesia",
  "region": "asia",
  "flag": "🇮🇩",
  "lastReviewed": "2026-03-19",
  "specialFlow": "eVOA and e-CD",
  "entryOverview": "Indonesia keeps the visa question on Directorate General of Immigration eVisa, while Indonesia Customs e-CD covers the border declaration side. A separate health declaration is not typically required for routine tourist entry.",
  "commonEntryPaths": [
    "Directorate General of Immigration eVisa is the main page for the visa or entry decision.",
    "A separate arrival card is not typically required for ordinary tourist entry.",
    "Indonesia Customs e-CD is the border-side reference for declarations and traveler forms."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Indonesia Customs e-CD is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "A separate health declaration is not typically required for routine tourist entry.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Directorate General of Immigration eVisa",
      "href": "https://evisa.imigrasi.go.id/"
    },
    {
      "kind": "customs",
      "label": "Indonesia Customs e-CD",
      "href": "https://ecd.beacukai.go.id/"
    },
    {
      "kind": "immigration",
      "label": "Directorate General of Immigration",
      "href": "https://www.imigrasi.go.id/"
    }
  ]
}

export default country
