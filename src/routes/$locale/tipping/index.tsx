import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildToolRouteHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

const TippingHomeRouteComponent = lazyRouteComponent(
  () => import('./-index.route-component'),
  'TippingHomeRouteComponent',
)

export const Route = createFileRoute('/$locale/tipping/')({
  loader: async ({ params }) => ({
    locale: resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE,
  }),
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildToolRouteHead({
      locale,
      titleKey: 'tool.tipping.name',
      descriptionKey: 'tipping.description',
      keywordsKey: 'tipping.keywords',
      pathname: '/tipping',
      structuredData: 'website',
      breadcrumbs: [
        { name: translate(locale, 'nav.home'), path: '/' },
        { name: translate(locale, 'tool.tipping.name'), path: '/tipping' },
      ],
    })
  },
  component: TippingHomeRouteComponent,
})
