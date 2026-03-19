import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

const VisaEntryHomeRouteComponent = lazyRouteComponent(
  () => import('./-index.route-component'),
  'VisaEntryHomeRouteComponent',
)

export const Route = createFileRoute('/$locale/visa-entry/')({
  loader: async ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    const { listVisaEntryDestinationSummaries } = await import('@/lib/visa-entry')

    return {
      locale,
      destinations: listVisaEntryDestinationSummaries(locale),
    }
  },
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE

    return buildPublicPageHead({
      locale,
      title: translate(locale, 'visaEntry.title'),
      description: translate(locale, 'visaEntry.description'),
      keywords: translate(locale, 'visaEntry.keywords').split(','),
      ogImageVariant: 'tool',
      breadcrumbs: [
        { name: translate(locale, 'nav.home'), path: '/' },
        { name: translate(locale, 'visaEntry.title'), path: '/visa-entry' },
      ],
      pathname: '/visa-entry',
      structuredData: 'website',
    })
  },
  component: VisaEntryHomeRouteComponent,
})
