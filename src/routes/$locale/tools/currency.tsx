import { createFileRoute } from '@tanstack/react-router'
import { CurrencyPage } from '@/features/currency/currency-page'
import { buildDocumentTitle, translate } from '@/lib/i18n'
import { loadCurrencyPageData } from '@/server/currency-page-data'

export const Route = createFileRoute('/$locale/tools/currency')({
  loader: () => loadCurrencyPageData(),
  head: ({ params }) => {
    const locale = params.locale as 'zh-CN' | 'en-US'
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
  return <CurrencyPage locale={locale as 'zh-CN' | 'en-US'} initialData={initialData} />
}
