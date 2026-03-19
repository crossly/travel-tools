// @vitest-environment jsdom
import { createElement } from 'react'
import type { ReactNode } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { TippingCountrySummary } from '@/lib/tipping'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, href, ...props }: { children?: ReactNode; to?: string; href?: string } & Record<string, unknown>) =>
    createElement('a', { ...props, href: href ?? to }, children),
}))

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children, activeTool }: { children?: ReactNode; activeTool?: string }) =>
    createElement('div', { 'data-testid': 'app-shell', 'data-active-tool': activeTool ?? '' }, children),
}))

vi.mock('@/lib/i18n', () => ({
  registerMessages: vi.fn(),
  useI18n: () => ({
    t: (key: string, params?: Record<string, string | number>) =>
      ({
        'tipping.title': 'Tipping',
        'tipping.description': 'Quick tipping lookup',
        'tipping.searchLabel': 'Search countries',
        'tipping.searchPlaceholder': 'Search by country or region',
        'tipping.regionAll': 'All',
        'tipping.regionAsia': 'Asia',
        'tipping.regionEurope': 'Europe',
        'tipping.regionAmericas': 'Americas',
        'tipping.regionAfrica': 'Africa',
        'tipping.regionMiddleEast': 'Middle East',
        'tipping.regionOceania': 'Oceania',
        'tipping.directoryTitle': 'Browse by country',
        'tipping.directoryDescription': 'Pick a destination',
        'tipping.emptyTitle': 'No matches',
        'tipping.emptyDescription': 'Try another search',
        'tipping.countryCount': '{count} countries',
        'tipping.cardOpen': 'Open',
        'tipping.countryRule': '{country} usually follows this rule',
        'tipping.sourceCountLabel': '{count} sources',
        'tipping.reviewedLabel': 'Last reviewed {date}',
      })[key]?.replace?.('{count}', String(params?.count ?? '')) ?? key,
  }),
}))

vi.mock('@/lib/storage', () => ({
  writeLastTool: vi.fn(),
}))

describe('TippingHomePage', () => {
  it('filters countries by query and region', async () => {
    const { TippingHomePage } = await import('@/features/tipping/home-page')

    const countries = [
      {
        country: 'Japan',
        slug: 'japan',
        region: 'asia',
        flag: '🇯🇵',
        title: 'Japan tipping guide',
        description: 'Japan usually does not expect tips.',
        headlineRule: 'Japan usually does not expect tips.',
        lastReviewed: '2026-03-19',
        sourceCount: 2,
      },
      {
        country: 'France',
        slug: 'france',
        region: 'europe',
        flag: '🇫🇷',
        title: 'France tipping guide',
        description: 'France usually includes service.',
        headlineRule: 'France usually includes service.',
        lastReviewed: '2026-03-19',
        sourceCount: 2,
      },
    ] satisfies TippingCountrySummary[]

    render(createElement(TippingHomePage, { locale: 'en-US', countries }))

    expect(screen.getByTestId('app-shell').getAttribute('data-active-tool')).toBe('tipping')
    expect(screen.getByRole('textbox', { name: 'Search countries' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Asia' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Japan' })).toBeTruthy()
    expect(screen.getAllByRole('link', { name: 'Open' }).some((link) => link.getAttribute('href') === '/en-us/tipping/japan')).toBe(true)

    fireEvent.change(screen.getByRole('textbox', { name: 'Search countries' }), { target: { value: 'france' } })

    expect(await screen.findByRole('heading', { name: 'France' })).toBeTruthy()
    expect(screen.queryByRole('heading', { name: 'Japan' })).toBeNull()

    fireEvent.change(screen.getByRole('textbox', { name: 'Search countries' }), { target: { value: '' } })
    fireEvent.click(screen.getByRole('button', { name: 'Asia' }))

    expect(await screen.findByRole('heading', { name: 'Japan' })).toBeTruthy()
    expect(screen.queryByRole('heading', { name: 'France' })).toBeNull()
  })
})
