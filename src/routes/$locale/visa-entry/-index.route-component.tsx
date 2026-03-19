import { VisaEntryHomePage } from '@/features/visa-entry/home-page'
import { Route } from './index'

export function VisaEntryHomeRouteComponent() {
  const { locale, destinations } = Route.useLoaderData()
  return <VisaEntryHomePage locale={locale} destinations={destinations} />
}
