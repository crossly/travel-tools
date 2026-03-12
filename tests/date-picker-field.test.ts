// @vitest-environment jsdom
import { createElement, useState } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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

describe('DatePickerField', () => {
  it('opens a calendar panel, reports the selected date, and closes after selection', async () => {
    const onChange = vi.fn()
    const { DatePickerField } = await import('@/components/app/date-picker-field')

    function Wrapper() {
      const [value, setValue] = useState('2026-03-11')
      return createElement(DatePickerField, {
        value,
        onChange: (nextValue: string) => {
          setValue(nextValue)
          onChange(nextValue)
        },
        locale: 'en-US',
      })
    }

    render(
      createElement(Wrapper),
    )

    fireEvent.click(screen.getByRole('button', { name: /march 11/i }))
    fireEvent.click(await screen.findByRole('button', { name: /march 21.*2026/i }))

    expect(onChange).toHaveBeenCalledWith('2026-03-21')
    await waitFor(() => {
      expect(screen.queryByRole('grid')).toBeNull()
    })
    expect(screen.getByRole('button', { name: /march 21(?:st)?, 2026/i })).toBeTruthy()
  }, 10000)
})
