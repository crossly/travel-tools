import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { loadHomePageData } from '@/server/home-page-data'

const LocalizedHomeRouteComponent = lazyRouteComponent(
  () => import('./-index.route-component'),
  'LocalizedHomeRouteComponent',
)

export const Route = createFileRoute('/$locale/')({
  loader: ({ params }) => loadHomePageData({ data: { locale: resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE } }),
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildPublicPageHead({
      locale,
      title: translate(locale, 'app.name'),
      description: translate(locale, 'site.homeDescription'),
      keywords: translate(locale, 'site.homeKeywords').split(','),
      ogImageVariant: 'home',
      pathname: '/',
      xDefaultPath: '/',
      structuredData: 'website',
    })
  },
  component: LocalizedHomeRouteComponent,
})
