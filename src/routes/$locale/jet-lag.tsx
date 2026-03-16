import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

const JetLagRouteComponent = lazyRouteComponent(
  () => import('./-jet-lag.route-component'),
  'JetLagRouteComponent',
)

export const Route = createFileRoute('/$locale/jet-lag')({
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildPublicPageHead({
      locale,
      title: translate(locale, 'jetLag.title'),
      description: translate(locale, 'jetLag.description'),
      pathname: '/jet-lag',
      structuredData: 'software',
    })
  },
  component: JetLagRouteComponent,
})
