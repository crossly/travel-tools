import type { Context } from 'hono';

export const ratesHandler = async (c: Context<{ Bindings: { RATES_KV: KVNamespace } }>) => {
  const base = c.req.query('base') || 'USD';
  const kvKey = `rates:${base}`;

  // Try KV cache first
  const cached = await c.env.RATES_KV.get(kvKey, 'json') as any;
  if (cached) {
    return c.json({ ...cached, cached: true });
  }

  // Fetch from frankfurter.app
  try {
    const res = await fetch(`https://api.frankfurter.app/latest?base=${base}`);
    if (!res.ok) throw new Error(`Frankfurter API error: ${res.status}`);

    const data = await res.json() as any;
    const result = {
      base: data.base,
      date: data.date,
      rates: data.rates,
      updatedAt: new Date().toISOString(),
    };

    // Cache in KV for 1 hour
    await c.env.RATES_KV.put(kvKey, JSON.stringify(result), { expirationTtl: 3600 });

    return c.json({ ...result, cached: false });
  } catch (err) {
    return c.json({ error: 'Failed to fetch rates' }, 500);
  }
};
