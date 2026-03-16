import { createFileRoute } from '@tanstack/react-router'
import { JetLagPage } from '@/features/jet-lag/page'
import { translate } from '@/lib/i18n'
import { buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

export const Route = createFileRoute('/$locale/jet-lag')({
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildPublicPageHead({
      locale,
      title: translate(locale, 'jetLag.title'),
      description: translate(locale, 'jetLag.description'),
      pathname: '/jet-lag',
      structuredData: 'software',
    })
  },
  component: JetLagRoute,
})

function JetLagRoute() {
  const { locale } = Route.useParams()
  return <JetLagPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} />
}
