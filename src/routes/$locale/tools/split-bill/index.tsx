import { createFileRoute } from '@tanstack/react-router'
import { SplitBillHomePage } from '@/features/split-bill/home-page'
import { buildDocumentTitle, translate } from '@/lib/i18n'
import { loadSplitBillHomeData } from '@/server/split-bill-page-data'

export const Route = createFileRoute('/$locale/tools/split-bill/')({
  loader: () => loadSplitBillHomeData(),
  head: ({ params }) => {
    const locale = params.locale as 'zh-CN' | 'en-US'
    return {
      meta: [
        { title: buildDocumentTitle(locale, translate(locale, 'split.title')) },
        { name: 'description', content: translate(locale, 'split.description') },
      ],
    }
  },
  component: SplitBillHomeRoute,
})

function SplitBillHomeRoute() {
  const { locale } = Route.useParams()
  const initialData = Route.useLoaderData()
  return <SplitBillHomePage locale={locale as 'zh-CN' | 'en-US'} initialData={initialData} />
}
