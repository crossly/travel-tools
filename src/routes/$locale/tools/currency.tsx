import { createFileRoute } from '@tanstack/react-router'
import { CurrencyPage } from '@/features/currency/currency-page'
import { buildDocumentTitle, translate } from '@/lib/i18n'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { loadCurrencyPageData } from '@/server/currency-page-data'

export const Route = createFileRoute('/$locale/tools/currency')({
  loader: () => loadCurrencyPageData(),
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return {
      meta: [
        { title: buildDocumentTitle(locale, translate(locale, 'currency.title')) },
        { name: 'description', content: translate(locale, 'currency.description') },
      ],
    }
  },
  component: CurrencyRoute,
})

function CurrencyRoute() {
  const { locale } = Route.useParams()
  const initialData = Route.useLoaderData()
  return <CurrencyPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} initialData={initialData} />
}
