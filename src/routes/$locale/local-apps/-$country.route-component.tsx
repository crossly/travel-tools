import { LocalAppsCountryPage } from '@/features/local-apps/country-page'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { Route } from './$country'

export function LocalAppsCountryRouteComponent() {
  const { locale, guide, summary } = Route.useLoaderData()
  return <LocalAppsCountryPage locale={locale} guide={guide} summary={summary} />
}

export function LocalAppsCountryNotFoundComponent() {
  const { locale } = Route.useParams()
  return <LocalAppsCountryPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} guide={null} summary={null} />
}
