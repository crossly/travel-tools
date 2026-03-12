import { describe, expect, it } from 'vitest'
import {
  DEFAULT_LOCALE,
  getLocalizedPath,
  replaceLocaleInPath,
  resolveLocaleFromPath,
  resolveRequestLocale,
  toLocaleSlug,
} from '@/lib/site'

describe('site helpers', () => {
  it('resolves locale and pathname from localized path', () => {
    expect(resolveLocaleFromPath('/en-us/tools/currency')).toEqual({
      locale: 'en-US',
      pathname: '/tools/currency',
    })
  })

  it('falls back to default locale for non-localized path', () => {
    expect(resolveLocaleFromPath('/tools/currency').locale).toBe(DEFAULT_LOCALE)
  })

  it('builds localized paths', () => {
    expect(getLocalizedPath('zh-CN', '/settings')).toBe('/zh-cn/settings')
    expect(replaceLocaleInPath('/zh-cn/tools/currency', 'en-US')).toBe('/en-us/tools/currency')
  })

  it('maps standard locale values to lowercase URL slugs', () => {
    expect(toLocaleSlug('en-US')).toBe('en-us')
    expect(toLocaleSlug('zh-CN')).toBe('zh-cn')
  })

  it('understands legacy mixed-case locale segments', () => {
    expect(resolveLocaleFromPath('/zh-CN/tools/currency')).toEqual({
      locale: 'zh-CN',
      pathname: '/tools/currency',
    })
  })

  it('prefers locale cookie over accept-language', () => {
    expect(resolveRequestLocale('tt_site_locale=en-US', 'zh-CN,zh;q=0.9,en;q=0.8')).toBe('en-US')
  })

  it('falls back to accept-language when no locale cookie exists', () => {
    expect(resolveRequestLocale(null, 'en-US,en;q=0.9')).toBe('en-US')
  })
})
