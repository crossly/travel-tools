// @vitest-environment jsdom
import { createElement, useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

beforeAll(() => {
  if (!HTMLElement.prototype.hasPointerCapture) {
    HTMLElement.prototype.hasPointerCapture = () => false
  }
  if (!HTMLElement.prototype.setPointerCapture) {
    HTMLElement.prototype.setPointerCapture = () => {}
  }
  if (!HTMLElement.prototype.releasePointerCapture) {
    HTMLElement.prototype.releasePointerCapture = () => {}
  }
  if (!HTMLElement.prototype.scrollIntoView) {
    HTMLElement.prototype.scrollIntoView = () => {}
  }
})

vi.mock('@/components/app/date-picker-panel', () => ({
  DatePickerPanel: ({ onChange }: { onChange: (nextValue: string) => void }) => createElement(
    'div',
    { role: 'grid' },
    createElement(
      'button',
      {
        type: 'button',
        onClick: () => onChange('2026-03-21'),
      },
      'March 21, 2026',
    ),
  ),
}))

describe('DateTimeField', () => {
  it('reads placeholder and time labels from the shared i18n registry', async () => {
    const { registerMessages } = await import('@/lib/i18n')
    registerMessages('test-date-time-copy', {
      'en-US': {
        'common.pickDateTime': 'Choose date and time from registry',
        'common.hour': 'Hour from registry',
        'common.minute': 'Minute from registry',
      },
      'zh-CN': {
        'common.pickDateTime': '从文案中心选择日期和时间',
        'common.hour': '文案小时',
        'common.minute': '文案分钟',
      },
    })

    const { DateTimeField } = await import('@/components/app/date-time-field')

    render(
      createElement(DateTimeField, {
        value: '',
        onChange: vi.fn(),
        locale: 'en-US',
        timeLabel: 'Departure time',
      }),
    )

    fireEvent.click(screen.getByRole('button', { name: /choose date and time from registry/i }))

    expect(await screen.findByText('Hour from registry')).toBeTruthy()
    expect(screen.getByText('Minute from registry')).toBeTruthy()
  })

  it('uses a single trigger and lets date and time be edited in the same popover without native time inputs', async () => {
    const onChange = vi.fn()
    const { DateTimeField } = await import('@/components/app/date-time-field')

    function Wrapper() {
      const [value, setValue] = useState('2026-03-11T09:15')
      return createElement(DateTimeField, {
        value,
        onChange: (nextValue: string) => {
          setValue(nextValue)
          onChange(nextValue)
        },
        locale: 'en-US',
        timeLabel: 'Departure time',
      })
    }

    render(createElement(Wrapper))

    expect(screen.queryByLabelText('Departure time')).toBeNull()
    expect(screen.getByRole('button', { name: /march 11.*09:15/i }).className).toContain('min-h-11')

    fireEvent.click(screen.getByRole('button', { name: /march 11.*09:15/i }))
    expect(screen.queryByLabelText('Departure time')).toBeNull()
    expect(await screen.findByRole('combobox', { name: /departure time .*hour/i })).toBeTruthy()
    expect(screen.getByRole('combobox', { name: /departure time .*minute/i })).toBeTruthy()
    expect(screen.getByRole('combobox', { name: /departure time .*hour/i }).closest('label')?.parentElement?.className).not.toContain('sm:grid-cols-2')

    fireEvent.click(await screen.findByRole('button', { name: /march 21.*2026/i }))

    expect(onChange).toHaveBeenCalledWith('2026-03-21T09:15')

    screen.getByRole('combobox', { name: /departure time .*hour/i }).focus()
    fireEvent.keyDown(screen.getByRole('combobox', { name: /departure time .*hour/i }), { key: 'ArrowDown' })
    fireEvent.click(await screen.findByRole('option', { name: '14' }))

    screen.getByRole('combobox', { name: /departure time .*minute/i }).focus()
    fireEvent.keyDown(screen.getByRole('combobox', { name: /departure time .*minute/i }), { key: 'ArrowDown' })
    const minuteListbox = await screen.findByRole('listbox')
    expect(minuteListbox.closest('[class*="max-h-64"]')).toBeTruthy()
    fireEvent.click(await screen.findByRole('option', { name: '45' }))

    expect(onChange).toHaveBeenCalledWith('2026-03-21T14:45')
  }, 10_000)
})
