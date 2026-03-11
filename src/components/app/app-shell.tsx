import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { Home, ReceiptText, Settings, WalletCards } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { getLocalizedPath, getToolBySlug } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import type { Locale, ToolDefinition } from '@/lib/types'
import { LocaleSwitcher } from './locale-switcher'
import { MobileNavMenu } from './mobile-nav-menu'
import { ThemeToggle } from './theme-toggle'
import { ToolSwitcher } from './tool-switcher'

const NAV_ITEMS: Array<{ key: string; icon: typeof Home; path: string; tool?: ToolDefinition['slug'] }> = [
  { key: 'nav.home', icon: Home, path: '/' },
  { key: 'nav.currency', icon: WalletCards, path: '/tools/currency', tool: 'currency' },
  { key: 'nav.splitBill', icon: ReceiptText, path: '/tools/split-bill', tool: 'split-bill' },
  { key: 'nav.settings', icon: Settings, path: '/settings' },
]

export function AppShell({
  locale,
  title,
  description,
  activeTool,
  children,
}: {
  locale: Locale
  title: string
  description?: string
  activeTool?: ToolDefinition['slug']
  children: ReactNode
}) {
  const { t } = useI18n()
  const currentTool = activeTool ? getToolBySlug(activeTool) : undefined

  return (
    <div className="app-shell">
      <div className="page-wrap">
        <header className="mb-6">
          <MobileNavMenu locale={locale} activeTool={activeTool} title={title} />
          <Card className="hidden overflow-hidden md:block">
            <CardHeader className="hidden gap-5 md:flex">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="hero-copy">
                  <p className="text-xs font-semibold tracking-[0.28em] text-muted-foreground uppercase">{t('site.tagline')}</p>
                  <CardTitle className="mt-2 text-3xl">{title}</CardTitle>
                  {description ? <CardDescription className="mt-1 max-w-2xl text-sm leading-6">{description}</CardDescription> : null}
                  {currentTool ? <p className="mt-3 text-sm text-muted-foreground">{t(currentTool.descriptionKey)}</p> : null}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <ToolSwitcher locale={locale} activeTool={activeTool} />
                  <LocaleSwitcher />
                  <ThemeToggle />
                </div>
              </div>
              <nav className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.key}
                      to={getLocalizedPath(locale, item.path)}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl border border-border bg-[var(--input)] px-4 py-3 text-sm transition-colors hover:bg-muted',
                        activeTool === item.tool && 'border-primary/40 bg-primary/10',
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{t(item.key)}</span>
                    </Link>
                  )
                })}
              </nav>
            </CardHeader>
          </Card>
          <div className="px-1 md:hidden">
            <div className="mb-1">
              <h1 className="display text-2xl">{title}</h1>
              {description ? <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p> : null}
            </div>
          </div>
        </header>
        <main className="surface-grid">{children}</main>
      </div>
    </div>
  )
}
