import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { GoogleAnalyticsPageviews, GoogleAnalyticsScripts } from '@/components/app/google-analytics'
import appCss from '@/styles.css?url'
import { APP_NAME } from '@/lib/site'
import { ThemeProvider } from '@/lib/theme'
import { loadRootPageData } from '@/server/site-page-data'

const THEME_INIT_SCRIPT = `(function(){try{var stored=localStorage.getItem('travel-tools:site:theme');var mode=(stored==='light'||stored==='dark'||stored==='system')?stored:'system';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='system'?(prefersDark?'dark':'light'):mode;document.documentElement.dataset.theme=mode;document.documentElement.classList.toggle('dark',resolved==='dark');}catch(e){}})();`

export const Route = createRootRoute({
  loader: () => loadRootPageData(),
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: APP_NAME },
      { name: 'description', content: 'Travel-focused tools built on TanStack Start.' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument() {
  const { googleAnalyticsId, locale } = Route.useLoaderData()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {googleAnalyticsId ? <GoogleAnalyticsScripts measurementId={googleAnalyticsId} /> : null}
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <Outlet />
          {googleAnalyticsId ? <GoogleAnalyticsPageviews measurementId={googleAnalyticsId} /> : null}
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
