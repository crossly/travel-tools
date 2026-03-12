import { createFileRoute } from '@tanstack/react-router'
import { SettlementPage } from '@/features/split-bill/settlement-page'
import { loadSettlementPageData } from '@/server/split-bill-page-data'

export const Route = createFileRoute('/$locale/tools/split-bill/$tripId/settlement')({
  loader: ({ params }) => loadSettlementPageData({ data: { tripId: params.tripId } }),
  component: SettlementRoute,
})

function SettlementRoute() {
  const { locale, tripId } = Route.useParams()
  const initialData = Route.useLoaderData()
  return <SettlementPage locale={locale as 'zh-CN' | 'en-US'} tripId={tripId} initialData={initialData} />
}
