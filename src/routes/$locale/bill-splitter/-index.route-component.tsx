import { SplitBillHomePage } from '@/features/split-bill/home-page'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { Route } from './index'

export function SplitBillHomeRouteComponent() {
  const { locale } = Route.useParams()
  const initialData = Route.useLoaderData()
  return <SplitBillHomePage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} initialData={initialData} />
}
