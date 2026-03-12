import { createFileRoute } from '@tanstack/react-router'
import { AddExpensePage } from '@/features/split-bill/add-expense-page'
import { buildDocumentTitle, translate } from '@/lib/i18n'
import { loadTripSnapshotData } from '@/server/split-bill-page-data'

export const Route = createFileRoute('/$locale/tools/split-bill/$tripId/add')({
  loader: ({ params }) => loadTripSnapshotData({ data: { tripId: params.tripId } }),
  head: ({ params, loaderData }) => {
    const locale = params.locale as 'zh-CN' | 'en-US'
    const tripName = loaderData?.trip.name
    const section = translate(locale, 'addExpense.title')
    const pageTitle = tripName ? translate(locale, 'meta.trip.sectionTitle', { tripName, section }) : section

    return {
      meta: [{ title: buildDocumentTitle(locale, pageTitle) }],
    }
  },
  component: AddExpenseRoute,
})

function AddExpenseRoute() {
  const { locale, tripId } = Route.useParams()
  const initialSnapshot = Route.useLoaderData()
  return <AddExpensePage locale={locale as 'zh-CN' | 'en-US'} tripId={tripId} initialSnapshot={initialSnapshot} />
}
