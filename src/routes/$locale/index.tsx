import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/features/site/home-page'
import { buildDocumentTitle, translate } from '@/lib/i18n'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

export const Route = createFileRoute('/$locale/')({
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return {
      meta: [
        { title: buildDocumentTitle(locale, translate(locale, 'site.homeTitle')) },
        { name: 'description', content: translate(locale, 'site.homeDescription') },
      ],
    }
  },
  component: HomeRoute,
})

function HomeRoute() {
  const { locale } = Route.useParams()
  return <HomePage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} />
}
