import { Moon, Sun, SunMoon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'
import type { SiteTheme } from '@/lib/types'

const THEME_META: Record<SiteTheme, { labelKey: string; Icon: typeof SunMoon }> = {
  light: { labelKey: 'settings.themeLight', Icon: Sun },
  dark: { labelKey: 'settings.themeDark', Icon: Moon },
  system: { labelKey: 'settings.themeSystem', Icon: SunMoon },
}

export function ThemeToggle({
  className,
  onAfterChange,
  iconOnly = false,
}: {
  className?: string
  onAfterChange?: () => void
  iconOnly?: boolean
} = {}) {
  const { theme, setTheme } = useTheme()
  const { t } = useI18n()
  const { Icon, labelKey } = THEME_META[theme]
  const currentLabel = t(labelKey)

  return (
    <Select
      value={theme}
      onValueChange={(nextTheme) => {
        const resolvedTheme = nextTheme as SiteTheme
        if (resolvedTheme === theme) return
        setTheme(resolvedTheme)
        onAfterChange?.()
      }}
    >
      <SelectTrigger
        className={cn(
          iconOnly ? 'size-11 justify-center rounded-full px-0' : 'gap-3',
          className,
        )}
        hideChevron={iconOnly}
        aria-label={`${t('settings.appearance')}: ${currentLabel}`}
      >
        {iconOnly ? (
          <Icon className="h-4 w-4 text-foreground" />
        ) : (
          <span className="flex min-w-0 items-center gap-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <SelectValue />
          </span>
        )}
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="light">
          <span className="flex items-center gap-2">
            <Sun className="h-4 w-4" aria-hidden="true" />
            <span>{t('settings.themeLight')}</span>
          </span>
        </SelectItem>
        <SelectItem value="dark">
          <span className="flex items-center gap-2">
            <Moon className="h-4 w-4" aria-hidden="true" />
            <span>{t('settings.themeDark')}</span>
          </span>
        </SelectItem>
        <SelectItem value="system">
          <span className="flex items-center gap-2">
            <SunMoon className="h-4 w-4" aria-hidden="true" />
            <span>{t('settings.themeSystem')}</span>
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
