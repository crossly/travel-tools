import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/features/site/home-page'
import { I18nProvider, translate } from '@/lib/i18n'
import { buildRootAliasHead } from '@/lib/seo'
import { loadHomePageData } from '@/server/home-page-data'

export const Route = createFileRoute('/')({
  loader: () => loadHomePageData(),
  head: ({ loaderData }) => {
    const locale = loaderData?.locale ?? 'en-US'
    return buildRootAliasHead({
      locale,
      title: translate(locale, 'app.name'),
      description: translate(locale, 'site.homeDescription'),
    })
  },
  component: RootIndexRoute,
})

function RootIndexRoute() {
  const { locale, homePageStats } = Route.useLoaderData()

  return (
    <I18nProvider locale={locale} onLocaleChange={() => {}}>
      <HomePage locale={locale} stats={homePageStats} />
    </I18nProvider>
  )
}
