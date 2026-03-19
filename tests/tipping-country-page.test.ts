// @vitest-environment jsdom
import { createElement } from 'react'
import type { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { TippingCountryPack } from '@/lib/tipping'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, href, ...props }: { children?: ReactNode; to?: string; href?: string } & Record<string, unknown>) =>
    createElement('a', { ...props, href: href ?? to }, children),
}))

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/lib/i18n', () => ({
  registerMessages: vi.fn(),
  useI18n: () => ({
    t: (key: string, params?: Record<string, string | number>) =>
      ({
        'tipping.title': 'Tipping',
        'tipping.description': 'Quick tipping lookup',
        'tipping.backToHome': 'Back to countries',
        'tipping.notFoundTitle': 'Country not found',
        'tipping.notFoundDescription': 'Choose another destination',
        'tipping.headlineLabel': 'Headline rule',
        'tipping.restaurantLabel': 'Restaurant',
        'tipping.cafeLabel': 'Cafe',
        'tipping.barLabel': 'Bar',
        'tipping.taxiLabel': 'Taxi',
        'tipping.hotelLabel': 'Hotel',
        'tipping.guideLabel': 'Guide',
        'tipping.porterLabel': 'Porter',
        'tipping.deliveryLabel': 'Delivery',
        'tipping.notesLabel': 'Notes',
        'tipping.officialLinksLabel': 'Official links',
        'tipping.notRequired': 'Usually not required',
        'tipping.roundUp': 'Round up only',
        'tipping.percentTip': '{percent}% is common',
      })[key]?.replace?.('{percent}', String(params?.percent ?? '')) ?? key,
  }),
}))

vi.mock('@/lib/storage', () => ({
  writeLastTool: vi.fn(),
}))

describe('TippingCountryPage', () => {
  it('renders the headline rule and category guidance for a country', async () => {
    const { TippingCountryPage } = await import('@/features/tipping/country-page')

    const pack = {
      country: 'Japan',
      slug: 'japan',
      region: 'asia',
      flag: '🇯🇵',
      title: 'Japan tipping guide',
      description: 'Quick tipping lookup for Japan.',
      headlineRule: 'Tipping is usually not expected in Japan.',
      reviewedAt: '2026-03-19',
      rules: {
        restaurant: 'Tipping is usually not expected.',
        cafe: 'Round up only if you want to.',
        bar: 'Small cash tips are uncommon.',
        taxi: 'Round up only.',
        hotel: 'A small thank-you is enough for special help.',
        guide: 'Small tips are acceptable for guided experiences.',
        porter: 'Small cash tips are appreciated.',
        delivery: 'Usually not required.',
      },
      notes: ['Cash may be easier than card for small tips.'],
      verificationNote: 'This is a quick lookup only.',
    } satisfies TippingCountryPack

    render(createElement(TippingCountryPage, { locale: 'en-US', pack }))

    expect(screen.getByText('Tipping is usually not expected in Japan.')).toBeTruthy()
    expect(screen.getByText('Restaurant')).toBeTruthy()
    expect(screen.getByText('Delivery')).toBeTruthy()
    expect(screen.getByText('Cash may be easier than card for small tips.')).toBeTruthy()
  })

  it('shows the not found state when a country is missing', async () => {
    const { TippingCountryPage } = await import('@/features/tipping/country-page')

    render(createElement(TippingCountryPage, { locale: 'en-US', pack: null }))

    expect(screen.getByText('Country not found')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Back to countries' })).toBeTruthy()
  })
})
