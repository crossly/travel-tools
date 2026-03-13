import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { DEFAULT_LOCALE, getLocalizedPath, resolveLocaleSegment } from '@/lib/site'

export const Route = createFileRoute('/$locale/tools/split-bill/$tripId')({
  beforeLoad: ({ params, location }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    const legacyPath = getLocalizedPath(locale, `/tools/split-bill/${params.tripId}`)
    if (location.pathname !== legacyPath) return

    const search = typeof location.search === 'string' ? location.search : ''
    const hash = typeof location.hash === 'string' ? location.hash : ''
    throw redirect({ href: `${getLocalizedPath(locale, `/bill-splitter/${params.tripId}`)}${search}${hash}` })
  },
  component: TripLayoutRoute,
})

function TripLayoutRoute() {
  return <Outlet />
}
