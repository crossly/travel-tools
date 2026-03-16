// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('CurrencyComboboxPanel', () => {
  it('reads search and empty copy from the shared i18n registry', async () => {
    const { registerMessages } = await import('@/lib/i18n')
    registerMessages('test-currency-combobox-panel-copy', {
      'en-US': {
        'common.searchCurrencyOrCountry': 'Registry currency search',
        'common.noCurrencyFound': 'Registry currency empty',
      },
      'zh-CN': {
        'common.searchCurrencyOrCountry': '从文案中心搜索币种',
        'common.noCurrencyFound': '文案中心没有匹配币种',
      },
    })

    const { CurrencyComboboxPanel } = await import('@/components/app/currency-combobox-panel')

    render(
      createElement(CurrencyComboboxPanel, {
        locale: 'en-US',
        value: 'USD',
        onValueChange: () => {},
      }),
    )

    fireEvent.change(screen.getByPlaceholderText('Registry currency search'), {
      target: { value: '__no_currency_match__' },
    })

    expect(screen.getByText('Registry currency empty')).toBeTruthy()
  })
})
