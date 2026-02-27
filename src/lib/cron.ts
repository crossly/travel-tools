// Major base currencies to pre-cache
const BASE_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'AUD', 'CAD', 'CHF'];

export async function cronHandler(kv: KVNamespace) {
  const results = await Promise.allSettled(
    BASE_CURRENCIES.map(async (base) => {
      const res = await fetch(`https://api.frankfurter.app/latest?base=${base}`);
      if (!res.ok) throw new Error(`Failed for ${base}: ${res.status}`);

      const data = await res.json() as any;
      const result = {
        base: data.base,
        date: data.date,
        rates: data.rates,
        updatedAt: new Date().toISOString(),
      };

      await kv.put(`rates:${base}`, JSON.stringify(result), { expirationTtl: 3600 });
      return base;
    })
  );

  const succeeded = results.filter(r => r.status === 'fulfilled').length;
  console.log(`Cron: updated ${succeeded}/${BASE_CURRENCIES.length} rate sets`);
}
