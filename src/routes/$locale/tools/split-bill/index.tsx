import { createFileRoute } from '@tanstack/react-router'
import { SplitBillHomePage } from '@/features/split-bill/home-page'

export const Route = createFileRoute('/$locale/tools/split-bill/')({
  component: SplitBillHomeRoute,
})

function SplitBillHomeRoute() {
  const { locale } = Route.useParams()
  return <SplitBillHomePage locale={locale as 'zh-CN' | 'en-US'} />
}
