// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/components/app/timezone-combobox-panel', () => ({
  TimezoneComboboxPanel: ({
    onValueChange,
  }: {
    onValueChange: (nextValue: string) => void
  }) => createElement(
    'div',
    { role: 'listbox', className: 'bg-[var(--surface-floating)]' },
    createElement('input', { placeholder: 'Search city or timezone' }),
    createElement(
      'button',
      {
        type: 'button',
        onClick: () => onValueChange('Asia/Tokyo'),
      },
      'Tokyo Asia/Tokyo',
    ),
  ),
}))

describe('TimezoneCombobox', () => {
  it('opens a searchable timezone panel and returns the selected timezone', async () => {
    const onValueChange = vi.fn()
    const { TimezoneCombobox } = await import('@/components/app/timezone-combobox')

    render(
      createElement(TimezoneCombobox, {
        value: 'America/New_York',
        onValueChange,
        locale: 'en-US',
      }),
    )

    fireEvent.click(screen.getByRole('button', { name: /new york|america\/new_york/i }))
    fireEvent.change(await screen.findByPlaceholderText('Search city or timezone'), {
      target: { value: 'tokyo' },
    })
    fireEvent.click(await screen.findByRole('button', { name: /tokyo.*asia\/tokyo/i }))

    expect(onValueChange).toHaveBeenCalledWith('Asia/Tokyo')
  })

  it('uses a solid floating surface for the dropdown panel', async () => {
    const { TimezoneCombobox } = await import('@/components/app/timezone-combobox')

    render(
      createElement(TimezoneCombobox, {
        value: 'America/New_York',
        onValueChange: vi.fn(),
        locale: 'en-US',
      }),
    )

    fireEvent.click(screen.getByRole('button', { name: /new york|america\/new_york/i }))

    const panel = await screen.findByRole('listbox')
    expect(panel.className).toContain('bg-[var(--surface-floating)]')
  })
})
