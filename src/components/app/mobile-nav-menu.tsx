import { useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { Menu, Settings, X } from 'lucide-react'
import { LocaleSwitcher } from './locale-switcher'
import { ThemeToggle } from './theme-toggle'
import { MOBILE_NAV_ITEMS, TOOL_NAV_ITEMS } from './navigation-items'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getLocalizedPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import { writeLastTool } from '@/lib/storage'
import type { Locale, ToolDefinition } from '@/lib/types'

export function MobileNavMenu({
  locale,
  activeTool,
}: {
  locale: Locale
  activeTool?: ToolDefinition['slug']
}) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { t } = useI18n()
  const settingsPath = getLocalizedPath(locale, '/settings')
  const quickToolOrder: ToolDefinition['slug'][] = ['currency', 'split-bill', 'packing-list']
  const quickTools = TOOL_NAV_ITEMS.filter((item) => item.tool && quickToolOrder.includes(item.tool))

  return (
    <div className="md:hidden">
      <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
        <LinkBrand locale={locale} label={t('app.name')} />
        <Button
          type="button"
          variant="soft"
          size="icon"
          className="rounded-2xl"
          aria-label={open ? t('site.mobileCloseMenu') : t('site.mobileMenu')}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      <nav aria-label={t('site.mobileTools')} className="mobile-quick-tools mb-4">
        {quickTools.map((item) => {
          const Icon = item.icon
          const isActive = item.tool === activeTool
          return (
            <Link
              key={item.key}
              to={getLocalizedPath(locale, item.path)}
              aria-current={isActive ? 'page' : undefined}
              className={cn('mobile-quick-link', isActive && 'is-active')}
              onClick={() => {
                if (item.tool) writeLastTool(item.tool)
              }}
            >
              <Icon className="h-4 w-4" />
              <span>{t(item.key)}</span>
            </Link>
          )
        })}
      </nav>

      {open ? (
        <div data-testid="mobile-nav-panel" className="mb-4 rounded-3xl border border-border bg-card p-3 shadow-xl">
          <p className="px-2 pb-2 text-[11px] font-semibold tracking-[0.12em] text-muted-foreground">
            {t('site.mobileBrowse')}
          </p>
          <nav className="grid gap-2">
            {MOBILE_NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = item.tool ? activeTool === item.tool : getLocalizedPath(locale, item.path) === location.pathname
              return (
                <Link
                  key={item.key}
                  to={getLocalizedPath(locale, item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'mobile-nav-link flex items-center gap-3 rounded-2xl border border-border bg-[color:var(--surface-floating)] px-4 py-3 text-left text-sm font-medium text-foreground shadow-sm transition-colors',
                    isActive && 'is-active border-primary/45 bg-primary/12 text-foreground',
                  )}
                  onClick={() => {
                    if (item.tool) writeLastTool(item.tool)
                    setOpen(false)
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{t(item.key)}</span>
                  {isActive ? <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" /> : null}
                </Link>
              )
            })}
          </nav>

          <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/80 pt-3">
            <p className="text-xs font-medium text-muted-foreground">{t('site.mobilePreferences')}</p>
            <div className="flex items-center gap-2">
              <LocaleSwitcher iconOnly onAfterChange={() => setOpen(false)} />
              <ThemeToggle iconOnly onAfterChange={() => setOpen(false)} />
              <Button
                asChild
                variant="soft"
                size="icon"
                className={cn('rounded-2xl', location.pathname === settingsPath && 'border-primary/40 bg-primary/10')}
              >
                <Link
                  to={settingsPath}
                  aria-label={t('nav.settings')}
                  onClick={() => setOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function LinkBrand({ locale, label }: { locale: Locale; label: string }) {
  return (
    <Link to={getLocalizedPath(locale, '/')} className="flex min-w-0 items-center gap-2 text-left">
      <img src="/logo.svg" alt="" className="size-8 rounded-xl" aria-hidden="true" />
      <p className="truncate text-base font-semibold text-foreground">{label}</p>
    </Link>
  )
}
