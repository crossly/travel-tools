import { createContext, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { APP_NAME, DEFAULT_LOCALE, SUPPORTED_LOCALES, isLocale } from '@/lib/site'
import { coreMessages } from '@/lib/i18n/catalog/core'
import { routeMetaMessages } from '@/lib/i18n/catalog/route-meta'
import { readStoredLocale, writeStoredLocale } from '@/lib/storage'
import type { Messages, TranslationValues } from '@/lib/i18n/types'
import type { Locale } from '@/lib/types'

const messages: Messages = {
  'zh-CN': { ...coreMessages['zh-CN'], ...routeMetaMessages['zh-CN'] },
  'en-US': { ...coreMessages['en-US'], ...routeMetaMessages['en-US'] },
}

const loadedCatalogs = new Set<string>()

export function registerMessages(name: string, catalog: Messages) {
  if (loadedCatalogs.has(name)) return
  loadedCatalogs.add(name)

  for (const locale of SUPPORTED_LOCALES) {
    Object.assign(messages[locale], catalog[locale] ?? {})
  }
}

export function interpolate(template: string, values?: TranslationValues) {
  if (!values) return template
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''))
}

export function translate(locale: Locale, key: string, values?: TranslationValues) {
  return interpolate(messages[locale][key] ?? messages[DEFAULT_LOCALE][key] ?? key, values)
}

export function translateError(locale: Locale, code: string) {
  return messages[locale][`error.${code}`] ?? messages[DEFAULT_LOCALE][`error.${code}`] ?? code
}

export function buildDocumentTitle(locale: Locale, pageTitle?: string | null) {
  const appName = translate(locale, 'app.name') || APP_NAME
  if (!pageTitle || pageTitle === appName) return appName
  return `${pageTitle} · ${appName}`
}

export function detectInitialLocale(pathLocale?: string): Locale {
  if (isLocale(pathLocale)) return pathLocale
  const stored = readStoredLocale()
  if (stored) return stored
  if (typeof navigator !== 'undefined') {
    const preferred = navigator.language
    if (preferred.toLowerCase().startsWith('en')) return 'en-US'
  }
  return DEFAULT_LOCALE
}

type I18nContextValue = {
  locale: Locale
  t: (key: string, values?: Record<string, string | number>) => string
  tError: (code: string) => string
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({
  children,
  locale,
  onLocaleChange,
}: {
  children: ReactNode
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}) {
  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      t: (key, values) => translate(locale, key, values),
      tError: (code) => translateError(locale, code),
      setLocale: (nextLocale) => {
        writeStoredLocale(nextLocale)
        onLocaleChange(nextLocale)
      },
    }),
    [locale, onLocaleChange],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}
