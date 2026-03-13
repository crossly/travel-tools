import { describe, expect, it, vi } from 'vitest'

vi.mock('@/styles.css?url', () => ({
  default: '/styles.css',
}))

describe('route heads', () => {
  it('uses localized app metadata in the root route head', async () => {
    const { Route } = await import('@/routes/__root')
    const head = (Route as unknown as {
      options: {
        head: (args: { loaderData?: { locale: 'zh-CN' | 'en-US' } }) => {
          meta: Array<Record<string, string>>
          links: Array<Record<string, string>>
        }
      }
    }).options.head({
      loaderData: { locale: 'zh-CN' },
    })

    expect(head.meta).toEqual(expect.arrayContaining([
      expect.objectContaining({ title: '旅行箱' }),
      expect.objectContaining({ name: 'description', content: '统一壳、统一交互、统一主题。首发汇率换算和旅行 AA。' }),
    ]))
    expect(head.links).toEqual(expect.arrayContaining([
      expect.objectContaining({ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }),
    ]))
  })

  it('marks the root entry page as noindex and canonicalizes it to the localized homepage', async () => {
    const { Route } = await import('@/routes/index')
    const head = (Route as unknown as {
      options: {
        head: (args: { loaderData?: { locale: 'zh-CN' | 'en-US' } }) => {
          meta: Array<Record<string, string>>
          links: Array<Record<string, string>>
        }
      }
    }).options.head({
      loaderData: { locale: 'zh-CN' },
    })

    expect(head.meta).toEqual(expect.arrayContaining([
      expect.objectContaining({ title: '旅行中真正常用的小工具 · 旅行箱' }),
      expect.objectContaining({ name: 'robots', content: 'noindex, follow' }),
    ]))
    expect(head.links).toEqual(expect.arrayContaining([
      expect.objectContaining({ rel: 'canonical', href: 'https://www.routecrate.com/zh-cn' }),
      expect.objectContaining({ rel: 'alternate', hreflang: 'x-default', href: 'https://www.routecrate.com/' }),
    ]))
  })

  it('emits canonical, alternates, and social metadata for public localized pages', async () => {
    const { Route } = await import('@/routes/$locale/currency')
    const head = (Route as unknown as {
      options: {
        head: (args: { params: { locale: string } }) => {
          meta: Array<Record<string, string>>
          links: Array<Record<string, string>>
        }
      }
    }).options.head({
      params: { locale: 'en-us' },
    })

    expect(head.meta).toEqual(expect.arrayContaining([
      expect.objectContaining({ title: 'Currency Converter · Route Crate' }),
      expect.objectContaining({ name: 'description', content: 'Quick rates and amount conversion for travel moments.' }),
      expect.objectContaining({ property: 'og:url', content: 'https://www.routecrate.com/en-us/currency' }),
      expect.objectContaining({ name: 'twitter:card', content: 'summary_large_image' }),
    ]))
    expect(head.links).toEqual(expect.arrayContaining([
      expect.objectContaining({ rel: 'canonical', href: 'https://www.routecrate.com/en-us/currency' }),
      expect.objectContaining({ rel: 'alternate', hreflang: 'zh-CN', href: 'https://www.routecrate.com/zh-cn/currency' }),
      expect.objectContaining({ rel: 'alternate', hreflang: 'x-default', href: 'https://www.routecrate.com/en-us/currency' }),
    ]))
  })

  it('marks private pages as noindex', async () => {
    const { Route } = await import('@/routes/$locale/settings')
    const head = (Route as unknown as {
      options: {
        head: (args: { params: { locale: string } }) => { meta: Array<Record<string, string>> }
      }
    }).options.head({
      params: { locale: 'en-us' },
    })

    expect(head.meta).toEqual(expect.arrayContaining([
      expect.objectContaining({ title: 'Settings · Route Crate' }),
      expect.objectContaining({ name: 'robots', content: 'noindex, nofollow' }),
    ]))
  })
})
