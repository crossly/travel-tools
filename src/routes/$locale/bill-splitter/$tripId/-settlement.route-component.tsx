import { SettlementPage } from '@/features/split-bill/settlement-page'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { Route } from './settlement'

export function SettlementRouteComponent() {
  const { locale, tripId } = Route.useParams()
  const initialData = Route.useLoaderData()
  return <SettlementPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} tripId={tripId} initialData={initialData} />
}
