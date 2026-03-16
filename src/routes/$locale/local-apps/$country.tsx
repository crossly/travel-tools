import { createFileRoute, lazyRouteComponent, notFound } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPrivatePageHead, buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

const LocalAppsCountryRouteComponent = lazyRouteComponent(
  () => import('./-$country.route-component'),
  'LocalAppsCountryRouteComponent',
)

const LocalAppsCountryNotFoundComponent = lazyRouteComponent(
  () => import('./-$country.route-component'),
  'LocalAppsCountryNotFoundComponent',
)

export const Route = createFileRoute('/$locale/local-apps/$country')({
  loader: async ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    const { getLocalAppCountrySummary, getLocalAppGuide } = await import('@/lib/local-apps')
    const summary = getLocalAppCountrySummary(locale, params.country)

    if (!summary) {
      throw notFound()
    }

    return {
      locale,
      summary,
      guide: await getLocalAppGuide(locale, params.country),
    }
  },
  head: ({ params, loaderData }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE

    if (!loaderData?.guide) {
      return buildPrivatePageHead({
        locale,
        title: translate(locale, 'localApps.title'),
        description: loaderData?.summary
          ? translate(locale, 'localApps.pendingPageDescription', { country: loaderData.summary.country })
          : translate(locale, 'localApps.notFoundDescription'),
      })
    }

    return buildPublicPageHead({
      locale,
      title: loaderData.guide.title,
      description: loaderData.guide.description,
      pathname: `/local-apps/${loaderData.guide.slug}`,
      structuredData: 'website',
    })
  },
  notFoundComponent: LocalAppsCountryNotFoundComponent,
  component: LocalAppsCountryRouteComponent,
})
