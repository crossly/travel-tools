import { createFileRoute } from '@tanstack/react-router'
import { CurrencyPage } from '@/features/currency/currency-page'
import { translate } from '@/lib/i18n'
import { buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { loadCurrencyPageData } from '@/server/currency-page-data'

export const Route = createFileRoute('/$locale/currency')({
  loader: () => loadCurrencyPageData(),
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildPublicPageHead({
      locale,
      title: translate(locale, 'currency.title'),
      description: translate(locale, 'currency.description'),
      pathname: '/currency',
      structuredData: 'software',
    })
  },
  component: CurrencyRoute,
})

function CurrencyRoute() {
  const { locale } = Route.useParams()
  const initialData = Route.useLoaderData()
  return <CurrencyPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} initialData={initialData} />
}
