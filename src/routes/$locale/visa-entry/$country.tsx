import { createFileRoute, lazyRouteComponent, notFound } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPrivatePageHead, buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

const VisaEntryCountryRouteComponent = lazyRouteComponent(
  () => import('./-$country.route-component'),
  'VisaEntryCountryRouteComponent',
)

const VisaEntryCountryNotFoundComponent = lazyRouteComponent(
  () => import('./-$country.route-component'),
  'VisaEntryCountryNotFoundComponent',
)

export const Route = createFileRoute('/$locale/visa-entry/$country')({
  loader: async ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    const { getVisaEntryDestinationGuide } = await import('@/lib/visa-entry')
    const guide = getVisaEntryDestinationGuide(locale, params.country)

    if (!guide) {
      throw notFound()
    }

    return {
      locale,
      guide,
    }
  },
  head: ({ params, loaderData }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE

    if (!loaderData?.guide) {
      return buildPrivatePageHead({
        locale,
        title: translate(locale, 'visaEntry.title'),
        description: translate(locale, 'visaEntry.searchEmptyDescription'),
      })
    }

    return buildPublicPageHead({
      locale,
      title: loaderData.guide.title,
      description: loaderData.guide.description,
      ogImageVariant: 'country',
      breadcrumbs: [
        { name: translate(locale, 'nav.home'), path: '/' },
        { name: translate(locale, 'visaEntry.title'), path: '/visa-entry' },
        { name: loaderData.guide.country, path: `/visa-entry/${loaderData.guide.slug}` },
      ],
      pathname: `/visa-entry/${loaderData.guide.slug}`,
      structuredData: 'website',
    })
  },
  notFoundComponent: VisaEntryCountryNotFoundComponent,
  component: VisaEntryCountryRouteComponent,
})
