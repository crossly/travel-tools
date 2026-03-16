import { useEffect, useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Download, Smartphone } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getLocalizedPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import { PHRASE_REGIONS } from '@/lib/travel-phrases'
import { writeLastTool } from '@/lib/storage'
import { cn } from '@/lib/utils'
import type { LocalAppCountrySummary, Locale, PhraseRegion } from '@/lib/types'

const regionLabelKey: Record<typeof PHRASE_REGIONS[number], string> = {
  all: 'phrases.regionAll',
  asia: 'phrases.regionAsia',
  europe: 'phrases.regionEurope',
  americas: 'phrases.regionAmericas',
  africa: 'phrases.regionAfrica',
  'middle-east': 'phrases.regionMiddleEast',
  oceania: 'phrases.regionOceania',
}

const categoryLabelKey = {
  'ride-hailing': 'localApps.category.rideHailing',
  maps: 'localApps.category.maps',
  payments: 'localApps.category.payments',
  shopping: 'localApps.category.shopping',
  'food-discovery': 'localApps.category.foodDiscovery',
  'food-delivery': 'localApps.category.foodDelivery',
  stays: 'localApps.category.stays',
} as const

export function LocalAppsHomePage({
  locale,
  countries,
  readyCount,
  trackedCount,
}: {
  locale: Locale
  countries: LocalAppCountrySummary[]
  readyCount: number
  trackedCount: number
}) {
  const { t } = useI18n()
  const [activeRegion, setActiveRegion] = useState<typeof PHRASE_REGIONS[number]>('all')

  useEffect(() => {
    writeLastTool('local-apps')
  }, [])

  const visibleCountries = useMemo(
    () => countries.filter((country) => activeRegion === 'all' || country.region === activeRegion),
    [activeRegion, countries],
  )

  const readyCountries = useMemo(
    () => visibleCountries.filter((country) => country.ready),
    [visibleCountries],
  )

  const pendingCountries = useMemo(
    () => visibleCountries.filter((country) => !country.ready),
    [visibleCountries],
  )

  const regionSections = useMemo(() => {
    const regions = activeRegion === 'all' ? PHRASE_REGIONS.filter((region): region is PhraseRegion => region !== 'all') : [activeRegion]

    return regions
      .map((region) => ({
        region,
        countries: pendingCountries.filter((country) => country.region === region),
      }))
      .filter((section) => section.countries.length > 0)
  }, [activeRegion, pendingCountries])

  return (
    <AppShell locale={locale} title={t('localApps.title')} description={t('localApps.description')} activeTool="local-apps">
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
              <Badge variant="outline">{t('localApps.summaryBadge')}</Badge>
              <CardTitle className="text-balance text-2xl md:text-3xl">{t('localApps.summaryTitle')}</CardTitle>
              <CardDescription className="max-w-3xl text-pretty text-sm leading-6 md:text-base">
                {t('localApps.summaryDescription')}
              </CardDescription>
            </div>
            <div className="rounded-2xl border border-border bg-muted px-4 py-3">
              <p className="mono text-base font-medium tabular-nums text-foreground">
                {t('localApps.totalMetric', { ready: readyCount, tracked: trackedCount })}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {PHRASE_REGIONS.map((region) => (
              <Button
                key={region}
                type="button"
                variant="secondary"
                className={cn(activeRegion === region && 'border-primary/35 bg-primary/10 text-foreground')}
                onClick={() => setActiveRegion(region)}
              >
                {t(regionLabelKey[region])}
              </Button>
            ))}
          </div>
        </CardHeader>
      </Card>

      <section className="space-y-4">
        <div className="space-y-2">
          <Badge variant="outline">{t('localApps.readyBadge')}</Badge>
          <h2 className="display text-balance text-2xl font-semibold text-foreground md:text-3xl">{t('localApps.readyTitle')}</h2>
          <p className="max-w-3xl text-pretty text-sm leading-6 text-muted-foreground md:text-base">
            {t('localApps.readyDescription')}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {readyCountries.map((country) => (
            <Card key={country.slug}>
              <CardHeader className="gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <span className="text-2xl" aria-hidden="true">{country.flag}</span>
                      {country.country}
                    </CardTitle>
                    <CardDescription className="text-pretty">{country.description}</CardDescription>
                  </div>
                  <Badge variant="outline">{t(regionLabelKey[country.region])}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-border bg-[color:var(--surface-floating)] p-4">
                  <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Download className="size-4 text-primary" />
                    {t('localApps.cardMetric', { categories: country.categoryCount, apps: country.appCount })}
                  </p>
                  {country.categoryIds.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {country.categoryIds.map((categoryId) => (
                        <Badge key={`${country.slug}-${categoryId}`} variant="outline">
                          {t(categoryLabelKey[categoryId])}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                  {country.highlights.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {country.highlights.map((highlight) => (
                        <Badge key={highlight} variant="outline">{highlight}</Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
                <Button asChild variant="secondary" size="lg" className="w-full justify-between">
                  <Link to={getLocalizedPath(locale, `/local-apps/${country.slug}`)}>
                    {country.title}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="space-y-8">
        {regionSections.map((section) => {
          const regionLabel = t(regionLabelKey[section.region])
          return (
            <section key={section.region} className="space-y-4">
              <div className="space-y-2">
                <Badge variant="outline">{regionLabel}</Badge>
                <h2 className="display text-balance text-2xl font-semibold text-foreground md:text-3xl">
                  {t('localApps.pendingSectionTitle', { region: regionLabel })}
                </h2>
                <p className="max-w-3xl text-pretty text-sm leading-6 text-muted-foreground md:text-base">
                  {t('localApps.pendingSectionDescription', { count: section.countries.length })}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {section.countries.map((country) => (
                  <Card key={country.slug}>
                    <CardHeader className="gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <CardTitle className="flex items-center gap-3 text-xl">
                            <span className="text-2xl" aria-hidden="true">{country.flag}</span>
                            {country.country}
                          </CardTitle>
                          <CardDescription className="text-pretty">{country.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{t('localApps.pendingBadge')}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-2xl border border-dashed border-border bg-muted/70 p-4">
                        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <Smartphone className="size-4 text-primary" />
                          {t('localApps.pendingCardLabel')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </AppShell>
  )
}
