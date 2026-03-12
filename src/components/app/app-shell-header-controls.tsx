import { LocaleSwitcher } from './locale-switcher'
import { ThemeToggle } from './theme-toggle'
import { ToolSwitcher } from './tool-switcher'
import type { Locale, ToolDefinition } from '@/lib/types'

export function AppShellHeaderControls({
  locale,
  activeTool,
}: {
  locale: Locale
  activeTool?: ToolDefinition['slug']
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ToolSwitcher locale={locale} activeTool={activeTool} />
      <LocaleSwitcher />
      <ThemeToggle />
    </div>
  )
}
