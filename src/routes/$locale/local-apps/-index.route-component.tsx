import { LocalAppsHomePage } from '@/features/local-apps/home-page'
import { Route } from './index'

export function LocalAppsHomeRouteComponent() {
  const { locale, countries, readyCount, trackedCount } = Route.useLoaderData()
  return <LocalAppsHomePage locale={locale} countries={countries} readyCount={readyCount} trackedCount={trackedCount} />
}
