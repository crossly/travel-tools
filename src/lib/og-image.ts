import { SITE_ORIGIN } from '@/lib/site'
import type { Locale } from '@/lib/types'

type OgImageUrlOptions = {
  locale: Locale
  variant?: 'default' | 'home' | 'tool' | 'country'
  brand: string
  title: string
  description: string
}

export function buildOgImageUrl({ locale, variant, brand, title, description }: OgImageUrlOptions) {
  const url = new URL('/api/og-image', SITE_ORIGIN)
  url.searchParams.set('locale', locale)
  if (variant && variant !== 'default') {
    url.searchParams.set('variant', variant)
  }
  url.searchParams.set('brand', brand)
  url.searchParams.set('title', title)
  url.searchParams.set('description', description)
  return url.toString()
}
