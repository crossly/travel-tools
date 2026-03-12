import { Link, useLocation } from '@tanstack/react-router'
import { Home, ReceiptText, Settings, WalletCards } from 'lucide-react'
import { LocaleSwitcher } from './locale-switcher'
import { ThemeToggle } from './theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getLocalizedPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import { writeLastTool } from '@/lib/storage'
import type { Locale, ToolDefinition } from '@/lib/types'

const HEADER_NAV_ITEMS: Array<{
  key: string
  icon: typeof Home
  path: string
  tool?: ToolDefinition['slug']
}> = [
  { key: 'nav.home', icon: Home, path: '/' },
  { key: 'nav.currency', icon: WalletCards, path: '/tools/currency', tool: 'currency' },
  { key: 'nav.splitBill', icon: ReceiptText, path: '/tools/split-bill', tool: 'split-bill' },
]

export function AppShellHeaderControls({
  locale,
  activeTool,
}: {
  locale: Locale
  activeTool?: ToolDefinition['slug']
}) {
  const location = useLocation()
  const { t } = useI18n()
  const settingsPath = getLocalizedPath(locale, '/settings')

  return (
    <div className="flex flex-wrap items-center justify-end gap-2 xl:max-w-[42rem]">
      <nav className="flex flex-wrap items-center gap-2">
        {HEADER_NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const path = getLocalizedPath(locale, item.path)
          const isActive = item.tool ? activeTool === item.tool : location.pathname === path
          return (
            <Button
              key={item.key}
              asChild
              variant="secondary"
              className={cn('h-10 rounded-full px-4', isActive && 'border-primary/40 bg-primary/10 text-foreground')}
            >
              <Link to={path} onClick={() => {
                if (item.tool) writeLastTool(item.tool)
              }}>
                <Icon className="h-4 w-4" />
                {t(item.key)}
              </Link>
            </Button>
          )
        })}
      </nav>
      <LocaleSwitcher className="min-w-[7.5rem]" />
      <ThemeToggle className="min-w-[7.5rem]" />
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
