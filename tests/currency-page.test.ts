// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

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
const readCachedCurrencyRates = vi.fn<() => { raw: string | null; updatedAt: string | null }>(() => ({ raw: null, updatedAt: null }))
const readCurrencyPrefs = vi.fn<() => { source: string; target: string }>(() => ({ source: 'USD', target: 'EUR' }))
const writeCachedCurrencyRates = vi.fn()
const writeCurrencyPrefs = vi.fn()
const writeLastTool = vi.fn()

vi.mock('@/lib/api/client', () => ({
  fetchCurrencyRates,
  detectCurrency: vi.fn(),
}))

vi.mock('@/lib/storage', () => ({
  readCachedCurrencyRates,
  readCurrencyPrefs,
  writeCachedCurrencyRates,
  writeCurrencyPrefs,
  writeLastTool,
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
  afterEach(() => {
    fetchCurrencyRates.mockReset()
    readCachedCurrencyRates.mockReset()
    readCurrencyPrefs.mockReset()
    writeCachedCurrencyRates.mockReset()
    writeCurrencyPrefs.mockReset()
    writeLastTool.mockReset()
    readCachedCurrencyRates.mockReturnValue({ raw: null, updatedAt: null })
    readCurrencyPrefs.mockReturnValue({ source: 'USD', target: 'EUR' })
  })

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

  it('ignores cached rates when the cached base does not match the preferred source', async () => {
    readCurrencyPrefs.mockReturnValueOnce({ source: 'USD', target: 'EUR' })
    readCachedCurrencyRates.mockReturnValueOnce({
      raw: JSON.stringify({
        base: 'EUR',
        date: '2026-03-14',
        rates: { USD: 1.2 },
        updatedAt: '2026-03-14T08:00:00.000Z',
      }),
      updatedAt: '2026-03-14T08:00:00.000Z',
    })
    fetchCurrencyRates.mockImplementationOnce(() => new Promise(() => {}))
    const { CurrencyPage } = await import('@/features/currency/currency-page')

    render(createElement(CurrencyPage, { locale: 'zh-CN' }))

    await waitFor(() => {
      expect(screen.getByText(/更新时间:/).textContent).toBeTruthy()
    })
    expect(screen.getByText(/更新时间:/).textContent).toContain('---')
  })

  it('matches cached rates only when the stored base equals the expected source', async () => {
    const { matchesRatesBase } = await import('@/features/currency/currency-page')

    expect(matchesRatesBase('USD', { base: 'USD' })).toBe(true)
    expect(matchesRatesBase('USD', { base: 'EUR' })).toBe(false)
    expect(matchesRatesBase('usd', { base: 'USD' })).toBe(true)
    expect(matchesRatesBase('USD', null)).toBe(false)
  })

  it('accepts only the latest in-flight FX response for the active source currency', async () => {
    const { shouldApplyRatesResponse } = await import('@/features/currency/currency-page')

    expect(shouldApplyRatesResponse({
      requestId: 2,
      latestRequestId: 2,
      requestedBase: 'EUR',
      currentSource: 'EUR',
      responseBase: 'EUR',
    })).toBe(true)

    expect(shouldApplyRatesResponse({
      requestId: 1,
      latestRequestId: 2,
      requestedBase: 'USD',
      currentSource: 'EUR',
      responseBase: 'USD',
    })).toBe(false)

    expect(shouldApplyRatesResponse({
      requestId: 2,
      latestRequestId: 2,
      requestedBase: 'EUR',
      currentSource: 'EUR',
      responseBase: 'USD',
    })).toBe(false)
  })
})
