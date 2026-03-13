import { Globe } from 'lucide-react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { replaceLocaleInPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import type { Locale } from '@/lib/types'

const LOCALE_META: Record<Locale, { labelKey: string; flag: string }> = {
  'en-US': { labelKey: 'settings.languageEnglish', flag: '🇺🇸' },
  'zh-CN': { labelKey: 'settings.languageChinese', flag: '🇨🇳' },
}

export function LocaleSwitcher({
  className,
  onAfterChange,
  iconOnly = false,
}: {
  className?: string
  onAfterChange?: () => void
  iconOnly?: boolean
} = {}) {
  const { locale, setLocale, t } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const currentLocale = LOCALE_META[locale]

  return (
    <Select
      value={locale}
      onValueChange={(nextLocale) => {
        const resolvedLocale = nextLocale as Locale
        if (resolvedLocale === locale) return
        setLocale(resolvedLocale)
        navigate({
          to: replaceLocaleInPath(location.pathname, resolvedLocale),
          search: location.search,
          hash: typeof location.hash === 'string' ? location.hash : undefined,
        })
        onAfterChange?.()
      }}
    >
      <SelectTrigger
        className={cn(
          iconOnly ? 'size-11 justify-center rounded-full px-0' : 'gap-3',
          className,
        )}
        hideChevron={iconOnly}
        aria-label={`${t('settings.language')}: ${t(currentLocale.labelKey)}`}
      >
        {iconOnly ? (
          <Globe className="h-4 w-4 text-foreground" />
        ) : (
          <span className="flex min-w-0 items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <SelectValue />
          </span>
        )}
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="en-US">
          <span className="flex items-center gap-2">
            <span aria-hidden="true">{LOCALE_META['en-US'].flag}</span>
            <span>{t('settings.languageEnglish')}</span>
          </span>
        </SelectItem>
        <SelectItem value="zh-CN">
          <span className="flex items-center gap-2">
            <span aria-hidden="true">{LOCALE_META['zh-CN'].flag}</span>
            <span>{t('settings.languageChinese')}</span>
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
