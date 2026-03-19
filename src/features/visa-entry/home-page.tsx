import '@/lib/i18n/messages/visa-entry'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, ShieldCheck, Search } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useI18n } from '@/lib/i18n'
import { getLocalizedPath } from '@/lib/site'
import { VISA_ENTRY_REGIONS, type VisaEntryDestinationSummary, type VisaEntryRegionFilter } from '@/lib/visa-entry'
import { writeLastTool } from '@/lib/storage'
import type { Locale, PhraseRegion } from '@/lib/types'

const regionLabelKey: Record<PhraseRegion, string> = {
  asia: 'phrases.regionAsia',
  europe: 'phrases.regionEurope',
  americas: 'phrases.regionAmericas',
  africa: 'phrases.regionAfrica',
  'middle-east': 'phrases.regionMiddleEast',
  oceania: 'phrases.regionOceania',
}

export function VisaEntryHomePage({
  locale,
  destinations,
}: {
  locale: Locale
  destinations: VisaEntryDestinationSummary[]
}) {
  const { t } = useI18n()
  const [activeRegion, setActiveRegion] = useState<VisaEntryRegionFilter>('all')
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())

  useEffect(() => {
    writeLastTool('visa-entry')
  }, [])

  const visibleDestinations = useMemo(
    () => destinations.filter((destination) => activeRegion === 'all' || destination.region === activeRegion),
    [activeRegion, destinations],
  )

  const filteredDestinations = useMemo(() => {
    if (!deferredQuery) return visibleDestinations

    return visibleDestinations.filter((destination) => {
      const searchText = [
        destination.country,
        destination.title,
        destination.summary,
        destination.teaser,
        destination.commonEntryPathPreview,
      ].join(' ').toLowerCase()

      return searchText.includes(deferredQuery)
    })
  }, [deferredQuery, visibleDestinations])

  const regionSections = useMemo(() => {
    const regions = activeRegion === 'all'
      ? VISA_ENTRY_REGIONS.filter((region): region is PhraseRegion => region !== 'all')
      : [activeRegion]

    return regions
      .map((region) => ({
        region,
        destinations: filteredDestinations.filter((destination) => destination.region === region),
      }))
      .filter((section) => section.destinations.length > 0)
  }, [activeRegion, filteredDestinations])

  return (
    <AppShell locale={locale} title={t('visaEntry.title')} description={t('visaEntry.description')} activeTool="visa-entry">
      <Card tone="plain">
        <CardHeader className="gap-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="shell-brand-kicker">{t('visaEntry.subtitle')}</p>
              <CardTitle className="text-balance text-2xl md:text-3xl">{t('visaEntry.summary')}</CardTitle>
              <CardDescription className="max-w-3xl text-pretty text-sm leading-6 md:text-base">
                {t('visaEntry.description')}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-muted px-4 py-3 text-sm font-medium text-foreground/80">
              <ShieldCheck className="size-4 text-primary" />
              {t('visaEntry.totalDestinations', { count: destinations.length })}
            </div>
          </div>
          <CardContent className="grid gap-4 p-0">
            <div className="grid gap-3">
              <label className="grid gap-2" data-testid="directory-search-row">
                <span className="text-sm font-medium text-foreground">{t('visaEntry.searchLabel')}</span>
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    aria-label={t('visaEntry.searchLabel')}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t('visaEntry.searchPlaceholder')}
                    className="pl-9"
                  />
                </div>
              </label>
              <div className="flex flex-wrap gap-2" data-testid="directory-filter-row">
                {VISA_ENTRY_REGIONS.map((region) => (
                  <Button
                    key={region}
                    type="button"
                    variant="secondary"
                    className={activeRegion === region ? 'border-primary/35 bg-primary/10 text-foreground' : undefined}
                    onClick={() => setActiveRegion(region)}
                  >
                    {region === 'all' ? t('phrases.regionAll') : t(regionLabelKey[region])}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>

      {!filteredDestinations.length ? (
        <Card tone="plain">
          <CardContent className="grid gap-2 pt-6">
            <CardTitle>{t('visaEntry.searchEmptyTitle')}</CardTitle>
            <CardDescription>{t('visaEntry.searchEmptyDescription')}</CardDescription>
          </CardContent>
        </Card>
      ) : null}

      <div className="space-y-8">
        {regionSections.map((section) => {
          const regionLabel = t(regionLabelKey[section.region])
          return (
            <section key={section.region} className="space-y-4">
              <div className="space-y-2">
                <h2 className="display text-2xl font-semibold text-foreground md:text-3xl">
                  {t('visaEntry.regionSectionTitle', { region: regionLabel })}
                </h2>
                <p className="text-sm leading-6 text-muted-foreground md:text-base">
                  {t('visaEntry.regionSectionDescription', { count: section.destinations.length, region: regionLabel })}
                </p>
              </div>
              <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {section.destinations.map((destination) => (
                  <li key={destination.slug}>
                    <DestinationCard locale={locale} destination={destination} />
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </AppShell>
  )
}

function DestinationCard({
  locale,
  destination,
}: {
  locale: Locale
  destination: VisaEntryDestinationSummary
}) {
  const { t } = useI18n()
  return (
    <article className="rounded-3xl border border-border bg-[color:var(--surface-floating)] p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="display flex items-center gap-3 text-xl font-semibold">
              <span className="text-2xl" aria-hidden="true">{destination.flag}</span>
              {destination.country}
            </h3>
            <Badge variant="outline">{t(regionLabelKey[destination.region])}</Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{destination.summary}</p>
          <p className="text-sm font-medium text-foreground/85">{destination.teaser}</p>
        </div>
        <Button asChild variant="secondary" size="sm" className="shrink-0">
          <Link to={getLocalizedPath(locale, `/visa-entry/${destination.slug}`)}>
            {t('visaEntry.openCountry')}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </article>
  )
}
