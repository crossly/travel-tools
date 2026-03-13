import { createFileRoute } from '@tanstack/react-router'
import { SplitBillHomePage } from '@/features/split-bill/home-page'
import { buildDocumentTitle, translate } from '@/lib/i18n'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { loadSplitBillHomeData } from '@/server/split-bill-page-data'

export const Route = createFileRoute('/$locale/bill-splitter/')({
  loader: () => loadSplitBillHomeData(),
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
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
  return <SplitBillHomePage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} initialData={initialData} />
}
