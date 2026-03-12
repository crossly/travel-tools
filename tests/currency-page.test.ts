// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: React.ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/components/app/currency-combobox', () => ({
  CurrencyCombobox: ({ value, onValueChange }: { value: string; onValueChange: (value: string) => void }) =>
    createElement('select', {
      value,
      onChange: (event: Event) => onValueChange((event.target as HTMLSelectElement).value),
    }, [
      createElement('option', { key: 'USD', value: 'USD' }, 'USD'),
      createElement('option', { key: 'EUR', value: 'EUR' }, 'EUR'),
    ]),
}))

const fetchCurrencyRates = vi.fn()

vi.mock('@/lib/api/client', () => ({
  fetchCurrencyRates,
  detectCurrency: vi.fn(),
}))

vi.mock('@/lib/storage', () => ({
  readCachedCurrencyRates: () => ({ raw: null, updatedAt: null }),
  readCurrencyPrefs: () => ({ source: 'USD', target: 'EUR' }),
  writeCachedCurrencyRates: vi.fn(),
  writeCurrencyPrefs: vi.fn(),
  writeLastTool: vi.fn(),
}))

vi.mock('@/lib/i18n', () => ({
  useI18n: () => ({
    t: (key: string) => ({
      'currency.title': '汇率换算',
      'currency.description': 'desc',
      'currency.resultLabel': '换算结果',
      'currency.freshnessLive': '实时',
      'currency.freshnessOffline': '离线',
      'currency.freshnessCached': '缓存',
      'currency.offlineNotice': 'offline',
      'currency.cacheNotice': 'cache',
      'currency.errorTitle': '汇率获取失败',
      'currency.rateLabel': '当前汇率',
      'currency.updatedLabel': '更新时间',
      'currency.amountLabel': '金额',
      'currency.placeholder': '0.00',
      'currency.fromLabel': '从',
      'currency.toLabel': '到',
      'currency.swap': '交换币种',
      'currency.quickAmounts': '快捷金额',
      'currency.detectAction': '识别本地币种',
      'currency.refreshAction': '刷新汇率',
    })[key] ?? key,
    tError: (code: string) => code,
  }),
}))

describe('CurrencyPage', () => {
  it('uses a danger badge when refreshing rates fails', async () => {
    fetchCurrencyRates.mockRejectedValueOnce(new Error('FX_FETCH_FAILED'))
    const { CurrencyPage } = await import('@/features/currency/currency-page')

    render(createElement(CurrencyPage, { locale: 'zh-CN' }))
    fireEvent.click(screen.getByRole('button', { name: '刷新汇率' }))

    await waitFor(() => {
      const badges = screen.getAllByText('汇率获取失败')
      expect(badges.some((badge) => badge.className.includes('text-[var(--danger)]'))).toBe(true)
    })
  })
})
