const test = require('node:test');
const assert = require('node:assert/strict');
const { swJs } = require('../.test-dist/src/static/sw.js');

test('service worker API fallback emits explicit 503 response when offline cache is empty', () => {
  const script = swJs('v-test');

  assert.match(script, /offline_no_cache/);
  assert.match(script, /status:\s*503/);
  assert.match(script, /return caches\.match\(e\.request\)\.then/);
});

test('service worker only writes successful API responses into cache', () => {
  const script = swJs('v-test');

  assert.match(script, /if \(res && res\.ok\)/);
  assert.match(script, /cache\.put\(e\.request, clone\)/);
});
