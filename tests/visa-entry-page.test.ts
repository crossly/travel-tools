// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children?: React.ReactNode } & Record<string, unknown>) => createElement('a', props, children),
}))

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: React.ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/lib/storage', () => ({
  writeLastTool: vi.fn(),
}))

vi.mock('@/lib/i18n', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/i18n')>()

  return {
    ...actual,
    useI18n: () => ({
      t: (key: string, values?: Record<string, string | number>) =>
        ({
        'visaEntry.title': 'Visa / Entry',
        'visaEntry.description': 'Entry basics by destination',
        'visaEntry.subtitle': 'Destination lookup',
        'visaEntry.summary': 'Fast entry checklist for the road',
        'visaEntry.totalDestinations': `${values?.count} destinations`,
        'visaEntry.searchLabel': 'Search destinations',
        'visaEntry.searchPlaceholder': 'Search by country or region',
        'visaEntry.searchEmptyTitle': 'No destinations match this search',
        'visaEntry.searchEmptyDescription': 'Try another country or region.',
        'visaEntry.featuredTitle': 'Quick entry checks',
        'visaEntry.featuredDescription': 'Open a country to verify the common entry path and declaration reminders.',
        'visaEntry.regionSectionTitle': `${values?.region} destinations`,
        'visaEntry.regionSectionDescription': `${values?.count} destinations in ${values?.region}`,
        'visaEntry.backToHome': 'Back to Visa / Entry',
        'visaEntry.countryMetric': `${values?.country} · ${values?.region}`,
        'visaEntry.countrySummary': `${values?.country} entry basics`,
        'visaEntry.countryTitle': `${values?.country} entry basics`,
        'visaEntry.commonEntryPathsTitle': 'Common entry paths',
        'visaEntry.arrivalCardTitle': 'Arrival card',
        'visaEntry.customsDeclarationTitle': 'Customs declaration',
        'visaEntry.healthDeclarationTitle': 'Health declaration',
        'visaEntry.officialLinksTitle': 'Official links',
        'visaEntry.verificationNoteTitle': 'Verification note',
        'visaEntry.commonEntryPathA': 'Visa, eVisa, ETA, or visa-on-arrival routes can still apply depending on the passport.',
        'visaEntry.commonEntryPathB': 'Transit rules can differ if you connect through another country.',
        'visaEntry.commonEntryPathC': 'Check the airport or border process before you travel.',
        'visaEntry.arrivalCardBody': 'May be required on arrival or before boarding.',
        'visaEntry.customsDeclarationBody': 'Check cash, alcohol, tobacco, and restricted-goods thresholds before you pack.',
        'visaEntry.healthDeclarationBody': 'Some destinations still use health forms or vaccination checks.',
        'visaEntry.verificationNoteBody': 'Use official immigration or customs sites before departure.',
        'visaEntry.officialLinkIata': 'IATA Travel Centre',
        'visaEntry.officialLinkAdvice': 'Official travel advice index',
        })[key] ?? key,
    }),
  }
})

describe('VisaEntryHomePage', () => {
  it('filters the destination directory by search text', async () => {
    const { listVisaEntryDestinationSummaries } = await import('@/lib/visa-entry')
    const { VisaEntryHomePage } = await import('@/features/visa-entry/home-page')

    render(createElement(VisaEntryHomePage, { locale: 'en-US', destinations: listVisaEntryDestinationSummaries('en-US') }))

    fireEvent.change(screen.getByLabelText('Search destinations'), { target: { value: 'japan' } })

    expect(screen.getByText('Japan')).toBeTruthy()
    expect(screen.queryByText('France')).toBeNull()
  })
})

describe('VisaEntryCountryPage', () => {
  it('renders the country guide blocks for entry checks', async () => {
    const { getVisaEntryDestinationGuide } = await import('@/lib/visa-entry')
    const { VisaEntryCountryPage } = await import('@/features/visa-entry/country-page')

    const guide = getVisaEntryDestinationGuide('en-US', 'japan')
    render(createElement(VisaEntryCountryPage, { locale: 'en-US', guide }))

    expect(screen.getByRole('heading', { name: 'Common entry paths' })).toBeTruthy()
    expect(screen.getByText('Arrival card')).toBeTruthy()
    expect(screen.getByText('Customs declaration')).toBeTruthy()
    expect(screen.getByText('Health declaration')).toBeTruthy()
    expect(screen.getByText('Official links')).toBeTruthy()
    expect(screen.getAllByText('Verify the official immigration or customs site and your airline before departure.')).toHaveLength(2)
  })
})
