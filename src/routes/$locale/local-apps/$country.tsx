import { createFileRoute } from '@tanstack/react-router'
import { LocalAppsCountryPage } from '@/features/local-apps/country-page'
import { getLocalAppCountrySummary, getLocalAppGuide } from '@/lib/local-apps'
import { translate } from '@/lib/i18n'
import { buildPrivatePageHead, buildPublicPageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

export const Route = createFileRoute('/$locale/local-apps/$country')({
  loader: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return {
      locale,
      summary: getLocalAppCountrySummary(locale, params.country),
      guide: getLocalAppGuide(locale, params.country),
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
  component: LocalAppsCountryRoute,
})

function LocalAppsCountryRoute() {
  const { locale, guide, summary } = Route.useLoaderData()
  return <LocalAppsCountryPage locale={locale} guide={guide} summary={summary} />
}
