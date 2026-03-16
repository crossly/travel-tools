import { AddExpensePage } from '@/features/split-bill/add-expense-page'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { Route } from './add'

export function AddExpenseRouteComponent() {
  const { locale, tripId } = Route.useParams()
  const initialSnapshot = Route.useLoaderData()
  return <AddExpensePage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} tripId={tripId} initialSnapshot={initialSnapshot} />
}
