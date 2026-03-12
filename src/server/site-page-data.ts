import { createMiddleware, createServerFn } from '@tanstack/react-start'
import type { Locale } from '@/lib/types'
import { resolveRequestLocale } from '@/lib/site'

type RootPageData = {
  locale: Locale
}

const siteLocaleMiddleware = createMiddleware({ type: 'request' }).server(async ({ request, next }) => {
  return next({
    context: {
      locale: resolveRequestLocale(request.headers.get('cookie'), request.headers.get('accept-language')),
    },
  })
})

export const loadRootPageData = createServerFn({ method: 'GET' })
  .middleware([siteLocaleMiddleware])
  .handler(async ({ context }) => {
    const pageData: RootPageData = {
      locale: context.locale,
    }

    return pageData
  })
