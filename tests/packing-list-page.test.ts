// @vitest-environment jsdom
import { createElement } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { PackingList } from '@/lib/types'

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: React.ReactNode }) => createElement('div', null, children),
}))

let storedLists: PackingList[] = []
let activeListId: string | null = null

const writePackingLists = vi.fn((lists: PackingList[]) => {
  storedLists = lists
})

const writeActivePackingListId = vi.fn((listId: string) => {
  activeListId = listId
})

vi.mock('@/lib/storage', () => ({
  readPackingLists: () => storedLists,
  readActivePackingListId: () => activeListId,
  writePackingLists,
  writeActivePackingListId,
  clearActivePackingListId: vi.fn(() => {
    activeListId = null
  }),
  writeLastTool: vi.fn(),
}))

vi.mock('@/lib/i18n', () => ({
  registerMessages: vi.fn(),
  useI18n: () => ({
    t: (key: string) => ({
      'common.cancel': 'Cancel',
      'packing.title': 'Packing List',
      'packing.description': 'Keep essentials visible',
      'packing.createTitle': 'Create a list',
      'packing.createDescription': 'Pick a template first',
      'packing.currentList': 'Current list',
      'packing.listName': 'List name',
      'packing.listNamePlaceholder': 'For example: Osaka 5 days',
      'packing.template': 'Template',
      'packing.createAction': 'Create list',
      'packing.nameRequired': 'Enter a name for this list',
      'packing.statsTotal': 'Total items',
      'packing.statsPacked': 'Packed',
      'packing.statsRemaining': 'Remaining',
      'packing.essentialsTitle': 'Before-you-leave essentials',
      'packing.essentialsDescription': 'Keep the easy-to-forget essentials in one short strip.',
      'packing.essentialsReady': 'Done',
      'packing.essentialsMissing': 'Check',
      'packing.emptyTitle': 'No packing list yet',
      'packing.emptyDescription': 'Create your first list',
      'packing.addItemTitle': 'Add a custom item',
      'packing.addItemPlaceholder': 'For example: camera tripod',
      'packing.addItemAction': 'Add item',
      'packing.itemNameRequired': 'Enter an item name',
      'packing.noItems': 'No items in this section yet',
      'packing.noItemsDescription': 'Add a custom item to start this section.',
      'packing.quantity': 'Qty',
      'packing.note': 'Note',
      'packing.notePlaceholder': 'For example: checked bag / carry-on',
      'packing.markPacked': 'Mark packed',
      'packing.markUnpacked': 'Mark unpacked',
      'packing.deleteItem': 'Delete',
      'packing.deleteItemTitle': 'Delete item',
      'packing.deleteItemDescription': 'Delete this custom item? This cannot be undone.',
      'packing.section.documents': 'Documents',
      'packing.section.clothing': 'Clothing',
      'packing.section.toiletries': 'Toiletries',
      'packing.section.electronics': 'Electronics',
      'packing.section.medicine': 'Medicine',
      'packing.section.misc': 'Misc',
      'packing.template.weekend.name': 'Weekend',
      'packing.template.weekend.description': 'A light setup for 2 to 3 city days.',
      'packing.template.longTrip.name': 'Long Trip',
      'packing.template.longTrip.description': 'Built for multi-city or longer travel.',
      'packing.template.beach.name': 'Beach',
      'packing.template.beach.description': 'Built for pools, coastlines, and hot sun.',
      'packing.template.business.name': 'Business',
      'packing.template.business.description': 'Built for meetings, visits, and short work travel.',
      'packing.item.passport': 'Passport',
      'packing.item.visa': 'Visa or entry papers',
      'packing.item.cards': 'Bank cards',
      'packing.item.charger': 'Charger',
      'packing.item.adapter': 'Plug adapter',
      'packing.item.dailyMeds': 'Daily medicine',
    })[key] ?? key,
  }),
}))

describe('PackingListPage', () => {
  beforeEach(() => {
    vi.useRealTimers()
    storedLists = []
    activeListId = null
    writePackingLists.mockClear()
    writeActivePackingListId.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('creates a list from a template, updates progress, and removes a custom item', async () => {
    const { PackingListPage } = await import('@/features/packing-list/home-page')

    const view = render(createElement(PackingListPage, { locale: 'en-US' }))

    fireEvent.change(screen.getByLabelText('List name'), { target: { value: 'Tokyo Spring' } })
    fireEvent.click(screen.getByRole('button', { name: 'Create list' }))

    expect((await screen.findAllByText('Passport')).length).toBeGreaterThan(0)
    expect(screen.getByRole('combobox', { name: 'Current list' }).textContent).toContain('Tokyo Spring')
    expect(screen.getByRole('combobox', { name: 'Current list' }).tagName).toBe('BUTTON')
    expect(view.container.querySelector('select')).toBeNull()

    fireEvent.click(screen.getAllByRole('button', { name: 'Mark packed' })[0] as HTMLButtonElement)

    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: 'Mark unpacked' }).length).toBeGreaterThan(0)
    })

    fireEvent.change(screen.getAllByPlaceholderText('For example: camera tripod')[0] as HTMLInputElement, { target: { value: 'Travel SIM' } })
    fireEvent.click(screen.getAllByRole('button', { name: 'Add item' })[0] as HTMLButtonElement)

    expect(await screen.findByText('Travel SIM')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))
    const deleteButtons = await screen.findAllByRole('button', { name: 'Delete' })
    fireEvent.click(deleteButtons[deleteButtons.length - 1] as HTMLButtonElement)

    await waitFor(() => {
      expect(screen.queryByText('Travel SIM')).toBeNull()
    })

    expect(writePackingLists).toHaveBeenCalled()
    expect(writeActivePackingListId).toHaveBeenCalled()
  }, 10_000)

  it('debounces packing list persistence while the user is typing notes', async () => {
    vi.useFakeTimers()
    const { PackingListPage } = await import('@/features/packing-list/home-page')

    render(createElement(PackingListPage, { locale: 'en-US' }))

    fireEvent.change(screen.getByLabelText('List name'), { target: { value: 'Tokyo Spring' } })
    fireEvent.click(screen.getByRole('button', { name: 'Create list' }))

    act(() => {
      vi.runOnlyPendingTimers()
    })
    writePackingLists.mockClear()
    writeActivePackingListId.mockClear()

    const noteInputs = screen.getAllByPlaceholderText('For example: checked bag / carry-on')
    fireEvent.change(noteInputs[0] as HTMLInputElement, { target: { value: 'first draft' } })
    fireEvent.change(noteInputs[0] as HTMLInputElement, { target: { value: 'first draft updated' } })

    expect(writePackingLists).not.toHaveBeenCalled()
    expect(writeActivePackingListId).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(249)
    })

    expect(writePackingLists).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(1)
    })

    expect(writePackingLists).toHaveBeenCalledTimes(1)
    expect(writeActivePackingListId).toHaveBeenCalledWith(expect.any(String))
  }, 10_000)
})
