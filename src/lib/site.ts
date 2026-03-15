import { parseCookieHeader } from './cookie'
import type { Locale, ToolDefinition } from './types'

export const APP_NAME = 'Route Crate'
export const SITE_ORIGIN = 'https://www.routecrate.com'
export const DEFAULT_LOCALE: Locale = 'en-US'
export const SUPPORTED_LOCALES: Locale[] = ['en-US', 'zh-CN']
const LOCALE_SLUGS: Record<Locale, string> = {
  'en-US': 'en-us',
  'zh-CN': 'zh-cn',
}
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
    entryPath: '/currency',
  },
  {
    id: 'tool_split_bill',
    slug: 'split-bill',
    nameKey: 'tool.splitBill.name',
    descriptionKey: 'tool.splitBill.description',
    entryPath: '/bill-splitter',
  },
  {
    id: 'tool_travel_phrases',
    slug: 'travel-phrases',
    nameKey: 'tool.travelPhrases.name',
    descriptionKey: 'tool.travelPhrases.description',
    entryPath: '/travel-phrases',
  },
]

export function isLocale(value: string | undefined | null): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale)
}

export function toLocaleSlug(locale: Locale) {
  return LOCALE_SLUGS[locale]
}

export function resolveLocaleSegment(value: string | undefined | null): Locale | null {
  if (!value) return null
  if (isLocale(value)) return value

  const normalized = value.toLowerCase()
  const matched = (Object.entries(LOCALE_SLUGS) as Array<[Locale, string]>)
    .find(([, slug]) => slug === normalized)

  return matched?.[0] ?? null
}

export function getLocalizedPath(locale: Locale, pathname: string) {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  const slug = toLocaleSlug(locale)
  return normalized === '/' ? `/${slug}` : `/${slug}${normalized}`
}

export function resolveLocaleFromPath(pathname: string) {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  const segments = normalized.split('/').filter(Boolean)
  const locale = resolveLocaleSegment(segments[0]) ?? DEFAULT_LOCALE
  const rest = resolveLocaleSegment(segments[0]) ? `/${segments.slice(1).join('/')}` : normalized
  return {
    locale,
    pathname: rest === '/' ? '/' : rest.replace(/\/+$/, '') || '/',
  }
}

export function resolveExplicitLocaleFromPath(pathname: string) {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  const segments = normalized.split('/').filter(Boolean)
  return resolveLocaleSegment(segments[0])
}

export function replaceLocaleInPath(pathname: string, locale: Locale) {
  const { pathname: rest } = resolveLocaleFromPath(pathname)
  return getLocalizedPath(locale, rest)
}

export function canonicalizeLocalePath(pathname: string) {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  const segments = normalized.split('/').filter(Boolean)
  const locale = resolveLocaleSegment(segments[0])
  if (!locale) return null

  const canonical = toLocaleSlug(locale)
  if (segments[0] === canonical) return null

  const rest = segments.slice(1).join('/')
  return rest ? `/${canonical}/${rest}` : `/${canonical}`
}

export function getToolBySlug(slug: ToolDefinition['slug']) {
  return TOOLS.find((tool) => tool.slug === slug)
}

export function resolveLocaleFromCookie(cookieHeader: string | null | undefined) {
  const locale = parseCookieHeader(cookieHeader).get(SITE_COOKIE_KEYS.locale)?.trim()
  return isLocale(locale) ? locale : null
}

function resolvePreferredLocaleTag(tag: string): Locale | null {
  const normalized = tag.trim().toLowerCase()
  if (!normalized) return null
  if (normalized.startsWith('zh')) return 'zh-CN'
  if (normalized.startsWith('en')) return 'en-US'
  return null
}

export function resolveLocaleFromAcceptLanguage(acceptLanguage: string | null | undefined): Locale | null {
  if (!acceptLanguage) return null

  const preferences = acceptLanguage
    .split(',')
    .map((entry, index) => {
      const [rawTag, ...params] = entry.trim().split(';')
      const qParam = params.find((param) => param.trim().startsWith('q='))
      const qValue = qParam ? Number.parseFloat(qParam.split('=')[1] ?? '') : 1

      return {
        index,
        locale: resolvePreferredLocaleTag(rawTag ?? ''),
        quality: Number.isFinite(qValue) ? qValue : 0,
      }
    })
    .filter((entry) => entry.locale && entry.quality > 0)
    .sort((left, right) => right.quality - left.quality || left.index - right.index)

  if (preferences.length) {
    return preferences[0].locale ?? null
  }

  return null
}

export function resolveRequestLocale(cookieHeader: string | null | undefined, acceptLanguage: string | null | undefined) {
  return resolveLocaleFromCookie(cookieHeader) ?? resolveLocaleFromAcceptLanguage(acceptLanguage) ?? DEFAULT_LOCALE
}
