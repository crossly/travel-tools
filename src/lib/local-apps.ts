import { LOCAL_APP_GUIDE_SUMMARIES } from '@/data/local-apps/guide-summaries'
import type { RawLocalAppGuideDefinition, RawLocalAppRecommendation } from '@/data/local-apps/types'
import { translate } from '@/lib/i18n'
import type {
  LocalAppCountrySummary,
  LocalAppGuide,
  LocalAppRecommendation,
  Locale,
  PhraseRegion,
} from '@/lib/types'

type LocalAppCountryProfile = {
  countryCode: string
  region: PhraseRegion
}

const LOCAL_APP_COUNTRY_PROFILES: Record<string, LocalAppCountryProfile> = {
  argentina: { countryCode: 'AR', region: 'americas' },
  australia: { countryCode: 'AU', region: 'oceania' },
  austria: { countryCode: 'AT', region: 'europe' },
  brazil: { countryCode: 'BR', region: 'americas' },
  cambodia: { countryCode: 'KH', region: 'asia' },
  canada: { countryCode: 'CA', region: 'americas' },
  chile: { countryCode: 'CL', region: 'americas' },
  china: { countryCode: 'CN', region: 'asia' },
  colombia: { countryCode: 'CO', region: 'americas' },
  'costa-rica': { countryCode: 'CR', region: 'americas' },
  egypt: { countryCode: 'EG', region: 'africa' },
  france: { countryCode: 'FR', region: 'europe' },
  germany: { countryCode: 'DE', region: 'europe' },
  greece: { countryCode: 'GR', region: 'europe' },
  'hong-kong': { countryCode: 'HK', region: 'asia' },
  india: { countryCode: 'IN', region: 'asia' },
  indonesia: { countryCode: 'ID', region: 'asia' },
  italy: { countryCode: 'IT', region: 'europe' },
  japan: { countryCode: 'JP', region: 'asia' },
  kenya: { countryCode: 'KE', region: 'africa' },
  malaysia: { countryCode: 'MY', region: 'asia' },
  mauritius: { countryCode: 'MU', region: 'africa' },
  mexico: { countryCode: 'MX', region: 'americas' },
  morocco: { countryCode: 'MA', region: 'africa' },
  netherlands: { countryCode: 'NL', region: 'europe' },
  'new-zealand': { countryCode: 'NZ', region: 'oceania' },
  peru: { countryCode: 'PE', region: 'americas' },
  philippines: { countryCode: 'PH', region: 'asia' },
  portugal: { countryCode: 'PT', region: 'europe' },
  singapore: { countryCode: 'SG', region: 'asia' },
  'south-africa': { countryCode: 'ZA', region: 'africa' },
  'south-korea': { countryCode: 'KR', region: 'asia' },
  spain: { countryCode: 'ES', region: 'europe' },
  switzerland: { countryCode: 'CH', region: 'europe' },
  taiwan: { countryCode: 'TW', region: 'asia' },
  tanzania: { countryCode: 'TZ', region: 'africa' },
  thailand: { countryCode: 'TH', region: 'asia' },
  turkey: { countryCode: 'TR', region: 'europe' },
  'united-arab-emirates': { countryCode: 'AE', region: 'middle-east' },
  'united-states': { countryCode: 'US', region: 'americas' },
  vietnam: { countryCode: 'VN', region: 'asia' },
}

const guideSummaryBySlug = new Map(LOCAL_APP_GUIDE_SUMMARIES.map((guide) => [guide.slug, guide]))
const featuredCountrySlugs = LOCAL_APP_GUIDE_SUMMARIES.map((guide) => guide.slug)
const featuredCountryRank = new Map(featuredCountrySlugs.map((slug, index) => [slug, index]))
const countryNameFormatterByLocale = new Map<Locale, Intl.DisplayNames>()
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

function getCountryName(locale: Locale, countryCode: string) {
  let formatter = countryNameFormatterByLocale.get(locale)
  if (!formatter) {
    formatter = new Intl.DisplayNames([locale], { type: 'region' })
    countryNameFormatterByLocale.set(locale, formatter)
  }

  return formatter.of(countryCode) ?? countryCode
}

function getCountryFlag(countryCode: string) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (character) => String.fromCodePoint(127397 + character.charCodeAt(0)))
}

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
  const guideSummary = guideSummaryBySlug.get(slug)
  const profile = LOCAL_APP_COUNTRY_PROFILES[slug]
  if (!guideSummary || !profile) return null

  const country = getCountryName(locale, profile.countryCode)
  const ready = guideLoaderBySlug.has(slug)
  return {
    country,
    slug,
    region: profile.region,
    flag: getCountryFlag(profile.countryCode),
    ready,
    title: ready
      ? translate(locale, 'localApps.countryPageTitle', { country })
      : translate(locale, 'localApps.countryPendingTitle', { country }),
    description: ready
      ? guideSummary.teaser[locale]
      : translate(locale, 'localApps.pendingCardDescription', { country }),
    highlights: guideSummary.highlights[locale],
    categoryIds: guideSummary.categoryIds,
    categoryCount: guideSummary.categoryCount,
    appCount: guideSummary.appCount,
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
  return LOCAL_APP_GUIDE_SUMMARIES
    .filter((summary) => region === 'all' || LOCAL_APP_COUNTRY_PROFILES[summary.slug]?.region === region)
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
  return featuredCountrySlugs.filter((slug) => guideLoaderBySlug.has(slug)).length
}

export function countTrackedLocalAppCountries() {
  return LOCAL_APP_GUIDE_SUMMARIES.length
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
