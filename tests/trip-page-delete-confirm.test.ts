// @vitest-environment jsdom
import { createElement } from 'react'
import type { ReactNode } from 'react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const fetchSnapshotMock = vi.fn()
const deleteExpenseMock = vi.fn()
const deleteTripMock = vi.fn()
const updateTripSettingsMock = vi.fn()
const exportTripMock = vi.fn()
const importTripMock = vi.fn()
const navigateMock = vi.fn()
const clearActiveTripIdMock = vi.fn()
const createObjectURL = vi.fn(() => 'blob:mock')
const revokeObjectURL = vi.fn()
const anchorClick = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children?: ReactNode } & Record<string, unknown>) => createElement('a', props, children),
  useNavigate: () => navigateMock,
}))

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/components/app/inline-status', () => ({
  InlineStatus: ({ title }: { title: string }) => createElement('div', null, title),
}))

vi.mock('@/features/split-bill/expense-form-card', () => ({
  ExpenseFormCard: () => createElement('div', null, 'expense form'),
}))

vi.mock('@/lib/api/client', () => ({
  fetchSnapshot: (...args: unknown[]) => fetchSnapshotMock(...args),
  deleteExpense: (...args: unknown[]) => deleteExpenseMock(...args),
  deleteTrip: (...args: unknown[]) => deleteTripMock(...args),
  updateTripSettings: (...args: unknown[]) => updateTripSettingsMock(...args),
  exportTrip: (...args: unknown[]) => exportTripMock(...args),
  importTrip: (...args: unknown[]) => importTripMock(...args),
}))

vi.mock('@/lib/i18n', () => ({
  registerMessages: vi.fn(),
  useI18n: () => ({
    t: (key: string) =>
      ({
        'trip.titleFallback': 'Trip',
        'split.description': 'Split bill',
        'trip.expenseList': 'Expenses',
        'common.loading': 'Loading',
        'trip.deleteExpense': 'Delete expense',
        'trip.deleteExpenseConfirmTitle': 'Delete expense',
        'trip.deleteExpenseConfirmBody': 'Delete this expense record?',
        'trip.deleteExpenseAction': 'Confirm delete',
        'trip.deleteTrip': 'Delete trip',
        'trip.deleteTripConfirmTitle': 'Delete trip',
        'trip.deleteTripConfirmBody': 'Delete this trip and all related records?',
        'trip.deleteTripAction': 'Confirm delete',
        'trip.splitCount': 'Split count',
        'trip.saveSplitCount': 'Save split count',
        'trip.splitCountHint': 'Adjust this only when a specific expense should be shared by fewer or more people.',
        'trip.summaryExpenses': 'Recorded expenses',
        'trip.summarySettlementCurrency': 'Settlement currency',
        'trip.expenseDateLabel': 'Date: 2026-03-17',
        'trip.expenseSplitCountLabel': 'Split by 2',
        'trip.addExpense': 'Add expense',
        'trip.settlement': 'Settlement',
        'trip.exportJson': 'Export JSON',
        'trip.exportPending': 'Exporting',
        'trip.exportSuccess': 'Trip export downloaded',
        'trip.importJson': 'Import JSON',
        'trip.importPlaceholder': 'Paste trip JSON',
        'trip.importAction': 'Import into this trip',
        'trip.importPending': 'Importing',
        'trip.importSuccess': 'Trip import finished',
        'trip.importDescription': 'Paste a backup JSON to restore it into this trip.',
        'trip.importToggleOpen': 'Open import',
        'trip.importToggleClose': 'Close import',
        'trip.importContentRequired': 'Paste a backup JSON first',
        'trip.noExpenses': 'No expenses',
        'trip.emptyExpensesTitle': 'Record the first shared expense',
        'trip.emptyExpensesDescription': 'Use the focused add flow above when you want to capture the next line cleanly. This ledger keeps the full trip total in view.',
        'common.cancel': 'Cancel',
        'home.invalidSplitCount': 'Invalid split count',
        'trip.deleteTripSuccess': 'Trip deleted',
        'trip.splitCountSaved': 'Split count saved',
      })[key] ?? key,
    tError: (message: string) => message,
  }),
}))

