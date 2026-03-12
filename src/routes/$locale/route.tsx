import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { I18nProvider } from '@/lib/i18n'
import { DEFAULT_LOCALE, canonicalizeLocalePath, getLocalizedPath, resolveLocaleSegment } from '@/lib/site'

export const Route = createFileRoute('/$locale')({
  beforeLoad: ({ params, location }) => {
    const locale = resolveLocaleSegment(params.locale)

    if (!locale) {
      throw redirect({ href: getLocalizedPath(DEFAULT_LOCALE, '/') })
    }

    const canonicalPath = canonicalizeLocalePath(location.pathname)
    if (canonicalPath && location.pathname !== canonicalPath) {
      const search = typeof location.search === 'string' ? location.search : ''
      const hash = typeof location.hash === 'string' ? location.hash : ''
      throw redirect({ href: `${canonicalPath}${search}${hash}` })
    }
  },
  component: LocaleLayout,
})

function LocaleLayout() {
  const { locale } = Route.useParams()
  const resolvedLocale = resolveLocaleSegment(locale) ?? DEFAULT_LOCALE
  return (
    <I18nProvider locale={resolvedLocale} onLocaleChange={() => {}}>
      <Outlet />
    </I18nProvider>
  )
}
