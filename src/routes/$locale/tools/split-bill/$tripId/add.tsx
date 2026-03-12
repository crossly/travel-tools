import { createFileRoute } from '@tanstack/react-router'
import { AddExpensePage } from '@/features/split-bill/add-expense-page'
import { loadTripSnapshotData } from '@/server/split-bill-page-data'

export const Route = createFileRoute('/$locale/tools/split-bill/$tripId/add')({
  loader: ({ params }) => loadTripSnapshotData({ data: { tripId: params.tripId } }),
  component: AddExpenseRoute,
})

function AddExpenseRoute() {
  const { locale, tripId } = Route.useParams()
  const initialSnapshot = Route.useLoaderData()
  return <AddExpensePage locale={locale as 'zh-CN' | 'en-US'} tripId={tripId} initialSnapshot={initialSnapshot} />
}
