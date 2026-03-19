import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPrivatePageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

const TippingCountryRouteComponent = lazyRouteComponent(
  () => import('./-$country.route-component'),
  'TippingCountryRouteComponent',
)

export const Route = createFileRoute('/$locale/tipping/$country')({
  loader: async ({ params }) => ({
    locale: resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE,
    country: params.country,
  }),
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildPrivatePageHead({
      locale,
      title: translate(locale, 'tool.tipping.name'),
      description: translate(locale, 'tipping.countryDescription', { country: params.country }),
    })
  },
  component: TippingCountryRouteComponent,
})
