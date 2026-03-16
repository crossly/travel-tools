import { createFileRoute } from '@tanstack/react-router'
import { LocalAppsHomePage } from '@/features/local-apps/home-page'
import { countReadyLocalAppCountries, countTrackedLocalAppCountries, listLocalAppCountrySummaries } from '@/lib/local-apps'
import { translate } from '@/lib/i18n'
import { buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

export const Route = createFileRoute('/$locale/local-apps/')({
  loader: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
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
  component: LocalAppsHomeRoute,
})

function LocalAppsHomeRoute() {
  const { locale, countries, readyCount, trackedCount } = Route.useLoaderData()
  return <LocalAppsHomePage locale={locale} countries={countries} readyCount={readyCount} trackedCount={trackedCount} />
}
