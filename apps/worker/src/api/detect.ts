import type { Context } from 'hono';
import { getCurrencyForCountry, getCurrencyForTimezone, getCurrencyInfo } from '@travel-tools/shared/currencies';

export const detectHandler = (c: Context) => {
  const cf = (c.req.raw as Request & { cf?: IncomingRequestCfProperties }).cf;
  const country = cf?.country || 'US';
  const ipCurrency = getCurrencyForCountry(country);

  const tz = c.req.query('tz') || '';
  const tzCurrency = tz ? getCurrencyForTimezone(tz) : null;
  // Prefer timezone-based currency when it differs from IP (VPN scenario)
  const currency = (tzCurrency && tzCurrency !== ipCurrency) ? tzCurrency : ipCurrency;
  const info = getCurrencyInfo(currency);

  return c.json({
    country,
    currency,
    name: info.name,
    flag: info.flag,
    symbol: info.symbol,
    tz,
    tzCurrency: tzCurrency || null,
    detectedVia: (tzCurrency && tzCurrency !== ipCurrency) ? 'timezone' : 'ip',
  });
};
