import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

const LocalAppsHomeRouteComponent = lazyRouteComponent(
  () => import('./-index.route-component'),
  'LocalAppsHomeRouteComponent',
)

export const Route = createFileRoute('/$locale/local-apps/')({
  loader: async ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    const { countReadyLocalAppCountries, countTrackedLocalAppCountries, listLocalAppCountrySummaries } = await import('@/lib/local-apps')

    return {
      locale,
      countries: listLocalAppCountrySummaries(locale),
      readyCount: countReadyLocalAppCountries(),
      trackedCount: countTrackedLocalAppCountries(),
    }
  },
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildPublicPageHead({
      locale,
      title: translate(locale, 'localApps.title'),
      description: translate(locale, 'localApps.description'),
      pathname: '/local-apps',
      structuredData: 'website',
    })
  },
  component: LocalAppsHomeRouteComponent,
})
