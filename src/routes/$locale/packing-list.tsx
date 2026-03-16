import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

const PackingListRouteComponent = lazyRouteComponent(
  () => import('./-packing-list.route-component'),
  'PackingListRouteComponent',
)

export const Route = createFileRoute('/$locale/packing-list')({
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildPublicPageHead({
      locale,
      title: translate(locale, 'packing.title'),
      description: translate(locale, 'packing.description'),
      pathname: '/packing-list',
      structuredData: 'software',
    })
  },
  component: PackingListRouteComponent,
})
