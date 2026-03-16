import { createServerFn } from '@tanstack/react-start'
import { PACKING_TEMPLATE_DEFINITIONS } from '@/data/packing-list/templates'
import type { HomePageStats } from '@/features/site/home-page-stats'
import { JET_LAG_TIMEZONES } from '@/lib/jet-lag'
import { countReadyLocalAppCountries, countTrackedLocalAppCountries } from '@/lib/local-apps'
import type { Locale } from '@/lib/types'
import { listRawPhraseCountrySummaries } from '@/lib/travel-phrases'
import { buildRootPageData, siteLocaleMiddleware, type RootPageData } from './site-page-data'

export type HomePageData = RootPageData & {
  homePageStats: HomePageStats
}

function buildHomePageStats(): HomePageStats {
  const phraseStats = listRawPhraseCountrySummaries()

  return {
    phrasePackCount: phraseStats.length,
    totalPhraseCount: phraseStats.reduce((sum, pack) => sum + pack.phraseCount, 0),
    packingTemplateCount: PACKING_TEMPLATE_DEFINITIONS.length,
    localAppsReadyCount: countReadyLocalAppCountries(),
    localAppsTrackedCount: countTrackedLocalAppCountries(),
    timeZoneCount: JET_LAG_TIMEZONES.length,
  }
}

const HOME_PAGE_STATS = buildHomePageStats()

export const loadHomePageData = createServerFn({ method: 'GET' })
  .middleware([siteLocaleMiddleware])
  .inputValidator((data: { locale?: Locale } | undefined) => data)
  .handler(async ({ data, context }) => ({
    ...buildRootPageData({
      ...context,
      locale: data?.locale ?? context.locale,
    }),
    homePageStats: HOME_PAGE_STATS,
  }))