vi.mock('@/lib/storage', () => ({
  writeActiveTripId: vi.fn(),
  clearActiveTripId: clearActiveTripIdMock,
}))

describe('TripPage delete confirmations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    fetchSnapshotMock.mockResolvedValue({
      trip: {
        id: 'trip-1',
        name: 'Tokyo',
        expenseCurrency: 'JPY',
        settlementCurrency: 'CNY',
        splitCount: 2,
      },
      expenses: [
        {
          id: 'expense-1',
          title: 'Lunch',
          amountOriginal: 1200,
          originalCurrency: 'JPY',
          deletedAt: null,
        },
      ],
    })
    deleteExpenseMock.mockResolvedValue(undefined)
    deleteTripMock.mockResolvedValue(undefined)
    updateTripSettingsMock.mockResolvedValue(undefined)
    exportTripMock.mockResolvedValue('{"trip":{"name":"Tokyo"}}')
    importTripMock.mockResolvedValue(undefined)
    vi.stubGlobal('confirm', vi.fn(() => true))
    vi.stubGlobal('URL', {
      createObjectURL,
      revokeObjectURL,
    })
  })

  it('uses in-app alert dialog for deleting an expense', async () => {
    const { TripPage } = await import('@/features/split-bill/trip-page')

    render(createElement(TripPage, { locale: 'en-US', tripId: 'trip-1' }))

    fireEvent.click(await screen.findByRole('button', { name: 'Delete expense' }))

    expect(screen.getByRole('alertdialog')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Confirm delete' }))

    await waitFor(() => {
      expect(deleteExpenseMock).toHaveBeenCalledWith('trip-1', 'expense-1')
    })
    expect(screen.getByText('Date: 2026-03-17')).toBeTruthy()
    expect(screen.getByText('Split by 2')).toBeTruthy()
    expect(window.confirm).not.toHaveBeenCalled()
  })

  it('clears the active trip id after deleting the trip', async () => {
    const { TripPage } = await import('@/features/split-bill/trip-page')

    render(createElement(TripPage, { locale: 'en-US', tripId: 'trip-1' }))

    fireEvent.click(await screen.findByRole('button', { name: 'Delete trip' }))
    expect(screen.getByRole('alertdialog')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Confirm delete' }))

    await waitFor(() => {
      expect(deleteTripMock).toHaveBeenCalledWith('trip-1')
      expect(clearActiveTripIdMock).toHaveBeenCalled()
      expect(navigateMock).toHaveBeenCalled()
    })
  })

  it('shows neutral split-count guidance before any changes are saved', async () => {
    const { TripPage } = await import('@/features/split-bill/trip-page')

    render(createElement(TripPage, { locale: 'en-US', tripId: 'trip-1' }))

    expect((await screen.findAllByText('Adjust this only when a specific expense should be shared by fewer or more people.')).length).toBeGreaterThan(0)
  })

  it('navigates to the dedicated add route from the workbench card', async () => {
    const { TripPage } = await import('@/features/split-bill/trip-page')

    render(createElement(TripPage, { locale: 'en-US', tripId: 'trip-1' }))

    expect(screen.queryByText('expense form')).toBeNull()
    fireEvent.click(await screen.findByRole('button', { name: 'Add expense' }))

    expect(navigateMock).toHaveBeenCalledWith(expect.objectContaining({ to: '/en-us/bill-splitter/trip-1/add' }))
  })

  it('keeps add expense as the primary action and groups split-count and trip controls in the secondary area', async () => {
    const { TripPage } = await import('@/features/split-bill/trip-page')

    render(createElement(TripPage, { locale: 'en-US', tripId: 'trip-1' }))

    const primaryActionCard = await screen.findByTestId('trip-primary-action-card')
    const secondaryActionsCard = await screen.findByTestId('trip-secondary-actions-card')

    expect(within(primaryActionCard).getByRole('button', { name: 'Add expense' })).toBeTruthy()
    expect(within(primaryActionCard).queryByText('Split count')).toBeNull()
    expect(within(primaryActionCard).queryByRole('button', { name: 'Settlement' })).toBeNull()
    expect(within(primaryActionCard).queryByRole('button', { name: 'Delete trip' })).toBeNull()

    expect(within(secondaryActionsCard).getByText('Split count')).toBeTruthy()
    expect(within(secondaryActionsCard).getByRole('button', { name: 'Settlement' })).toBeTruthy()
    expect(within(secondaryActionsCard).getByRole('button', { name: 'Delete trip' })).toBeTruthy()
    expect(screen.getAllByText('Split count').length).toBe(1)
  })

  it('exports the current trip from the secondary actions area', async () => {
    const appendChildSpy = vi.spyOn(document.body, 'appendChild')
    const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation(((tagName: string) => {
      if (tagName === 'a') {
        const anchor = document.createElementNS('http://www.w3.org/1999/xhtml', 'a') as HTMLAnchorElement
        anchor.click = anchorClick
        return anchor
      }
      return document.createElementNS('http://www.w3.org/1999/xhtml', tagName)
    }) as typeof document.createElement)

    const { TripPage } = await import('@/features/split-bill/trip-page')

    render(createElement(TripPage, { locale: 'en-US', tripId: 'trip-1' }))

    const secondaryActionsCard = await screen.findByTestId('trip-secondary-actions-card')
    fireEvent.click(within(secondaryActionsCard).getByRole('button', { name: 'Export JSON' }))

    await waitFor(() => {
      expect(exportTripMock).toHaveBeenCalledWith('trip-1')
      expect(createObjectURL).toHaveBeenCalled()
      expect(anchorClick).toHaveBeenCalled()
      expect(screen.getByText('Trip export downloaded')).toBeTruthy()
    })

    createElementSpy.mockRestore()
    appendChildSpy.mockRestore()
  })

  it('imports a backup json into the current trip from the secondary actions area', async () => {
    fetchSnapshotMock
      .mockResolvedValueOnce({
        trip: {
          id: 'trip-1',
          name: 'Tokyo',
          expenseCurrency: 'JPY',
          settlementCurrency: 'CNY',
          splitCount: 2,
        },
        expenses: [
          {
            id: 'expense-1',
            title: 'Lunch',
            amountOriginal: 1200,
            originalCurrency: 'JPY',
            deletedAt: null,
          },
        ],
      })
      .mockResolvedValueOnce({
        trip: {
          id: 'trip-1',
          name: 'Tokyo',
          expenseCurrency: 'JPY',
          settlementCurrency: 'CNY',
          splitCount: 4,
        },
        expenses: [
          {
            id: 'expense-1',
            title: 'Lunch',
            amountOriginal: 1200,
            originalCurrency: 'JPY',
            deletedAt: null,
          },
        ],
      })

    const { TripPage } = await import('@/features/split-bill/trip-page')

    render(createElement(TripPage, { locale: 'en-US', tripId: 'trip-1' }))

    const secondaryActionsCard = await screen.findByTestId('trip-secondary-actions-card')
    fireEvent.click(within(secondaryActionsCard).getByRole('button', { name: 'Open import' }))
    fireEvent.change(screen.getByPlaceholderText('Paste trip JSON'), { target: { value: '{"trip":true}' } })
    fireEvent.click(screen.getByRole('button', { name: 'Import into this trip' }))

    await waitFor(() => {
      expect(importTripMock).toHaveBeenCalledWith('trip-1', '{"trip":true}')
      expect(fetchSnapshotMock).toHaveBeenCalledWith('trip-1')
      expect(screen.getByText('Trip import finished')).toBeTruthy()
      expect(screen.queryByPlaceholderText('Paste trip JSON')).toBeNull()
    })
  })

  it('shows a richer empty ledger state when no expenses are recorded', async () => {
    fetchSnapshotMock.mockResolvedValue({
      trip: {
        id: 'trip-1',
        name: 'Tokyo',
        expenseCurrency: 'JPY',
        settlementCurrency: 'CNY',
        splitCount: 2,
      },
      expenses: [],
    })

    const { TripPage } = await import('@/features/split-bill/trip-page')

    render(createElement(TripPage, { locale: 'en-US', tripId: 'trip-1' }))

    expect(await screen.findByText('Record the first shared expense')).toBeTruthy()
    expect(screen.getByText('Recorded expenses')).toBeTruthy()
  })
})
