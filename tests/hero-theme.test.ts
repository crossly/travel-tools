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
  Link: ({ children, to, ...props }: { children?: React.ReactNode; to?: string } & Record<string, unknown>) =>
    createElement('a', { ...props, href: typeof to === 'string' ? to : '#' }, children),
}))

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: React.ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/lib/i18n', () => ({
  registerMessages: () => {},
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

describe('home landing styling', () => {
  it('does not render decorative hero artwork on the homepage', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    const { container } = render(createElement(HomePage, { locale: 'en-US', stats: HOME_PAGE_STATS }))
    expect(container.querySelector('.home-intro')).toBeTruthy()
    expect(container.querySelector('.hero-art-wrap')).toBeNull()
  })

  it('defines compact homepage intro styles', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8')

    expect(css).toContain('.home-intro')
    expect(css).toContain('.home-intro-title')
    expect(css).toContain('.home-priority-rail')
  })

  it('keeps the original app font stacks instead of editorial replacements', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8')

    expect(css).toContain('--font-sans: "Inter Variable", "Inter", "Noto Sans SC", system-ui, sans-serif;')
    expect(css).toContain('--font-display: "Manrope Variable", "Manrope", "Inter", sans-serif;')
    expect(css).not.toContain('Fraunces')
    expect(css).not.toContain('Source+Sans+3')
  })

  it('keeps dark mode homepage surfaces flatter than the light theme treatment', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8')

    expect(css).toContain('html.dark .home-priority-item')
    expect(css).toContain('html.dark .home-companion-panel')
    expect(css).not.toContain('linear-gradient(180deg, color-mix(in oklab, var(--surface-floating) 84%, rgba(255, 255, 255, 0.02) 16%), rgba(18, 21, 24, 0.9))')
    expect(css).not.toContain('box-shadow: inset 0 1px 0 rgba(255, 247, 235, 0.03);')
  })
})
