import { LOCAL_APP_GUIDE_DEFINITIONS } from '@/data/local-apps/guides'
import { translate } from '@/lib/i18n'
import { listRawPhraseCountrySummaries } from '@/lib/travel-phrases'
import type {
  LocalAppCountrySummary,
  LocalAppGuide,
  LocalAppRecommendation,
  Locale,
  PhraseRegion,
} from '@/lib/types'

const phraseSummaries = listRawPhraseCountrySummaries()
const phraseSummaryBySlug = new Map(phraseSummaries.map((summary) => [summary.slug, summary]))
const guideBySlug = new Map(LOCAL_APP_GUIDE_DEFINITIONS.map((guide) => [guide.slug, guide]))
const featuredCountrySlugs = LOCAL_APP_GUIDE_DEFINITIONS.map((guide) => guide.slug)
const featuredCountryRank = new Map(featuredCountrySlugs.map((slug, index) => [slug, index]))

function buildSummary(locale: Locale, slug: string): LocalAppCountrySummary | null {
  const phraseSummary = phraseSummaryBySlug.get(slug)
  if (!phraseSummary) return null

  const guide = guideBySlug.get(slug)
  return {
    country: phraseSummary.country[locale],
    slug,
    region: phraseSummary.region,
    flag: phraseSummary.flag,
    ready: Boolean(guide),
    title: guide
      ? translate(locale, 'localApps.countryPageTitle', { country: phraseSummary.country[locale] })
      : translate(locale, 'localApps.countryPendingTitle', { country: phraseSummary.country[locale] }),
    description: guide
      ? guide.teaser[locale]
      : translate(locale, 'localApps.pendingCardDescription', { country: phraseSummary.country[locale] }),
    highlights: guide?.highlights[locale] ?? [],
    categoryIds: guide?.categories.map((category) => category.id) ?? [],
    categoryCount: guide?.categories.length ?? 0,
    appCount: guide?.categories.reduce((sum, category) => sum + category.apps.length, 0) ?? 0,
  }
}

function buildRecommendation(locale: Locale, recommendation: typeof LOCAL_APP_GUIDE_DEFINITIONS[number]['categories'][number]['apps'][number]): LocalAppRecommendation {
  return {
    id: recommendation.id,
    name: recommendation.name,
    summary: recommendation.summary[locale],
    reason: recommendation.reason[locale],
    recommended: recommendation.recommended,
    links: recommendation.links,
  }
}

export function listLocalAppCountrySummaries(locale: Locale, region: PhraseRegion | 'all' = 'all') {
  return phraseSummaries
    .filter((summary) => region === 'all' || summary.region === region)
    .map((summary) => buildSummary(locale, summary.slug))
    .filter((summary): summary is LocalAppCountrySummary => Boolean(summary))
}

export function listReadyLocalAppCountrySummaries(locale: Locale, region: PhraseRegion | 'all' = 'all') {
  return listLocalAppCountrySummaries(locale, region)
    .filter((summary) => summary.ready)
    .sort((left, right) => {
      const leftRank = featuredCountryRank.get(left.slug) ?? Number.MAX_SAFE_INTEGER
      const rightRank = featuredCountryRank.get(right.slug) ?? Number.MAX_SAFE_INTEGER
      return leftRank - rightRank || left.country.localeCompare(right.country)
    })
}

export function listReadyLocalAppCountrySlugs() {
  return featuredCountrySlugs
}

export function getLocalAppCountrySummary(locale: Locale, slug: string) {
  return buildSummary(locale, slug)
}

export function countReadyLocalAppCountries() {
  return featuredCountrySlugs.length
}

export function countTrackedLocalAppCountries() {
  return phraseSummaries.length
}

export function getLocalAppGuide(locale: Locale, slug: string): LocalAppGuide | null {
  const summary = buildSummary(locale, slug)
  const guide = guideBySlug.get(slug)
  if (!summary || !guide) return null

  const relatedCountries = listReadyLocalAppCountrySummaries(locale, summary.region)
    .filter((country) => country.slug !== slug)
    .slice(0, 3)

  return {
    country: summary.country,
    slug: summary.slug,
    region: summary.region,
    flag: summary.flag,
    title: translate(locale, 'localApps.countryPageTitle', { country: summary.country }),
    description: guide.teaser[locale],
    intro: guide.intro[locale],
    highlights: guide.highlights[locale],
    categoryCount: summary.categoryCount,
    appCount: summary.appCount,
    categories: guide.categories.map((category) => ({
      id: category.id,
      summary: category.summary[locale],
      apps: category.apps.map((recommendation) => buildRecommendation(locale, recommendation)),
    })),
    cautions: guide.cautions[locale],
    relatedCountries,
  }
}
