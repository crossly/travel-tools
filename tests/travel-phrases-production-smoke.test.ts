import { describe, expect, it } from 'vitest'

const BASE_URL = process.env.ROUTECRATE_SMOKE_URL?.replace(/\/$/, '') ?? ''
const describeIfConfigured = BASE_URL ? describe : describe.skip

type PageSnapshot = {
  url: string
  html: string
  status: number
}

async function fetchPage(pathname: string): Promise<PageSnapshot> {
  const response = await fetch(`${BASE_URL}${pathname}`, {
    headers: {
      'accept-encoding': 'identity',
    },
    redirect: 'follow',
  })

  return {
    url: response.url,
    html: await response.text(),
    status: response.status,
  }
}

function extractTag(html: string, pattern: RegExp) {
  return html.match(pattern)?.[1]?.trim() ?? ''
}

describeIfConfigured('Travel Phrases production smoke tests', () => {
  it('serves localized travel phrases pages with stable SEO metadata', async () => {
    const home = await fetchPage('/zh-cn/travel-phrases')
    const southKoreaZh = await fetchPage('/zh-cn/travel-phrases/south-korea')
    const southKoreaEn = await fetchPage('/en-us/travel-phrases/south-korea')

    expect(home.status).toBe(200)
    expect(extractTag(home.html, /<title>([\s\S]*?)<\/title>/i)).toBe('旅行短语卡 · 旅行箱')
    expect(extractTag(home.html, /<meta name="description" content="([\s\S]*?)"\/>/i)).toContain('按国家整理常用短语')
    expect(extractTag(home.html, /<link rel="canonical" href="([\s\S]*?)"\/>/i)).toBe(`${BASE_URL}/zh-cn/travel-phrases`)

    expect(southKoreaZh.status).toBe(200)
    expect(extractTag(southKoreaZh.html, /<title>([\s\S]*?)<\/title>/i)).toBe('韩国旅行短语卡 · 旅行箱')
    expect(extractTag(southKoreaZh.html, /<meta name="description" content="([\s\S]*?)"\/>/i)).toContain('T-money')
    expect(extractTag(southKoreaZh.html, /<link rel="canonical" href="([\s\S]*?)"\/>/i)).toBe(
      `${BASE_URL}/zh-cn/travel-phrases/south-korea`,
    )

    expect(southKoreaEn.status).toBe(200)
    expect(extractTag(southKoreaEn.html, /<title>([\s\S]*?)<\/title>/i)).toBe('South Korea Travel Phrases · Route Crate')
    expect(extractTag(southKoreaEn.html, /<meta name="description" content="([\s\S]*?)"\/>/i)).toContain('Kakao T')
    expect(extractTag(southKoreaEn.html, /<link rel="canonical" href="([\s\S]*?)"\/>/i)).toBe(
      `${BASE_URL}/en-us/travel-phrases/south-korea`,
    )
  })

  it('renders the expected localized content blocks for featured travel phrase pages', async () => {
    const home = await fetchPage('/zh-cn/travel-phrases')
    const southKoreaZh = await fetchPage('/zh-cn/travel-phrases/south-korea')
    const southKoreaEn = await fetchPage('/en-us/travel-phrases/south-korea')

    expect(home.html).toContain('中国')
    expect(home.html).toContain('T-money')

    expect(southKoreaZh.html).toContain('出发前先看')
    expect(southKoreaZh.html).toContain('按场景快速查看')
    expect(southKoreaZh.html).toContain('T-money')
    expect(southKoreaZh.html).toContain('FAQPage')
    expect(southKoreaZh.html).toContain('相关国家短语包')

    expect(southKoreaEn.html).toContain('More local notes')
    expect(southKoreaEn.html).toContain('Travel FAQ')
    expect(southKoreaEn.html).toContain('Related country packs')
    expect(southKoreaEn.html).toContain('Basics')
    expect(southKoreaEn.html).toContain('Transport')
    expect(southKoreaEn.html).toContain('Hotel')
    expect(southKoreaEn.html).toContain('Dining')
    expect(southKoreaEn.html).toContain('Shopping')
  })

  it('publishes travel phrase entries in the sitemap for both active locales', async () => {
    const response = await fetch(`${BASE_URL}/sitemap.xml`, {
      headers: {
        'accept-encoding': 'identity',
      },
    })
    const xml = await response.text()

    expect(response.status).toBe(200)
    expect(xml).toContain('<loc>https://www.routecrate.com/en-us/travel-phrases/china</loc>')
    expect(xml).toContain('<loc>https://www.routecrate.com/en-us/travel-phrases/japan</loc>')
    expect(xml).toContain('<loc>https://www.routecrate.com/en-us/travel-phrases/south-korea</loc>')
    expect(xml).toContain('<loc>https://www.routecrate.com/zh-cn/travel-phrases/china</loc>')
    expect(xml).toContain('<loc>https://www.routecrate.com/zh-cn/travel-phrases/japan</loc>')
    expect(xml).toContain('<loc>https://www.routecrate.com/zh-cn/travel-phrases/south-korea</loc>')
  })

  it('serves phrase audio from the production API', async () => {
    const response = await fetch(`${BASE_URL}/api/phrase-audio/south-korea/tmoney_reload_here`, {
      method: 'HEAD',
      redirect: 'follow',
    })

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('audio/')
    expect(response.headers.get('cache-control')).toContain('immutable')
  })
})
