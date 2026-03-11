import { createFileRoute } from '@tanstack/react-router'
import { SettlementPage } from '@/features/split-bill/settlement-page'

export const Route = createFileRoute('/$locale/tools/split-bill/$tripId/settlement')({
  component: SettlementRoute,
})

function SettlementRoute() {
  const { locale, tripId } = Route.useParams()
  return <SettlementPage locale={locale as 'zh-CN' | 'en-US'} tripId={tripId} />
}
