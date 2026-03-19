import { TippingHomePage } from '@/features/tipping/home-page'
import { listTippingCountrySummaries } from '@/lib/tipping'
import { Route } from './index'

export function TippingHomeRouteComponent() {
  const { locale } = Route.useLoaderData()

  return <TippingHomePage locale={locale} countries={listTippingCountrySummaries(locale)} />
}
