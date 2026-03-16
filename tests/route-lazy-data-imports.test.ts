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
    translate: (locale: string, key: string) => `${locale}:${key}`,
  }))

  vi.doMock('@/lib/seo', () => ({
    buildPublicPageHead: (value: unknown) => value,
    buildPrivatePageHead: (value: unknown) => value,
    buildBreadcrumbStructuredData: (value: unknown) => value,
  }))

  vi.doMock('@/lib/site', () => ({
    DEFAULT_LOCALE: 'en-US',
    resolveLocaleSegment: (value: string) => value,
  }))
}

describe('route data imports', () => {
  it('loads the local apps routes without eagerly importing the heavy local app helper module', async () => {
    vi.resetModules()
    mockRouteEnvironment()

    vi.doMock('@/features/local-apps/home-page', () => ({
      LocalAppsHomePage: () => null,
    }))
    vi.doMock('@/features/local-apps/country-page', () => ({
      LocalAppsCountryPage: () => null,
    }))
    vi.doMock('@/lib/local-apps', () => {
      throw new Error('local apps data helper should stay out of route module startup')
    })

    await expect(import('@/routes/$locale/local-apps/index')).resolves.toBeTruthy()
    await expect(import('@/routes/$locale/local-apps/$country')).resolves.toBeTruthy()
  })

  it('loads the travel phrases routes without eagerly importing the heavy phrase helper module', async () => {
    vi.resetModules()
    mockRouteEnvironment()

    vi.doMock('@/features/travel-phrases/home-page', () => ({
      TravelPhrasesHomePage: () => null,
    }))
    vi.doMock('@/features/travel-phrases/country-page', () => ({
      TravelPhrasesCountryPage: () => null,
    }))
    vi.doMock('@/lib/travel-phrases', () => {
      throw new Error('travel phrases helper should stay out of route module startup')
    })

    await expect(import('@/routes/$locale/travel-phrases/index')).resolves.toBeTruthy()
    await expect(import('@/routes/$locale/travel-phrases/$country')).resolves.toBeTruthy()
  })
})
