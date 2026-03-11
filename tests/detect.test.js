const test = require('node:test');
const assert = require('node:assert/strict');
const { detectHandler } = require('../.test-dist/apps/worker/src/api/detect.js');
const { createJsonResponder } = require('./helpers.js');

test('detectHandler prefers timezone currency when it conflicts with IP country currency', () => {
  const responder = createJsonResponder();
  const ctx = {
    req: {
      raw: { cf: { country: 'US' } },
      query: (key) => (key === 'tz' ? 'Asia/Shanghai' : ''),
    },
    json: responder.json,
  };

  const result = detectHandler(ctx);

  assert.equal(result.status, 200);
  assert.equal(result.payload.currency, 'CNY');
  assert.equal(result.payload.detectedVia, 'timezone');
  assert.equal(result.payload.country, 'US');
  assert.equal(result.payload.tz, 'Asia/Shanghai');
});

test('detectHandler falls back to IP currency when timezone is missing', () => {
  const responder = createJsonResponder();
  const ctx = {
    req: {
      raw: { cf: { country: 'GB' } },
      query: () => '',
    },
    json: responder.json,
  };

  const result = detectHandler(ctx);

  assert.equal(result.status, 200);
  assert.equal(result.payload.currency, 'GBP');
  assert.equal(result.payload.detectedVia, 'ip');
  assert.equal(result.payload.tzCurrency, null);
});
