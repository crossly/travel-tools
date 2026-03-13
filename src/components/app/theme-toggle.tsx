import { SunMoon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'
import type { SiteTheme } from '@/lib/types'

export function ThemeToggle({ className, onAfterChange }: { className?: string; onAfterChange?: () => void } = {}) {
  const { theme, setTheme } = useTheme()
  const { t } = useI18n()

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
      <SelectTrigger className={cn('gap-3', className)} aria-label={t('settings.appearance')}>
        <span className="flex min-w-0 items-center gap-2">
          <SunMoon className="h-4 w-4 text-muted-foreground" />
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="light">{t('settings.themeLight')}</SelectItem>
        <SelectItem value="dark">{t('settings.themeDark')}</SelectItem>
        <SelectItem value="system">{t('settings.themeSystem')}</SelectItem>
      </SelectContent>
    </Select>
  )
}
