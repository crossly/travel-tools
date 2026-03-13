import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { listRawPhraseCountrySummaries } from '@/lib/travel-phrases'

describe('sitemap', () => {
  it('includes all public travel phrase pages', () => {
    const sitemap = readFileSync('public/sitemap.xml', 'utf8')

    expect(sitemap).toContain('https://www.routecrate.com/en-us/travel-phrases')
    expect(sitemap).toContain('https://www.routecrate.com/zh-cn/travel-phrases')

    for (const pack of listRawPhraseCountrySummaries()) {
      expect(sitemap).toContain(`https://www.routecrate.com/en-us/travel-phrases/${pack.slug}`)
      expect(sitemap).toContain(`https://www.routecrate.com/zh-cn/travel-phrases/${pack.slug}`)
    }
  })
})
