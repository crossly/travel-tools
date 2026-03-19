import '@/lib/i18n/messages/tipping'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Search } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useI18n } from '@/lib/i18n'
import { getLocalizedPath } from '@/lib/site'
import { TIPPING_REGIONS, type TippingCountrySummary } from '@/lib/tipping'
import { writeLastTool } from '@/lib/storage'
import type { Locale, PhraseRegion } from '@/lib/types'

const regionLabelKey: Record<typeof TIPPING_REGIONS[number], string> = {
  all: 'tipping.regionAll',
  asia: 'tipping.regionAsia',
  europe: 'tipping.regionEurope',
  americas: 'tipping.regionAmericas',
  africa: 'tipping.regionAfrica',
  'middle-east': 'tipping.regionMiddleEast',
  oceania: 'tipping.regionOceania',
}

export function TippingHomePage({
  locale,
  countries,
}: {
  locale: Locale
  countries: TippingCountrySummary[]
}) {
  const { t } = useI18n()
  const [activeRegion, setActiveRegion] = useState<typeof TIPPING_REGIONS[number]>('all')
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())

  useEffect(() => {
    writeLastTool('tipping')
  }, [])

  const visibleCountries = useMemo(
    () => countries.filter((country) => activeRegion === 'all' || country.region === activeRegion),
    [activeRegion, countries],
  )

  const filteredCountries = useMemo(() => {
    if (!deferredQuery) return visibleCountries

    return visibleCountries.filter((country) => {
      const searchable = [country.country, country.title, country.description, country.headlineRule].join(' ').toLowerCase()
      return searchable.includes(deferredQuery)
    })
  }, [deferredQuery, visibleCountries])

  const regionSections = useMemo(() => {
    const regions = activeRegion === 'all' ? TIPPING_REGIONS.filter((region): region is PhraseRegion => region !== 'all') : [activeRegion]

    return regions
      .map((region) => ({
        region,
        countries: filteredCountries.filter((country) => country.region === region),
      }))
      .filter((section) => section.countries.length > 0)
  }, [activeRegion, filteredCountries])

  return (
    <AppShell locale={locale} title={t('tipping.title')} description={t('tipping.description')} activeTool="tipping">
      <Card tone="plain">
        <CardHeader className="gap-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="shell-brand-kicker">{t('tipping.subtitle')}</p>
              <CardTitle className="text-balance text-2xl md:text-3xl">{t('tipping.summary')}</CardTitle>
              <CardDescription className="max-w-3xl text-pretty text-sm leading-6 md:text-base">
                {t('tipping.description')}
              </CardDescription>
            </div>
            <div className="rounded-2xl border border-border bg-muted px-4 py-3 text-sm font-medium text-foreground/80">
              {t('tipping.countryCount', { count: countries.length })}
            </div>
          </div>
          <CardContent className="grid gap-4 p-0">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">{t('tipping.searchLabel')}</span>
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    aria-label={t('tipping.searchLabel')}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t('tipping.searchPlaceholder')}
                    className="pl-9"
                  />
                </div>
              </label>
              <div className="flex flex-wrap gap-2">
                {TIPPING_REGIONS.map((region) => (
                  <Button
                    key={region}
                    type="button"
                    variant="secondary"
                    className={activeRegion === region ? 'border-primary/35 bg-primary/10 text-foreground' : undefined}
                    onClick={() => setActiveRegion(region)}
                  >
                    {t(regionLabelKey[region])}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>

      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="display text-2xl font-semibold text-foreground md:text-3xl">{t('tipping.directoryTitle')}</h2>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
            {t('tipping.directoryDescription')}
          </p>
        </div>

        {!regionSections.length ? (
          <Card tone="plain">
            <CardContent className="grid gap-2 pt-6">
              <CardTitle>{t('tipping.emptyTitle')}</CardTitle>
              <CardDescription>{t('tipping.emptyDescription')}</CardDescription>
            </CardContent>
          </Card>
        ) : null}

        <div className="space-y-8">
          {regionSections.map((section) => {
            const regionLabel = t(regionLabelKey[section.region])
            return (
              <section key={section.region} className="space-y-4">
                <div className="space-y-2">
                  <h3 className="display text-xl font-semibold text-foreground md:text-2xl">
                    {regionLabel}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground md:text-base">
                    {t('tipping.countryMetric', { country: regionLabel, region: section.countries.length })}
                  </p>
                </div>
                <ul className="grid gap-3 md:grid-cols-2">
                  {section.countries.map((country) => (
                    <li key={country.slug}>
                      <article className="rounded-3xl border border-border bg-card p-4 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="display flex items-center gap-3 text-xl font-semibold">
                                <span className="text-2xl" aria-hidden="true">{country.flag}</span>
                                {country.country}
                              </h4>
                              <Badge variant="outline">{t(regionLabelKey[country.region])}</Badge>
                              <Badge variant="outline">{t('tipping.sourceCountLabel', { count: country.sourceCount })}</Badge>
                            </div>
                            <p className="text-sm leading-6 text-muted-foreground">{country.headlineRule}</p>
                            <p className="text-xs text-muted-foreground">{t('tipping.reviewedLabel', { date: country.lastReviewed })}</p>
                          </div>
                          <Button asChild variant="secondary" size="lg" className="shrink-0">
                            <Link to={getLocalizedPath(locale, `/tipping/${country.slug}`)}>
                              {t('tipping.cardOpen')}
                              <ArrowRight className="size-4" />
                            </Link>
                          </Button>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </section>
    </AppShell>
  )
}
