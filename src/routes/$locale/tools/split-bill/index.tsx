import { createFileRoute } from '@tanstack/react-router'
import { SplitBillHomePage } from '@/features/split-bill/home-page'
import { loadSplitBillHomeData } from '@/server/split-bill-page-data'

export const Route = createFileRoute('/$locale/tools/split-bill/')({
  loader: () => loadSplitBillHomeData(),
  component: SplitBillHomeRoute,
})

function SplitBillHomeRoute() {
  const { locale } = Route.useParams()
  const initialData = Route.useLoaderData()
  return <SplitBillHomePage locale={locale as 'zh-CN' | 'en-US'} initialData={initialData} />
}
