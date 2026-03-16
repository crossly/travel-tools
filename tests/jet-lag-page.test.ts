// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { JetLagPrefs } from '@/lib/types'

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: React.ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/components/app/timezone-combobox', () => ({
  TimezoneCombobox: ({
    id,
    value,
    onValueChange,
  }: {
    id?: string
    value: string
    onValueChange: (nextValue: string) => void
  }) => createElement(
    'button',
    {
      id,
      type: 'button',
      onClick: () => onValueChange('America/New_York'),
    },
    value,
  ),
}))

vi.mock('@/components/app/date-time-field', () => ({
  DateTimeField: ({
    id,
    value,
    onChange,
    timeLabel,
  }: {
    id?: string
    value: string
    onChange: (nextValue: string) => void
    timeLabel: string
  }) => createElement(
    'input',
    {
      id,
      'aria-label': timeLabel.replace(/ time$/i, ''),
      value,
      onChange: (event: { target: { value: string } }) => onChange(event.target.value),
    },
  ),
}))

const defaultStoredPrefs: JetLagPrefs = {
  originTimeZone: 'Asia/Shanghai',
  destinationTimeZone: 'Europe/Paris',
  departureAt: '2026-01-15T09:00',
  arrivalAt: '2026-01-15T18:00',
  intensity: 'moderate',
}

let storedPrefs: JetLagPrefs | null = defaultStoredPrefs

const writeJetLagPrefs = vi.fn()

vi.mock('@/lib/storage', () => ({
  readJetLagPrefs: () => storedPrefs,
  writeJetLagPrefs,
  writeLastTool: vi.fn(),
}))

vi.mock('@/lib/i18n', () => ({
  registerMessages: vi.fn(),
  useI18n: () => ({
    t: (key: string, values?: Record<string, string | number>) => ({
      'jetLag.title': 'Jet Lag Reset',
      'jetLag.description': 'Reset your body clock quickly',
      'jetLag.inputTitle': 'Trip timing',
      'jetLag.inputDescription': 'Everything here is calculated locally.',
      'jetLag.originTimeZone': 'Origin time zone',
      'jetLag.destinationTimeZone': 'Destination time zone',
      'jetLag.departureAt': 'Departure time',
      'jetLag.arrivalAt': 'Arrival time',
      'jetLag.departureTimeLabel': 'Departure time',
      'jetLag.arrivalTimeLabel': 'Arrival time',
      'jetLag.modeLabel': 'Recovery mode',
      'jetLag.intensity.light': 'Light',
      'jetLag.intensity.moderate': 'Moderate',
      'jetLag.intensity.heavy': 'Heavy',
      'jetLag.intensityDescription.light': 'Looser pacing',
      'jetLag.intensityDescription.moderate': 'Balanced default',
      'jetLag.intensityDescription.heavy': 'Stricter timing',
      'jetLag.summaryTitle': 'Recovery summary',
      'jetLag.summaryDescription': 'Start with the timezone gap.',
      'jetLag.hourDifference': 'Time difference',
      'jetLag.flightDuration': 'Flight duration',
      'jetLag.recoveryDays': 'Estimated reset days',
      'jetLag.arrivalLocal': 'Local arrival time',
      'jetLag.clockTitle': 'Time zone snapshot',
      'jetLag.clockDescription': 'Check what time it is in both places right now, then compare your departure and arrival in each zone.',
      'jetLag.originNow': 'Origin now',
      'jetLag.destinationNow': 'Destination now',
      'jetLag.clockDifference': 'Time difference',
      'jetLag.departureDualTitle': 'Departure in both zones',
      'jetLag.arrivalDualTitle': 'Arrival in both zones',
      'jetLag.clockOriginColumn': 'Origin',
      'jetLag.clockDestinationColumn': 'Destination',
      'jetLag.relative.ahead': `Destination is ${values?.hours} ahead`,
      'jetLag.relative.behind': `Destination is ${values?.hours} behind`,
      'jetLag.relative.same': 'The two time zones are nearly aligned',
      'jetLag.recommendedMode': `Recommended mode: ${values?.intensity}`,
      'jetLag.direction.east': 'east',
      'jetLag.direction.west': 'west',
      'jetLag.direction.same': 'same',
      'jetLag.lightTiming.morning': 'Morning light',
      'jetLag.lightTiming.afternoon': 'Afternoon activity',
      'jetLag.lightTiming.balanced': 'Balanced',
      'jetLag.sleepTitle': 'Sleep',
      'jetLag.sleepAdvice': `Sleep around ${values?.hour}:00`,
      'jetLag.sleepAnchor': `Aim for ${values?.hour}:00`,
      'jetLag.lightTitle': 'Light exposure',
      'jetLag.lightAdvice.morning': 'Morning light',
      'jetLag.lightAdvice.afternoon': 'Afternoon activity',
      'jetLag.lightAdvice.balanced': 'Balanced light',
      'jetLag.caffeineTitle': 'Caffeine',
      'jetLag.caffeineAdvice': `Wait about ${values?.hours} hours`,
      'jetLag.napTitle': 'Naps',
      'jetLag.napAdvice': `Keep naps under ${values?.minutes} minutes before ${values?.hour}:00`,
      'jetLag.invalidTiming': 'Arrival time must be later than departure time',
      'jetLag.invalidTimingDescription': 'Check both time zones',
      'jetLag.reset': 'Reset sample trip',
      'jetLag.hoursSuffix': 'h',
      'jetLag.daysSuffix': 'd',
    })[key] ?? key,
  }),
}))

