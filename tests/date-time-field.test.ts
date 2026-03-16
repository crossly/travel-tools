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

    fireEvent.click(screen.getByRole('button', { name: /march 11.*09:15/i }))
    expect(screen.queryByLabelText('Departure time')).toBeNull()
    expect(await screen.findByRole('combobox', { name: 'Departure time hour' })).toBeTruthy()
    expect(screen.getByRole('combobox', { name: 'Departure time minute' })).toBeTruthy()

    fireEvent.click(await screen.findByRole('button', { name: /march 21.*2026/i }))

    expect(onChange).toHaveBeenCalledWith('2026-03-21T09:15')

    screen.getByRole('combobox', { name: 'Departure time hour' }).focus()
    fireEvent.keyDown(screen.getByRole('combobox', { name: 'Departure time hour' }), { key: 'ArrowDown' })
    fireEvent.click(await screen.findByRole('option', { name: '14' }))

    screen.getByRole('combobox', { name: 'Departure time minute' }).focus()
    fireEvent.keyDown(screen.getByRole('combobox', { name: 'Departure time minute' }), { key: 'ArrowDown' })
    fireEvent.click(await screen.findByRole('option', { name: '45' }))

    expect(onChange).toHaveBeenCalledWith('2026-03-21T14:45')
  })
})
