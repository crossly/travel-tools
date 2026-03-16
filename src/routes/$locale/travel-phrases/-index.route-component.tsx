import { TravelPhrasesHomePage } from '@/features/travel-phrases/home-page'
import { Route } from './index'

export function TravelPhrasesHomeRouteComponent() {
  const { locale, packs } = Route.useLoaderData()
  return <TravelPhrasesHomePage locale={locale} packs={packs} />
}
