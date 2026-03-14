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
      expect.objectContaining({ name: 'description', content: '统一壳、统一交互、统一主题。首发汇率换算、旅行短语卡和旅行 AA。' }),
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

  it('emits public metadata for travel phrases routes', async () => {
    const { Route } = await import('@/routes/$locale/travel-phrases/index')
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
      expect.objectContaining({ title: 'Travel Phrases · Route Crate' }),
      expect.objectContaining({ name: 'description', content: 'Country-based travel phrase packs with playable audio for transport, hotels, dining, shopping, and emergencies.' }),
    ]))
    expect(head.links).toEqual(expect.arrayContaining([
      expect.objectContaining({ rel: 'canonical', href: 'https://www.routecrate.com/en-us/travel-phrases' }),
    ]))
  })

  it('emits public metadata for travel phrase country pages', async () => {
    const { Route } = await import('@/routes/$locale/travel-phrases/$country')
    const head = (Route as unknown as {
      options: {
        head: (args: {
          params: { locale: string; country: string }
          loaderData?: {
            pack: {
              title: string
              description: string
              slug: string
              faq?: Array<{ question: string; answer: string }>
            } | null
          }
        }) => {
          meta: Array<Record<string, unknown>>
          links: Array<Record<string, string>>
        }
      }
    }).options.head({
      params: { locale: 'en-us', country: 'japan' },
      loaderData: {
        pack: {
          title: 'Japan Travel Phrases',
          description: 'Travel phrases for Japan with audio and local tips for rail, restaurants, and convenience stores.',
          slug: 'japan',
          faq: [
            {
              question: 'Do I need Japanese for most tourist places in Japan?',
              answer: 'Major stations and hotels often support English, but short Japanese phrases still help a lot.',
            },
          ],
        },
      },
    })

    expect(head.meta).toEqual(expect.arrayContaining([
      expect.objectContaining({ title: 'Japan Travel Phrases · Route Crate' }),
      expect.objectContaining({ name: 'description', content: 'Travel phrases for Japan with audio and local tips for rail, restaurants, and convenience stores.' }),
      expect.objectContaining({ property: 'og:url', content: 'https://www.routecrate.com/en-us/travel-phrases/japan' }),
    ]))
    expect(head.meta).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'script:ld+json': expect.objectContaining({
          '@type': 'FAQPage',
        }),
      }),
    ]))
    expect(head.links).toEqual(expect.arrayContaining([
      expect.objectContaining({ rel: 'canonical', href: 'https://www.routecrate.com/en-us/travel-phrases/japan' }),
    ]))
  })
})
