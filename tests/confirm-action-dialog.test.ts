// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

describe('ConfirmActionDialog', () => {
  it('opens an in-app dialog and calls confirm action', async () => {
    const onConfirm = vi.fn()
    const { ConfirmActionDialog } = await import('@/components/app/confirm-action-dialog')

    render(
      createElement(ConfirmActionDialog, {
        triggerLabel: 'Delete trip',
        title: 'Delete trip',
        description: 'Delete this trip and all related records?',
        confirmLabel: 'Confirm delete',
        cancelLabel: 'Cancel',
        onConfirm,
      }),
    )

    fireEvent.click(screen.getByRole('button', { name: 'Delete trip' }))

    expect(screen.getByRole('alertdialog')).toBeTruthy()
    expect(screen.getByText('Delete this trip and all related records?')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Confirm delete' }))

    expect(onConfirm).toHaveBeenCalledTimes(1)
  })
})
