import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPublicPageHead } from '@/lib/seo'
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
    return buildPublicPageHead({
      locale,
      title: translate(locale, 'currency.title'),
      description: translate(locale, 'currency.description'),
      keywords: translate(locale, 'currency.keywords').split(','),
      ogImageVariant: 'tool',
      pathname: '/currency',
      structuredData: 'software',
    })
  },
  component: CurrencyRouteComponent,
})
