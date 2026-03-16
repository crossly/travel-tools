import { LOCAL_APP_GUIDE_SUMMARIES } from '@/data/local-apps/guide-summaries'
import type { RawLocalAppGuideDefinition, RawLocalAppRecommendation } from '@/data/local-apps/types'
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
const guideSummaryBySlug = new Map(LOCAL_APP_GUIDE_SUMMARIES.map((guide) => [guide.slug, guide]))
const featuredCountrySlugs = LOCAL_APP_GUIDE_SUMMARIES.map((guide) => guide.slug)
const featuredCountryRank = new Map(featuredCountrySlugs.map((slug, index) => [slug, index]))
const guideModuleLoaders = import.meta.glob('../data/local-apps/country-guides/*.ts') as Record<
  string,
  () => Promise<{ LOCAL_APP_GUIDE: RawLocalAppGuideDefinition }>
>
const guideLoaderBySlug = new Map(
  Object.entries(guideModuleLoaders).map(([path, loader]) => [
    path.split('/').at(-1)?.replace(/\.ts$/, '') ?? path,
    loader,
  ]),
)
const guideCache = new Map<string, RawLocalAppGuideDefinition | null>()

async function loadGuideDefinition(slug: string) {
  if (guideCache.has(slug)) {
    return guideCache.get(slug) ?? null
  }

  const loader = guideLoaderBySlug.get(slug)
  if (!loader) {
    guideCache.set(slug, null)
    return null
  }

  const module = await loader()
  guideCache.set(slug, module.LOCAL_APP_GUIDE)
  return module.LOCAL_APP_GUIDE
}

function buildSummary(locale: Locale, slug: string): LocalAppCountrySummary | null {
  const phraseSummary = phraseSummaryBySlug.get(slug)
  if (!phraseSummary) return null

  const guide = guideSummaryBySlug.get(slug)
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
    categoryIds: guide?.categoryIds ?? [],
    categoryCount: guide?.categoryCount ?? 0,
    appCount: guide?.appCount ?? 0,
  }
}

function buildRecommendation(locale: Locale, recommendation: RawLocalAppRecommendation): LocalAppRecommendation {
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

export async function getLocalAppGuide(locale: Locale, slug: string): Promise<LocalAppGuide | null> {
  const summary = buildSummary(locale, slug)
  const guide = await loadGuideDefinition(slug)
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
