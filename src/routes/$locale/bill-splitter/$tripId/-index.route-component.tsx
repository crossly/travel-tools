import { TripPage } from '@/features/split-bill/trip-page'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { Route } from './index'

export function TripRouteComponent() {
  const { locale, tripId } = Route.useParams()
  const initialSnapshot = Route.useLoaderData()
  return <TripPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} tripId={tripId} initialSnapshot={initialSnapshot} />
}
