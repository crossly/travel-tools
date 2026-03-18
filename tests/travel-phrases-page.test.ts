// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

beforeAll(() => {
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    value: vi.fn().mockResolvedValue(undefined),
  })
  Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    value: vi.fn(),
  })
})

beforeEach(() => {
  vi.restoreAllMocks()
  Object.defineProperty(window, 'scrollTo', {
    configurable: true,
    value: vi.fn(),
  })
})

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
  const translateMock = (key: string, values?: Record<string, string | number>) =>
    ({
      'phrases.title': 'Travel Phrases',
      'phrases.description': 'Playable travel phrases',
      'phrases.subtitle': 'Choose a country pack',
      'phrases.summary': 'Built for quick travel communication',
      'phrases.totalPacks': `${values?.count} packs`,
      'phrases.notFoundTitle': 'Not found',
      'phrases.notFoundDescription': 'Missing',
      'phrases.backToHome': 'Back to Travel Phrases',
      'phrases.countryMetric': `${values?.country} · ${values?.language} · ${values?.count} phrases`,
      'phrases.countryPageTitle': `${values?.country} Travel Phrases`,
      'phrases.countryPageDescription': `Useful local phrases for ${values?.country}`,
      'phrases.aiAudioNotice': 'All phrases include AI audio.',
      'phrases.audioPartialNotice': 'Most phrases include AI audio, but some bonus local cards are still text-only.',
      'phrases.audioComingSoon': 'This pack is text-only for now. Audio will be added later.',
      'phrases.audioComingSoonShort': 'Audio coming soon',
      'phrases.audioPartialShort': 'Some audio available',
      'phrases.packCount': `${values?.count} phrases`,
      'phrases.regionAll': 'All',
      'phrases.regionAsia': 'Asia',
      'phrases.regionEurope': 'Europe',
      'phrases.regionAmericas': 'Americas',
      'phrases.regionAfrica': 'Africa',
      'phrases.regionMiddleEast': 'Middle East',
      'phrases.regionOceania': 'Oceania',
      'phrases.searchLabel': 'Search packs',
      'phrases.searchPlaceholder': 'Search by country or language',
      'phrases.quickStartTitle': 'Start with these country packs',
      'phrases.quickStartDescription': 'Open a country fast when you already know where you are going.',
      'phrases.directoryTitle': 'Browse the full phrase directory',
      'phrases.directoryDescription': 'Filter by region or search by country and language.',
      'phrases.searchEmptyTitle': 'No phrase packs match this search',
      'phrases.searchEmptyDescription': 'Try another country, language, or region.',
      'phrases.featuredTitle': 'Featured country packs',
      'phrases.featuredDescription': 'Start with the countries that already include localized travel notes.',
      'phrases.regionSectionTitle': `${values?.region} travel phrase packs`,
      'phrases.regionSectionDescription': `${values?.count} packs in ${values?.region}`,
      'phrases.stopAudio': 'Stop audio',
      'phrases.playAudio': 'Play audio',
      'phrases.loadingAudio': 'Loading audio',
      'phrases.audioUnavailable': 'Audio is unavailable right now. Try again in a moment.',
      'phrases.emptyTitle': 'Empty',
      'phrases.emptyDescription': 'No phrases',
      'phrases.localTipsTitle': 'Local tips',
      'phrases.quickTipsTitle': 'Before you go',
      'phrases.quickTipsExpand': 'More local notes',
      'phrases.extraPhrasesTitle': 'Extra local phrases',
      'phrases.faqTitle': 'Travel FAQ',
      'phrases.relatedCountriesTitle': 'Related country packs',
      'phrases.categoryJumpTitle': 'Jump to phrase sections',
      'phrases.categoryJumpDescription': 'Open a situation faster with country-specific phrase groups.',
      'phrases.categoryJumpStickyLabel': 'Sticky phrase sections',
      'phrases.categorySectionTitle': `${values?.country} ${values?.category} phrases`,
      'phrases.categorySectionDescription.basics': `Common ${values?.category} phrases for ${values?.country}.`,
      'phrases.categorySectionDescription.transport': `Transport phrases for ${values?.country}, including stations, tickets, and directions.`,
      'phrases.categorySectionDescription.hotel': `Hotel phrases for ${values?.country}, including check-in, room needs, and timing.`,
      'phrases.categorySectionDescription.dining': `Dining phrases for ${values?.country}, including ordering, dietary requests, and payment.`,
      'phrases.categorySectionDescription.shopping': `Shopping phrases for ${values?.country}, including price, size, and payment questions.`,
      'phrases.categorySectionDescription.emergency': `Emergency phrases for ${values?.country}, including help, directions, and urgent needs.`,
      'phrases.category.basics': 'Basics',
      'phrases.category.transport': 'Transport',
      'phrases.category.hotel': 'Hotel',
      'phrases.category.dining': 'Dining',
      'phrases.category.shopping': 'Shopping',
      'phrases.category.emergency': 'Emergency',
    })[key] ?? key

  return {
    ...actual,
    translate: (_locale: string, key: string, values?: Record<string, string | number>) =>
      translateMock(key, values),
    useI18n: () => ({
      t: (key: string, values?: Record<string, string | number>) =>
        translateMock(key, values),
    }),
  }
})

