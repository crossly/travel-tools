import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { listReadyLocalAppCountrySlugs } from '@/lib/local-apps'
import { listRawPhraseCountrySummaries } from '@/lib/travel-phrases'

describe('sitemap', () => {
  it('includes all public travel phrase pages', () => {
    const sitemap = readFileSync('public/sitemap.xml', 'utf8')

    expect(sitemap).toContain('https://www.routecrate.com/en-us/travel-phrases')
    expect(sitemap).toContain('https://www.routecrate.com/zh-cn/travel-phrases')
    expect(sitemap).toContain('https://www.routecrate.com/en-us/packing-list')
    expect(sitemap).toContain('https://www.routecrate.com/zh-cn/packing-list')
    expect(sitemap).toContain('https://www.routecrate.com/en-us/jet-lag')
    expect(sitemap).toContain('https://www.routecrate.com/zh-cn/jet-lag')
    expect(sitemap).toContain('https://www.routecrate.com/en-us/local-apps')
    expect(sitemap).toContain('https://www.routecrate.com/zh-cn/local-apps')
    expect(sitemap).toContain('<lastmod>')

    for (const pack of listRawPhraseCountrySummaries()) {
      expect(sitemap).toContain(`https://www.routecrate.com/en-us/travel-phrases/${pack.slug}`)
      expect(sitemap).toContain(`https://www.routecrate.com/zh-cn/travel-phrases/${pack.slug}`)
    }

    for (const slug of listReadyLocalAppCountrySlugs()) {
      expect(sitemap).toContain(`https://www.routecrate.com/en-us/local-apps/${slug}`)
      expect(sitemap).toContain(`https://www.routecrate.com/zh-cn/local-apps/${slug}`)
    }
  })
})
