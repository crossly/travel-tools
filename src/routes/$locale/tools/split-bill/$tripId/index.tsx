import { createFileRoute } from '@tanstack/react-router'
import { TripPage } from '@/features/split-bill/trip-page'
import { loadTripSnapshotData } from '@/server/split-bill-page-data'

export const Route = createFileRoute('/$locale/tools/split-bill/$tripId/')({
  loader: ({ params }) => loadTripSnapshotData({ data: { tripId: params.tripId } }),
  component: TripRoute,
})

function TripRoute() {
  const { locale, tripId } = Route.useParams()
  const initialSnapshot = Route.useLoaderData()
  return <TripPage locale={locale as 'zh-CN' | 'en-US'} tripId={tripId} initialSnapshot={initialSnapshot} />
}
