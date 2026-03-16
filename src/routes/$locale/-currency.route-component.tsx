import { CurrencyPage } from '@/features/currency/currency-page'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { Route } from './currency'

export function CurrencyRouteComponent() {
  const { locale } = Route.useParams()
  const initialData = Route.useLoaderData()
  return <CurrencyPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} initialData={initialData} />
}
