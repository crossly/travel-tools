import { createFileRoute } from '@tanstack/react-router'
import { CurrencyPage } from '@/features/currency/currency-page'
import { loadCurrencyPageData } from '@/server/currency-page-data'

export const Route = createFileRoute('/$locale/tools/currency')({
  loader: () => loadCurrencyPageData(),
  component: CurrencyRoute,
})

function CurrencyRoute() {
  const { locale } = Route.useParams()
  const initialData = Route.useLoaderData()
  return <CurrencyPage locale={locale as 'zh-CN' | 'en-US'} initialData={initialData} />
}
