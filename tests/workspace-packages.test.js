const test = require('node:test');
const assert = require('node:assert/strict');

const { getEnabledTools } = require('../.test-dist/packages/shared/src/site.js');
const { translate } = require('../.test-dist/packages/i18n/src/index.js');

test('workspace shared package exposes tool registry', () => {
  assert.deepEqual(
    getEnabledTools().map((tool) => tool.slug).sort(),
    ['currency', 'split-bill'],
  );
});

test('workspace i18n package exposes translations', () => {
  assert.equal(translate('en-US', 'tool.currency.name'), 'Currency Converter');
});
