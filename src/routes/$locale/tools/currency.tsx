import { createFileRoute, redirect } from '@tanstack/react-router'
import { DEFAULT_LOCALE, getLocalizedPath, resolveLocaleSegment } from '@/lib/site'

export const Route = createFileRoute('/$locale/tools/currency')({
  beforeLoad: ({ params, location }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    const search = typeof location.search === 'string' ? location.search : ''
    const hash = typeof location.hash === 'string' ? location.hash : ''
    throw redirect({ href: `${getLocalizedPath(locale, '/currency')}${search}${hash}` })
  },
})
