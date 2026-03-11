import { useLocation, useNavigate } from '@tanstack/react-router'
import { Compass } from 'lucide-react'
import { TOOLS, getLocalizedPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import { writeLastTool } from '@/lib/storage'
import type { Locale, ToolDefinition } from '@/lib/types'

export function ToolSwitcher({
  locale,
  activeTool,
}: {
  locale: Locale
  activeTool?: ToolDefinition['slug']
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useI18n()

  return (
    <label className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
      <Compass className="h-4 w-4" />
      <select
        value={activeTool ?? ''}
        onChange={(event) => {
          const slug = event.target.value as ToolDefinition['slug']
          const tool = TOOLS.find((item) => item.slug === slug)
          if (!tool) return
          writeLastTool(tool.slug)
          navigate({ to: getLocalizedPath(locale, tool.entryPath), search: location.search })
        }}
        className="max-w-32 bg-transparent text-foreground outline-none sm:max-w-none"
      >
        <option value="">{t('site.exploreTools')}</option>
        {TOOLS.map((tool) => (
          <option key={tool.id} value={tool.slug}>
            {t(tool.nameKey)}
          </option>
        ))}
      </select>
    </label>
  )
}
