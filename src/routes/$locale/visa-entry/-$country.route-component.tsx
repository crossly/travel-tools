import { VisaEntryCountryPage } from '@/features/visa-entry/country-page'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { Route } from './$country'

export function VisaEntryCountryRouteComponent() {
  const { locale, guide } = Route.useLoaderData()
  return <VisaEntryCountryPage locale={locale} guide={guide} />
}

export function VisaEntryCountryNotFoundComponent() {
  const { locale } = Route.useParams()
  return <VisaEntryCountryPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} guide={null} />
}
