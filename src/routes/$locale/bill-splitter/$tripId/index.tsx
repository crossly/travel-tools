import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPrivatePageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { loadTripSnapshotData } from '@/server/split-bill-page-data'

const TripRouteComponent = lazyRouteComponent(
  () => import('./-index.route-component'),
  'TripRouteComponent',
)

export const Route = createFileRoute('/$locale/bill-splitter/$tripId/')({
  loader: ({ params }) => loadTripSnapshotData({ data: { tripId: params.tripId } }),
  head: ({ params, loaderData }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildPrivatePageHead({
      locale,
      title: loaderData?.trip.name ?? translate(locale, 'trip.titleFallback'),
    })
  },
  component: TripRouteComponent,
})
