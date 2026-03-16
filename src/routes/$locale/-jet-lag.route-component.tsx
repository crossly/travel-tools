import { JetLagPage } from '@/features/jet-lag/page'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { Route } from './jet-lag'

export function JetLagRouteComponent() {
  const { locale } = Route.useParams()
  return <JetLagPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} />
}
