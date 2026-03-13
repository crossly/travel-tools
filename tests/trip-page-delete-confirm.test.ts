// @vitest-environment jsdom
import { createElement } from 'react'
import type { ReactNode } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const fetchSnapshotMock = vi.fn()
const deleteExpenseMock = vi.fn()
const deleteTripMock = vi.fn()
const updateTripSettingsMock = vi.fn()
const navigateMock = vi.fn()

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
}))

vi.mock('@/lib/i18n', () => ({
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
        'trip.addExpense': 'Add expense',
        'trip.settlement': 'Settlement',
        'trip.noExpenses': 'No expenses',
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
    vi.stubGlobal('confirm', vi.fn(() => true))
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
    expect(window.confirm).not.toHaveBeenCalled()
  })
})
