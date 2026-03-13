import { createFileRoute } from '@tanstack/react-router'
import { SettingsPage } from '@/features/site/settings-page'
import { translate } from '@/lib/i18n'
import { buildPrivatePageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

export const Route = createFileRoute('/$locale/settings')({
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildPrivatePageHead({
      locale,
      title: translate(locale, 'settings.title'),
      description: translate(locale, 'settings.title'),
    })
  },
  component: SettingsRoute,
})

function SettingsRoute() {
  const { locale } = Route.useParams()
  return <SettingsPage locale={resolveLocaleSegment(locale) ?? DEFAULT_LOCALE} />
}
