import { openDB } from 'idb';
import { STORAGE_KEYS, migrateLegacyStorage, readTheme, writeTheme, type SiteTheme } from '@travel-tools/shared/storage';
import type { DeviceIdentity, OfflineOperation } from './types';

const dbPromise = openDB('travel-tools-offline', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('ops')) {
      db.createObjectStore('ops', { keyPath: 'opId' });
    }
  },
});

let migrated = false;

function getStorage(): Storage | null {
  if (typeof localStorage === 'undefined') return null;
  if (!migrated) {
    migrateLegacyStorage(localStorage);
    migrated = true;
  }
  return localStorage;
}

export function readSiteTheme(): SiteTheme {
  const storage = getStorage();
  return storage ? readTheme(storage) : 'system';
}

export function writeSiteTheme(theme: SiteTheme): void {
  const storage = getStorage();
  if (!storage) return;
  writeTheme(theme, storage);
}

export function readDevice(): DeviceIdentity | null {
  const storage = getStorage();
  const raw = storage?.getItem(STORAGE_KEYS.device);
  return raw ? (JSON.parse(raw) as DeviceIdentity) : null;
}

export function writeDevice(device: DeviceIdentity): void {
  getStorage()?.setItem(STORAGE_KEYS.device, JSON.stringify(device));
}

export function readActiveTripId(): string | null {
  return getStorage()?.getItem(STORAGE_KEYS.activeTripId) ?? null;
}

export function writeActiveTripId(tripId: string): void {
  getStorage()?.setItem(STORAGE_KEYS.activeTripId, tripId);
}

export function readLastTool(): string | null {
  return getStorage()?.getItem(STORAGE_KEYS.lastTool) ?? null;
}

export function writeLastTool(toolSlug: string): void {
  getStorage()?.setItem(STORAGE_KEYS.lastTool, toolSlug);
}

export function readCurrencyPrefs(): { source: string; target: string } {
  const storage = getStorage();
  return {
    source: storage?.getItem(STORAGE_KEYS.currencySource) ?? 'USD',
    target: storage?.getItem(STORAGE_KEYS.currencyTarget) ?? 'EUR',
  };
}

export function writeCurrencyPrefs(source: string, target: string): void {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.currencySource, source);
  storage.setItem(STORAGE_KEYS.currencyTarget, target);
}

export function readCachedCurrencyRates(): { raw: string | null; updatedAt: string | null } {
  const storage = getStorage();
  return {
    raw: storage?.getItem(STORAGE_KEYS.currencyRates) ?? null,
    updatedAt: storage?.getItem(STORAGE_KEYS.currencyRatesUpdatedAt) ?? null,
  };
}

export function writeCachedCurrencyRates(raw: string, updatedAt: string): void {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.currencyRates, raw);
  storage.setItem(STORAGE_KEYS.currencyRatesUpdatedAt, updatedAt);
}

export async function enqueueOperation(op: OfflineOperation): Promise<void> {
  const db = await dbPromise;
  await db.put('ops', op);
}

export async function listOperations(tripId?: string): Promise<OfflineOperation[]> {
  const db = await dbPromise;
  const all = (await db.getAll('ops')) as OfflineOperation[];
  return tripId ? all.filter((op) => op.tripId === tripId) : all;
}

export async function removeOperation(opId: string): Promise<void> {
  const db = await dbPromise;
  await db.delete('ops', opId);
}

export async function clearOperations(): Promise<void> {
  const db = await dbPromise;
  await db.clear('ops');
}
