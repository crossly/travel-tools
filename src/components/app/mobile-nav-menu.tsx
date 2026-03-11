import { useState } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getLocalizedPath, replaceLocaleInPath, TOOLS } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import { writeLastTool } from '@/lib/storage'
import { useTheme } from '@/lib/theme'
import type { Locale, SiteTheme, ToolDefinition } from '@/lib/types'

const NAV_LINKS: Array<{ key: string; path: string }> = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.settings', path: '/settings' },
]

type SectionKey = 'browse' | 'tools' | 'preferences'

export function MobileNavMenu({
  locale,
  activeTool,
  title,
}: {
  locale: Locale
  activeTool?: ToolDefinition['slug']
  title: string
}) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<SectionKey | null>('tools')
  const navigate = useNavigate()
  const location = useLocation()
  const { t, setLocale } = useI18n()
  const { theme, setTheme } = useTheme()

  function toggleSection(section: SectionKey) {
    setExpanded((current) => (current === section ? null : section))
  }

  function onNavigate(path: string, tool?: ToolDefinition['slug']) {
    if (tool) writeLastTool(tool)
    setOpen(false)
    navigate({ to: getLocalizedPath(locale, path), search: location.search })
  }

  function onLocaleChange(nextLocale: Locale) {
    setLocale(nextLocale)
    setOpen(false)
    navigate({ to: replaceLocaleInPath(location.pathname, nextLocale) })
  }

  function onThemeChange(nextTheme: SiteTheme) {
    setTheme(nextTheme)
  }

  return (
    <div className="md:hidden">
      <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">{t('app.name')}</p>
          <p className="truncate text-base font-semibold text-foreground">{title}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-xl"
          aria-label={open ? t('site.mobileCloseMenu') : t('site.mobileMenu')}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {open ? (
        <div className="mb-4 rounded-3xl border border-border bg-card p-3 shadow-xl">
          <MobileAccordionSection
            title={t('site.mobileBrowse')}
            open={expanded === 'browse'}
            onToggle={() => toggleSection('browse')}
          >
            <div className="grid gap-2">
              {NAV_LINKS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={cn(
                    'rounded-2xl border border-border px-4 py-3 text-left text-sm text-foreground',
                    getLocalizedPath(locale, item.path) === location.pathname && 'border-primary/40 bg-primary/10',
                  )}
                  onClick={() => onNavigate(item.path)}
                >
                  {t(item.key)}
                </button>
              ))}
            </div>
          </MobileAccordionSection>

          <MobileAccordionSection
            title={t('site.mobileTools')}
            open={expanded === 'tools'}
            onToggle={() => toggleSection('tools')}
          >
            <div className="grid gap-2">
              {TOOLS.map((tool) => (
                <button
                  key={tool.id}
                  type="button"
                  className={cn(
                    'rounded-2xl border border-border px-4 py-3 text-left text-sm text-foreground',
                    activeTool === tool.slug && 'border-primary/40 bg-primary/10',
                  )}
                  onClick={() => onNavigate(tool.entryPath, tool.slug)}
                >
                  <span className="block font-medium">{t(tool.nameKey)}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{t(tool.descriptionKey)}</span>
                </button>
              ))}
            </div>
          </MobileAccordionSection>

          <MobileAccordionSection
            title={t('site.mobilePreferences')}
            open={expanded === 'preferences'}
            onToggle={() => toggleSection('preferences')}
          >
            <div className="grid gap-4">
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">{t('settings.language')}</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button type="button" variant={locale === 'zh-CN' ? 'default' : 'outline'} onClick={() => onLocaleChange('zh-CN')}>
                    中文
                  </Button>
                  <Button type="button" variant={locale === 'en-US' ? 'default' : 'outline'} onClick={() => onLocaleChange('en-US')}>
                    English
                  </Button>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">{t('settings.theme')}</p>
                <div className="grid grid-cols-3 gap-2">
                  <ThemeChoiceButton label={t('settings.themeLight')} active={theme === 'light'} onClick={() => onThemeChange('light')} />
                  <ThemeChoiceButton label={t('settings.themeDark')} active={theme === 'dark'} onClick={() => onThemeChange('dark')} />
                  <ThemeChoiceButton label={t('settings.themeSystem')} active={theme === 'system'} onClick={() => onThemeChange('system')} />
                </div>
              </div>
            </div>
          </MobileAccordionSection>
        </div>
      ) : null}
    </div>
  )
}

function MobileAccordionSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <section className="border-b border-border/80 py-1 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-2xl px-2 py-3 text-left"
        onClick={onToggle}
      >
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>
      {open ? <div className="px-2 pb-3">{children}</div> : null}
    </section>
  )
}

function ThemeChoiceButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <Button type="button" variant={active ? 'default' : 'outline'} className="h-10 px-3" onClick={onClick}>
      {label}
    </Button>
  )
}
