import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Download, ExternalLink } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/lib/i18n'
import { getLocalizedPath } from '@/lib/site'
import { cn } from '@/lib/utils'
import type { LocalAppCountrySummary, LocalAppGuide, Locale } from '@/lib/types'

const categoryLabelKey = {
  'ride-hailing': 'localApps.category.rideHailing',
  maps: 'localApps.category.maps',
  payments: 'localApps.category.payments',
  shopping: 'localApps.category.shopping',
  'food-discovery': 'localApps.category.foodDiscovery',
  'food-delivery': 'localApps.category.foodDelivery',
  stays: 'localApps.category.stays',
} as const

const platformLabelKey = {
  official: 'localApps.linkOfficial',
  ios: 'localApps.linkIos',
  android: 'localApps.linkAndroid',
} as const

export function LocalAppsCountryPage({
  locale,
  guide,
  summary,
}: {
  locale: Locale
  guide: LocalAppGuide | null
  summary: LocalAppCountrySummary | null
}) {
  const { t } = useI18n()
  const categoryJumpRef = useRef<HTMLDivElement | null>(null)
  const [isCategoryJumpCompact, setIsCategoryJumpCompact] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    let frameId = 0

    const updateCompactState = () => {
      frameId = 0
      const categoryJump = categoryJumpRef.current
      if (!categoryJump) {
        return
      }

      const stickyOffset = window.innerWidth >= 768 ? 16 : 8
      const shouldCompact = categoryJump.getBoundingClientRect().top <= stickyOffset + 1

      setIsCategoryJumpCompact((current) => (current === shouldCompact ? current : shouldCompact))
    }

    const requestUpdate = () => {
      if (frameId) {
        return
      }
      frameId = window.requestAnimationFrame(updateCompactState)
    }

    updateCompactState()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  if (!summary) {
    return (
      <AppShell locale={locale} title={t('localApps.notFoundTitle')} description={t('localApps.notFoundDescription')} activeTool="local-apps">
        <Card>
          <CardHeader>
            <CardTitle className="text-balance text-2xl">{t('localApps.notFoundTitle')}</CardTitle>
            <CardDescription className="text-pretty">{t('localApps.notFoundDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" size="lg">
              <Link to={getLocalizedPath(locale, '/local-apps')}>{t('localApps.backToHome')}</Link>
            </Button>
          </CardContent>
        </Card>
      </AppShell>
    )
  }

  if (!guide) {
    return (
      <AppShell locale={locale} title={summary.title} description={summary.description} activeTool="local-apps">
        <Card>
          <CardHeader className="gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">{summary.flag}</span>
              <div className="space-y-1">
                <Badge variant="outline">{t('localApps.pendingBadge')}</Badge>
                <CardTitle className="text-balance text-2xl">{summary.country}</CardTitle>
              </div>
            </div>
            <CardDescription className="max-w-3xl text-pretty text-sm leading-6 md:text-base">
              {t('localApps.pendingPageDescription', { country: summary.country })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" size="lg">
              <Link to={getLocalizedPath(locale, '/local-apps')}>{t('localApps.backToHome')}</Link>
            </Button>
          </CardContent>
        </Card>
      </AppShell>
    )
  }

  const categorySections = useMemo(
    () => guide.categories.map((category) => ({
      ...category,
      label: t(categoryLabelKey[category.id]),
    })),
    [guide.categories, t],
  )

  return (
    <AppShell locale={locale} title={guide.title} description={guide.description} activeTool="local-apps" showPageIntro={false}>
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
              <Badge variant="outline">{guide.flag} {guide.country}</Badge>
              <h1 className="display text-balance text-2xl font-semibold text-foreground md:text-3xl">{guide.country}</h1>
            </div>
            <div className="rounded-2xl border border-border bg-muted px-4 py-3">
              <p className="mono text-base font-medium tabular-nums text-foreground">
                {t('localApps.cardMetric', { categories: guide.categoryCount, apps: guide.appCount })}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {guide.highlights.map((highlight) => (
              <Badge key={highlight} variant="outline">{highlight}</Badge>
            ))}
          </div>
        </CardHeader>
      </Card>

      <div
        ref={categoryJumpRef}
        className={cn(
          'sticky z-20 w-full min-w-0 max-w-full',
          isCategoryJumpCompact ? 'top-2 md:top-4' : 'top-2 md:top-4',
        )}
      >
        <Card
          className={cn(
            'w-full max-w-full overflow-hidden transition-all duration-200',
            isCategoryJumpCompact && 'border-border/80 bg-card/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-card/80',
          )}
        >
          <CardHeader className={cn('min-w-0 transition-all duration-200', isCategoryJumpCompact ? 'gap-2 px-3 py-3 md:px-4' : 'gap-3')}>
            <div
              className={cn(
                'space-y-1 overflow-hidden transition-all duration-200',
                isCategoryJumpCompact ? 'max-h-0 -translate-y-2 opacity-0 pointer-events-none' : 'max-h-24 opacity-100',
              )}
              aria-hidden={isCategoryJumpCompact}
            >
              <CardTitle>{t('localApps.categoryJumpTitle')}</CardTitle>
              <CardDescription>{t('localApps.categoryJumpDescription')}</CardDescription>
            </div>
            <nav
              aria-label={t('localApps.categoryJumpStickyLabel')}
              className={cn(
                'flex w-full min-w-0 max-w-full gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                isCategoryJumpCompact ? 'flex-nowrap' : 'flex-nowrap md:flex-wrap md:overflow-visible md:pb-0',
              )}
            >
              {categorySections.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}-apps`}
                  className={cn(
                    'inline-flex h-10 shrink-0 whitespace-nowrap items-center justify-center rounded-xl border border-border bg-[color:var(--surface-floating)] px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted',
                    isCategoryJumpCompact && 'h-9 rounded-full px-3 text-xs md:text-sm',
                  )}
                >
                  {category.label}
                </a>
              ))}
            </nav>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
        <div className="space-y-4">
          {categorySections.map((category) => (
            <Card key={category.id} id={`${category.id}-apps`} className="scroll-mt-40 md:scroll-mt-32">
              <CardHeader className="gap-2">
                <CardTitle className="text-balance text-2xl">{category.label}</CardTitle>
                <CardDescription className="text-pretty">{category.summary}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {category.apps.map((app) => (
                  <div key={app.id} className="rounded-2xl border border-border bg-[color:var(--surface-floating)] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-base font-semibold text-foreground">{app.name}</p>
                        <p className="text-sm text-muted-foreground">{app.summary}</p>
                      </div>
                      <Badge variant={app.recommended ? 'default' : 'outline'}>
                        {app.recommended ? t('localApps.primaryApp') : t('localApps.backupApp')}
                      </Badge>
                    </div>
                    <p className="mt-3 text-pretty text-sm leading-6 text-muted-foreground">{app.reason}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {app.links.map((link) => (
                        <Button key={`${app.id}-${link.platform}`} asChild variant="secondary" size="sm">
                          <a href={link.url} target="_blank" rel="noreferrer">
                            {t(platformLabelKey[link.platform])}
                            <ExternalLink className="size-4" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="gap-2">
              <CardTitle className="text-balance text-xl">{t('localApps.cautionTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {guide.cautions.map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-[color:var(--surface-floating)] p-4">
                  <p className="text-pretty text-sm leading-6 text-muted-foreground">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="gap-2">
              <CardTitle className="text-balance text-xl">{t('localApps.downloadTitle')}</CardTitle>
              <CardDescription className="text-pretty">{t('localApps.downloadDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border border-border bg-[color:var(--surface-floating)] p-4">
                <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Download className="size-4 text-primary" />
                  {t('localApps.downloadHint')}
                </p>
              </div>
            </CardContent>
          </Card>

          {guide.relatedCountries.length ? (
            <Card>
              <CardHeader className="gap-2">
                <CardTitle className="text-balance text-xl">{t('localApps.relatedTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {guide.relatedCountries.map((country) => (
                  <div key={country.slug} className="rounded-2xl border border-border bg-[color:var(--surface-floating)] p-4">
                    <p className="text-sm font-semibold text-foreground">{country.flag} {country.country}</p>
                    <p className="mt-2 text-pretty text-sm leading-6 text-muted-foreground">{country.description}</p>
                    <Button asChild variant="secondary" size="sm" className="mt-3">
                      <Link to={getLocalizedPath(locale, `/local-apps/${country.slug}`)}>
                        {country.title}
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </AppShell>
  )
}
