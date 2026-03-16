import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { I18nProvider, translate } from '@/lib/i18n'
import { buildRootAliasHead } from '@/lib/seo'
import { loadHomePageData } from '@/server/home-page-data'

const RootIndexRouteComponent = lazyRouteComponent(
  () => import('./-index.route-component'),
  'RootIndexRouteComponent',
)

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
  component: RootIndexRouteComponent,
})
