// @vitest-environment jsdom
import { createElement, useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

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
  it('uses a single trigger and lets date and time be edited in the same popover', async () => {
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
        timeLabel: 'Departure time time',
      })
    }

    render(createElement(Wrapper))

    expect(screen.queryByLabelText('Departure time time')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: /march 11.*09:15/i }))
    expect(await screen.findByLabelText('Departure time time')).toBeTruthy()
    fireEvent.click(await screen.findByRole('button', { name: /march 21.*2026/i }))

    expect(onChange).toHaveBeenCalledWith('2026-03-21T09:15')

    fireEvent.change(screen.getByLabelText('Departure time time'), {
      target: { value: '14:45' },
    })

    expect(onChange).toHaveBeenCalledWith('2026-03-21T14:45')
  })
})
