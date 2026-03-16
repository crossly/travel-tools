// @vitest-environment jsdom
import { createElement } from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { LocalAppCountrySummary, LocalAppGuide } from '@/lib/types'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children?: React.ReactNode } & Record<string, unknown>) => createElement('a', props, children),
}))

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: React.ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/lib/i18n', () => ({
  useI18n: () => ({
    t: (key: string, values?: Record<string, string | number>) => {
      if (key === 'localApps.cardMetric') {
        return `${values?.categories} categories · ${values?.apps} apps`
      }

      return ({
        'localApps.pendingBadge': 'Coming soon',
        'localApps.pendingPageDescription': `${values?.country ?? 'Country'} pending`,
        'localApps.notFoundTitle': 'Country not found',
        'localApps.notFoundDescription': 'Go back to Local Apps and choose another country.',
        'localApps.backToHome': 'Back to Local Apps',
        'localApps.categoryJumpTitle': 'Jump by category',
        'localApps.categoryJumpDescription': 'Open the app categories that matter faster.',
        'localApps.categoryJumpStickyLabel': 'Local app category navigation',
        'localApps.cautionTitle': 'Read first',
        'localApps.downloadTitle': 'Download flow',
        'localApps.downloadDescription': 'Start from the official link first.',
        'localApps.downloadHint': 'Start with the primary app.',
        'localApps.relatedTitle': 'Other ready countries in the region',
        'localApps.primaryApp': 'Primary',
        'localApps.backupApp': 'Backup',
        'localApps.linkOfficial': 'Official',
        'localApps.linkIos': 'iPhone',
        'localApps.linkAndroid': 'Android',
        'localApps.category.maps': 'Maps',
      })[key] ?? key
    },
  }),
}))

const summary: LocalAppCountrySummary = {
  country: 'Japan',
  slug: 'japan',
  region: 'asia',
  flag: 'JP',
  ready: true,
  title: 'Japan Local Apps',
  description: 'Country summary',
  highlights: ['Transit'],
  categoryIds: ['maps'],
  categoryCount: 1,
  appCount: 1,
}

const guide: LocalAppGuide = {
  country: 'Japan',
  slug: 'japan',
  region: 'asia',
  flag: 'JP',
  title: 'Japan Local Apps',
  description: 'Country guide',
  intro: 'Use local apps before you land.',
  highlights: ['Transit'],
  categoryCount: 1,
  appCount: 1,
  categories: [
    {
      id: 'maps',
      summary: 'Map apps',
      apps: [
        {
          id: 'navitime',
          name: 'NAVITIME',
          summary: 'Trip planning',
          reason: 'Good train coverage',
          recommended: true,
          links: [{ platform: 'official', url: 'https://example.com' }],
        },
      ],
    },
  ],
  cautions: ['Check account region support.'],
  relatedCountries: [],
}

describe('LocalAppsCountryPage', () => {
  it('rerenders from a pending summary to a ready guide without changing hook order', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { LocalAppsCountryPage } = await import('@/features/local-apps/country-page')
    const { rerender } = render(createElement(LocalAppsCountryPage, { locale: 'en-US', summary, guide: null }))

    expect(() => {
      rerender(createElement(LocalAppsCountryPage, { locale: 'en-US', summary, guide }))
    }).not.toThrow()

    errorSpy.mockRestore()
  })

  it('renders the guide intro copy on ready country pages', async () => {
    const { LocalAppsCountryPage } = await import('@/features/local-apps/country-page')

    const view = render(createElement(LocalAppsCountryPage, { locale: 'en-US', summary, guide }))

    expect(view.getByText('Use local apps before you land.')).toBeTruthy()
  })
})
