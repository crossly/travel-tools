const test = require('node:test');
const assert = require('node:assert/strict');

const {
  migrateLegacyStorage,
  STORAGE_KEYS,
} = require('../.test-dist/packages/shared/src/storage.js');

function createMemoryStorage(seed = {}) {
  const store = new Map(Object.entries(seed));
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
  };
}

test('migrateLegacyStorage promotes tiny-currency preferences into unified keys', () => {
  const storage = createMemoryStorage({
    tc_source: 'JPY',
    tc_target: 'USD',
    tc_setup_done: '1',
  });

  const result = migrateLegacyStorage(storage);

  assert.equal(result.currencySource, 'JPY');
  assert.equal(result.currencyTarget, 'USD');
  assert.equal(storage.getItem(STORAGE_KEYS.currencySource), 'JPY');
  assert.equal(storage.getItem(STORAGE_KEYS.currencyTarget), 'USD');
});

test('migrateLegacyStorage keeps split-bill device and active trip under new namespace', () => {
  const deviceJson = JSON.stringify({ deviceId: 'dev_1', displayName: 'Ricky' });
  const storage = createMemoryStorage({
    'split-bill-device': deviceJson,
    'split-bill-active-trip': 'trip_1',
  });

  const result = migrateLegacyStorage(storage);

  assert.equal(result.deviceJson, deviceJson);
  assert.equal(result.activeTripId, 'trip_1');
  assert.equal(storage.getItem(STORAGE_KEYS.device), deviceJson);
  assert.equal(storage.getItem(STORAGE_KEYS.activeTripId), 'trip_1');
});
