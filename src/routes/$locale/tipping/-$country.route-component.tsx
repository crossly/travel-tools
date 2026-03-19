import { TippingCountryPage } from '@/features/tipping/country-page'
import { Route } from './$country'

export function TippingCountryRouteComponent() {
  const { locale, pack } = Route.useLoaderData()

  return <TippingCountryPage locale={locale} pack={pack} />
}
