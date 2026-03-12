import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '@/styles.css?url'
import { APP_NAME } from '@/lib/site'
import { ThemeProvider } from '@/lib/theme'

const THEME_INIT_SCRIPT = `(function(){try{var stored=localStorage.getItem('travel-tools:site:theme');var mode=(stored==='light'||stored==='dark'||stored==='system')?stored:'system';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='system'?(prefersDark?'dark':'light'):mode;document.documentElement.dataset.theme=mode;document.documentElement.classList.toggle('dark',resolved==='dark');}catch(e){}})();`

export const Route = createRootRoute({
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
