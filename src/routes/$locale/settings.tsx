import { createFileRoute } from '@tanstack/react-router'
import { SettingsPage } from '@/features/site/settings-page'
import { buildDocumentTitle, translate } from '@/lib/i18n'

export const Route = createFileRoute('/$locale/settings')({
  head: ({ params }) => {
    const locale = params.locale as 'zh-CN' | 'en-US'
    return {
      meta: [{ title: buildDocumentTitle(locale, translate(locale, 'settings.title')) }],
    }
  },
  component: SettingsRoute,
})

function SettingsRoute() {
  const { locale } = Route.useParams()
  return <SettingsPage locale={locale as 'zh-CN' | 'en-US'} />
}
