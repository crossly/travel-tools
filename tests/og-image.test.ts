import { describe, expect, it } from 'vitest'
import { buildOgImageUrl, serveOgImage } from '@/server/og-image'

describe('og image rendering', () => {
  it('builds an absolute OG image URL with encoded params', () => {
    const url = buildOgImageUrl({
      locale: 'zh-CN',
      variant: 'home',
      brand: '旅行箱',
      title: '旅行短语卡',
      description: '按国家整理的旅行短语卡，含发音。',
    })

    expect(url).toBe(
      'https://www.routecrate.com/api/og-image?locale=zh-CN&variant=home&brand=%E6%97%85%E8%A1%8C%E7%AE%B1&title=%E6%97%85%E8%A1%8C%E7%9F%AD%E8%AF%AD%E5%8D%A1&description=%E6%8C%89%E5%9B%BD%E5%AE%B6%E6%95%B4%E7%90%86%E7%9A%84%E6%97%85%E8%A1%8C%E7%9F%AD%E8%AF%AD%E5%8D%A1%EF%BC%8C%E5%90%AB%E5%8F%91%E9%9F%B3%E3%80%82',
    )
  })

  it('returns a cacheable SVG response and escapes text content', async () => {
    const request = new Request(
      'https://www.routecrate.com/api/og-image?locale=en-US&variant=tool&brand=Route%20Crate&title=%3Cscript%3Ebad%3C%2Fscript%3E&description=Currency%20%26%20phrases',
    )

    const response = await serveOgImage(request)
    const body = await response.text()

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('image/svg+xml; charset=utf-8')
    expect(response.headers.get('cache-control')).toBe('public, max-age=86400, s-maxage=86400')
    expect(body).toContain('&lt;script&gt;bad&lt;/script&gt;')
    expect(body).toContain('Currency &amp; phrases')
    expect(body).toContain('Tool spotlight')
    expect(body).not.toContain('<script>bad</script>')
  })

  it('renders different copy for country-style cards', async () => {
    const request = new Request(
      'https://www.routecrate.com/api/og-image?locale=en-US&variant=country&brand=Route%20Crate&title=Japan%20Travel%20Phrases&description=Travel%20phrases%20for%20Japan',
    )

    const response = await serveOgImage(request)
    const body = await response.text()

    expect(response.status).toBe(200)
    expect(body).toContain('Country pack')
    expect(body).not.toContain('Tool spotlight')
  })

  it('returns svg headers without a body for head-style responses', async () => {
    const request = new Request(
      'https://www.routecrate.com/api/og-image?locale=en-US&variant=tool&brand=Route%20Crate&title=Currency%20Converter&description=Travel%20currency%20converter',
    )

    const response = await serveOgImage(request, { headOnly: true })

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('image/svg+xml; charset=utf-8')
    expect(response.headers.get('cache-control')).toBe('public, max-age=86400, s-maxage=86400')
    expect(await response.text()).toBe('')
  })
})
