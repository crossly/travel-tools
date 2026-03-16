import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { buildToolRouteHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { loadCurrencyPageData } from '@/server/currency-page-data'

const CurrencyRouteComponent = lazyRouteComponent(
  () => import('./-currency.route-component'),
  'CurrencyRouteComponent',
)

export const Route = createFileRoute('/$locale/currency')({
  loader: () => loadCurrencyPageData(),
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildToolRouteHead({
      locale,
      titleKey: 'currency.title',
      descriptionKey: 'currency.description',
      keywordsKey: 'currency.keywords',
      ogImageVariant: 'tool',
      pathname: '/currency',
      structuredData: 'software',
    })
  },
  component: CurrencyRouteComponent,
})
