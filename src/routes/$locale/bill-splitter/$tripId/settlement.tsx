import { createFileRoute } from '@tanstack/react-router'
import { SettlementPage } from '@/features/split-bill/settlement-page'
import { translate } from '@/lib/i18n'
import { buildPrivatePageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { loadSettlementPageData } from '@/server/split-bill-page-data'

export const Route = createFileRoute('/$locale/bill-splitter/$tripId/settlement')({
  loader: ({ params }) => loadSettlementPageData({ data: { tripId: params.tripId } }),
  head: ({ params, loaderData }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    const tripName = loaderData?.trip?.trip.name
    const section = translate(locale, 'settlement.title')
    const pageTitle = tripName ? translate(locale, 'meta.trip.sectionTitle', { tripName, section }) : section

    return buildPrivatePageHead({ locale, title: pageTitle })
  },
  component: SettlementRoute,
})

function SettlementRoute() {
  const { locale, tripId } = Route.useParams()
  const initialData = Route.useLoaderData()
  return <SettlementPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} tripId={tripId} initialData={initialData} />
}
