// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createElement } from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children?: React.ReactNode } & Record<string, unknown>) => createElement('a', props, children),
}))

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: React.ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/lib/i18n', () => ({
  useI18n: () => ({
    t: (key: string) => ({
      'site.homeTitle': 'Travel tools that stay useful on the road',
      'site.homeDescription': 'One shell, one design system, two launch tools: currency and split bill.',
      'site.tagline': 'Route Crate',
      'site.heroTitle': 'Keep travel-time decisions in one small, dependable place',
      'site.heroDescription': 'When the connection is weak, the currencies are mixed, and the decision needs to be quick, Route Crate stays legible and fast.',
      'site.heroEyebrow': 'Built for quick decisions on the move',
      'site.heroHighlights': 'Weak-network ready · Multi-currency · Mobile-first',
      'site.currencyPreview': 'Live rates for fast travel decisions',
      'site.splitPreview': 'Local-first group expense tracking',
      'site.currencyMetric': '100 USD → 728.42 CNY',
      'site.splitMetric': '6 people · 2 currencies',
      'site.heroMetricRate': '100 USD → 728 CNY',
      'site.heroMetricSplit': '4 people · 2 expenses',
      'site.heroMetricSettle': '2 transfers',
      'tool.currency.name': 'Currency Converter',
      'tool.splitBill.name': 'Split Bill',
    })[key] ?? key,
  }),
}))

describe('hero theme styling', () => {
  it('uses theme variables for the SVG gradient surfaces', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    const { container } = render(createElement(HomePage, { locale: 'en-US' }))
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
