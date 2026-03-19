import { describe, expect, it } from 'vitest'
import {
  DEFAULT_LOCALE,
  TOOLS,
  getToolBySlug,
  getLocalizedPath,
  replaceLocaleInPath,
  resolveExplicitLocaleFromPath,
  resolveLocaleFromPath,
  resolveRequestLocale,
  toLocaleSlug,
} from '@/lib/site'

describe('site helpers', () => {
  it('resolves locale and pathname from localized path', () => {
    expect(resolveLocaleFromPath('/en-us/currency')).toEqual({
      locale: 'en-US',
      pathname: '/currency',
    })
  })

  it('falls back to default locale for non-localized path', () => {
    expect(resolveLocaleFromPath('/currency').locale).toBe(DEFAULT_LOCALE)
  })

  it('builds localized paths', () => {
    expect(getLocalizedPath('zh-CN', '/settings')).toBe('/zh-cn/settings')
    expect(replaceLocaleInPath('/zh-cn/currency', 'en-US')).toBe('/en-us/currency')
  })

  it('maps standard locale values to lowercase URL slugs', () => {
    expect(toLocaleSlug('en-US')).toBe('en-us')
    expect(toLocaleSlug('zh-CN')).toBe('zh-cn')
  })

  it('understands legacy mixed-case locale segments', () => {
    expect(resolveLocaleFromPath('/zh-CN/currency')).toEqual({
      locale: 'zh-CN',
      pathname: '/currency',
    })
  })

  it('detects an explicit locale segment without falling back', () => {
    expect(resolveExplicitLocaleFromPath('/zh-cn/currency')).toBe('zh-CN')
    expect(resolveExplicitLocaleFromPath('/currency')).toBeNull()
  })

  it('prefers locale cookie over accept-language', () => {
    expect(resolveRequestLocale('tt_site_locale=en-US', 'zh-CN,zh;q=0.9,en;q=0.8')).toBe('en-US')
  })

  it('falls back to accept-language when no locale cookie exists', () => {
    expect(resolveRequestLocale(null, 'en-US,en;q=0.9')).toBe('en-US')
  })

  it('respects accept-language priority instead of matching by substring order', () => {
    expect(resolveRequestLocale(null, 'en-US,en;q=0.9,zh-CN;q=0.1')).toBe('en-US')
    expect(resolveRequestLocale(null, 'fr-FR,zh-CN;q=0.8,en-US;q=0.7')).toBe('zh-CN')
  })

  it('registers the tipping and visa entry tools in the site tool list', () => {
    expect(TOOLS.map((tool) => tool.slug)).toEqual([
      'currency',
      'split-bill',
      'packing-list',
      'travel-phrases',
      'visa-entry',
      'tipping',
      'local-apps',
      'jet-lag',
    ])
    expect(getToolBySlug('visa-entry')?.entryPath).toBe('/visa-entry')
    expect(getToolBySlug('tipping')?.entryPath).toBe('/tipping')
  })
})
