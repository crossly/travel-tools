import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

const TravelPhrasesHomeRouteComponent = lazyRouteComponent(
  () => import('./-index.route-component'),
  'TravelPhrasesHomeRouteComponent',
)

export const Route = createFileRoute('/$locale/travel-phrases/')({
  loader: async ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    const { listPhraseCountrySummaries } = await import('@/lib/travel-phrases')

    return {
      locale,
      packs: listPhraseCountrySummaries(locale),
    }
  },
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildPublicPageHead({
      locale,
      title: translate(locale, 'phrases.title'),
      description: translate(locale, 'phrases.description'),
      keywords: translate(locale, 'phrases.keywords').split(','),
      ogImageVariant: 'tool',
      breadcrumbs: [
        { name: translate(locale, 'nav.home'), path: '/' },
        { name: translate(locale, 'phrases.title'), path: '/travel-phrases' },
      ],
      pathname: '/travel-phrases',
      structuredData: 'website',
    })
  },
  component: TravelPhrasesHomeRouteComponent,
})
