import { createFileRoute } from '@tanstack/react-router'
import { CurrencyPage } from '@/features/currency/currency-page'

export const Route = createFileRoute('/$locale/tools/currency')({
  component: CurrencyRoute,
})

function CurrencyRoute() {
  const { locale } = Route.useParams()
  return <CurrencyPage locale={locale as 'zh-CN' | 'en-US'} />
}
