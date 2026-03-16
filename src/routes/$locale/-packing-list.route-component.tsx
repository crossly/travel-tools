import { PackingListPage } from '@/features/packing-list/home-page'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { Route } from './packing-list'

export function PackingListRouteComponent() {
  const { locale } = Route.useParams()
  return <PackingListPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} />
}
