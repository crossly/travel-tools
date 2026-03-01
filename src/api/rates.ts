import type { Context } from 'hono';
import { supportedCurrencies } from '../lib/currencies';
import { buildRatesResult, RATES_TTL, FrankfurterResponse, RatesResult } from '../lib/rates-utils';

export const ratesHandler = async (c: Context<{ Bindings: { RATES_KV: KVNamespace } }>) => {
  const base = c.req.query('base') || 'USD';

  if (!supportedCurrencies.includes(base)) {
    return c.json({ error: `Unsupported base currency: ${base}` }, 400);
  }

  const kvKey = `rates:${base}`;

  // Try KV cache first
  const cached = await c.env.RATES_KV.get(kvKey, 'json') as RatesResult | null;
  if (cached) {
    return c.json({ ...cached, cached: true });
  }

  // Fetch from frankfurter.app
  try {
    const res = await fetch(`https://api.frankfurter.app/latest?base=${base}`);
    if (!res.ok) throw new Error(`Frankfurter API error: ${res.status}`);

    const data = await res.json() as FrankfurterResponse;
    const result = buildRatesResult(data);

    // Cache in KV for 1 hour
    await c.env.RATES_KV.put(kvKey, JSON.stringify(result), { expirationTtl: RATES_TTL });

    // Write a permanent backup key (no TTL) for fallback when API is down
    await c.env.RATES_KV.put(`rates_backup:${base}`, JSON.stringify(result));

    return c.json({ ...result, cached: false });
  } catch (err) {
    // Frankfurter API failed — try the permanent backup key as a last resort
    const backup = await c.env.RATES_KV.get(`rates_backup:${base}`, 'json') as RatesResult | null;
    if (backup) {
      return c.json({ ...backup, cached: true, stale: true });
    }

    return c.json({ error: 'Failed to fetch rates' }, 500);
  }
};
