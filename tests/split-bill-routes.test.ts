// @vitest-environment jsdom
import { createElement } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'

vi.mock('@/features/split-bill/trip-page', () => ({
  TripPage: ({ tripId }: { tripId: string }) => createElement('div', null, `trip page ${tripId}`),
}))

vi.mock('@/features/split-bill/add-expense-page', () => ({
  AddExpensePage: ({ tripId }: { tripId: string }) => createElement('div', null, `add expense page ${tripId}`),
}))

vi.mock('@/features/split-bill/settlement-page', () => ({
  SettlementPage: ({ tripId }: { tripId: string }) => createElement('div', null, `settlement page ${tripId}`),
}))

vi.mock('@/server/split-bill-page-data', () => ({
  loadTripSnapshotData: vi.fn(async ({ data }: { data: { tripId: string } }) => ({
    trip: {
      id: data.tripId,
      name: 'Trip',
      expenseCurrency: 'CNY',
      settlementCurrency: 'CNY',
      splitCount: 2,
      baseCurrency: 'CNY',
      createdAt: '',
      updatedAt: '',
    },
    members: [],
    expenses: [],
    cursor: '',
  })),
  loadSettlementPageData: vi.fn(async ({ data }: { data: { tripId: string } }) => ({
    device: { deviceId: 'dev_123', displayName: '🐼 Panda' },
    trip: {
      trip: {
        id: data.tripId,
        name: 'Trip',
        expenseCurrency: 'CNY',
        settlementCurrency: 'CNY',
        splitCount: 2,
        baseCurrency: 'CNY',
        createdAt: '',
        updatedAt: '',
      },
      members: [],
      expenses: [],
      cursor: '',
    },
    settlement: {
      balances: [],
      transfers: [],
      summaryText: 'NO_TRANSFER_NEEDED',
      currencySummary: { expenseCurrency: 'CNY', settlementCurrency: 'CNY' },
      expenseConversions: [],
    },
  })),
}))

vi.mock('@/routes/__root', async () => {
  const { Outlet, createRootRoute } = await import('@tanstack/react-router')
  return {
    Route: createRootRoute({
      component: () => createElement('div', null, createElement(Outlet)),
    }),
  }
})

describe('split bill nested routes', () => {
  beforeEach(() => {
    const store = new Map<string, string>()
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => void store.set(key, value),
        removeItem: (key: string) => void store.delete(key),
        clear: () => void store.clear(),
      },
    })
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('dark'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
    Object.defineProperty(window, 'scrollTo', {
      configurable: true,
      value: vi.fn(),
    })
    window.localStorage.clear()
    document.body.innerHTML = ''
  })

  afterEach(() => {
    cleanup()
    window.history.pushState({}, '', '/')
  })

  it('renders the add expense child route', async () => {
    window.history.pushState({}, '', '/zh-CN/bill-splitter/trip-123/add')

    const [{ RouterProvider }, { getRouter }] = await Promise.all([
      import('@tanstack/react-router'),
      import('@/router'),
    ])

    const router = getRouter()
    render(createElement(RouterProvider, { router }))

    expect(await screen.findByText('add expense page trip-123')).toBeTruthy()
  })

  it('renders the settlement child route', async () => {
    window.history.pushState({}, '', '/zh-CN/bill-splitter/trip-123/settlement')

    const [{ RouterProvider }, { getRouter }] = await Promise.all([
      import('@tanstack/react-router'),
      import('@/router'),
    ])

    const router = getRouter()
    render(createElement(RouterProvider, { router }))

    expect(await screen.findByText('settlement page trip-123')).toBeTruthy()
  })
})
