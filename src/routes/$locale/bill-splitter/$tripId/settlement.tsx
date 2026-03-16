import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPrivatePageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { loadSettlementPageData } from '@/server/split-bill-page-data'

const SettlementRouteComponent = lazyRouteComponent(
  () => import('./-settlement.route-component'),
  'SettlementRouteComponent',
)

export const Route = createFileRoute('/$locale/bill-splitter/$tripId/settlement')({
  loader: ({ params }) => loadSettlementPageData({ data: { tripId: params.tripId } }),
  head: ({ params, loaderData }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    const tripName = loaderData?.trip?.trip.name
    const section = translate(locale, 'settlement.title')
    const pageTitle = tripName ? translate(locale, 'meta.trip.sectionTitle', { tripName, section }) : section

    return buildPrivatePageHead({ locale, title: pageTitle })
  },
  component: SettlementRouteComponent,
})
