import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPrivatePageHead, buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { getTippingCountryPack } from '@/lib/tipping'

const TippingCountryRouteComponent = lazyRouteComponent(
  () => import('./-$country.route-component'),
  'TippingCountryRouteComponent',
)

export const Route = createFileRoute('/$locale/tipping/$country')({
  loader: async ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE

    return {
      locale,
      country: params.country,
      pack: getTippingCountryPack(locale, params.country),
    }
  },
  head: ({ params, loaderData }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    const pack = loaderData?.pack ?? getTippingCountryPack(locale, params.country)

    if (!pack) {
      return buildPrivatePageHead({
        locale,
        title: translate(locale, 'tool.tipping.name'),
        description: translate(locale, 'tipping.countryDescription', { country: params.country }),
      })
    }

    return buildPublicPageHead({
      locale,
      title: pack.title,
      description: pack.description,
      ogImageVariant: 'country',
      breadcrumbs: [
        { name: translate(locale, 'nav.home'), path: '/' },
        { name: translate(locale, 'tool.tipping.name'), path: '/tipping' },
        { name: pack.country, path: `/tipping/${pack.slug}` },
      ],
      pathname: `/tipping/${pack.slug}`,
      structuredData: 'website',
    })
  },
  component: TippingCountryRouteComponent,
})
