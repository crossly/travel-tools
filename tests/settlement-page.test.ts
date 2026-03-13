// @vitest-environment jsdom
import { createElement } from 'react'
import type { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

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
}))

vi.mock('@/lib/i18n', () => ({
  useI18n: () => ({
    t: (key: string, values?: Record<string, string | number>) => {
      const template =
        ({
          'settlement.title': 'Settlement',
          'settlement.transferSuggestion': 'Transfer suggestions',
          'settlement.noTransfer': 'No transfer needed',
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

    expect(await screen.findByText('Teammate 1 → 🐼 Panda (You)')).toBeTruthy()
    expect(screen.getByText('5.00 CNY')).toBeTruthy()
  })
})
