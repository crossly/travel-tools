import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPublicPageHead } from '@/lib/seo'
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
    return buildPublicPageHead({
      locale,
      title: translate(locale, 'split.title'),
      description: translate(locale, 'split.description'),
      keywords: translate(locale, 'split.keywords').split(','),
      ogImageVariant: 'tool',
      pathname: '/bill-splitter',
      structuredData: 'software',
    })
  },
  component: SplitBillHomeRouteComponent,
})
