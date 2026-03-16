import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPrivatePageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { loadTripSnapshotData } from '@/server/split-bill-page-data'

const AddExpenseRouteComponent = lazyRouteComponent(
  () => import('./-add.route-component'),
  'AddExpenseRouteComponent',
)

export const Route = createFileRoute('/$locale/bill-splitter/$tripId/add')({
  loader: ({ params }) => loadTripSnapshotData({ data: { tripId: params.tripId } }),
  head: ({ params, loaderData }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    const tripName = loaderData?.trip.name
    const section = translate(locale, 'addExpense.title')
    const pageTitle = tripName ? translate(locale, 'meta.trip.sectionTitle', { tripName, section }) : section

    return buildPrivatePageHead({ locale, title: pageTitle })
  },
  component: AddExpenseRouteComponent,
})
