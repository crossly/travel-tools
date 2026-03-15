import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/features/site/home-page'
import { translate } from '@/lib/i18n'
import { buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

export const Route = createFileRoute('/$locale/')({
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
  component: HomeRoute,
})

function HomeRoute() {
  const { locale } = Route.useParams()
  return <HomePage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} />
}
