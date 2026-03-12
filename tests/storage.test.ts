// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest'
import { DEVICE_COOKIE_KEYS } from '@/lib/device-cookie'
import { SITE_COOKIE_KEYS } from '@/lib/site'
import { readCurrencyPrefs, readDevice, readStoredLocale, readTheme, STORAGE_KEYS, writeDevice, writeStoredLocale, writeTheme } from '@/lib/storage'

const createStorage = () => {
  const store = new Map<string, string>()
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value)
    },
    clear: () => {
      store.clear()
    },
  }
}

describe('theme storage', () => {
  beforeEach(() => {
    const localStorage = createStorage()
    Object.defineProperty(window, 'localStorage', { value: localStorage, configurable: true })
    Object.defineProperty(globalThis, 'localStorage', { value: localStorage, configurable: true })
    localStorage.clear()
  })

  it('defaults to system', () => {
    expect(readTheme()).toBe('system')
  })

  it('persists the selected theme', () => {
    writeTheme('dark')
    expect(localStorage.getItem(STORAGE_KEYS.theme)).toBe('dark')
    expect(readTheme()).toBe('dark')
  })
})

describe('device storage', () => {
  beforeEach(() => {
    document.cookie = `${DEVICE_COOKIE_KEYS.id}=; Max-Age=0; Path=/`
    document.cookie = `${DEVICE_COOKIE_KEYS.displayName}=; Max-Age=0; Path=/`
    localStorage.clear()
  })

  it('writes device identity to localStorage and cookies', () => {
    writeDevice({ deviceId: 'dev_123', displayName: '🐼 Panda' })

    expect(localStorage.getItem(STORAGE_KEYS.device)).toBe(JSON.stringify({ deviceId: 'dev_123', displayName: '🐼 Panda' }))
    expect(document.cookie).toContain(`${DEVICE_COOKIE_KEYS.id}=dev_123`)
    expect(document.cookie).toContain(`${DEVICE_COOKIE_KEYS.displayName}=%F0%9F%90%BC%20Panda`)
  })

  it('hydrates localStorage from cookies when storage is empty', () => {
    document.cookie = `${DEVICE_COOKIE_KEYS.id}=dev_cookie; Path=/`
    document.cookie = `${DEVICE_COOKIE_KEYS.displayName}=%F0%9F%90%BB%20Bear; Path=/`

    expect(readDevice()).toEqual({ deviceId: 'dev_cookie', displayName: '🐻 Bear' })
    expect(localStorage.getItem(STORAGE_KEYS.device)).toBe(JSON.stringify({ deviceId: 'dev_cookie', displayName: '🐻 Bear' }))
  })
})

describe('locale storage', () => {
  beforeEach(() => {
    document.cookie = `${SITE_COOKIE_KEYS.locale}=; Max-Age=0; Path=/`
    localStorage.clear()
  })

  it('writes locale to localStorage and cookie', () => {
    writeStoredLocale('en-US')

    expect(localStorage.getItem(STORAGE_KEYS.locale)).toBe('en-US')
    expect(document.cookie).toContain(`${SITE_COOKIE_KEYS.locale}=en-US`)
  })

  it('hydrates locale from cookie when storage is empty', () => {
    document.cookie = `${SITE_COOKIE_KEYS.locale}=zh-CN; Path=/`

    expect(readStoredLocale()).toBe('zh-CN')
    expect(localStorage.getItem(STORAGE_KEYS.locale)).toBe('zh-CN')
  })

  it('hydrates currency prefs from cookies when storage is empty', () => {
    document.cookie = `${SITE_COOKIE_KEYS.currencySource}=JPY; Path=/`
    document.cookie = `${SITE_COOKIE_KEYS.currencyTarget}=CNY; Path=/`

    expect(readCurrencyPrefs()).toEqual({ source: 'JPY', target: 'CNY' })
    expect(localStorage.getItem(STORAGE_KEYS.currencySource)).toBe('JPY')
    expect(localStorage.getItem(STORAGE_KEYS.currencyTarget)).toBe('CNY')
  })
})
