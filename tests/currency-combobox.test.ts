// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

describe('CurrencyCombobox', () => {
  it('filters currencies and returns the selected code', async () => {
    const onValueChange = vi.fn()
    const { CurrencyCombobox } = await import('@/components/app/currency-combobox')

    render(
      createElement(CurrencyCombobox, {
        value: 'USD',
        onValueChange,
        locale: 'en-US',
      }),
    )

    fireEvent.click(screen.getByRole('button', { name: /US Dollar|USD/i }))
    fireEvent.change(screen.getByPlaceholderText('Search currency or country'), {
      target: { value: 'japan' },
    })

    fireEvent.click(await screen.findByRole('button', { name: /JPY|Japanese Yen/i }))

    expect(onValueChange).toHaveBeenCalledWith('JPY')
  })

  it('uses a solid floating surface for the dropdown panel', async () => {
    const { CurrencyCombobox } = await import('@/components/app/currency-combobox')

    render(
      createElement(CurrencyCombobox, {
        value: 'USD',
        onValueChange: vi.fn(),
        locale: 'en-US',
      }),
    )

    fireEvent.click(screen.getByRole('button', { name: /US Dollar|USD/i }))

    const panel = screen.getByRole('listbox')
    expect(panel.className).toContain('bg-[var(--surface-floating)]')
  })
})
