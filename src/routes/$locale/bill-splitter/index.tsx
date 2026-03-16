import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { buildToolRouteHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { loadSplitBillHomeData } from '@/server/split-bill-page-data'

const SplitBillHomeRouteComponent = lazyRouteComponent(
  () => import('./-index.route-component'),
  'SplitBillHomeRouteComponent',
)

export const Route = createFileRoute('/$locale/bill-splitter/')({
  loader: () => loadSplitBillHomeData(),
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildToolRouteHead({
      locale,
      titleKey: 'split.title',
      descriptionKey: 'split.description',
      keywordsKey: 'split.keywords',
      ogImageVariant: 'tool',
      pathname: '/bill-splitter',
      structuredData: 'software',
    })
  },
  component: SplitBillHomeRouteComponent,
})
