import { buildPersistentCookieString, parseCookieHeader } from './cookie'
import { DEVICE_COOKIE_KEYS, buildDeviceCookieString, getDeviceIdentityFromCookie } from './device-cookie'
import { SITE_COOKIE_KEYS } from './site'
import type { DeviceIdentity, JetLagPrefs, PackingList, SiteTheme } from './types'

export const STORAGE_KEYS = {
  locale: 'route-crate:site:locale',
  theme: 'route-crate:site:theme',
  lastTool: 'route-crate:site:last-tool',
  device: 'route-crate:split-bill:device',
  activeTripId: 'route-crate:split-bill:active-trip',
  packingLists: 'route-crate:packing-list:lists',
  activePackingListId: 'route-crate:packing-list:active-list',
  jetLagPrefs: 'route-crate:jet-lag:prefs',
  currencySource: 'route-crate:currency:source',
  currencyTarget: 'route-crate:currency:target',
  currencyRates: 'route-crate:currency:rates',
  currencyRatesUpdatedAt: 'route-crate:currency:rates-updated-at',
} as const

const PREVIOUS_STORAGE_KEYS = {
  locale: 'travel-tools:site:locale',
  theme: 'travel-tools:site:theme',
  lastTool: 'travel-tools:site:last-tool',
  device: 'travel-tools:split-bill:device',
  activeTripId: 'travel-tools:split-bill:active-trip',
  packingLists: 'travel-tools:packing-list:lists',
  activePackingListId: 'travel-tools:packing-list:active-list',
  jetLagPrefs: 'travel-tools:jet-lag:prefs',
  currencySource: 'travel-tools:currency:source',
  currencyTarget: 'travel-tools:currency:target',
  currencyRates: 'travel-tools:currency:rates',
  currencyRatesUpdatedAt: 'travel-tools:currency:rates-updated-at',
} as const

function getStorage() {
  if (typeof window === 'undefined') return null
  return window.localStorage
}

function writeCookieValue(key: string, value: string) {
  if (typeof document === 'undefined') return
  document.cookie = buildDeviceCookieString(key, value)
}

let migrated = false

export function resetStorageMigrationForTests() {
  migrated = false
}

export function migrateLegacyStorage() {
  if (migrated) return
  const storage = getStorage()
  if (!storage) return

  const copyIfMissing = (nextKey: string, legacyKey: string) => {
    if (!storage.getItem(nextKey) && storage.getItem(legacyKey)) {
      storage.setItem(nextKey, storage.getItem(legacyKey) as string)
    }
  }

  copyIfMissing(STORAGE_KEYS.locale, PREVIOUS_STORAGE_KEYS.locale)
  copyIfMissing(STORAGE_KEYS.theme, PREVIOUS_STORAGE_KEYS.theme)
  copyIfMissing(STORAGE_KEYS.lastTool, PREVIOUS_STORAGE_KEYS.lastTool)
  copyIfMissing(STORAGE_KEYS.device, PREVIOUS_STORAGE_KEYS.device)
  copyIfMissing(STORAGE_KEYS.activeTripId, PREVIOUS_STORAGE_KEYS.activeTripId)
  copyIfMissing(STORAGE_KEYS.packingLists, PREVIOUS_STORAGE_KEYS.packingLists)
  copyIfMissing(STORAGE_KEYS.activePackingListId, PREVIOUS_STORAGE_KEYS.activePackingListId)
  copyIfMissing(STORAGE_KEYS.jetLagPrefs, PREVIOUS_STORAGE_KEYS.jetLagPrefs)
  copyIfMissing(STORAGE_KEYS.currencySource, PREVIOUS_STORAGE_KEYS.currencySource)
  copyIfMissing(STORAGE_KEYS.currencyTarget, PREVIOUS_STORAGE_KEYS.currencyTarget)
  copyIfMissing(STORAGE_KEYS.currencyRates, PREVIOUS_STORAGE_KEYS.currencyRates)
  copyIfMissing(STORAGE_KEYS.currencyRatesUpdatedAt, PREVIOUS_STORAGE_KEYS.currencyRatesUpdatedAt)

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
  if (raw === 'zh-CN' || raw === 'en-US') return raw

  const cookieLocale = parseCookieHeader(typeof document === 'undefined' ? null : document.cookie).get(SITE_COOKIE_KEYS.locale)
  if (cookieLocale === 'zh-CN' || cookieLocale === 'en-US') {
    getStorage()?.setItem(STORAGE_KEYS.locale, cookieLocale)
    return cookieLocale
  }

  return null
}

