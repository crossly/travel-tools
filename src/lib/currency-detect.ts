import { countryToCurrency, getCurrencyCatalogItem, normalizeCurrency } from './currencies'

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

export function getCurrencyForCountry(country: string) {
  return countryToCurrency[country.toUpperCase()] || 'USD'
}

export function getCurrencyForTimezone(tz: string) {
  return timezoneToCurrency[tz] || null
}

export function getCurrencyInfo(code: string) {
  const item = getCurrencyCatalogItem('en-US', normalizeCurrency(code))
  return {
    ...item,
    flag: item.countryCode ?? item.code,
  }
}
