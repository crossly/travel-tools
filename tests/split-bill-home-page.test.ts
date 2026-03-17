// @vitest-environment jsdom
import { createElement } from 'react'
import type { ReactNode } from 'react'
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const bootstrapDevice = vi.fn()
const createTrip = vi.fn()
const listTrips = vi.fn()
const readDevice = vi.fn()
const writeActiveTripId = vi.fn()
const writeDevice = vi.fn()
const writeLastTool = vi.fn()
const navigate = vi.fn()

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-router')>('@tanstack/react-router')
  return {
    ...actual,
    Link: ({ children, ...props }: { children?: ReactNode }) => createElement('a', props, children),
    useNavigate: () => navigate,
  }
})

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/components/app/currency-combobox', () => ({
  CurrencyCombobox: ({ value, onValueChange, disabled }: { value: string; onValueChange: (value: string) => void; disabled?: boolean }) =>
    createElement('select', {
      value,
      disabled,
      onChange: (event: Event) => onValueChange((event.target as HTMLSelectElement).value),
    }, [
      createElement('option', { key: 'CNY', value: 'CNY' }, 'CNY'),
      createElement('option', { key: 'USD', value: 'USD' }, 'USD'),
    ]),
}))

vi.mock('@/components/app/inline-status', () => ({
  InlineStatus: ({ tone, title }: { tone: string; title: string }) => createElement('div', { 'data-testid': 'inline-status', 'data-tone': tone }, title),
}))

vi.mock('@/lib/api/client', () => ({
  bootstrapDevice,
  createTrip,
  listTrips,
}))

vi.mock('@/lib/storage', () => ({
  readDevice,
  writeActiveTripId,
  writeDevice,
  writeLastTool,
}))

vi.mock('@/lib/i18n', () => ({
  registerMessages: vi.fn(),
  useI18n: () => ({
    t: (key: string) => ({
      'split.title': 'Bill Splitter',
      'split.description': 'Trip bill splitter',
      'home.tripStepTitle': 'Start a new trip',
      'home.tripStepDescription': 'Choose trip setup details',
      'home.createTripLocked': 'Setup is locked',
      'home.identityGenerating': 'Generating identity',
      'home.identityInlineLabel': 'This device',
      'home.createTrip': 'Create trip',
      'home.tripNamePlaceholder': 'e.g. Hangzhou Weekend',
      'home.enterTripName': 'Trip name required',
      'home.invalidCurrency': 'Invalid currency',
      'home.invalidSplitCount': 'Invalid split count',
      'home.expenseCurrency': 'Expense currency',
      'home.expenseCurrencyHelper': 'Spent during trip',
      'home.settlementCurrency': 'Settlement currency',
      'home.settlementCurrencyHelper': 'Used for balancing',
      'home.splitCount': 'Split count',
      'home.createStart': 'Create and start',
      'home.recentStepTitle': 'Continue a recent trip',
      'home.recentStepDescription': 'Jump back in',
      'home.noTrips': 'No trips yet',
      'home.noTripsDescription': 'Recent trips appear here',
      'common.loading': 'Loading...',
    })[key] ?? key,
    tError: (message: string) => message,
  }),
}))

function deferred<T>() {
  let resolve: (value: T) => void = () => {}
  let reject: (reason?: unknown) => void = () => {}
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

describe('SplitBillHomePage', () => {
  beforeEach(() => {
    bootstrapDevice.mockReset()
    createTrip.mockReset()
    listTrips.mockReset()
    readDevice.mockReset()
    writeActiveTripId.mockReset()
    writeDevice.mockReset()
    writeLastTool.mockReset()
    navigate.mockReset()
  })

  afterEach(() => {
    cleanup()
  })

  it('keeps the start panel visible with disabled actions while identity bootstrap is in progress', async () => {
    const pendingBootstrap = deferred<{ deviceId: string; displayName: string }>()
    readDevice.mockReturnValue(null)
    bootstrapDevice.mockReturnValue(pendingBootstrap.promise)
    const { SplitBillHomePage } = await import('@/features/split-bill/home-page')

    render(createElement(SplitBillHomePage, { locale: 'en-US', initialData: { device: null, trips: [] } }))

    const startPanel = await screen.findByTestId('split-start-panel')
    expect(within(startPanel).getByText('Generating identity')).toBeTruthy()
    expect(within(startPanel).getByRole('button', { name: 'Create and start' }).hasAttribute('disabled')).toBe(true)
  })

  it('shows creation errors within the start panel workspace', async () => {
    readDevice.mockReturnValue(null)
    createTrip.mockRejectedValueOnce(new Error('TRIP_CREATE_FAILED'))
    const { SplitBillHomePage } = await import('@/features/split-bill/home-page')

    render(createElement(SplitBillHomePage, {
      locale: 'en-US',
      initialData: {
        device: { deviceId: 'dev_123', displayName: 'Kiwi' },
        trips: [],
      },
    }))

    fireEvent.change(screen.getByLabelText('Create trip'), { target: { value: 'Hangzhou Weekend' } })
    fireEvent.click(screen.getByRole('button', { name: 'Create and start' }))

    const startPanel = await screen.findByTestId('split-start-panel')
    await waitFor(() => {
      expect(within(startPanel).getByTestId('inline-status').textContent).toContain('TRIP_CREATE_FAILED')
    })
  })

  it('keeps the continuation panel frame while loading recent trips', async () => {
    const pendingListTrips = deferred<Array<{ id: string; name: string; expenseCurrency: string; settlementCurrency: string }>>()
    readDevice.mockReturnValue({ deviceId: 'dev_123', displayName: 'Kiwi' })
    listTrips.mockReturnValue(pendingListTrips.promise)
    const { SplitBillHomePage } = await import('@/features/split-bill/home-page')

    render(createElement(SplitBillHomePage, { locale: 'en-US', initialData: { device: null, trips: [] } }))

    const continuePanel = await screen.findByTestId('split-continue-panel')
    expect(within(continuePanel).getByText('Continue a recent trip')).toBeTruthy()
    expect(within(continuePanel).getByText('Loading...')).toBeTruthy()
  })
})
