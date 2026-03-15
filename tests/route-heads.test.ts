import { describe, expect, it, vi } from 'vitest'

vi.mock('@/styles.css?url', () => ({
  default: '/styles.css',
}))

describe('route heads', () => {
  it('uses localized app metadata in the root route head', async () => {
    const { Route } = await import('@/routes/__root')
    const head = (Route as unknown as {
      options: {
        head: (args: {
          loaderData?: {
            locale: 'zh-CN' | 'en-US'
            googleSiteVerification?: string | null
            bingSiteVerification?: string | null
          }
        }) => {
          meta: Array<Record<string, string>>
          links: Array<Record<string, string>>
        }
      }
    }).options.head({
      loaderData: { locale: 'zh-CN' },
    })

    expect(head.meta).toEqual(expect.arrayContaining([
      expect.objectContaining({ title: '旅行箱' }),
      expect.objectContaining({
        name: 'description',
        content: '旅行中真正常用的小工具：汇率换算、旅行短语卡、AA 记账。适合弱网、移动端和多币种出行场景。',
      }),
    ]))
    expect(head.links).toEqual(expect.arrayContaining([
      expect.objectContaining({ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }),
    ]))
  })

  it('emits site verification meta tags when search console ids are present', async () => {
    const { Route } = await import('@/routes/__root')
    const head = (Route as unknown as {
      options: {
        head: (args: {
          loaderData?: {
            locale: 'zh-CN' | 'en-US'
            googleSiteVerification?: string | null
            bingSiteVerification?: string | null
          }
        }) => {
          meta: Array<Record<string, string>>
        }
      }
    }).options.head({
      loaderData: {
        locale: 'en-US',
        googleSiteVerification: 'google-verification-token',
        bingSiteVerification: 'bing-verification-token',
      },
    })

    expect(head.meta).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'google-site-verification',
        content: 'google-verification-token',
      }),
      expect.objectContaining({
        name: 'msvalidate.01',
        content: 'bing-verification-token',
      }),
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
      expect.objectContaining({ title: '旅行箱' }),
      expect.objectContaining({ name: 'robots', content: 'noindex, follow' }),
    ]))
    expect(head.links).toEqual(expect.arrayContaining([
      expect.objectContaining({ rel: 'canonical', href: 'https://www.routecrate.com/zh-cn' }),
      expect.objectContaining({ rel: 'alternate', hreflang: 'x-default', href: 'https://www.routecrate.com/' }),
    ]))
  })

  it('emits homepage SEO metadata for public localized home pages', async () => {
    const { Route } = await import('@/routes/$locale/index')
    const head = (Route as unknown as {
      options: {
        head: (args: { params: { locale: string } }) => {
          meta: Array<Record<string, string>>
          links: Array<Record<string, string>>
        }
      }
    }).options.head({
      params: { locale: 'zh-cn' },
    })

    expect(head.meta).toEqual(expect.arrayContaining([
      expect.objectContaining({ title: '旅行箱' }),
      expect.objectContaining({
        name: 'description',
        content: '旅行中真正常用的小工具：汇率换算、旅行短语卡、AA 记账。适合弱网、移动端和多币种出行场景。',
      }),
      expect.objectContaining({
        property: 'og:image',
        content: 'https://www.routecrate.com/api/og-image?locale=zh-CN&variant=home&brand=%E6%97%85%E8%A1%8C%E7%AE%B1&title=%E6%97%85%E8%A1%8C%E7%AE%B1&description=%E6%97%85%E8%A1%8C%E4%B8%AD%E7%9C%9F%E6%AD%A3%E5%B8%B8%E7%94%A8%E7%9A%84%E5%B0%8F%E5%B7%A5%E5%85%B7%EF%BC%9A%E6%B1%87%E7%8E%87%E6%8D%A2%E7%AE%97%E3%80%81%E6%97%85%E8%A1%8C%E7%9F%AD%E8%AF%AD%E5%8D%A1%E3%80%81AA+%E8%AE%B0%E8%B4%A6%E3%80%82%E9%80%82%E5%90%88%E5%BC%B1%E7%BD%91%E3%80%81%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%92%8C%E5%A4%9A%E5%B8%81%E7%A7%8D%E5%87%BA%E8%A1%8C%E5%9C%BA%E6%99%AF%E3%80%82',
      }),
      expect.objectContaining({
        name: 'keywords',
        content: '旅行汇率换算,汇率换算器,旅行短语卡,旅游短语,AA记账,旅行记账,多人分账,出国旅行工具',
      }),
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
      expect.objectContaining({
        name: 'description',
        content: 'Travel currency converter for quick exchange rates, price checks, and amount conversion abroad.',
      }),
      expect.objectContaining({
        name: 'keywords',
        content: 'travel currency converter,exchange rate calculator,travel exchange rates,currency conversion abroad,multi-currency travel',
      }),
      expect.objectContaining({ property: 'og:url', content: 'https://www.routecrate.com/en-us/currency' }),
      expect.objectContaining({
        property: 'og:image',
        content: 'https://www.routecrate.com/api/og-image?locale=en-US&variant=tool&brand=Route+Crate&title=Currency+Converter&description=Travel+currency+converter+for+quick+exchange+rates%2C+price+checks%2C+and+amount+conversion+abroad.',
      }),
      expect.objectContaining({ property: 'og:image:alt', content: 'Currency Converter · Route Crate' }),
      expect.objectContaining({ name: 'twitter:card', content: 'summary_large_image' }),
      expect.objectContaining({
        name: 'twitter:image',
        content: 'https://www.routecrate.com/api/og-image?locale=en-US&variant=tool&brand=Route+Crate&title=Currency+Converter&description=Travel+currency+converter+for+quick+exchange+rates%2C+price+checks%2C+and+amount+conversion+abroad.',
      }),
      expect.objectContaining({ name: 'twitter:image:alt', content: 'Currency Converter · Route Crate' }),
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
      expect.objectContaining({
        name: 'description',
        content: 'Country-based travel phrase cards with audio for transport, hotels, dining, shopping, and emergency situations.',
      }),
      expect.objectContaining({
        name: 'keywords',
        content: 'travel phrases,travel phrase cards,phrase cards with audio,hotel phrases,dining phrases,emergency travel phrases',
      }),
      expect.objectContaining({
        'script:ld+json': expect.objectContaining({
          '@type': 'BreadcrumbList',
        }),
      }),
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
              seoKeywords: string[]
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
          seoKeywords: [
            'Japan travel phrases',
            'Japanese travel phrases',
            'Japan restaurant phrases',
          ],
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
      expect.objectContaining({ name: 'keywords', content: 'Japan travel phrases,Japanese travel phrases,Japan restaurant phrases' }),
      expect.objectContaining({ property: 'og:url', content: 'https://www.routecrate.com/en-us/travel-phrases/japan' }),
      expect.objectContaining({
        property: 'og:image',
        content: 'https://www.routecrate.com/api/og-image?locale=en-US&variant=country&brand=Route+Crate&title=Japan+Travel+Phrases&description=Travel+phrases+for+Japan+with+audio+and+local+tips+for+rail%2C+restaurants%2C+and+convenience+stores.',
      }),
      expect.objectContaining({ property: 'og:image:alt', content: 'Japan Travel Phrases · Route Crate' }),
      expect.objectContaining({
        name: 'twitter:image',
        content: 'https://www.routecrate.com/api/og-image?locale=en-US&variant=country&brand=Route+Crate&title=Japan+Travel+Phrases&description=Travel+phrases+for+Japan+with+audio+and+local+tips+for+rail%2C+restaurants%2C+and+convenience+stores.',
      }),
      expect.objectContaining({ name: 'twitter:image:alt', content: 'Japan Travel Phrases · Route Crate' }),
    ]))
    expect(head.meta).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'script:ld+json': expect.objectContaining({
          '@type': 'FAQPage',
        }),
      }),
      expect.objectContaining({
        'script:ld+json': expect.objectContaining({
          '@type': 'BreadcrumbList',
        }),
      }),
    ]))
    expect(head.links).toEqual(expect.arrayContaining([
      expect.objectContaining({ rel: 'canonical', href: 'https://www.routecrate.com/en-us/travel-phrases/japan' }),
    ]))
  })
})
