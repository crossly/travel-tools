const test = require('node:test');
const assert = require('node:assert/strict');
const { ratesHandler } = require('../.test-dist/apps/worker/src/api/rates.js');
const { MemoryKV, createJsonResponder } = require('./helpers.js');

const originalFetch = globalThis.fetch;

function createContext(base, kv) {
  const responder = createJsonResponder();
  const ctx = {
    req: {
      query: (key) => (key === 'base' ? base : ''),
    },
    env: {
      RATES_KV: kv,
    },
    json: responder.json,
  };
  return { ctx, responder };
}

test('ratesHandler rejects unsupported base currency', async () => {
  const kv = new MemoryKV();
  const { ctx } = createContext('XXX', kv);

  const result = await ratesHandler(ctx);

  assert.equal(result.status, 400);
  assert.match(result.payload.error, /Unsupported base currency/);
});

test('ratesHandler returns cached rates from KV without calling upstream', async () => {
  const kv = new MemoryKV({
    'rates:USD': {
      base: 'USD',
      date: '2026-03-03',
      rates: { EUR: 0.91 },
      updatedAt: '2026-03-03T12:00:00.000Z',
    },
  });
  const { ctx } = createContext('USD', kv);

  globalThis.fetch = async () => {
    throw new Error('fetch should not be called');
  };

  const result = await ratesHandler(ctx);

  assert.equal(result.status, 200);
  assert.equal(result.payload.cached, true);
  assert.equal(result.payload.rates.EUR, 0.91);
});

test('ratesHandler falls back to backup key when upstream fetch fails', async () => {
  const kv = new MemoryKV({
    'rates_backup:USD': {
      base: 'USD',
      date: '2026-03-03',
      rates: { EUR: 0.9 },
      updatedAt: '2026-03-03T11:00:00.000Z',
    },
  });
  const { ctx } = createContext('USD', kv);

  globalThis.fetch = async () => {
    throw new Error('network down');
  };

  const result = await ratesHandler(ctx);

  assert.equal(result.status, 200);
  assert.equal(result.payload.cached, true);
  assert.equal(result.payload.stale, true);
  assert.equal(result.payload.rates.EUR, 0.9);
});

test('ratesHandler writes fresh rates and backup keys after successful upstream fetch', async () => {
  const kv = new MemoryKV();
  const { ctx } = createContext('USD', kv);

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        base: 'USD',
        date: '2026-03-03',
        rates: { EUR: 0.92, CNY: 7.2 },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  const result = await ratesHandler(ctx);

  assert.equal(result.status, 200);
  assert.equal(result.payload.cached, false);
  assert.equal(result.payload.base, 'USD');
  assert.equal(typeof result.payload.updatedAt, 'string');
  assert.equal(kv.has('rates:USD'), true);
  assert.equal(kv.has('rates_backup:USD'), true);
});

test.after(() => {
  globalThis.fetch = originalFetch;
});
