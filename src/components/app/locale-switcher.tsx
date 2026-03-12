import { Globe } from 'lucide-react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { replaceLocaleInPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import type { Locale } from '@/lib/types'

export function LocaleSwitcher({ className, onAfterChange }: { className?: string; onAfterChange?: () => void } = {}) {
  const { locale, setLocale } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <label className={cn('flex h-10 items-center gap-2 rounded-full border border-border bg-[color:var(--surface-floating)] px-3 py-2 text-sm text-muted-foreground shadow-sm', className)}>
      <Globe className="h-4 w-4" />
      <select
        value={locale}
        onChange={(event) => {
          const nextLocale = event.target.value as Locale
          setLocale(nextLocale)
          navigate({ to: replaceLocaleInPath(location.pathname, nextLocale) })
          onAfterChange?.()
        }}
        className="bg-transparent text-foreground outline-none"
      >
        <option value="zh-CN">中文</option>
        <option value="en-US">English</option>
      </select>
    </label>
  )
}
