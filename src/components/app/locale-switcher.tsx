import { Globe } from 'lucide-react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { replaceLocaleInPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import type { Locale } from '@/lib/types'

export function LocaleSwitcher({ className, onAfterChange }: { className?: string; onAfterChange?: () => void } = {}) {
  const { locale, setLocale, t } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Select
      value={locale}
      onValueChange={(nextLocale) => {
        const resolvedLocale = nextLocale as Locale
        if (resolvedLocale === locale) return
        setLocale(resolvedLocale)
        navigate({ to: replaceLocaleInPath(location.pathname, resolvedLocale) })
        onAfterChange?.()
      }}
    >
      <SelectTrigger className={cn('gap-3', className)} aria-label={t('settings.language')}>
        <span className="flex min-w-0 items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="zh-CN">{t('settings.languageChinese')}</SelectItem>
        <SelectItem value="en-US">{t('settings.languageEnglish')}</SelectItem>
      </SelectContent>
    </Select>
  )
}
