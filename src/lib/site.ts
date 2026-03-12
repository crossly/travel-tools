import { parseCookieHeader } from './cookie'
import type { Locale, ToolDefinition } from './types'

export const APP_NAME = 'Travel Tools'
export const DEFAULT_LOCALE: Locale = 'en-US'
export const SUPPORTED_LOCALES: Locale[] = ['en-US', 'zh-CN']
export const SITE_COOKIE_KEYS = {
  locale: 'tt_site_locale',
  currencySource: 'tt_currency_source',
  currencyTarget: 'tt_currency_target',
} as const

export const TOOLS: ToolDefinition[] = [
  {
    id: 'tool_currency',
    slug: 'currency',
    nameKey: 'tool.currency.name',
    descriptionKey: 'tool.currency.description',
    entryPath: '/tools/currency',
  },
  {
    id: 'tool_split_bill',
    slug: 'split-bill',
    nameKey: 'tool.splitBill.name',
    descriptionKey: 'tool.splitBill.description',
    entryPath: '/tools/split-bill',
  },
]

export function isLocale(value: string | undefined | null): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale)
}

export function getLocalizedPath(locale: Locale, pathname: string) {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`
}

export function resolveLocaleFromPath(pathname: string) {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  const segments = normalized.split('/').filter(Boolean)
  const locale = isLocale(segments[0]) ? segments[0] : DEFAULT_LOCALE
  const rest = isLocale(segments[0]) ? `/${segments.slice(1).join('/')}` : normalized
  return {
    locale,
    pathname: rest === '/' ? '/' : rest.replace(/\/+$/, '') || '/',
  }
}

export function replaceLocaleInPath(pathname: string, locale: Locale) {
  const { pathname: rest } = resolveLocaleFromPath(pathname)
  return getLocalizedPath(locale, rest)
}

export function getToolBySlug(slug: ToolDefinition['slug']) {
  return TOOLS.find((tool) => tool.slug === slug)
}

export function resolveLocaleFromCookie(cookieHeader: string | null | undefined) {
  const locale = parseCookieHeader(cookieHeader).get(SITE_COOKIE_KEYS.locale)?.trim()
  return isLocale(locale) ? locale : null
}

export function resolveLocaleFromAcceptLanguage(acceptLanguage: string | null | undefined): Locale | null {
  if (!acceptLanguage) return null
  const normalized = acceptLanguage.toLowerCase()
  if (normalized.includes('zh')) return 'zh-CN'
  if (normalized.includes('en')) return 'en-US'
  return null
}

export function resolveRequestLocale(cookieHeader: string | null | undefined, acceptLanguage: string | null | undefined) {
  return resolveLocaleFromCookie(cookieHeader) ?? resolveLocaleFromAcceptLanguage(acceptLanguage) ?? DEFAULT_LOCALE
}
