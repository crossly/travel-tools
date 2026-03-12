import type { Locale } from '@/lib/types'

export const countryToCurrency: Record<string, string> = {
  AD: 'EUR', AE: 'AED', AF: 'AFN', AG: 'XCD', AI: 'XCD', AL: 'ALL',
  AM: 'AMD', AO: 'AOA', AR: 'ARS', AS: 'USD', AT: 'EUR', AU: 'AUD',
  AW: 'AWG', AZ: 'AZN', BA: 'BAM', BB: 'BBD', BD: 'BDT', BE: 'EUR',
  BF: 'XOF', BG: 'BGN', BH: 'BHD', BI: 'BIF', BJ: 'XOF', BM: 'BMD',
  BN: 'BND', BO: 'BOB', BR: 'BRL', BS: 'BSD', BT: 'BTN', BW: 'BWP',
  BY: 'BYN', BZ: 'BZD', CA: 'CAD', CD: 'CDF', CF: 'XAF', CG: 'XAF',
  CH: 'CHF', CI: 'XOF', CL: 'CLP', CM: 'XAF', CN: 'CNY', CO: 'COP',
  CR: 'CRC', CU: 'CUP', CV: 'CVE', CY: 'EUR', CZ: 'CZK', DE: 'EUR',
  DJ: 'DJF', DK: 'DKK', DM: 'XCD', DO: 'DOP', DZ: 'DZD', EC: 'USD',
  EE: 'EUR', EG: 'EGP', ER: 'ERN', ES: 'EUR', ET: 'ETB', FI: 'EUR',
  FJ: 'FJD', FK: 'FKP', FR: 'EUR', GA: 'XAF', GB: 'GBP', GD: 'XCD',
  GE: 'GEL', GH: 'GHS', GI: 'GIP', GM: 'GMD', GN: 'GNF', GQ: 'XAF',
  GR: 'EUR', GT: 'GTQ', GU: 'USD', GW: 'XOF', GY: 'GYD', HK: 'HKD',
  HN: 'HNL', HR: 'EUR', HT: 'HTG', HU: 'HUF', ID: 'IDR', IE: 'EUR',
  IL: 'ILS', IN: 'INR', IQ: 'IQD', IR: 'IRR', IS: 'ISK', IT: 'EUR',
  JM: 'JMD', JO: 'JOD', JP: 'JPY', KE: 'KES', KG: 'KGS', KH: 'KHR',
  KI: 'AUD', KM: 'KMF', KN: 'XCD', KP: 'KPW', KR: 'KRW', KW: 'KWD',
  KY: 'KYD', KZ: 'KZT', LA: 'LAK', LB: 'LBP', LC: 'XCD', LI: 'CHF',
  LK: 'LKR', LR: 'LRD', LS: 'LSL', LT: 'EUR', LU: 'EUR', LV: 'EUR',
  LY: 'LYD', MA: 'MAD', MC: 'EUR', MD: 'MDL', ME: 'EUR', MG: 'MGA',
  MK: 'MKD', ML: 'XOF', MM: 'MMK', MN: 'MNT', MO: 'MOP', MR: 'MRU',
  MT: 'EUR', MU: 'MUR', MV: 'MVR', MW: 'MWK', MX: 'MXN', MY: 'MYR',
  MZ: 'MZN', NA: 'NAD', NE: 'XOF', NG: 'NGN', NI: 'NIO', NL: 'EUR',
  NO: 'NOK', NP: 'NPR', NZ: 'NZD', OM: 'OMR', PA: 'PAB', PE: 'PEN',
  PG: 'PGK', PH: 'PHP', PK: 'PKR', PL: 'PLN', PR: 'USD', PT: 'EUR',
  PY: 'PYG', QA: 'QAR', RO: 'RON', RS: 'RSD', RU: 'RUB', RW: 'RWF',
  SA: 'SAR', SB: 'SBD', SC: 'SCR', SD: 'SDG', SE: 'SEK', SG: 'SGD',
  SI: 'EUR', SK: 'EUR', SL: 'SLE', SM: 'EUR', SN: 'XOF', SO: 'SOS',
  SR: 'SRD', SS: 'SSP', SV: 'USD', SY: 'SYP', SZ: 'SZL', TD: 'XAF',
  TG: 'XOF', TH: 'THB', TJ: 'TJS', TL: 'USD', TM: 'TMT', TN: 'TND',
  TO: 'TOP', TR: 'TRY', TT: 'TTD', TV: 'AUD', TW: 'TWD', TZ: 'TZS',
  UA: 'UAH', UG: 'UGX', US: 'USD', UY: 'UYU', UZ: 'UZS', VA: 'EUR',
  VC: 'XCD', VE: 'VES', VN: 'VND', VU: 'VUV', WS: 'WST', YE: 'YER',
  ZA: 'ZAR', ZM: 'ZMW', ZW: 'ZWL',
}

