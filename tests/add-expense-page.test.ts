// @vitest-environment jsdom
import { createElement } from 'react'
import type { ReactNode } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const navigateMock = vi.fn()
const fetchSnapshotMock = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children?: ReactNode } & Record<string, unknown>) => createElement('a', props, children),
  useNavigate: () => navigateMock,
}))

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/features/split-bill/expense-form-card', () => ({
  ExpenseFormCard: () => createElement('div', null, 'expense form'),
}))

vi.mock('@/lib/api/client', () => ({
  fetchSnapshot: (...args: unknown[]) => fetchSnapshotMock(...args),
}))

vi.mock('@/lib/i18n', () => ({
  registerMessages: vi.fn(),
  useI18n: () => ({
    t: (key: string) =>
      ({
        'addExpense.title': 'Add expense',
        'addExpense.pageLead': 'Record one expense, then jump back to the trip ledger.',
        'addExpense.tripSummary': 'This trip',
        'addExpense.tripSummaryDescription': 'New expenses are written straight into the active trip and reuse these defaults.',
        'addExpense.summaryExpenseCurrency': 'Expense currency',
        'addExpense.summarySettlementCurrency': 'Settlement currency',
        'addExpense.summarySplitCount': 'Default split count',
        'addExpense.backToTrip': 'Return to trip ledger',
        'addExpense.quotePolicyTitle': 'How FX is handled',
        'addExpense.quotePolicyDescription': 'Use the date-based quote first, and only fill a manual rate when you want to override it.',
        'addExpense.quotePolicyAuto': "Leave the manual FX field empty to preview settlement totals with that day's quote.",
        'addExpense.quotePolicyManual': 'A manual rate immediately replaces the preview and becomes the saved conversion.',
        'addExpense.quotePolicyReturn': 'After saving, you go straight back to the trip ledger to add the next line or check totals.',
        'common.save': 'Save',
        'common.backToSplitBill': 'Back to bill splitter',
      })[key] ?? key,
    tError: (message: string) => message,
  }),
}))

describe('AddExpensePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('keeps the add-expense page focused on the form instead of leading with side panels', async () => {
    const { AddExpensePage } = await import('@/features/split-bill/add-expense-page')

    render(createElement(AddExpensePage, {
      locale: 'en-US',
      tripId: 'trip-1',
      initialSnapshot: {
        trip: {
          id: 'trip-1',
          name: 'Tokyo',
          expenseCurrency: 'JPY',
          settlementCurrency: 'CNY',
          splitCount: 3,
          baseCurrency: 'CNY',
          createdAt: '2026-03-17T00:00:00.000Z',
          updatedAt: '2026-03-17T00:00:00.000Z',
        },
        members: [],
        expenses: [],
        cursor: 'cursor-1',
      },
    }))

    expect(screen.getByText('Record one expense, then jump back to the trip ledger.')).toBeTruthy()
    expect(screen.getByText('expense form')).toBeTruthy()
    expect(screen.queryByText('This trip')).toBeNull()
    expect(screen.queryByText('How FX is handled')).toBeNull()
    expect(fetchSnapshotMock).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'Return to trip ledger' }))

    expect(navigateMock).toHaveBeenCalledWith(expect.objectContaining({ to: '/en-us/bill-splitter/trip-1' }))
  })
})
