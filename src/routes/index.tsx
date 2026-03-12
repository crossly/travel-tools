import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/features/site/home-page'
import { I18nProvider } from '@/lib/i18n'
import { loadRootPageData } from '@/server/site-page-data'

export const Route = createFileRoute('/')({
  loader: () => loadRootPageData(),
  component: RootIndexRoute,
})

function RootIndexRoute() {
  const { locale } = Route.useLoaderData()

  return (
    <I18nProvider locale={locale} onLocaleChange={() => {}}>
      <HomePage locale={locale} />
    </I18nProvider>
  )
}
