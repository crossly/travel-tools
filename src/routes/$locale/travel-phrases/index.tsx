import { createFileRoute } from '@tanstack/react-router'
import { TravelPhrasesHomePage } from '@/features/travel-phrases/home-page'
import { translate } from '@/lib/i18n'
import { buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'
import { listPhraseCountrySummaries } from '@/lib/travel-phrases'

export const Route = createFileRoute('/$locale/travel-phrases/')({
  loader: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
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
      pathname: '/travel-phrases',
      structuredData: 'website',
    })
  },
  component: TravelPhrasesHomeRoute,
})

function TravelPhrasesHomeRoute() {
  const { locale, packs } = Route.useLoaderData()
  return <TravelPhrasesHomePage locale={locale} packs={packs} />
}
