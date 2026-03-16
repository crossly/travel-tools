import { createMiddleware, createServerFn } from '@tanstack/react-start'
import type { Locale } from '@/lib/types'
import { resolveExplicitLocaleFromPath, resolveRequestLocale } from '@/lib/site'
import type { AppRequestContext } from '@/router'

export type RootPageData = {
  locale: Locale
  googleAnalyticsId: string | null
  googleSiteVerification: string | null
  bingSiteVerification: string | null
  umamiWebsiteId: string | null
  umamiScriptUrl: string | null
}

export const siteLocaleMiddleware = createMiddleware({ type: 'request' }).server(async ({ request, context, next }) => {
  const requestContext = context as unknown as AppRequestContext
  const pathnameLocale = resolveExplicitLocaleFromPath(new URL(request.url).pathname)

  return next({
    context: {
      cloudflare: requestContext.cloudflare,
      locale: pathnameLocale ?? resolveRequestLocale(request.headers.get('cookie'), request.headers.get('accept-language')),
    },
  })
})

export function buildRootPageData(context: { locale: Locale; cloudflare?: AppRequestContext['cloudflare'] }): RootPageData {
  const pageData: RootPageData = {
    locale: context.locale,
    googleAnalyticsId: context.cloudflare?.env.GA_MEASUREMENT_ID?.trim() || context.cloudflare?.env.GOOGLE_ANALYTICS_ID?.trim() || null,
    googleSiteVerification: context.cloudflare?.env.GOOGLE_SITE_VERIFICATION?.trim() || null,
    bingSiteVerification: context.cloudflare?.env.BING_SITE_VERIFICATION?.trim() || null,
    umamiWebsiteId: context.cloudflare?.env.UMAMI_WEBSITE_ID?.trim() || null,
    umamiScriptUrl: context.cloudflare?.env.UMAMI_SCRIPT_URL?.trim() || 'https://cloud.umami.is/script.js',
  }

  if (!pageData.umamiWebsiteId) {
    pageData.umamiScriptUrl = null
  }

  return pageData
}

export const loadRootPageData = createServerFn({ method: 'GET' })
  .middleware([siteLocaleMiddleware])
  .handler(async ({ context }) => {
    return buildRootPageData(context)
  })
