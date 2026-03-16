import { HomePage } from '@/features/site/home-page'
import { Route } from './index'

export function LocalizedHomeRouteComponent() {
  const { locale, homePageStats } = Route.useLoaderData()
  return <HomePage locale={locale} stats={homePageStats} />
}
