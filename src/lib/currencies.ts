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

export const timezoneToCurrency: Record<string, string> = {
  'America/New_York': 'USD', 'America/Chicago': 'USD', 'America/Denver': 'USD',
  'America/Los_Angeles': 'USD', 'America/Anchorage': 'USD', 'Pacific/Honolulu': 'USD',
  'America/Toronto': 'CAD', 'America/Vancouver': 'CAD', 'America/Edmonton': 'CAD',
  'America/Mexico_City': 'MXN', 'America/Cancun': 'MXN', 'America/Tijuana': 'MXN',
  'America/Sao_Paulo': 'BRL', 'America/Argentina/Buenos_Aires': 'ARS', 'America/Santiago': 'CLP',
  'America/Bogota': 'COP', 'America/Lima': 'PEN',
  'Europe/London': 'GBP', 'Europe/Paris': 'EUR', 'Europe/Berlin': 'EUR',
  'Europe/Madrid': 'EUR', 'Europe/Rome': 'EUR', 'Europe/Amsterdam': 'EUR',
  'Europe/Brussels': 'EUR', 'Europe/Vienna': 'EUR', 'Europe/Dublin': 'EUR',
  'Europe/Helsinki': 'EUR', 'Europe/Lisbon': 'EUR', 'Europe/Athens': 'EUR',
  'Europe/Bucharest': 'RON', 'Europe/Sofia': 'BGN', 'Europe/Warsaw': 'PLN',
  'Europe/Prague': 'CZK', 'Europe/Budapest': 'HUF', 'Europe/Stockholm': 'SEK',
  'Europe/Oslo': 'NOK', 'Europe/Copenhagen': 'DKK', 'Atlantic/Reykjavik': 'ISK',
  'Europe/Zurich': 'CHF', 'Europe/Moscow': 'RUB', 'Europe/Istanbul': 'TRY',
  'Asia/Shanghai': 'CNY', 'Asia/Chongqing': 'CNY', 'Asia/Urumqi': 'CNY',
  'Asia/Hong_Kong': 'HKD', 'Asia/Taipei': 'TWD', 'Asia/Tokyo': 'JPY',
  'Asia/Seoul': 'KRW', 'Asia/Singapore': 'SGD', 'Asia/Kuala_Lumpur': 'MYR',
  'Asia/Bangkok': 'THB', 'Asia/Ho_Chi_Minh': 'VND', 'Asia/Manila': 'PHP',
  'Asia/Jakarta': 'IDR', 'Asia/Kolkata': 'INR', 'Asia/Dubai': 'AED',
  'Asia/Riyadh': 'SAR', 'Asia/Qatar': 'QAR', 'Asia/Kuwait': 'KWD',
  'Asia/Jerusalem': 'ILS', 'Africa/Cairo': 'EGP', 'Africa/Johannesburg': 'ZAR',
  'Africa/Lagos': 'NGN', 'Africa/Nairobi': 'KES', 'Australia/Sydney': 'AUD',
  'Australia/Melbourne': 'AUD', 'Australia/Perth': 'AUD', 'Pacific/Auckland': 'NZD',
}

export const supportedCurrencies = Object.keys(currencyInfo)
export const COMMON_CURRENCIES = ['USD', 'EUR', 'CNY', 'JPY', 'HKD', 'TWD', 'KRW', 'GBP', 'SGD', 'AUD', 'CAD', 'THB']

export function getCurrencyForCountry(country: string) {
  return countryToCurrency[country.toUpperCase()] || 'USD'
}

export function getCurrencyForTimezone(tz: string) {
  return timezoneToCurrency[tz] || null
}

export function getCurrencyInfo(code: string) {
  return currencyInfo[code] || { name: code, flag: code, symbol: code }
}

export function normalizeCurrency(value: string) {
  return value.trim().toUpperCase().slice(0, 3)
}
