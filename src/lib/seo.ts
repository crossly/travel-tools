import { buildDocumentTitle, translate } from '@/lib/i18n'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, getLocalizedPath } from '@/lib/site'
import type { Locale } from '@/lib/types'

export const SITE_ORIGIN = 'https://www.routecrate.com'

const OG_IMAGE_PATH = '/og-image.svg'

type HeadLink = {
  rel: string
  href: string
  hreflang?: string
  type?: string
}

type HeadMeta = Record<string, unknown>

type HeadDefinition = {
  meta: HeadMeta[]
  links?: HeadLink[]
}

type PublicPageHeadOptions = {
  locale: Locale
  title: string
  description: string
  pathname: string
  xDefaultPath?: string
  ogType?: 'website' | 'article'
  structuredData?: 'website' | 'software'
  extraStructuredData?: Record<string, unknown>[]
}

type PrivatePageHeadOptions = {
  locale: Locale
  title: string
  description?: string
}

type RootAliasHeadOptions = {
  locale: Locale
  title: string
  description: string
}

export function absoluteUrl(pathname: string) {
  return new URL(pathname.startsWith('/') ? pathname : `/${pathname}`, SITE_ORIGIN).toString()
}

function toOgLocale(locale: Locale) {
  return locale.replace('-', '_')
}

function buildAlternateLinks(pathname: string, xDefaultPath = getLocalizedPath(DEFAULT_LOCALE, pathname)) {
  const links: HeadLink[] = SUPPORTED_LOCALES.map((locale) => ({
    rel: 'alternate',
    href: absoluteUrl(getLocalizedPath(locale, pathname)),
    hreflang: locale,
  }))

  links.push({
    rel: 'alternate',
    href: absoluteUrl(xDefaultPath),
    hreflang: 'x-default',
  })

  return links
}

function buildPublisher(locale: Locale) {
  return {
    '@type': 'Organization',
    name: translate(locale, 'app.name'),
    url: SITE_ORIGIN,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo.svg'),
    },
  }
}

function buildStructuredData(
  locale: Locale,
  title: string,
  description: string,
  canonicalUrl: string,
  kind: NonNullable<PublicPageHeadOptions['structuredData']>,
) {
  const publisher = buildPublisher(locale)

  if (kind === 'software') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: title,
        description,
        url: canonicalUrl,
        image: absoluteUrl(OG_IMAGE_PATH),
        inLanguage: locale,
        applicationCategory: 'TravelApplication',
        operatingSystem: 'Web',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        publisher,
      },
    ]
  }

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: publisher.name,
      url: publisher.url,
      logo: publisher.logo,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: translate(locale, 'app.name'),
      description,
      url: canonicalUrl,
      inLanguage: locale,
      image: absoluteUrl(OG_IMAGE_PATH),
      publisher,
    },
  ]
}

export function buildPublicPageHead({
  locale,
  title,
  description,
  pathname,
  xDefaultPath,
  ogType = 'website',
  structuredData,
  extraStructuredData,
}: PublicPageHeadOptions): HeadDefinition {
  const canonicalUrl = absoluteUrl(getLocalizedPath(locale, pathname))
  const meta: HeadMeta[] = [
    { title: buildDocumentTitle(locale, title) },
    { name: 'description', content: description },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:type', content: ogType },
    { property: 'og:site_name', content: translate(locale, 'app.name') },
    { property: 'og:locale', content: toOgLocale(locale) },
    { property: 'og:title', content: buildDocumentTitle(locale, title) },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: absoluteUrl(OG_IMAGE_PATH) },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: buildDocumentTitle(locale, title) },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: absoluteUrl(OG_IMAGE_PATH) },
  ]

  if (structuredData) {
    for (const item of buildStructuredData(locale, title, description, canonicalUrl, structuredData)) {
      meta.push({ 'script:ld+json': item })
    }
  }

  if (extraStructuredData?.length) {
    for (const item of extraStructuredData) {
      meta.push({ 'script:ld+json': item })
    }
  }

  return {
    meta,
    links: [
      { rel: 'canonical', href: canonicalUrl },
      ...buildAlternateLinks(pathname, xDefaultPath),
    ],
  }
}

export function buildPrivatePageHead({ locale, title, description }: PrivatePageHeadOptions): HeadDefinition {
  const meta: HeadMeta[] = [
    { title: buildDocumentTitle(locale, title) },
    { name: 'robots', content: 'noindex, nofollow' },
  ]

  if (description) {
    meta.push({ name: 'description', content: description })
  }

  return { meta }
}

export function buildRootAliasHead({ locale, title, description }: RootAliasHeadOptions): HeadDefinition {
  const canonicalUrl = absoluteUrl(getLocalizedPath(locale, '/'))

  return {
    meta: [
      { title: buildDocumentTitle(locale, title) },
      { name: 'description', content: description },
      { name: 'robots', content: 'noindex, follow' },
    ],
    links: [
      { rel: 'canonical', href: canonicalUrl },
      ...buildAlternateLinks('/', '/'),
    ],
  }
}
