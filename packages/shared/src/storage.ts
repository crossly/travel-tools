export type StorageLike = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

export const STORAGE_KEYS = {
  locale: 'travel-tools:site:locale',
  lastTool: 'travel-tools:site:last-tool',
  theme: 'travel-tools:site:theme',
  device: 'travel-tools:split-bill:device',
  activeTripId: 'travel-tools:split-bill:active-trip',
  currencySource: 'travel-tools:currency:source',
  currencyTarget: 'travel-tools:currency:target',
  currencyRates: 'travel-tools:currency:rates',
  currencyRatesUpdatedAt: 'travel-tools:currency:rates-updated-at',
} as const;

export type LegacyMigrationResult = {
  deviceJson: string | null;
  activeTripId: string | null;
  currencySource: string | null;
  currencyTarget: string | null;
};

function copyIfMissing(storage: StorageLike, nextKey: string, legacyKey: string): string | null {
  const existing = storage.getItem(nextKey);
  if (existing) return existing;
  const legacy = storage.getItem(legacyKey);
  if (!legacy) return null;
  storage.setItem(nextKey, legacy);
  return legacy;
}

export function migrateLegacyStorage(storage: StorageLike): LegacyMigrationResult {
  const deviceJson = copyIfMissing(storage, STORAGE_KEYS.device, 'split-bill-device');
  const activeTripId = copyIfMissing(storage, STORAGE_KEYS.activeTripId, 'split-bill-active-trip');
  const currencySource = copyIfMissing(storage, STORAGE_KEYS.currencySource, 'tc_source');
  const currencyTarget = copyIfMissing(storage, STORAGE_KEYS.currencyTarget, 'tc_target');

  if (!storage.getItem(STORAGE_KEYS.currencySource) && storage.getItem('tc_setup_done')) {
    storage.setItem(STORAGE_KEYS.currencySource, currencySource ?? 'USD');
  }
  if (!storage.getItem(STORAGE_KEYS.currencyTarget) && storage.getItem('tc_setup_done')) {
    storage.setItem(STORAGE_KEYS.currencyTarget, currencyTarget ?? 'EUR');
  }

  return {
    deviceJson: storage.getItem(STORAGE_KEYS.device),
    activeTripId: storage.getItem(STORAGE_KEYS.activeTripId),
    currencySource: storage.getItem(STORAGE_KEYS.currencySource),
    currencyTarget: storage.getItem(STORAGE_KEYS.currencyTarget),
  };
}
