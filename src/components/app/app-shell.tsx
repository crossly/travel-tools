import { Suspense, lazy } from 'react'
import type { ReactNode } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getToolBySlug } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import type { Locale, ToolDefinition } from '@/lib/types'

const MobileNavMenu = lazy(async () => {
  const module = await import('./mobile-nav-menu')
  return { default: module.MobileNavMenu }
})

const AppShellHeaderControls = lazy(async () => {
  const module = await import('./app-shell-header-controls')
  return { default: module.AppShellHeaderControls }
})

export function AppShell({
  locale,
  title,
  description,
  activeTool,
  children,
}: {
  locale: Locale
  title: string
  description?: string
  activeTool?: ToolDefinition['slug']
  children: ReactNode
}) {
  const { t } = useI18n()
  const currentTool = activeTool ? getToolBySlug(activeTool) : undefined

  return (
    <div className="app-shell">
      <div className="page-wrap">
        <header className="mb-6">
          <Suspense fallback={<MobileHeaderFallback title={title} subtitle={t('app.name')} />}>
            <MobileNavMenu locale={locale} activeTool={activeTool} title={title} />
          </Suspense>
          <Card className="hidden overflow-hidden md:block">
            <CardHeader className="hidden gap-6 md:flex">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="hero-copy">
                  <p className="text-xs font-semibold tracking-[0.28em] text-muted-foreground uppercase">{t('site.tagline')}</p>
                  <CardTitle className="mt-2 text-3xl">{title}</CardTitle>
                  {description ? <CardDescription className="mt-1 max-w-2xl text-sm leading-6">{description}</CardDescription> : null}
                  {currentTool ? <p className="mt-3 text-sm text-muted-foreground">{t(currentTool.descriptionKey)}</p> : null}
                </div>
                <Suspense fallback={<DesktopControlsFallback />}>
                  <AppShellHeaderControls locale={locale} activeTool={activeTool} />
                </Suspense>
              </div>
            </CardHeader>
          </Card>
        </header>
        <main className="surface-grid">{children}</main>
      </div>
    </div>
  )
}

function MobileHeaderFallback({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm md:hidden">
      <div className="min-w-0">
        <p className="truncate text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">{subtitle}</p>
        <p className="truncate text-base font-semibold text-foreground">{title}</p>
      </div>
      <div className="size-10 rounded-xl border border-border bg-[var(--input)]" aria-hidden="true" />
    </div>
  )
}

function DesktopControlsFallback() {
  return (
    <div className="hidden flex-wrap items-center justify-end gap-2 xl:flex" aria-hidden="true">
      <div className="h-10 w-72 rounded-full border border-border bg-[var(--input)]" />
      <div className="h-10 w-28 rounded-full border border-border bg-[var(--input)]" />
      <div className="size-10 rounded-full border border-border bg-[var(--input)]" />
      <div className="size-10 rounded-full border border-border bg-[var(--input)]" />
    </div>
  )
}
