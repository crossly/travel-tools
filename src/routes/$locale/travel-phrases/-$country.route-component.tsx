import { TravelPhrasesCountryPage } from '@/features/travel-phrases/country-page'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { Route } from './$country'

export function TravelPhrasesCountryRouteComponent() {
  const { locale, pack } = Route.useLoaderData()
  return <TravelPhrasesCountryPage locale={locale} pack={pack} />
}

export function TravelPhrasesCountryNotFoundComponent() {
  const { locale } = Route.useParams()
  return <TravelPhrasesCountryPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} pack={null} />
}
