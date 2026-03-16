// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createElement } from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const HOME_PAGE_STATS = {
  phrasePackCount: 12,
  totalPhraseCount: 240,
  packingTemplateCount: 4,
  localAppsReadyCount: 41,
  localAppsTrackedCount: 41,
  timeZoneCount: 21,
}

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children?: React.ReactNode } & Record<string, unknown>) => createElement('a', props, children),
}))

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: React.ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/lib/i18n', () => ({
  useI18n: () => ({
    t: (key: string, values?: Record<string, string | number>) => ({
      'site.homeTitle': 'Travel tools that stay useful on the road',
      'site.homeDescription': 'One shell, one design system, and a compact set of travel tools for money, phrases, local apps, packing, timing, and trip recovery.',
      'site.tagline': 'Route Crate',
      'site.heroTitle': 'Keep travel-time decisions in one small, dependable place',
      'site.heroDescription': 'When the connection is weak, the currencies are mixed, and the decision needs to be quick, Route Crate stays legible and fast.',
      'site.heroEyebrow': 'Built for quick decisions on the move',
      'site.heroHighlights': 'Weak-network ready · Multi-currency · Mobile-first',
      'site.primaryToolsBadge': 'Do first',
      'site.primaryToolsTitle': 'Handle the decisions that change the trip right now',
      'site.primaryToolsDescription': 'Check rates before you pay, keep group spending aligned, and use a packing list before departure. These are the tools you open when the next action matters immediately.',
      'site.companionToolsBadge': 'Orient later',
      'site.companionToolsTitle': 'Add language, local app setup, and recovery support around the trip',
      'site.companionToolsDescription': 'Travel phrases help in person, local app guides tell you what to install before landing, and jet lag plans help after arrival when you need a simple reset plan to follow.',
      'site.currencyPreview': 'Live rates for fast travel decisions',
      'site.phrasesPreview': 'Playable phrase cards for quick in-person travel communication',
      'site.phrasesMetric': `${values?.packs} packs · ${values?.phrases} phrases`,
      'site.splitPreview': 'Local-first group expense tracking',
      'site.packingPreview': 'Reusable packing lists for departures, weekends, and work trips',
      'site.localAppsPreview': 'Start with the local apps and official download links that matter first in each country',
      'site.jetLagPreview': 'Post-flight recovery guidance for quick timezone resets after landing',
      'site.currencyMetric': '100 USD → 728.42 CNY',
      'site.splitMetric': '6 people · 2 currencies',
      'site.packingMetric': `${values?.count} templates · saved locally`,
      'site.localAppsMetric': `${values?.ready} countries ready · ${values?.tracked} tracked`,
      'site.jetLagMetric': `${values?.count} time zones · local-only`,
      'site.heroMetricRate': '100 USD → 728 CNY',
      'site.heroMetricSplit': '4 people · 2 expenses',
      'site.heroMetricSettle': '2 transfers',
      'tool.currency.name': 'Currency Converter',
      'tool.travelPhrases.name': 'Travel Phrases',
      'tool.splitBill.name': 'Bill Splitter',
      'tool.packingList.name': 'Packing List',
      'tool.localApps.name': 'Local Apps',
      'tool.jetLag.name': 'Jet Lag Reset',
    })[key] ?? key,
  }),
}))

describe('hero theme styling', () => {
  it('uses theme variables for the SVG gradient surfaces', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    const { container } = render(createElement(HomePage, { locale: 'en-US', stats: HOME_PAGE_STATS }))
    const stops = Array.from(container.querySelectorAll('stop'))
    const stopColors = stops.map((node) => node.getAttribute('stop-color'))

    expect(stopColors).toContain('var(--hero-route-glow-start)')
    expect(stopColors).toContain('var(--hero-route-glow-end)')
    expect(stopColors).toContain('var(--hero-surface-start)')
    expect(stopColors).toContain('var(--hero-surface-end)')
  })

  it('defines dedicated dark-mode hero tokens', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8')

    expect(css).toContain('--hero-card-bg')
    expect(css).toContain('--hero-pill-bg')
    expect(css).toContain('--hero-route-shadow')
    expect(css).toMatch(/html\.dark,\s*html\[data-theme="dark"\]\s*\{[\s\S]*--hero-card-bg:/)
  })
})