export const currencyInfo: Record<string, { name: string; flag: string; symbol: string }> = {
  USD: { name: 'US Dollar', flag: 'US', symbol: '$' },
  EUR: { name: 'Euro', flag: 'EU', symbol: '€' },
  GBP: { name: 'British Pound', flag: 'GB', symbol: '£' },
  JPY: { name: 'Japanese Yen', flag: 'JP', symbol: '¥' },
  CNY: { name: 'Chinese Yuan', flag: 'CN', symbol: '¥' },
  KRW: { name: 'South Korean Won', flag: 'KR', symbol: '₩' },
  HKD: { name: 'Hong Kong Dollar', flag: 'HK', symbol: 'HK$' },
  TWD: { name: 'New Taiwan Dollar', flag: 'TW', symbol: 'NT$' },
  SGD: { name: 'Singapore Dollar', flag: 'SG', symbol: 'S$' },
  AUD: { name: 'Australian Dollar', flag: 'AU', symbol: 'A$' },
  NZD: { name: 'New Zealand Dollar', flag: 'NZ', symbol: 'NZ$' },
  CAD: { name: 'Canadian Dollar', flag: 'CA', symbol: 'C$' },
  CHF: { name: 'Swiss Franc', flag: 'CH', symbol: 'CHF' },
  SEK: { name: 'Swedish Krona', flag: 'SE', symbol: 'kr' },
  NOK: { name: 'Norwegian Krone', flag: 'NO', symbol: 'kr' },
  DKK: { name: 'Danish Krone', flag: 'DK', symbol: 'kr' },
  PLN: { name: 'Polish Zloty', flag: 'PL', symbol: 'zł' },
  CZK: { name: 'Czech Koruna', flag: 'CZ', symbol: 'Kč' },
  HUF: { name: 'Hungarian Forint', flag: 'HU', symbol: 'Ft' },
  RON: { name: 'Romanian Leu', flag: 'RO', symbol: 'lei' },
  BGN: { name: 'Bulgarian Lev', flag: 'BG', symbol: 'лв' },
  ISK: { name: 'Icelandic Krona', flag: 'IS', symbol: 'kr' },
  RUB: { name: 'Russian Ruble', flag: 'RU', symbol: '₽' },
  TRY: { name: 'Turkish Lira', flag: 'TR', symbol: '₺' },
  BRL: { name: 'Brazilian Real', flag: 'BR', symbol: 'R$' },
  MXN: { name: 'Mexican Peso', flag: 'MX', symbol: 'Mex$' },
  ARS: { name: 'Argentine Peso', flag: 'AR', symbol: 'AR$' },
  CLP: { name: 'Chilean Peso', flag: 'CL', symbol: 'CL$' },
  COP: { name: 'Colombian Peso', flag: 'CO', symbol: 'COL$' },
  PEN: { name: 'Peruvian Sol', flag: 'PE', symbol: 'S/' },
  INR: { name: 'Indian Rupee', flag: 'IN', symbol: '₹' },
  IDR: { name: 'Indonesian Rupiah', flag: 'ID', symbol: 'Rp' },
  MYR: { name: 'Malaysian Ringgit', flag: 'MY', symbol: 'RM' },
  THB: { name: 'Thai Baht', flag: 'TH', symbol: '฿' },
  VND: { name: 'Vietnamese Dong', flag: 'VN', symbol: '₫' },
  PHP: { name: 'Philippine Peso', flag: 'PH', symbol: '₱' },
  AED: { name: 'UAE Dirham', flag: 'AE', symbol: 'د.إ' },
  SAR: { name: 'Saudi Riyal', flag: 'SA', symbol: '﷼' },
  QAR: { name: 'Qatari Riyal', flag: 'QA', symbol: 'QR' },
  KWD: { name: 'Kuwaiti Dinar', flag: 'KW', symbol: 'KD' },
  ILS: { name: 'Israeli Shekel', flag: 'IL', symbol: '₪' },
  EGP: { name: 'Egyptian Pound', flag: 'EG', symbol: 'E£' },
  ZAR: { name: 'South African Rand', flag: 'ZA', symbol: 'R' },
  NGN: { name: 'Nigerian Naira', flag: 'NG', symbol: '₦' },
  KES: { name: 'Kenyan Shilling', flag: 'KE', symbol: 'KSh' },
}

