import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$locale/bill-splitter/$tripId')({
  component: TripLayoutRoute,
})

function TripLayoutRoute() {
  return <Outlet />
}
