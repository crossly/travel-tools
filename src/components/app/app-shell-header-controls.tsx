import { Link, useLocation } from '@tanstack/react-router'
import { Settings } from 'lucide-react'
import { LocaleSwitcher } from './locale-switcher'
import { ThemeToggle } from './theme-toggle'
import { TOOL_NAV_ITEMS } from './navigation-items'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getLocalizedPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import { writeLastTool } from '@/lib/storage'
import type { Locale, ToolDefinition } from '@/lib/types'

export function AppShellHeaderControls({
  locale,
}: {
  locale: Locale
}) {
  const location = useLocation()
  const { t } = useI18n()
  const settingsPath = getLocalizedPath(locale, '/settings')

  return (
    <div className="shell-utility-cluster">
      <LocaleSwitcher iconOnly />
      <ThemeToggle iconOnly />
      <Button
        asChild
        variant="soft"
        size="icon"
        className={cn('rounded-2xl', location.pathname === settingsPath && 'border-primary/40 bg-primary/10 text-foreground')}
      >
        <Link to={settingsPath} aria-label={t('nav.settings')}>
          <Settings className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}

export function DesktopToolNav({
  locale,
  activeTool,
}: {
  locale: Locale
  activeTool?: ToolDefinition['slug']
}) {
  const { t } = useI18n()

  return (
    <nav
      aria-label={t('nav.desktopToolNavigation')}
      className="desktop-tool-nav"
    >
      <div className="desktop-tool-nav-track">
      {TOOL_NAV_ITEMS.map((item) => {
        const Icon = item.icon
        const path = getLocalizedPath(locale, item.path)
        const isActive = item.tool ? activeTool === item.tool : false
        return (
          <Link
            key={item.key}
            to={path}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'desktop-tool-link',
              isActive && 'is-active',
            )}
            onClick={() => {
              if (item.tool) writeLastTool(item.tool)
            }}
          >
            <Icon className="h-4 w-4" />
            <span>{t(item.key)}</span>
            {isActive ? <span className="desktop-tool-link-indicator" aria-hidden="true" /> : null}
          </Link>
        )
      })}
      </div>
    </nav>
  )
}
