export const COMMON_CURRENCIES = [
  'CNY',
  'USD',
  'EUR',
  'JPY',
  'HKD',
  'GBP',
  'AUD',
  'CAD',
  'SGD',
  'KRW',
  'THB',
  'MYR',
  'IDR',
  'PHP',
  'VND',
  'INR',
  'TWD',
  'CHF',
  'SEK',
  'NZD',
];

const CURRENCY_EMOJI: Record<string, string> = {
  CNY: '🇨🇳',
  USD: '🇺🇸',
  EUR: '🇪🇺',
  JPY: '🇯🇵',
  HKD: '🇭🇰',
  GBP: '🇬🇧',
  AUD: '🇦🇺',
  CAD: '🇨🇦',
  SGD: '🇸🇬',
  KRW: '🇰🇷',
  THB: '🇹🇭',
  MYR: '🇲🇾',
  IDR: '🇮🇩',
  PHP: '🇵🇭',
  VND: '🇻🇳',
  INR: '🇮🇳',
  TWD: '🇹🇼',
  CHF: '🇨🇭',
  SEK: '🇸🇪',
  NZD: '🇳🇿',
};

export function normalizeCurrency(value: string): string {
  return value.trim().toUpperCase();
}

export function getCurrencyEmoji(code: string): string {
  return CURRENCY_EMOJI[normalizeCurrency(code)] ?? '💱';
}

export function formatCurrencyOption(code: string): string {
  const normalized = normalizeCurrency(code);
  return `${getCurrencyEmoji(normalized)} ${normalized}`;
}
