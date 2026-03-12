import { createFileRoute } from '@tanstack/react-router'
import { SettlementPage } from '@/features/split-bill/settlement-page'
import { buildDocumentTitle, translate } from '@/lib/i18n'
import { loadSettlementPageData } from '@/server/split-bill-page-data'

export const Route = createFileRoute('/$locale/tools/split-bill/$tripId/settlement')({
  loader: ({ params }) => loadSettlementPageData({ data: { tripId: params.tripId } }),
  head: ({ params, loaderData }) => {
    const locale = params.locale as 'zh-CN' | 'en-US'
    const tripName = loaderData?.trip?.trip.name
    const section = translate(locale, 'settlement.title')
    const pageTitle = tripName ? translate(locale, 'meta.trip.sectionTitle', { tripName, section }) : section

    return {
      meta: [{ title: buildDocumentTitle(locale, pageTitle) }],
    }
  },
  component: SettlementRoute,
})

function SettlementRoute() {
  const { locale, tripId } = Route.useParams()
  const initialData = Route.useLoaderData()
  return <SettlementPage locale={locale as 'zh-CN' | 'en-US'} tripId={tripId} initialData={initialData} />
}
