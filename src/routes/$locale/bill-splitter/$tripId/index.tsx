import { createFileRoute } from '@tanstack/react-router'
import { TripPage } from '@/features/split-bill/trip-page'
import { translate } from '@/lib/i18n'
import { buildPrivatePageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { loadTripSnapshotData } from '@/server/split-bill-page-data'

export const Route = createFileRoute('/$locale/bill-splitter/$tripId/')({
  loader: ({ params }) => loadTripSnapshotData({ data: { tripId: params.tripId } }),
  head: ({ params, loaderData }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildPrivatePageHead({
      locale,
      title: loaderData?.trip.name ?? translate(locale, 'trip.titleFallback'),
    })
  },
  component: TripRoute,
})

function TripRoute() {
  const { locale, tripId } = Route.useParams()
  const initialSnapshot = Route.useLoaderData()
  return <TripPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} tripId={tripId} initialSnapshot={initialSnapshot} />
}