export function writeStoredLocale(locale: string) {
  getStorage()?.setItem(STORAGE_KEYS.locale, locale)
  if (typeof document !== 'undefined') {
    document.cookie = buildPersistentCookieString(SITE_COOKIE_KEYS.locale, locale)
  }
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
  if (raw) {
    try {
      return JSON.parse(raw) as DeviceIdentity
    } catch {
      getStorage()?.removeItem?.(STORAGE_KEYS.device)
    }
  }

  const device = getDeviceIdentityFromCookie(typeof document === 'undefined' ? null : document.cookie)
  if (device) {
    getStorage()?.setItem(STORAGE_KEYS.device, JSON.stringify(device))
    return device
  }

  return null
}

export function writeDevice(device: DeviceIdentity) {
  getStorage()?.setItem(STORAGE_KEYS.device, JSON.stringify(device))
  writeCookieValue(DEVICE_COOKIE_KEYS.id, device.deviceId)
  writeCookieValue(DEVICE_COOKIE_KEYS.displayName, device.displayName)
}

export function readActiveTripId() {
  migrateLegacyStorage()
  return getStorage()?.getItem(STORAGE_KEYS.activeTripId) ?? null
}

export function writeActiveTripId(tripId: string) {
  getStorage()?.setItem(STORAGE_KEYS.activeTripId, tripId)
}

export function clearActiveTripId() {
  getStorage()?.removeItem?.(STORAGE_KEYS.activeTripId)
}

export function readPackingLists() {
  migrateLegacyStorage()
  const raw = getStorage()?.getItem(STORAGE_KEYS.packingLists)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed as PackingList[] : []
  } catch {
    getStorage()?.removeItem?.(STORAGE_KEYS.packingLists)
    return []
  }
}

export function writePackingLists(lists: PackingList[]) {
  getStorage()?.setItem(STORAGE_KEYS.packingLists, JSON.stringify(lists))
}

export function readActivePackingListId() {
  migrateLegacyStorage()
  return getStorage()?.getItem(STORAGE_KEYS.activePackingListId) ?? null
}

export function writeActivePackingListId(listId: string) {
  getStorage()?.setItem(STORAGE_KEYS.activePackingListId, listId)
}

export function clearActivePackingListId() {
  getStorage()?.removeItem?.(STORAGE_KEYS.activePackingListId)
}

export function readJetLagPrefs() {
  migrateLegacyStorage()
  const raw = getStorage()?.getItem(STORAGE_KEYS.jetLagPrefs)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as Partial<JetLagPrefs>
    if (
      typeof parsed.originTimeZone !== 'string'
      || typeof parsed.destinationTimeZone !== 'string'
      || typeof parsed.departureAt !== 'string'
      || typeof parsed.arrivalAt !== 'string'
      || (parsed.intensity !== 'light' && parsed.intensity !== 'moderate' && parsed.intensity !== 'heavy')
    ) {
      return null
    }

    return parsed as JetLagPrefs
  } catch {
    getStorage()?.removeItem?.(STORAGE_KEYS.jetLagPrefs)
    return null
  }
}

export function writeJetLagPrefs(prefs: JetLagPrefs) {
  getStorage()?.setItem(STORAGE_KEYS.jetLagPrefs, JSON.stringify(prefs))
}

export function readCurrencyPrefs() {
  migrateLegacyStorage()
  const storage = getStorage()
  const cookies = parseCookieHeader(typeof document === 'undefined' ? null : document.cookie)
  const source = storage?.getItem(STORAGE_KEYS.currencySource) ?? cookies.get(SITE_COOKIE_KEYS.currencySource) ?? 'USD'
  const target = storage?.getItem(STORAGE_KEYS.currencyTarget) ?? cookies.get(SITE_COOKIE_KEYS.currencyTarget) ?? 'EUR'

  if (!storage?.getItem(STORAGE_KEYS.currencySource) && source) {
    storage?.setItem(STORAGE_KEYS.currencySource, source)
  }
  if (!storage?.getItem(STORAGE_KEYS.currencyTarget) && target) {
    storage?.setItem(STORAGE_KEYS.currencyTarget, target)
  }

  return {
    source,
    target,
  }
}

export function writeCurrencyPrefs(source: string, target: string) {
  const storage = getStorage()
  if (!storage) return
  storage.setItem(STORAGE_KEYS.currencySource, source)
  storage.setItem(STORAGE_KEYS.currencyTarget, target)
  if (typeof document !== 'undefined') {
    document.cookie = buildPersistentCookieString(SITE_COOKIE_KEYS.currencySource, source)
    document.cookie = buildPersistentCookieString(SITE_COOKIE_KEYS.currencyTarget, target)
  }
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
