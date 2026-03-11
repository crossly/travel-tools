// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

describe('DatePickerField', () => {
  it('opens a calendar panel and reports the selected date', async () => {
    const onChange = vi.fn()
    const { DatePickerField } = await import('@/components/app/date-picker-field')

    render(
      createElement(DatePickerField, {
        value: '2026-03-11',
        onChange,
        locale: 'en-US',
      }),
    )

    fireEvent.click(screen.getByRole('button', { name: /march 11/i }))
    fireEvent.click(await screen.findByRole('button', { name: /march 21.*2026/i }))

    expect(onChange).toHaveBeenCalledWith('2026-03-21')
  })
})
