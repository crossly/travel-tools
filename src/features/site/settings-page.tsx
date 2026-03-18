import '@/lib/i18n/messages/settings'
import { AppShell } from '@/components/app/app-shell'
import { LocaleSwitcher } from '@/components/app/locale-switcher'
import { ThemeToggle } from '@/components/app/theme-toggle'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/lib/i18n'
import type { Locale } from '@/lib/types'

export function SettingsPage({ locale }: { locale: Locale }) {
  const { t } = useI18n()

  return (
    <AppShell locale={locale} title={t('settings.title')} activeTool={undefined}>
      <Card tone="plain">
        <CardHeader className="gap-1">
          <CardTitle>{t('settings.preferencesTitle')}</CardTitle>
          <CardDescription>{t('settings.preferencesDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 border-t border-border/70 pt-5 md:grid-cols-2">
          <div className="rounded-2xl border border-border/80 bg-[color:var(--surface-floating)] p-4">
            <p className="text-sm font-medium text-foreground">{t('settings.language')}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t('settings.languageDescription')}</p>
            <div className="mt-3">
              <LocaleSwitcher className="min-w-[10rem]" />
            </div>
          </div>
          <div className="rounded-2xl border border-border/80 bg-[color:var(--surface-floating)] p-4">
            <p className="text-sm font-medium text-foreground">{t('settings.appearance')}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t('settings.themeDescription')}</p>
            <div className="mt-3">
              <ThemeToggle className="min-w-[10rem]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  )
}
