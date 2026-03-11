import { createFileRoute } from '@tanstack/react-router'
import { TripPage } from '@/features/split-bill/trip-page'

export const Route = createFileRoute('/$locale/tools/split-bill/$tripId/')({
  component: TripRoute,
})

function TripRoute() {
  const { locale, tripId } = Route.useParams()
  return <TripPage locale={locale as 'zh-CN' | 'en-US'} tripId={tripId} />
}
