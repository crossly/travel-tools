import type { DeviceIdentity, SiteTheme } from './types'

export const STORAGE_KEYS = {
  locale: 'travel-tools:site:locale',
  theme: 'travel-tools:site:theme',
  lastTool: 'travel-tools:site:last-tool',
  device: 'travel-tools:split-bill:device',
  activeTripId: 'travel-tools:split-bill:active-trip',
  currencySource: 'travel-tools:currency:source',
  currencyTarget: 'travel-tools:currency:target',
  currencyRates: 'travel-tools:currency:rates',
  currencyRatesUpdatedAt: 'travel-tools:currency:rates-updated-at',
} as const

function getStorage() {
  if (typeof window === 'undefined') return null
  return window.localStorage
}

let migrated = false

export function migrateLegacyStorage() {
  if (migrated) return
  const storage = getStorage()
  if (!storage) return

  const copyIfMissing = (nextKey: string, legacyKey: string) => {
    if (!storage.getItem(nextKey) && storage.getItem(legacyKey)) {
      storage.setItem(nextKey, storage.getItem(legacyKey) as string)
    }
  }

  copyIfMissing(STORAGE_KEYS.device, 'split-bill-device')
  copyIfMissing(STORAGE_KEYS.activeTripId, 'split-bill-active-trip')
  copyIfMissing(STORAGE_KEYS.currencySource, 'tc_source')
  copyIfMissing(STORAGE_KEYS.currencyTarget, 'tc_target')

  if (!storage.getItem(STORAGE_KEYS.currencySource) && storage.getItem('tc_setup_done')) {
    storage.setItem(STORAGE_KEYS.currencySource, 'USD')
  }
  if (!storage.getItem(STORAGE_KEYS.currencyTarget) && storage.getItem('tc_setup_done')) {
    storage.setItem(STORAGE_KEYS.currencyTarget, 'EUR')
  }

  migrated = true
}

export function readTheme(): SiteTheme {
  migrateLegacyStorage()
  const raw = getStorage()?.getItem(STORAGE_KEYS.theme)
  return raw === 'light' || raw === 'dark' || raw === 'system' ? raw : 'system'
}

export function writeTheme(theme: SiteTheme) {
  getStorage()?.setItem(STORAGE_KEYS.theme, theme)
}

export function readStoredLocale() {
  migrateLegacyStorage()
  const raw = getStorage()?.getItem(STORAGE_KEYS.locale)
  return raw === 'zh-CN' || raw === 'en-US' ? raw : null
}

export function writeStoredLocale(locale: string) {
  getStorage()?.setItem(STORAGE_KEYS.locale, locale)
}

export function readLastTool() {
  migrateLegacyStorage()
  return getStorage()?.getItem(STORAGE_KEYS.lastTool) ?? null
}

export function writeLastTool(slug: string) {
  getStorage()?.setItem(STORAGE_KEYS.lastTool, slug)
}

export function readDevice() {
  migrateLegacyStorage()
  const raw = getStorage()?.getItem(STORAGE_KEYS.device)
  return raw ? (JSON.parse(raw) as DeviceIdentity) : null
}

export function writeDevice(device: DeviceIdentity) {
  getStorage()?.setItem(STORAGE_KEYS.device, JSON.stringify(device))
}

export function readActiveTripId() {
  migrateLegacyStorage()
  return getStorage()?.getItem(STORAGE_KEYS.activeTripId) ?? null
}

export function writeActiveTripId(tripId: string) {
  getStorage()?.setItem(STORAGE_KEYS.activeTripId, tripId)
}

export function readCurrencyPrefs() {
  migrateLegacyStorage()
  const storage = getStorage()
  return {
    source: storage?.getItem(STORAGE_KEYS.currencySource) ?? 'USD',
    target: storage?.getItem(STORAGE_KEYS.currencyTarget) ?? 'EUR',
  }
}

export function writeCurrencyPrefs(source: string, target: string) {
  const storage = getStorage()
  if (!storage) return
  storage.setItem(STORAGE_KEYS.currencySource, source)
  storage.setItem(STORAGE_KEYS.currencyTarget, target)
}

export function readCachedCurrencyRates() {
  migrateLegacyStorage()
  const storage = getStorage()
  return {
    raw: storage?.getItem(STORAGE_KEYS.currencyRates) ?? null,
    updatedAt: storage?.getItem(STORAGE_KEYS.currencyRatesUpdatedAt) ?? null,
  }
}

export function writeCachedCurrencyRates(raw: string, updatedAt: string) {
  const storage = getStorage()
  if (!storage) return
  storage.setItem(STORAGE_KEYS.currencyRates, raw)
  storage.setItem(STORAGE_KEYS.currencyRatesUpdatedAt, updatedAt)
}
