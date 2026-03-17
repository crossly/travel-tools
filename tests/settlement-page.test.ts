// @vitest-environment jsdom
import { createElement } from 'react'
import type { ReactNode } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const fetchSnapshotMock = vi.fn()
const fetchSettlementMock = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}))

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/components/app/inline-status', () => ({
  InlineStatus: ({ title }: { title: string }) => createElement('div', null, title),
}))

vi.mock('@/lib/api/client', () => ({
  fetchSnapshot: (...args: unknown[]) => fetchSnapshotMock(...args),
  fetchSettlement: (...args: unknown[]) => fetchSettlementMock(...args),
}))

vi.mock('@/lib/storage', () => ({
  readDevice: () => ({ deviceId: 'dev_123', displayName: '🐼 Panda' }),
  writeDevice: vi.fn(),
}))

vi.mock('@/lib/i18n', () => ({
  registerMessages: vi.fn(),
  useI18n: () => ({
    t: (key: string, values?: Record<string, string | number>) => {
      const template =
        ({
          'settlement.title': 'Settlement',
          'settlement.transferSuggestion': 'Transfer suggestions',
          'settlement.noTransfer': 'No transfer needed',
          'settlement.heroBalancedTitle': 'Everyone is already balanced',
          'settlement.heroTransfersTitle': 'Settle the trip from this list',
          'settlement.heroBalancedDescription': 'Nobody owes anyone right now. You can still copy the summary or jump back to the trip ledger.',
          'settlement.heroTransfersDescription': 'Work through the transfer list below, then copy the settlement summary or jump back to the trip ledger.',
          'settlement.transferCountLabel': 'Transfers',
          'settlement.totalToMoveLabel': 'Total to move',
          'settlement.convertedExpensesLabel': 'Converted expenses',
          'settlement.backToTrip': 'Back to trip',
          'settlement.fxDetailsEmptyTitle': 'No extra FX detail is needed',
          'settlement.fxDetailsEmptyDescription': 'All recorded expenses already match the settlement currency, so there is nothing else to expand here.',
          'settlement.copyText': 'Copy settlement text',
          'settlement.copySuccess': 'Settlement copied',
          'settlement.ownerLabel': '{name} (You)',
          'settlement.teammateLabel': 'Teammate {index}',
          'settlement.currencySummary': 'Currency summary',
          'settlement.expenseCurrency': 'Expense currency',
          'settlement.settlementCurrency': 'Settlement currency',
          'settlement.fxDetails': 'FX details',
        })[key] ?? key
      return template.replace(/\{(\w+)\}/g, (_, token) => String(values?.[token] ?? ''))
    },
    tError: (message: string) => message,
  }),
}))

describe('SettlementPage', () => {
  beforeEach(() => {
    fetchSnapshotMock.mockReset()
    fetchSettlementMock.mockReset()
  })

  beforeEach(() => {
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  it('replaces placeholder participant ids with readable labels', async () => {
    fetchSnapshotMock.mockResolvedValue({
      trip: {
        id: 'trip-1',
        name: 'Tokyo',
        expenseCurrency: 'JPY',
        settlementCurrency: 'CNY',
      },
    })
    fetchSettlementMock.mockResolvedValue({
      transfers: [{ fromMemberId: 'p2', toMemberId: 'p1', amountBase: 5 }],
      currencySummary: { expenseCurrency: 'JPY', settlementCurrency: 'CNY' },
      expenseConversions: [],
      balances: [],
      summaryText: 'p2 -> p1: 5.00',
    })

    const { SettlementPage } = await import('@/features/split-bill/settlement-page')

    render(createElement(SettlementPage, { locale: 'en-US', tripId: 'trip-1' }))

    expect(await screen.findByText('Settle the trip from this list')).toBeTruthy()
    expect(await screen.findByText('Teammate 1 → 🐼 Panda (You)')).toBeTruthy()
    expect(screen.getAllByText('5.00 CNY').length).toBeGreaterThan(0)
    expect(screen.getByText('No extra FX detail is needed')).toBeTruthy()
  })

  it('shows an error status when copying settlement text fails', async () => {
    const clipboardWriteText = vi.fn().mockRejectedValue(new Error('CLIPBOARD_UNAVAILABLE'))
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: clipboardWriteText,
      },
    })

    fetchSnapshotMock.mockResolvedValue({
      trip: {
        id: 'trip-1',
        name: 'Tokyo',
        expenseCurrency: 'JPY',
        settlementCurrency: 'CNY',
      },
    })
    fetchSettlementMock.mockResolvedValue({
      transfers: [{ fromMemberId: 'p2', toMemberId: 'p1', amountBase: 5 }],
      currencySummary: { expenseCurrency: 'JPY', settlementCurrency: 'CNY' },
      expenseConversions: [],
      balances: [],
      summaryText: 'p2 -> p1: 5.00',
    })

    const { SettlementPage } = await import('@/features/split-bill/settlement-page')

    render(createElement(SettlementPage, { locale: 'en-US', tripId: 'trip-1' }))

    fireEvent.click(await screen.findByRole('button', { name: 'Copy settlement text' }))

    await waitFor(() => {
      expect(clipboardWriteText).toHaveBeenCalled()
      expect(screen.getByText('CLIPBOARD_UNAVAILABLE')).toBeTruthy()
    })
  })

  it('copies a localized no-transfer summary when nobody needs to pay', async () => {
    const clipboardWriteText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: clipboardWriteText,
      },
    })

    fetchSnapshotMock.mockResolvedValue({
      trip: {
        id: 'trip-1',
        name: 'Tokyo',
        expenseCurrency: 'JPY',
        settlementCurrency: 'CNY',
      },
    })
    fetchSettlementMock.mockResolvedValue({
      transfers: [],
      currencySummary: { expenseCurrency: 'JPY', settlementCurrency: 'CNY' },
      expenseConversions: [],
      balances: [],
      summaryText: '',
    })

    const { SettlementPage } = await import('@/features/split-bill/settlement-page')

    render(createElement(SettlementPage, { locale: 'en-US', tripId: 'trip-1' }))

    expect(await screen.findByText('Everyone is already balanced')).toBeTruthy()
    fireEvent.click(await screen.findByRole('button', { name: 'Copy settlement text' }))

    await waitFor(() => {
      expect(clipboardWriteText).toHaveBeenCalledWith('No transfer needed')
    })
  })
})
