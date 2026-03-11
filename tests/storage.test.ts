// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest'
import { readTheme, STORAGE_KEYS, writeTheme } from '@/lib/storage'

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
