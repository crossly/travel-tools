import type { VisaEntryCountryRecord } from '../types'

const country: VisaEntryCountryRecord = {
  "slug": "brazil",
  "country": "Brazil",
  "region": "americas",
  "flag": "🇧🇷",
  "lastReviewed": "2026-03-19",
  "specialFlow": "Brazilian Federal Police and customs entry checks",
  "entryOverview": "Brazil splits the traveler flow across Federal Police foreigner guidance and Federal Revenue customs guidance. Health notices are usually tracked by Anvisa.",
  "commonEntryPaths": [
    "Federal Police foreigner guidance handles the official entry rules.",
    "Federal Revenue customs guidance handles declaration thresholds and traveler reporting.",
    "Anvisa is the place to re-check any temporary health notice."
  ],
  "arrivalCard": "A separate arrival card is not typically required for routine tourist entry.",
  "customsDeclaration": "Federal Revenue customs guidance is the customs reference for declaration rules and traveler forms.",
  "healthDeclaration": "Anvisa is the place to re-check any temporary health notice before travel.",
  "officialSources": [
    {
      "kind": "visa",
      "label": "Federal Police foreigner guidance",
      "href": "https://www.gov.br/pf/pt-br/assuntos/estrangeiro"
    },
    {
      "kind": "customs",
      "label": "Federal Revenue customs guidance",
      "href": "https://www.gov.br/receitafederal"
    },
    {
      "kind": "health",
      "label": "Anvisa",
      "href": "https://www.gov.br/anvisa/"
    }
  ]
}

export default country
