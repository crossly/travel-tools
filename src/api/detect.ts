import type { Context } from 'hono';
import { getCurrencyForCountry, getCurrencyInfo } from '../lib/currencies';

export const detectHandler = (c: Context) => {
  const cf = (c.req.raw as any).cf;
  const country = cf?.country || 'US';
  const currency = getCurrencyForCountry(country);
  const info = getCurrencyInfo(currency);

  return c.json({
    country,
    currency,
    name: info.name,
    flag: info.flag,
    symbol: info.symbol,
  });
};
