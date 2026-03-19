import { TIPPING_COUNTRY_ARGENTINA } from './countries/argentina'
import { TIPPING_COUNTRY_AUSTRALIA } from './countries/australia'
import { TIPPING_COUNTRY_AUSTRIA } from './countries/austria'
import { TIPPING_COUNTRY_BRAZIL } from './countries/brazil'
import { TIPPING_COUNTRY_CAMBODIA } from './countries/cambodia'
import { TIPPING_COUNTRY_CANADA } from './countries/canada'
import { TIPPING_COUNTRY_CHILE } from './countries/chile'
import { TIPPING_COUNTRY_CHINA } from './countries/china'
import { TIPPING_COUNTRY_COLOMBIA } from './countries/colombia'
import { TIPPING_COUNTRY_COSTA_RICA } from './countries/costa-rica'
import { TIPPING_COUNTRY_EGYPT } from './countries/egypt'
import { TIPPING_COUNTRY_FRANCE } from './countries/france'
import { TIPPING_COUNTRY_GERMANY } from './countries/germany'
import { TIPPING_COUNTRY_GREECE } from './countries/greece'
import { TIPPING_COUNTRY_HONG_KONG } from './countries/hong-kong'
import { TIPPING_COUNTRY_INDIA } from './countries/india'
import { TIPPING_COUNTRY_INDONESIA } from './countries/indonesia'
import { TIPPING_COUNTRY_ITALY } from './countries/italy'
import { TIPPING_COUNTRY_JAPAN } from './countries/japan'
import { TIPPING_COUNTRY_KENYA } from './countries/kenya'
import { TIPPING_COUNTRY_MALAYSIA } from './countries/malaysia'
import { TIPPING_COUNTRY_MAURITIUS } from './countries/mauritius'
import { TIPPING_COUNTRY_MEXICO } from './countries/mexico'
import { TIPPING_COUNTRY_MOROCCO } from './countries/morocco'
import { TIPPING_COUNTRY_NETHERLANDS } from './countries/netherlands'
import { TIPPING_COUNTRY_NEW_ZEALAND } from './countries/new-zealand'
import { TIPPING_COUNTRY_PERU } from './countries/peru'
import { TIPPING_COUNTRY_PHILIPPINES } from './countries/philippines'
import { TIPPING_COUNTRY_PORTUGAL } from './countries/portugal'
import { TIPPING_COUNTRY_SINGAPORE } from './countries/singapore'
import { TIPPING_COUNTRY_SOUTH_AFRICA } from './countries/south-africa'
import { TIPPING_COUNTRY_SOUTH_KOREA } from './countries/south-korea'
import { TIPPING_COUNTRY_SPAIN } from './countries/spain'
import { TIPPING_COUNTRY_SWITZERLAND } from './countries/switzerland'
import { TIPPING_COUNTRY_TAIWAN } from './countries/taiwan'
import { TIPPING_COUNTRY_TANZANIA } from './countries/tanzania'
import { TIPPING_COUNTRY_THAILAND } from './countries/thailand'
import { TIPPING_COUNTRY_TURKEY } from './countries/turkey'
import { TIPPING_COUNTRY_UNITED_ARAB_EMIRATES } from './countries/united-arab-emirates'
import { TIPPING_COUNTRY_UNITED_STATES } from './countries/united-states'
import { TIPPING_COUNTRY_VIETNAM } from './countries/vietnam'
import { copy, defineTippingCountry, source, type TippingCategoryId, type TippingCountryDefinition, type TippingCopy, type TippingSource } from './schema'

export const TIPPING_REGIONS = ['all', 'asia', 'europe', 'americas', 'africa', 'middle-east', 'oceania'] as const

export const TIPPING_COUNTRIES: readonly TippingCountryDefinition[] = [
  TIPPING_COUNTRY_CAMBODIA,
  TIPPING_COUNTRY_CHINA,
  TIPPING_COUNTRY_HONG_KONG,
  TIPPING_COUNTRY_INDIA,
  TIPPING_COUNTRY_INDONESIA,
  TIPPING_COUNTRY_JAPAN,
  TIPPING_COUNTRY_MALAYSIA,
  TIPPING_COUNTRY_PHILIPPINES,
  TIPPING_COUNTRY_SINGAPORE,
  TIPPING_COUNTRY_SOUTH_KOREA,
  TIPPING_COUNTRY_TAIWAN,
  TIPPING_COUNTRY_THAILAND,
  TIPPING_COUNTRY_VIETNAM,
  TIPPING_COUNTRY_TURKEY,
  TIPPING_COUNTRY_UNITED_ARAB_EMIRATES,
  TIPPING_COUNTRY_AUSTRIA,
  TIPPING_COUNTRY_FRANCE,
  TIPPING_COUNTRY_GERMANY,
  TIPPING_COUNTRY_GREECE,
  TIPPING_COUNTRY_ITALY,
  TIPPING_COUNTRY_NETHERLANDS,
  TIPPING_COUNTRY_PORTUGAL,
  TIPPING_COUNTRY_SPAIN,
  TIPPING_COUNTRY_SWITZERLAND,
  TIPPING_COUNTRY_ARGENTINA,
  TIPPING_COUNTRY_BRAZIL,
  TIPPING_COUNTRY_CANADA,
  TIPPING_COUNTRY_CHILE,
  TIPPING_COUNTRY_COLOMBIA,
  TIPPING_COUNTRY_COSTA_RICA,
  TIPPING_COUNTRY_MEXICO,
  TIPPING_COUNTRY_PERU,
  TIPPING_COUNTRY_UNITED_STATES,
  TIPPING_COUNTRY_EGYPT,
  TIPPING_COUNTRY_KENYA,
  TIPPING_COUNTRY_MAURITIUS,
  TIPPING_COUNTRY_MOROCCO,
  TIPPING_COUNTRY_SOUTH_AFRICA,
  TIPPING_COUNTRY_TANZANIA,
  TIPPING_COUNTRY_AUSTRALIA,
  TIPPING_COUNTRY_NEW_ZEALAND,
] as const

export {
  copy,
  defineTippingCountry,
  source,
  type TippingCategoryId,
  type TippingCountryDefinition,
  type TippingCopy,
  type TippingSource,
}
