import type { Locale, LocalAppCategoryId, LocalAppPlatformId } from '@/lib/types'

export type LocalizedCopy = Record<Locale, string>

export type RawLocalAppLink = {
  platform: LocalAppPlatformId
  url: string
}

export type RawLocalAppRecommendation = {
  id: string
  name: string
  summary: LocalizedCopy
  reason: LocalizedCopy
  recommended: boolean
  links: RawLocalAppLink[]
}

export type RawLocalAppCategory = {
  id: LocalAppCategoryId
  summary: LocalizedCopy
  apps: RawLocalAppRecommendation[]
}

export type RawLocalAppGuideDefinition = {
  slug: string
  teaser: LocalizedCopy
  intro: LocalizedCopy
  highlights: Record<Locale, string[]>
  cautions: Record<Locale, string[]>
  categories: RawLocalAppCategory[]
}

export type RawLocalAppGuideSummary = {
  slug: string
  teaser: LocalizedCopy
  highlights: Record<Locale, string[]>
  categoryIds: LocalAppCategoryId[]
  categoryCount: number
  appCount: number
}
