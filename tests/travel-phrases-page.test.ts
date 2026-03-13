// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

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
      'phrases.notFoundTitle': 'Not found',
      'phrases.notFoundDescription': 'Missing',
      'phrases.backToHome': 'Back to Travel Phrases',
      'phrases.countryMetric': `${values?.country} · ${values?.language} · ${values?.count} phrases`,
      'phrases.countryPageTitle': `${values?.country} Travel Phrases`,
      'phrases.countryPageDescription': `Useful local phrases for ${values?.country}`,
      'phrases.aiAudioNotice': 'AI audio',
      'phrases.audioComingSoon': 'This pack is text-only for now. Audio will be added later.',
      'phrases.audioComingSoonShort': 'Audio coming soon',
      'phrases.stopAudio': 'Stop audio',
      'phrases.playAudio': 'Play audio',
      'phrases.audioUnavailable': 'Audio is unavailable right now. Try again in a moment.',
      'phrases.emptyTitle': 'Empty',
      'phrases.emptyDescription': 'No phrases',
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
  it('switches categories without navigation and plays audio from the country route', async () => {
    const { getPhraseCountryPack } = await import('@/lib/travel-phrases')
    const { TravelPhrasesCountryPage } = await import('@/features/travel-phrases/country-page')
    const pack = getPhraseCountryPack('en-US', 'japan')

    render(createElement(TravelPhrasesCountryPage, { locale: 'en-US', pack }))

    expect(screen.getByText('こんにちは')).toBeTruthy()

    const diningTab = screen.getByRole('tab', { name: 'Dining' })
    fireEvent.pointerDown(diningTab, { button: 0, ctrlKey: false })
    fireEvent.click(diningTab)
    expect(await screen.findByText('二人です、お願いします')).toBeTruthy()

    fireEvent.click(screen.getAllByRole('button', { name: 'Play audio' })[0] as HTMLButtonElement)

    const audio = document.querySelector('audio') as HTMLAudioElement
    await waitFor(() => {
      expect(audio.src).toContain('/api/phrase-audio/japan/table_for_two')
    })

    fireEvent.error(audio)
    expect(screen.getByText('Audio is unavailable right now. Try again in a moment.')).toBeTruthy()
  })

  it('disables playback for packs without audio', async () => {
    const { getPhraseCountryPack } = await import('@/lib/travel-phrases')
    const { TravelPhrasesCountryPage } = await import('@/features/travel-phrases/country-page')
    const pack = getPhraseCountryPack('en-US', 'cambodia')

    render(createElement(TravelPhrasesCountryPage, { locale: 'en-US', pack }))

    expect(screen.getByText('This pack is text-only for now. Audio will be added later.')).toBeTruthy()
    expect(screen.getAllByRole('button', { name: 'Audio coming soon' })[0].hasAttribute('disabled')).toBe(true)
  })
})
