import { createFileRoute } from '@tanstack/react-router'
import { TripPage } from '@/features/split-bill/trip-page'
import { buildDocumentTitle, translate } from '@/lib/i18n'
import { loadTripSnapshotData } from '@/server/split-bill-page-data'

export const Route = createFileRoute('/$locale/tools/split-bill/$tripId/')({
  loader: ({ params }) => loadTripSnapshotData({ data: { tripId: params.tripId } }),
  head: ({ params, loaderData }) => {
    const locale = params.locale as 'zh-CN' | 'en-US'
    return {
      meta: [
        { title: buildDocumentTitle(locale, loaderData?.trip.name ?? translate(locale, 'trip.titleFallback')) },
        { name: 'description', content: loaderData ? `${loaderData.trip.expenseCurrency} / ${loaderData.trip.settlementCurrency}` : '' },
      ],
    }
  },
  component: TripRoute,
})

function TripRoute() {
  const { locale, tripId } = Route.useParams()
  const initialSnapshot = Route.useLoaderData()
  return <TripPage locale={locale as 'zh-CN' | 'en-US'} tripId={tripId} initialSnapshot={initialSnapshot} />
}
