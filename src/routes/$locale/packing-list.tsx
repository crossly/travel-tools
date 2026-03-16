import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { buildToolRouteHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

const PackingListRouteComponent = lazyRouteComponent(
  () => import('./-packing-list.route-component'),
  'PackingListRouteComponent',
)

export const Route = createFileRoute('/$locale/packing-list')({
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildToolRouteHead({
      locale,
      titleKey: 'packing.title',
      descriptionKey: 'packing.description',
      keywordsKey: 'packing.keywords',
      pathname: '/packing-list',
      structuredData: 'software',
    })
  },
  component: PackingListRouteComponent,
})
