import { Suspense, lazy, useEffect } from 'react'
import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { Card, CardHeader } from '@/components/ui/card'
import { scheduleGlobalRouteChunkPreload } from './route-chunk-preloads'
import { getLocalizedPath, getToolBySlug } from '@/lib/site'
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

const DesktopToolNav = lazy(async () => {
  const module = await import('./app-shell-header-controls')
  return { default: module.DesktopToolNav }
})

export function AppShell({
  locale,
  title,
  description,
  activeTool,
  showPageIntro = true,
  children,
}: {
  locale: Locale
  title: string
  description?: string
  activeTool?: ToolDefinition['slug']
  showPageIntro?: boolean
  children: ReactNode
}) {
  const { t } = useI18n()
  const currentTool = activeTool ? getToolBySlug(activeTool) : undefined

  useEffect(() => scheduleGlobalRouteChunkPreload(activeTool), [activeTool])

  return (
    <div className="app-shell">
      <div className="page-wrap">
        <header className="mb-6">
          <Suspense fallback={<MobileHeaderFallback brand={t('app.name')} homePath={getLocalizedPath(locale, '/')} />}>
            <MobileNavMenu locale={locale} activeTool={activeTool} />
          </Suspense>
          <Card className="hidden md:block">
            <CardHeader className="hidden md:flex">
              <div className="flex items-center justify-between gap-6">
                <Link to={getLocalizedPath(locale, '/')} className="flex min-w-0 items-center gap-3">
                  <BrandMark />
                  <p className="display truncate text-2xl font-semibold text-foreground">{t('app.name')}</p>
                </Link>
                <Suspense fallback={<DesktopControlsFallback />}>
                  <AppShellHeaderControls locale={locale} />
                </Suspense>
              </div>
              <Suspense fallback={<DesktopNavFallback />}>
                <DesktopToolNav locale={locale} activeTool={activeTool} />
              </Suspense>
            </CardHeader>
          </Card>
        </header>
        {showPageIntro ? (
          <section className="mb-6">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                {activeTool ? t(currentTool?.nameKey ?? 'app.name') : t('site.tagline')}
              </p>
              <h1 className="mt-2 display text-3xl font-semibold text-foreground md:text-4xl">{title}</h1>
              {description ? <p className="mt-2 text-pretty text-sm leading-6 text-muted-foreground md:text-base">{description}</p> : null}
            </div>
          </section>
        ) : null}
        <main className="surface-grid">{children}</main>
        <footer className="mt-10 border-t border-border/80 pt-5">
          <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>{t('site.footerCopyright', { year: new Date().getFullYear(), appName: t('app.name') })}</p>
            <p>
              {t('site.footerMadeWithPrefix')}{' '}
              <a href="https://www.peeg.org/" target="_blank" rel="noreferrer" className="font-medium text-foreground transition-colors hover:text-primary">
                ricky
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

function MobileHeaderFallback({ brand, homePath }: { brand: string; homePath: string }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm md:hidden">
      <Link to={homePath} className="flex min-w-0 items-center gap-2">
        <BrandMark className="size-8 rounded-xl" />
        <p className="truncate text-base font-semibold text-foreground">{brand}</p>
      </Link>
      <div className="size-10 rounded-xl border border-border bg-[var(--input)]" aria-hidden="true" />
    </div>
  )
}

function BrandMark({ className = 'size-10 rounded-2xl' }: { className?: string }) {
  return <img src="/logo.svg" alt="" className={className} aria-hidden="true" />
}

function DesktopControlsFallback() {
  return (
    <div className="flex items-center justify-end gap-2" aria-hidden="true">
      <div className="size-10 rounded-full border border-border bg-[var(--input)]" />
      <div className="size-10 rounded-full border border-border bg-[var(--input)]" />
      <div className="size-10 rounded-full border border-border bg-[var(--input)]" />
      <div className="size-10 rounded-full border border-border bg-[var(--input)]" />
    </div>
  )
}

function DesktopNavFallback() {
  return (
    <div className="flex gap-2 overflow-hidden pb-1" aria-hidden="true">
      <div className="h-10 w-28 shrink-0 rounded-full border border-border bg-[var(--input)]" />
      <div className="h-10 w-28 shrink-0 rounded-full border border-border bg-[var(--input)]" />
      <div className="h-10 w-32 shrink-0 rounded-full border border-border bg-[var(--input)]" />
      <div className="h-10 w-24 shrink-0 rounded-full border border-border bg-[var(--input)]" />
      <div className="h-10 w-24 shrink-0 rounded-full border border-border bg-[var(--input)]" />
      <div className="h-10 w-24 shrink-0 rounded-full border border-border bg-[var(--input)]" />
    </div>
  )
}
