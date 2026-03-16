// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('TimezoneComboboxPanel', () => {
  it('reads search and empty copy from the shared i18n registry', async () => {
    const { registerMessages } = await import('@/lib/i18n')
    registerMessages('test-timezone-combobox-panel-copy', {
      'en-US': {
        'common.searchCityOrTimezone': 'Registry timezone search',
        'common.noTimeZoneFound': 'Registry timezone empty',
      },
      'zh-CN': {
        'common.searchCityOrTimezone': '从文案中心搜索时区',
        'common.noTimeZoneFound': '文案中心没有匹配时区',
      },
    })

    const { TimezoneComboboxPanel } = await import('@/components/app/timezone-combobox-panel')

    render(
      createElement(TimezoneComboboxPanel, {
        locale: 'en-US',
        value: 'America/New_York',
        onValueChange: () => {},
      }),
    )

    fireEvent.change(screen.getByPlaceholderText('Registry timezone search'), {
      target: { value: '__no_timezone_match__' },
    })

    expect(screen.getByText('Registry timezone empty')).toBeTruthy()
  })
})
