import { describe, expect, it, vi } from 'vitest'

function mockRouteEnvironment() {
  vi.doMock('@tanstack/react-router', () => ({
    createFileRoute: () => (options: unknown) => options,
    lazyRouteComponent: () => {
      const RouteComponent = () => null
      return RouteComponent
    },
    notFound: () => {
      throw new Error('notFound should not be called during module import')
    },
  }))

  vi.doMock('@/lib/i18n', () => ({
    I18nProvider: ({ children }: { children: unknown }) => children,
    translate: (locale: string, key: string) => `${locale}:${key}`,
  }))

  vi.doMock('@/lib/seo', () => ({
    buildPublicPageHead: (value: unknown) => value,
    buildPrivatePageHead: (value: unknown) => value,
    buildRootAliasHead: (value: unknown) => value,
    buildBreadcrumbStructuredData: (value: unknown) => value,
  }))

  vi.doMock('@/lib/site', () => ({
    DEFAULT_LOCALE: 'en-US',
    resolveLocaleSegment: (value: string) => value,
  }))

  vi.doMock('@/server/home-page-data', () => ({
    loadHomePageData: () => ({ locale: 'en-US', homePageStats: null }),
  }))

  vi.doMock('@/server/currency-page-data', () => ({
    loadCurrencyPageData: () => ({ baseCurrency: 'USD', rates: [] }),
  }))

  vi.doMock('@/server/split-bill-page-data', () => ({
    loadSplitBillHomeData: () => ({ device: null, trips: [] }),
    loadTripSnapshotData: () => null,
    loadSettlementPageData: () => null,
  }))
}

describe('route page imports', () => {
  it('loads route modules without eagerly importing the feature page modules', async () => {
    vi.resetModules()
    mockRouteEnvironment()

    const blockedModules = [
      '@/features/site/home-page',
      '@/features/site/settings-page',
      '@/features/currency/currency-page',
      '@/features/jet-lag/page',
      '@/features/packing-list/home-page',
      '@/features/local-apps/home-page',
      '@/features/local-apps/country-page',
      '@/features/travel-phrases/home-page',
      '@/features/travel-phrases/country-page',
      '@/features/split-bill/home-page',
      '@/features/split-bill/trip-page',
      '@/features/split-bill/add-expense-page',
      '@/features/split-bill/settlement-page',
    ]

    for (const modulePath of blockedModules) {
      vi.doMock(modulePath, () => {
        throw new Error(`${modulePath} should stay out of route module startup`)
      })
    }

    const routeModules = [
      '@/routes/index',
      '@/routes/$locale/index',
      '@/routes/$locale/settings',
      '@/routes/$locale/currency',
      '@/routes/$locale/jet-lag',
      '@/routes/$locale/packing-list',
      '@/routes/$locale/local-apps/index',
      '@/routes/$locale/local-apps/$country',
      '@/routes/$locale/travel-phrases/index',
      '@/routes/$locale/travel-phrases/$country',
      '@/routes/$locale/bill-splitter/index',
      '@/routes/$locale/bill-splitter/$tripId/index',
      '@/routes/$locale/bill-splitter/$tripId/add',
      '@/routes/$locale/bill-splitter/$tripId/settlement',
    ]

    for (const modulePath of routeModules) {
      await expect(import(modulePath)).resolves.toBeTruthy()
    }
  })
})
