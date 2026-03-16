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
    <div className="flex items-center justify-end gap-2">
      <LocaleSwitcher iconOnly />
      <ThemeToggle iconOnly />
      <Button
        asChild
        variant="secondary"
        size="icon"
        className={cn('rounded-full', location.pathname === settingsPath && 'border-primary/40 bg-primary/10 text-foreground')}
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
      aria-label="Desktop tool navigation"
      className="flex w-full items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {TOOL_NAV_ITEMS.map((item) => {
        const Icon = item.icon
        const path = getLocalizedPath(locale, item.path)
        const isActive = item.tool ? activeTool === item.tool : false
        return (
          <Button
            key={item.key}
            asChild
            variant="secondary"
            className={cn(
              'h-10 shrink-0 rounded-full px-4',
              isActive && 'border-primary/40 bg-primary/10 text-foreground',
            )}
          >
            <Link
              to={path}
              onClick={() => {
                if (item.tool) writeLastTool(item.tool)
              }}
            >
              <Icon className="h-4 w-4" />
              {t(item.key)}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
