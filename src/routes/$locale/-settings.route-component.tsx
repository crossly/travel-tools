import { SettingsPage } from '@/features/site/settings-page'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { Route } from './settings'

export function SettingsRouteComponent() {
  const { locale } = Route.useParams()
  return <SettingsPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} />
}
