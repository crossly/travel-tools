import { createFileRoute } from '@tanstack/react-router'
import { SettingsPage } from '@/features/site/settings-page'
import { buildDocumentTitle, translate } from '@/lib/i18n'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

export const Route = createFileRoute('/$locale/settings')({
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return {
      meta: [
        { title: buildDocumentTitle(locale, translate(locale, 'settings.title')) },
        { name: 'description', content: translate(locale, 'settings.title') },
      ],
    }
  },
  component: SettingsRoute,
})

function SettingsRoute() {
  const { locale } = Route.useParams()
  return <SettingsPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} />
}
