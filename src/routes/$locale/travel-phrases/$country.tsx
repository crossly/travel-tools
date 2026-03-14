import { createFileRoute } from '@tanstack/react-router'
import { TravelPhrasesCountryPage } from '@/features/travel-phrases/country-page'
import { translate } from '@/lib/i18n'
import { buildPrivatePageHead, buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { getPhraseCountryPack } from '@/lib/travel-phrases'

export const Route = createFileRoute('/$locale/travel-phrases/$country')({
  loader: async ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return {
      locale,
      pack: await getPhraseCountryPack(locale, params.country),
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
  component: TravelPhrasesCountryRoute,
})

function TravelPhrasesCountryRoute() {
  const { locale, pack } = Route.useLoaderData()
  return <TravelPhrasesCountryPage locale={locale} pack={pack} />
}
