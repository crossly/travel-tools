import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/features/site/home-page'

export const Route = createFileRoute('/$locale/')({
  component: HomeRoute,
})

function HomeRoute() {
  const { locale } = Route.useParams()
  return <HomePage locale={locale as 'zh-CN' | 'en-US'} />
}
