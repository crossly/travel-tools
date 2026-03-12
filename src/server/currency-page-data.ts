import { createMiddleware, createServerFn } from '@tanstack/react-start'
import type { FxRatesResponse } from '@/lib/types'
import { normalizeCurrency } from '@/lib/currencies'
import { SITE_COOKIE_KEYS } from '@/lib/site'
import { parseCookieHeader } from '@/lib/cookie'
import type { AppRequestContext } from '@/router'
import { getRates } from './fx'

export type CurrencyPageData = {
  source: string
  target: string
  rates: FxRatesResponse | null
}

function isRatesResponse(body: unknown): body is FxRatesResponse {
  return body !== null && typeof body === 'object' && 'base' in body && 'rates' in body && 'updatedAt' in body
}

const currencyPrefsMiddleware = createMiddleware({ type: 'request' }).server(async ({ request, context, next }) => {
  const requestContext = context as unknown as AppRequestContext
  const cookies = parseCookieHeader(request.headers.get('cookie'))
  const source = normalizeCurrency(cookies.get(SITE_COOKIE_KEYS.currencySource) ?? 'USD')
  const target = normalizeCurrency(cookies.get(SITE_COOKIE_KEYS.currencyTarget) ?? 'EUR')

  return next({
    context: {
      cloudflare: requestContext.cloudflare,
      currencyPrefs: { source, target },
    },
  })
})

export const loadCurrencyPageData = createServerFn({ method: 'GET' })
  .middleware([currencyPrefsMiddleware])
  .handler(async ({ context }) => {
    const result = await getRates(context.cloudflare.env, context.currencyPrefs.source)
    const pageData: CurrencyPageData = {
      source: context.currencyPrefs.source,
      target: context.currencyPrefs.target,
      rates: result.status === 200 && isRatesResponse(result.body) ? result.body : null,
    }

    return pageData
  })
