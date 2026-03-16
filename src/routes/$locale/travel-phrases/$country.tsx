import { createFileRoute, lazyRouteComponent, notFound } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPrivatePageHead, buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

const TravelPhrasesCountryRouteComponent = lazyRouteComponent(
  () => import('./-$country.route-component'),
  'TravelPhrasesCountryRouteComponent',
)

const TravelPhrasesCountryNotFoundComponent = lazyRouteComponent(
  () => import('./-$country.route-component'),
  'TravelPhrasesCountryNotFoundComponent',
)

export const Route = createFileRoute('/$locale/travel-phrases/$country')({
  loader: async ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    const { getPhraseCountryPack } = await import('@/lib/travel-phrases')
    const pack = await getPhraseCountryPack(locale, params.country)

    if (!pack) {
      throw notFound()
    }

    return {
      locale,
      pack,
    }
  },
  head: ({ params, loaderData }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE

    if (!loaderData?.pack) {
      return buildPrivatePageHead({
        locale,
        title: translate(locale, 'phrases.title'),
        description: translate(locale, 'phrases.notFoundDescription'),
      })
    }

    return buildPublicPageHead({
      locale,
      title: loaderData.pack.title,
      description: loaderData.pack.description,
      keywords: loaderData.pack.seoKeywords,
      ogImageVariant: 'country',
      breadcrumbs: [
        { name: translate(locale, 'nav.home'), path: '/' },
        { name: translate(locale, 'phrases.title'), path: '/travel-phrases' },
        { name: loaderData.pack.country, path: `/travel-phrases/${loaderData.pack.slug}` },
      ],
      pathname: `/travel-phrases/${loaderData.pack.slug}`,
      structuredData: 'website',
      extraStructuredData: loaderData.pack.faq.length ? [
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: loaderData.pack.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        },
      ] : undefined,
    })
  },
  notFoundComponent: TravelPhrasesCountryNotFoundComponent,
  component: TravelPhrasesCountryRouteComponent,
})
