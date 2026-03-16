import { createFileRoute } from '@tanstack/react-router'
import { PackingListPage } from '@/features/packing-list/home-page'
import { translate } from '@/lib/i18n'
import { buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

export const Route = createFileRoute('/$locale/packing-list')({
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildPublicPageHead({
      locale,
      title: translate(locale, 'packing.title'),
      description: translate(locale, 'packing.description'),
      pathname: '/packing-list',
      structuredData: 'software',
    })
  },
  component: PackingListRoute,
})

function PackingListRoute() {
  const { locale } = Route.useParams()
  return <PackingListPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} />
}
