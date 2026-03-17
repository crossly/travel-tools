// @vitest-environment jsdom
import { createElement } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
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

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Confirm delete' }))
    })

    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('keeps the dialog open and disables actions while confirm is pending', async () => {
    let resolveConfirm: (() => void) | undefined
    const onConfirm = vi.fn(() => new Promise<void>((resolve) => {
      resolveConfirm = resolve
    }))
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
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Confirm delete' }))
    })

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledTimes(1)
      expect(screen.getByRole('button', { name: 'Confirm delete' }).getAttribute('aria-busy')).toBe('true')
    })
    expect(screen.getByRole('button', { name: 'Cancel' }).hasAttribute('disabled')).toBe(true)
    expect(screen.getByRole('alertdialog')).toBeTruthy()

    const finishConfirm = resolveConfirm
    if (finishConfirm) finishConfirm()

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).toBeNull()
    })
  })
})
