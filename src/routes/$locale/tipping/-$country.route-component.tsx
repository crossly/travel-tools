import { TippingCountryPage } from '@/features/tipping/country-page'
import { getTippingCountryPack } from '@/lib/tipping'
import { Route } from './$country'

export function TippingCountryRouteComponent() {
  const { locale, country } = Route.useLoaderData()

  return <TippingCountryPage locale={locale} pack={getTippingCountryPack(locale, country)} />
}
