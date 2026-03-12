import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'
import type { SiteTheme } from '@/lib/types'

function getNextTheme(theme: SiteTheme): 'light' | 'dark' {
  if (theme === 'dark') return 'light'
  if (theme === 'light') return 'dark'
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'light'
  }
  return 'dark'
}

export function ThemeToggle({ className, onAfterChange }: { className?: string; onAfterChange?: () => void } = {}) {
  const { theme, setTheme } = useTheme()
  const { t } = useI18n()
  const nextTheme = getNextTheme(theme)
  const Icon = nextTheme === 'dark' ? Moon : Sun

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      className={cn('rounded-full', className)}
      onClick={() => {
        setTheme(nextTheme)
        onAfterChange?.()
      }}
      aria-label={nextTheme === 'dark' ? t('settings.themeDark') : t('settings.themeLight')}
    >
      <Icon className="h-4 w-4" />
    </Button>
  )
}
