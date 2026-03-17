// @vitest-environment jsdom
import { createElement } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { LocalAppCountrySummary } from '@/lib/types'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children?: React.ReactNode } & Record<string, unknown>) => createElement('a', props, children),
}))

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: React.ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/lib/storage', () => ({
  writeLastTool: vi.fn(),
}))

vi.mock('@/lib/travel-phrases', () => {
  throw new Error('LocalAppsHomePage should not import the full travel-phrases module just to render region tabs')
})

vi.mock('@/lib/i18n', () => ({
  registerMessages: vi.fn(),
  useI18n: () => ({
    t: (key: string, values?: Record<string, string | number>) => {
      if (key === 'localApps.totalMetric') {
        return `${values?.ready} ready · ${values?.tracked} tracked`
      }
      if (key === 'localApps.cardMetric') {
        return `${values?.categories} categories · ${values?.apps} apps`
      }

      return ({
        'phrases.regionAll': 'All',
        'phrases.regionAsia': 'Asia',
        'phrases.regionEurope': 'Europe',
        'phrases.regionAmericas': 'Americas',
        'phrases.regionAfrica': 'Africa',
        'phrases.regionMiddleEast': 'Middle East',
        'phrases.regionOceania': 'Oceania',
        'localApps.title': 'Local Apps',
        'localApps.description': 'Useful local app guides',
        'localApps.summaryBadge': 'Overview',
        'localApps.summaryTitle': 'Country app guides',
        'localApps.summaryDescription': 'Install the right apps before you land.',
        'localApps.installTitle': 'Install before you board',
        'localApps.installDescription': 'Start with transport and one backup category, then add the rest only if the trip needs them.',
        'localApps.readyBadge': 'Ready',
        'localApps.readyTitle': 'Ready countries',
        'localApps.readyDescription': 'Start with countries that already have verified guides.',
        'localApps.rosterTitle': 'Roster still syncing',
        'localApps.rosterDescription': 'Some country pages are already tracked but still waiting on one more verification pass.',
        'localApps.pendingBadge': 'Pending',
        'localApps.pendingSectionTitle': `${values?.region} pending`,
        'localApps.pendingSectionDescription': `${values?.count} countries pending`,
        'localApps.pendingCardLabel': 'Guide in progress',
        'localApps.category.rideHailing': 'Ride hailing',
        'localApps.category.maps': 'Maps',
        'localApps.category.payments': 'Payments',
        'localApps.category.shopping': 'Shopping',
        'localApps.category.foodDiscovery': 'Food discovery',
        'localApps.category.foodDelivery': 'Food delivery',
        'localApps.category.stays': 'Stays',
      })[key] ?? key
    },
  }),
}))

const countries: LocalAppCountrySummary[] = [
  {
    country: 'Japan',
    slug: 'japan',
    region: 'asia',
    flag: 'JP',
    ready: true,
    title: 'Japan Local Apps',
    description: 'Japan summary',
    highlights: ['Transit'],
    categoryIds: ['maps'],
    categoryCount: 1,
    appCount: 3,
  },
]

describe('LocalAppsHomePage', () => {
  it('renders region tabs without importing the heavy travel-phrases module', async () => {
    const { LocalAppsHomePage } = await import('@/features/local-apps/home-page')

    render(createElement(LocalAppsHomePage, {
      locale: 'en-US',
      countries,
      readyCount: 1,
      trackedCount: 1,
    }))

    expect(screen.getByRole('button', { name: 'Asia' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Install before you board' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Roster still syncing' })).toBeTruthy()
    expect(screen.getByText('Japan')).toBeTruthy()
  })
})
