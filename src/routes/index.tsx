import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/features/site/home-page'
import { I18nProvider, translate } from '@/lib/i18n'
import { buildRootAliasHead } from '@/lib/seo'
import { loadRootPageData } from '@/server/site-page-data'

export const Route = createFileRoute('/')({
  loader: () => loadRootPageData(),
  head: ({ loaderData }) => {
    const locale = loaderData?.locale ?? 'en-US'
    return buildRootAliasHead({
      locale,
      title: translate(locale, 'site.homeTitle'),
      description: translate(locale, 'site.homeDescription'),
    })
  },
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
