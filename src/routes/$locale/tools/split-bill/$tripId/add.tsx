import { createFileRoute } from '@tanstack/react-router'
import { AddExpensePage } from '@/features/split-bill/add-expense-page'

export const Route = createFileRoute('/$locale/tools/split-bill/$tripId/add')({
  component: AddExpenseRoute,
})

function AddExpenseRoute() {
  const { locale, tripId } = Route.useParams()
  return <AddExpensePage locale={locale as 'zh-CN' | 'en-US'} tripId={tripId} />
}
