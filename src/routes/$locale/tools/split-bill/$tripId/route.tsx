import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$locale/tools/split-bill/$tripId')({
  component: TripLayoutRoute,
})

function TripLayoutRoute() {
  return <Outlet />
}
