import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import {
  GoogleAnalyticsPageviews,
  GoogleAnalyticsScripts,
  UmamiPageviews,
  UmamiScripts,
} from '@/components/app/google-analytics'
import appCss from '@/styles.css?url'
import { buildDocumentTitle, translate } from '@/lib/i18n'
import { ThemeProvider } from '@/lib/theme'
import { loadRootPageData } from '@/server/site-page-data'

const THEME_INIT_SCRIPT = `(function(){try{var stored=localStorage.getItem('route-crate:site:theme')||localStorage.getItem('travel-tools:site:theme');var mode=(stored==='light'||stored==='dark'||stored==='system')?stored:'system';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='system'?(prefersDark?'dark':'light'):mode;document.documentElement.dataset.theme=mode;document.documentElement.classList.toggle('dark',resolved==='dark');}catch(e){}})();`

export const Route = createRootRoute({
  loader: () => loadRootPageData(),
  head: ({ loaderData }) => {
    const locale = loaderData?.locale ?? 'en-US'
    const googleSiteVerification = loaderData?.googleSiteVerification?.trim() || null
    const bingSiteVerification = loaderData?.bingSiteVerification?.trim() || null

    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { title: buildDocumentTitle(locale) },
        { name: 'description', content: translate(locale, 'site.homeDescription') },
        ...(googleSiteVerification ? [{ name: 'google-site-verification', content: googleSiteVerification }] : []),
        ...(bingSiteVerification ? [{ name: 'msvalidate.01', content: bingSiteVerification }] : []),
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      ],
    }
  },
  shellComponent: RootDocument,
})

function RootDocument() {
  const { googleAnalyticsId, locale, umamiScriptUrl, umamiWebsiteId } = Route.useLoaderData()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {googleAnalyticsId ? <GoogleAnalyticsScripts measurementId={googleAnalyticsId} /> : null}
        {umamiWebsiteId && umamiScriptUrl ? (
          <UmamiScripts scriptUrl={umamiScriptUrl} websiteId={umamiWebsiteId} />
        ) : null}
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <Outlet />
          {googleAnalyticsId ? <GoogleAnalyticsPageviews measurementId={googleAnalyticsId} /> : null}
          {umamiWebsiteId ? <UmamiPageviews websiteId={umamiWebsiteId} /> : null}
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
