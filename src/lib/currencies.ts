// ISO 3166 country code → ISO 4217 currency code
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
};

// Currency code → display info
export const currencyInfo: Record<string, { name: string; flag: string; symbol: string }> = {
  USD: { name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
  EUR: { name: 'Euro', flag: '🇪🇺', symbol: '€' },
  GBP: { name: 'British Pound', flag: '🇬🇧', symbol: '£' },
  JPY: { name: 'Japanese Yen', flag: '🇯🇵', symbol: '¥' },
  CNY: { name: 'Chinese Yuan', flag: '🇨🇳', symbol: '¥' },
  KRW: { name: 'South Korean Won', flag: '🇰🇷', symbol: '₩' },
  HKD: { name: 'Hong Kong Dollar', flag: '🇭🇰', symbol: 'HK$' },
  TWD: { name: 'New Taiwan Dollar', flag: '🇹🇼', symbol: 'NT$' },
  SGD: { name: 'Singapore Dollar', flag: '🇸🇬', symbol: 'S$' },
  AUD: { name: 'Australian Dollar', flag: '🇦🇺', symbol: 'A$' },
  NZD: { name: 'New Zealand Dollar', flag: '🇳🇿', symbol: 'NZ$' },
  CAD: { name: 'Canadian Dollar', flag: '🇨🇦', symbol: 'C$' },
  CHF: { name: 'Swiss Franc', flag: '🇨🇭', symbol: 'CHF' },
  SEK: { name: 'Swedish Krona', flag: '🇸🇪', symbol: 'kr' },
  NOK: { name: 'Norwegian Krone', flag: '🇳🇴', symbol: 'kr' },
  DKK: { name: 'Danish Krone', flag: '🇩🇰', symbol: 'kr' },
  PLN: { name: 'Polish Zloty', flag: '🇵🇱', symbol: 'zł' },
  CZK: { name: 'Czech Koruna', flag: '🇨🇿', symbol: 'Kč' },
  HUF: { name: 'Hungarian Forint', flag: '🇭🇺', symbol: 'Ft' },
  RON: { name: 'Romanian Leu', flag: '🇷🇴', symbol: 'lei' },
  BGN: { name: 'Bulgarian Lev', flag: '🇧🇬', symbol: 'лв' },
  HRK: { name: 'Croatian Kuna', flag: '🇭🇷', symbol: 'kn' },
  ISK: { name: 'Icelandic Króna', flag: '🇮🇸', symbol: 'kr' },
  RUB: { name: 'Russian Ruble', flag: '🇷🇺', symbol: '₽' },
  TRY: { name: 'Turkish Lira', flag: '🇹🇷', symbol: '₺' },
  BRL: { name: 'Brazilian Real', flag: '🇧🇷', symbol: 'R$' },
  MXN: { name: 'Mexican Peso', flag: '🇲🇽', symbol: 'Mex$' },
  ARS: { name: 'Argentine Peso', flag: '🇦🇷', symbol: 'AR$' },
  CLP: { name: 'Chilean Peso', flag: '🇨🇱', symbol: 'CL$' },
  COP: { name: 'Colombian Peso', flag: '🇨🇴', symbol: 'COL$' },
  PEN: { name: 'Peruvian Sol', flag: '🇵🇪', symbol: 'S/' },
  INR: { name: 'Indian Rupee', flag: '🇮🇳', symbol: '₹' },
  IDR: { name: 'Indonesian Rupiah', flag: '🇮🇩', symbol: 'Rp' },
  MYR: { name: 'Malaysian Ringgit', flag: '🇲🇾', symbol: 'RM' },
  THB: { name: 'Thai Baht', flag: '🇹🇭', symbol: '฿' },
  VND: { name: 'Vietnamese Dong', flag: '🇻🇳', symbol: '₫' },
  PHP: { name: 'Philippine Peso', flag: '🇵🇭', symbol: '₱' },
  PKR: { name: 'Pakistani Rupee', flag: '🇵🇰', symbol: '₨' },
  BDT: { name: 'Bangladeshi Taka', flag: '🇧🇩', symbol: '৳' },
  LKR: { name: 'Sri Lankan Rupee', flag: '🇱🇰', symbol: 'Rs' },
  AED: { name: 'UAE Dirham', flag: '🇦🇪', symbol: 'د.إ' },
  SAR: { name: 'Saudi Riyal', flag: '🇸🇦', symbol: '﷼' },
  QAR: { name: 'Qatari Riyal', flag: '🇶🇦', symbol: 'QR' },
  KWD: { name: 'Kuwaiti Dinar', flag: '🇰🇼', symbol: 'KD' },
  ILS: { name: 'Israeli Shekel', flag: '🇮🇱', symbol: '₪' },
  EGP: { name: 'Egyptian Pound', flag: '🇪🇬', symbol: 'E£' },
  ZAR: { name: 'South African Rand', flag: '🇿🇦', symbol: 'R' },
  NGN: { name: 'Nigerian Naira', flag: '🇳🇬', symbol: '₦' },
  KES: { name: 'Kenyan Shilling', flag: '🇰🇪', symbol: 'KSh' },
};

// All supported currency codes (from currencyInfo keys)
export const supportedCurrencies = Object.keys(currencyInfo);

// Get currency for a country code, with USD fallback
export function getCurrencyForCountry(country: string): string {
  return countryToCurrency[country.toUpperCase()] || 'USD';
}

// Get display info with fallback
export function getCurrencyInfo(code: string) {
  return currencyInfo[code] || { name: code, flag: '💱', symbol: code };
}
