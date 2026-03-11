const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const script = fs.readFileSync(path.join(__dirname, '..', 'apps', 'web', 'public', 'sw.js'), 'utf8');

test('service worker defines travel-tools cache and localized static files', () => {
  assert.match(script, /travel-tools-static-v2/);
  assert.match(script, /'\/zh-CN'/);
  assert.match(script, /'\/en-US'/);
});

test('service worker bypasses api requests and falls back to cached root', () => {
  assert.match(script, /if \(url\.pathname\.startsWith\('\/api\/'\)\) return;/);
  assert.match(script, /catch\(\(\) => caches\.match\('\/'\)\)/);
});