describe('JetLagPage', () => {
  beforeEach(() => {
    storedPrefs = defaultStoredPrefs
    writeJetLagPrefs.mockClear()
    vi.useRealTimers()
  })

  it('uses deterministic sample defaults during the server render when no prefs are stored', async () => {
    storedPrefs = null
    const { JetLagPage } = await import('@/features/jet-lag/page')

    const html = renderToString(createElement(JetLagPage, { locale: 'en-US' }))

    expect(html).toContain('>Asia/Shanghai<')
    expect(html).toContain('>Europe/Paris<')
    expect(html).toContain('value="2026-01-15T09:00"')
    expect(html).toContain('value="2026-01-15T18:00"')
  })

  it('detects the browser timezone and applies it to the origin field when no prefs are stored', async () => {
    storedPrefs = null
    const { JetLagPage } = await import('@/features/jet-lag/page')

    const originalResolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions
    const resolvedOptionsSpy = vi
      .spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions')
      .mockImplementation(function resolvedOptionsWithDetectedTimezone(this: Intl.DateTimeFormat) {
        return {
          ...originalResolvedOptions.call(this),
          timeZone: 'America/New_York',
        }
      })

    render(createElement(JetLagPage, { locale: 'en-US' }))

    expect(await screen.findByText('America/New_York')).toBeTruthy()
    expect(writeJetLagPrefs).toHaveBeenCalledWith(expect.objectContaining({ originTimeZone: 'America/New_York' }))
    resolvedOptionsSpy.mockRestore()
  })

  it('renders a computed plan and reacts to invalid trip timing', async () => {
    const { JetLagPage } = await import('@/features/jet-lag/page')

    render(createElement(JetLagPage, { locale: 'en-US' }))

    expect(screen.getAllByText('7h').length).toBeGreaterThan(0)
    expect(screen.getByText('16h')).toBeTruthy()
    expect(screen.getByText('Recommended mode: Moderate')).toBeTruthy()
    expect(screen.getByText('Wait about 1.5 hours')).toBeTruthy()
    expect(screen.getByText('Time zone snapshot')).toBeTruthy()
    expect(screen.getByText('Origin now')).toBeTruthy()
    expect(screen.getByText('Destination now')).toBeTruthy()
    expect(screen.getByText('Departure in both zones')).toBeTruthy()
    expect(screen.getByText('Arrival in both zones')).toBeTruthy()
    expect(screen.getByText('Destination is 7h behind')).toBeTruthy()

    fireEvent.change(screen.getByLabelText('Arrival time'), {
      target: { value: '2026-01-15T00:30' },
    })

    expect(await screen.findByText('Arrival time must be later than departure time')).toBeTruthy()
    expect(writeJetLagPrefs).toHaveBeenCalled()
  })

  it('renders live origin and destination clocks from the current time', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-15T01:00:00.000Z'))

    const { formatJetLagInstant } = await import('@/lib/jet-lag')
    const { JetLagPage } = await import('@/features/jet-lag/page')

    render(createElement(JetLagPage, { locale: 'en-US' }))

    expect(screen.getAllByText(formatJetLagInstant(new Date('2026-01-15T01:00:00.000Z'), 'Asia/Shanghai', 'en-US')).length).toBeGreaterThan(0)
    expect(screen.getAllByText(formatJetLagInstant(new Date('2026-01-15T01:00:00.000Z'), 'Europe/Paris', 'en-US')).length).toBeGreaterThan(0)
  })
})
