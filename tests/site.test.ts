import { describe, expect, it } from 'vitest'
import { DEFAULT_LOCALE, getLocalizedPath, replaceLocaleInPath, resolveLocaleFromPath } from '@/lib/site'

describe('site helpers', () => {
  it('resolves locale and pathname from localized path', () => {
    expect(resolveLocaleFromPath('/en-US/tools/currency')).toEqual({
      locale: 'en-US',
      pathname: '/tools/currency',
    })
  })

  it('falls back to default locale for non-localized path', () => {
    expect(resolveLocaleFromPath('/tools/currency').locale).toBe(DEFAULT_LOCALE)
  })

  it('builds localized paths', () => {
    expect(getLocalizedPath('zh-CN', '/settings')).toBe('/zh-CN/settings')
    expect(replaceLocaleInPath('/zh-CN/tools/currency', 'en-US')).toBe('/en-US/tools/currency')
  })
})