describe('TravelPhrasesCountryPage', () => {
  it('renders localized country content in the page html and plays audio from the country route', async () => {
    const { getPhraseCountryPack } = await import('@/lib/travel-phrases')
    const { TravelPhrasesCountryPage } = await import('@/features/travel-phrases/country-page')
    const pack = await getPhraseCountryPack('en-US', 'japan')

    const { container } = render(createElement(TravelPhrasesCountryPage, { locale: 'en-US', pack }))

    expect(screen.getByText('こんにちは')).toBeTruthy()
    expect(screen.getByText(/rail travel, convenience stores, and polite service language/i)).toBeTruthy()
    expect(screen.queryByText(/Travel phrases for Japan with audio and local tips for rail, restaurants, and convenience stores./i)).toBeNull()
    expect(screen.getByRole('heading', { name: 'Before you go' })).toBeTruthy()
    expect(screen.queryByRole('heading', { name: 'Local tips' })).toBeNull()
    expect(screen.getByText('More local notes')).toBeTruthy()
    expect(container.querySelector('details')).toBeTruthy()
    expect(screen.getByText(/IC card/i)).toBeTruthy()
    expect(screen.getByText('Extra local phrases')).toBeTruthy()
    expect(screen.queryByText('Jump to phrase sections')).toBeNull()
    expect(screen.queryByText('Open a situation faster with country-specific phrase groups.')).toBeNull()
    expect(screen.getByRole('link', { name: 'Transport' }).getAttribute('href')).toBe('#transport-phrases')
    expect(screen.getByRole('navigation', { name: 'Sticky phrase sections' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Japan Transport phrases' })).toBeTruthy()
    expect(screen.queryByText('Transport phrases for Japan, including stations, tickets, and directions.')).toBeNull()
    expect(screen.getByText('Travel FAQ')).toBeTruthy()
    expect(screen.getByText(/Do I need Japanese for most tourist places/i)).toBeTruthy()
    expect(screen.getByText('Related country packs')).toBeTruthy()
    expect(screen.getByText('South Korea Travel Phrases')).toBeTruthy()
    expect(screen.getByText('Suica or PASMO is fine.')).toBeTruthy()
    expect(screen.getByText('二人です、お願いします')).toBeTruthy()
    expect(screen.getByText('Most phrases include AI audio, but some bonus local cards are still text-only.')).toBeTruthy()

    const stickyCategoryNav = screen.getByRole('navigation', { name: 'Sticky phrase sections' })
    expect(stickyCategoryNav.className).toContain('w-full')
    expect(stickyCategoryNav.className).toContain('min-w-0')
    expect(stickyCategoryNav.className).toContain('max-w-full')
    expect(stickyCategoryNav.className).not.toContain('md:flex-wrap')

    const basicsJumpLink = screen.getByRole('link', { name: 'Basics' })
    expect(basicsJumpLink.className).toContain('h-9')
    expect(basicsJumpLink.className).toContain('rounded-full')

    fireEvent.click(screen.getAllByRole('button', { name: 'Play audio' })[0] as HTMLButtonElement)

    const audio = document.querySelector('audio') as HTMLAudioElement
    await waitFor(() => {
      expect(audio.src).toContain('/api/phrase-audio/japan/hello')
    })

    fireEvent.error(audio)
    expect(screen.getByText('Audio is unavailable right now. Try again in a moment.')).toBeTruthy()
  })

  it('does not prefetch phrase audio on initial render', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      blob: async () => new Blob(['audio'], { type: 'audio/mpeg' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const { getPhraseCountryPack } = await import('@/lib/travel-phrases')
    const { TravelPhrasesCountryPage } = await import('@/features/travel-phrases/country-page')
    const pack = await getPhraseCountryPack('en-US', 'japan')

    render(createElement(TravelPhrasesCountryPage, { locale: 'en-US', pack }))

    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('uses native anchor navigation for category jumps without forcing a manual scroll', async () => {
    const { getPhraseCountryPack } = await import('@/lib/travel-phrases')
    const { TravelPhrasesCountryPage } = await import('@/features/travel-phrases/country-page')
    const pack = await getPhraseCountryPack('en-US', 'japan')

    render(createElement(TravelPhrasesCountryPage, { locale: 'en-US', pack }))

    fireEvent.click(screen.getByRole('link', { name: 'Basics' }))

    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('disables playback for packs without audio', async () => {
    const { getPhraseCountryPack } = await import('@/lib/travel-phrases')
    const { TravelPhrasesCountryPage } = await import('@/features/travel-phrases/country-page')
    const pack = await getPhraseCountryPack('en-US', 'cambodia')

    render(createElement(TravelPhrasesCountryPage, { locale: 'en-US', pack }))

    expect(screen.getByText('This pack is text-only for now. Audio will be added later.')).toBeTruthy()
    expect(screen.getAllByRole('button', { name: 'Audio coming soon' })[0].hasAttribute('disabled')).toBe(true)
  })

  it('renders expandable local notes for zh-CN country pages when the intro has multiple Chinese sentences', async () => {
    const { getPhraseCountryPack } = await import('@/lib/travel-phrases')
    const { TravelPhrasesCountryPage } = await import('@/features/travel-phrases/country-page')
    const pack = await getPhraseCountryPack('zh-CN', 'south-korea')

    const { container } = render(createElement(TravelPhrasesCountryPage, { locale: 'zh-CN', pack }))

    expect(screen.getByRole('heading', { name: 'Before you go' })).toBeTruthy()
    expect(container.querySelector('details')).toBeTruthy()
  })
})

describe('TravelPhrasesHomePage', () => {
  it('renders featured countries, teaser copy, and compact region directory sections', async () => {
    const { listPhraseCountrySummaries } = await import('@/lib/travel-phrases')
    const { TravelPhrasesHomePage } = await import('@/features/travel-phrases/home-page')
    const packs = listPhraseCountrySummaries('en-US')

    render(createElement(TravelPhrasesHomePage, { locale: 'en-US', packs }))

    expect(screen.getByRole('heading', { name: 'Featured country packs' })).toBeTruthy()
    expect(screen.queryByRole('heading', { name: 'Audio-ready right now' })).toBeNull()
    expect(screen.queryByRole('heading', { name: 'Browse by region' })).toBeNull()
    expect(screen.getByText(/rail travel, convenience stores, and polite service language/i)).toBeTruthy()
    expect(screen.getAllByRole('heading', { name: 'Japan' })).toHaveLength(1)
    expect(screen.getAllByRole('heading', { name: 'France' })).toHaveLength(1)
    expect(screen.getByText('Asia travel phrase packs')).toBeTruthy()
    expect(screen.getByText('Middle East travel phrase packs')).toBeTruthy()
    expect(screen.getAllByTestId('phrases-region-directory').length).toBeGreaterThan(0)
    expect(screen.getAllByTestId('phrases-region-row').length).toBeGreaterThan(0)
    expect(screen.getByText('Malaysia')).toBeTruthy()
  })

  it('filters the directory with a search field for faster country lookup', async () => {
    const { listPhraseCountrySummaries } = await import('@/lib/travel-phrases')
    const { TravelPhrasesHomePage } = await import('@/features/travel-phrases/home-page')
    const packs = listPhraseCountrySummaries('en-US')

    render(createElement(TravelPhrasesHomePage, { locale: 'en-US', packs }))

    fireEvent.change(screen.getByLabelText('Search packs'), { target: { value: 'japan' } })

    expect(screen.getAllByText('Japan').length).toBeGreaterThan(0)
    expect(screen.queryByText('France')).toBeNull()
  })
})
