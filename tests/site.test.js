const test = require('node:test');
const assert = require('node:assert/strict');

const {
  DEFAULT_LOCALE,
  getLocalizedPath,
  resolveLocaleFromPath,
  getEnabledTools,
} = require('../.test-dist/packages/shared/src/site.js');

test('resolveLocaleFromPath returns locale from localized route and strips it from pathname', () => {
  assert.deepEqual(resolveLocaleFromPath('/en-US/tools/currency'), {
    locale: 'en-US',
    pathname: '/tools/currency',
  });
});

test('resolveLocaleFromPath falls back to default locale for unlocalized routes', () => {
  assert.deepEqual(resolveLocaleFromPath('/tools/split-bill'), {
    locale: DEFAULT_LOCALE,
    pathname: '/tools/split-bill',
  });
});

test('getLocalizedPath prefixes locale and preserves root path', () => {
  assert.equal(getLocalizedPath('zh-CN', '/'), '/zh-CN');
  assert.equal(getLocalizedPath('en-US', 'tools/currency'), '/en-US/tools/currency');
});

test('tool registry exposes currency and split-bill as enabled tools', () => {
  const slugs = getEnabledTools().map((tool) => tool.slug).sort();
  assert.deepEqual(slugs, ['currency', 'split-bill']);
});