export type CurrencyCatalogItem = {
  code: string
  name: string
  symbol: string
  icon: string
  countryCode: string | null
  countryName: string
  countryNames: string[]
  searchText: string
}

const localeCatalogCache = new Map<Locale, CurrencyCatalogItem[]>()
const currencyToCountryCodes = buildCountryIndex()

const PRIMARY_COUNTRY_OVERRIDES: Record<string, string> = {
  EUR: 'EU',
}

const intlWithSupportedValues = Intl as typeof Intl & {
  supportedValuesOf?: (key: string) => string[]
}

function getRegionDisplayName(locale: Locale, regionCode: string) {
  try {
    return new Intl.DisplayNames([locale, 'en-US'], { type: 'region' }).of(regionCode) ?? regionCode
  } catch {
    return regionCode
  }
}

function getCurrencyDisplayName(locale: Locale, currencyCode: string) {
  try {
    return new Intl.DisplayNames([locale, 'en-US'], { type: 'currency' }).of(currencyCode) ?? currencyInfo[currencyCode]?.name ?? currencyCode
  } catch {
    return currencyInfo[currencyCode]?.name ?? currencyCode
  }
}

function getCurrencyCodes() {
  const codes = new Set<string>([
    ...Object.values(countryToCurrency),
    ...Object.keys(currencyInfo),
  ])

  if (typeof intlWithSupportedValues.supportedValuesOf === 'function') {
    for (const code of intlWithSupportedValues.supportedValuesOf('currency')) {
      codes.add(code.toUpperCase())
    }
  }

  return [...codes]
}

function getFlagEmoji(countryCode: string | null) {
  if (!countryCode || countryCode.length !== 2) return '💱'
  return String.fromCodePoint(...countryCode.toUpperCase().split('').map((char) => char.charCodeAt(0) + 127397))
}

function getPrimaryCountryCode(currencyCode: string, countryCodes: string[]) {
  return PRIMARY_COUNTRY_OVERRIDES[currencyCode] ?? currencyInfo[currencyCode]?.flag ?? countryCodes[0] ?? null
}

function buildCountryIndex() {
  const currencyToCountryCodes = new Map<string, string[]>()
  for (const [countryCode, currencyCode] of Object.entries(countryToCurrency)) {
    const list = currencyToCountryCodes.get(currencyCode) ?? []
    list.push(countryCode)
    currencyToCountryCodes.set(currencyCode, list)
  }
  return currencyToCountryCodes
}

export function buildCurrencyCatalog(locale: Locale): CurrencyCatalogItem[] {
  const cached = localeCatalogCache.get(locale)
  if (cached) return cached
  const items = getCurrencyCodes().map((code) => getCurrencyCatalogItem(locale, code))

  items.sort((left, right) => {
    const leftCommon = COMMON_CURRENCIES.includes(left.code) ? 0 : 1
    const rightCommon = COMMON_CURRENCIES.includes(right.code) ? 0 : 1
    if (leftCommon !== rightCommon) return leftCommon - rightCommon
    return left.code.localeCompare(right.code)
  })

  localeCatalogCache.set(locale, items)
  return items
}

export function searchCurrencyCatalog(catalog: CurrencyCatalogItem[], query: string) {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return catalog
  return catalog.filter((item) => item.searchText.includes(normalizedQuery))
}

export const supportedCurrencies = getCurrencyCodes()
export const COMMON_CURRENCIES = ['USD', 'EUR', 'CNY', 'JPY', 'HKD', 'TWD', 'KRW', 'GBP', 'SGD', 'AUD', 'CAD', 'THB']

export function getCurrencyCatalogItem(locale: Locale, code: string): CurrencyCatalogItem {
  const normalizedCode = normalizeCurrency(code)
  const countryCodes = [...new Set(currencyToCountryCodes.get(normalizedCode) ?? [])]
  const countryNames = countryCodes.map((countryCode) => getRegionDisplayName(locale, countryCode))
  const countryCode = getPrimaryCountryCode(normalizedCode, countryCodes)
  const countryName = countryCode ? getRegionDisplayName(locale, countryCode) : normalizedCode
  const name = getCurrencyDisplayName(locale, normalizedCode)
  const symbol = currencyInfo[normalizedCode]?.symbol ?? normalizedCode
  const icon = getFlagEmoji(countryCode)
  const searchText = [normalizedCode, name, symbol, countryName, ...countryNames].join(' ').toLowerCase()

  return {
    code: normalizedCode,
    name,
    symbol,
    icon,
    countryCode,
    countryName,
    countryNames,
    searchText,
  }
}

export function normalizeCurrency(value: string) {
  return value.trim().toUpperCase().slice(0, 3)
}
