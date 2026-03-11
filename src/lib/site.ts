import type { Locale, ToolDefinition } from './types'

export const APP_NAME = 'Travel Tools'
export const DEFAULT_LOCALE: Locale = 'zh-CN'
export const SUPPORTED_LOCALES: Locale[] = ['zh-CN', 'en-US']

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
