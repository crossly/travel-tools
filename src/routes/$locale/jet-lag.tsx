import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { buildToolRouteHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

const JetLagRouteComponent = lazyRouteComponent(
  () => import('./-jet-lag.route-component'),
  'JetLagRouteComponent',
)

export const Route = createFileRoute('/$locale/jet-lag')({
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildToolRouteHead({
      locale,
      titleKey: 'jetLag.title',
      descriptionKey: 'jetLag.description',
      keywordsKey: 'jetLag.keywords',
      pathname: '/jet-lag',
      structuredData: 'software',
    })
  },
  component: JetLagRouteComponent,
})
