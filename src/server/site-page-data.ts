import { createMiddleware, createServerFn } from '@tanstack/react-start'
import type { Locale } from '@/lib/types'
import { resolveRequestLocale } from '@/lib/site'
import type { AppRequestContext } from '@/router'

type RootPageData = {
  locale: Locale
  googleAnalyticsId: string | null
  umamiWebsiteId: string | null
  umamiScriptUrl: string | null
}

const siteLocaleMiddleware = createMiddleware({ type: 'request' }).server(async ({ request, context, next }) => {
  const requestContext = context as unknown as AppRequestContext
  return next({
    context: {
      cloudflare: requestContext.cloudflare,
      locale: resolveRequestLocale(request.headers.get('cookie'), request.headers.get('accept-language')),
    },
  })
})

export const loadRootPageData = createServerFn({ method: 'GET' })
  .middleware([siteLocaleMiddleware])
  .handler(async ({ context }) => {
    const pageData: RootPageData = {
      locale: context.locale,
      googleAnalyticsId: context.cloudflare?.env.GA_MEASUREMENT_ID?.trim() || context.cloudflare?.env.GOOGLE_ANALYTICS_ID?.trim() || null,
      umamiWebsiteId: context.cloudflare?.env.UMAMI_WEBSITE_ID?.trim() || null,
      umamiScriptUrl: context.cloudflare?.env.UMAMI_SCRIPT_URL?.trim() || 'https://cloud.umami.is/script.js',
    }

    if (!pageData.umamiWebsiteId) {
      pageData.umamiScriptUrl = null
    }

    return pageData
  })
