import { createFileRoute } from '@tanstack/react-router'
import { SettingsPage } from '@/features/site/settings-page'

export const Route = createFileRoute('/$locale/settings')({
  component: SettingsRoute,
})

function SettingsRoute() {
  const { locale } = Route.useParams()
  return <SettingsPage locale={locale as 'zh-CN' | 'en-US'} />
}
