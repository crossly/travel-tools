// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { TripSnapshot } from '@/lib/types'

const fetchFxQuote = vi.fn()
const createExpense = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}))

vi.mock('@/components/app/currency-combobox', () => ({
  CurrencyCombobox: ({
    value,
    onValueChange,
    disabled,
  }: {
    value: string
    onValueChange: (value: string) => void
    disabled?: boolean
  }) => createElement(
    'button',
    {
      type: 'button',
      disabled,
      onClick: () => onValueChange('JPY'),
    },
    value,
  ),
}))

vi.mock('@/components/app/date-picker-field', () => ({
  DatePickerField: ({
    value,
    onChange,
    disabled,
  }: {
    value: string
    onChange: (value: string) => void
    disabled?: boolean
  }) => createElement('input', {
    'aria-label': 'Date',
    value,
    disabled,
    onChange: (event: { target: { value: string } }) => onChange(event.target.value),
  }),
}))

vi.mock('@/components/app/inline-status', () => ({
  InlineStatus: ({ title }: { title: string }) => createElement('div', null, title),
}))

vi.mock('@/lib/api/client', () => ({
  createExpense,
  fetchFxQuote,
}))

vi.mock('@/lib/i18n', () => ({
  registerMessages: vi.fn(),
  useI18n: () => ({
    t: (key: string, values?: Record<string, string | number>) =>
      ({
        'addExpense.title': 'Add expense',
        'addExpense.labelTitle': 'Title',
        'addExpense.titlePlaceholder': 'e.g. Lunch',
        'addExpense.labelAmount': 'Amount',
        'addExpense.labelCurrency': 'Currency',
        'addExpense.labelDate': 'Date',
        'addExpense.labelNote': 'Note',
        'addExpense.manualFx': 'Manual FX rate',
        'addExpense.manualFxDescription': 'Leave this empty to use the quoted rate automatically.',
        'addExpense.manualFxPlaceholder': 'e.g. 7.123456',
        'addExpense.manualFxInvalid': 'Please enter a valid manual FX rate',
        'addExpense.splitCount': 'Split count for this expense',
        'addExpense.titleRequired': 'Please enter a title',
        'addExpense.amountRequired': 'Please enter a valid amount',
        'addExpense.currencyInvalid': 'Please enter a valid 3-letter currency code',
        'addExpense.saved': 'Expense added',
        'addExpense.fxPreviewTitle': 'Settlement preview',
        'addExpense.fxPreviewEmpty': 'Enter an amount to preview the settlement-side total.',
        'addExpense.fxPreviewPending': 'Fetching the latest conversion for this date.',
        'addExpense.fxPreviewNoConversion': 'No conversion needed for this expense.',
        'addExpense.fxPreviewAuto': `Quoted rate · ${values?.amount} ${values?.fromCurrency} -> ${values?.converted} ${values?.toCurrency}`,
        'addExpense.fxPreviewManual': `Manual rate · ${values?.amount} ${values?.fromCurrency} -> ${values?.converted} ${values?.toCurrency}`,
        'addExpense.fxPreviewUnavailable': 'FX quote unavailable right now.',
        'common.saving': 'Saving',
        'home.invalidSplitCount': 'Split count must be at least 1',
      })[key] ?? key,
    tError: (message: string) => message,
  }),
}))

const snapshot: TripSnapshot = {
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
}

describe('ExpenseFormCard', () => {
  beforeEach(() => {
    vi.useRealTimers()
    fetchFxQuote.mockReset()
    createExpense.mockReset()
  })

  it('shows an automatic and manual FX settlement preview before saving', async () => {
    fetchFxQuote.mockResolvedValue({ rate: 0.05, fromCurrency: 'JPY', toCurrency: 'CNY' })
    const { ExpenseFormCard } = await import('@/features/split-bill/expense-form-card')

    render(createElement(ExpenseFormCard, {
      locale: 'en-US',
      tripId: 'trip-1',
      snapshot,
      submitLabel: 'Add expense',
    }))

    expect(screen.getByText('Settlement preview')).toBeTruthy()
    expect(screen.getByText('Enter an amount to preview the settlement-side total.')).toBeTruthy()

    fireEvent.change(screen.getByRole('textbox', { name: 'Amount' }), { target: { value: '100' } })

    await waitFor(() => {
      expect(fetchFxQuote).toHaveBeenCalledWith('trip-1', 'JPY', 'CNY', expect.any(String))
      expect(screen.getByText('Quoted rate · 100.00 JPY -> 5.00 CNY')).toBeTruthy()
    })

    fireEvent.change(screen.getByRole('textbox', { name: 'Manual FX rate' }), { target: { value: '0.06' } })

    await waitFor(() => {
      expect(screen.getByText('Manual rate · 100.00 JPY -> 6.00 CNY')).toBeTruthy()
    })
  }, 10_000)
})
