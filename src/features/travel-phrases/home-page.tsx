import '@/lib/i18n/messages/phrases'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Languages, Search, Volume2 } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { PhraseCountrySummary, PhraseRegion } from '@/lib/types'
import { getLocalizedPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import { PHRASE_REGIONS, selectFeaturedPhraseCountrySummaries } from '@/lib/travel-phrases'
import { writeLastTool } from '@/lib/storage'
import type { Locale } from '@/lib/types'

const regionLabelKey: Record<typeof PHRASE_REGIONS[number], string> = {
  all: 'phrases.regionAll',
  asia: 'phrases.regionAsia',
  europe: 'phrases.regionEurope',
  americas: 'phrases.regionAmericas',
  africa: 'phrases.regionAfrica',
  'middle-east': 'phrases.regionMiddleEast',
  oceania: 'phrases.regionOceania',
}

export function TravelPhrasesHomePage({
  locale,
  packs,
}: {
  locale: Locale
  packs: PhraseCountrySummary[]
}) {
  const { t } = useI18n()
  const [activeRegion, setActiveRegion] = useState<typeof PHRASE_REGIONS[number]>('all')
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())

  useEffect(() => {
    writeLastTool('travel-phrases')
  }, [])

  const visiblePacks = useMemo(
    () => packs.filter((pack) => activeRegion === 'all' || pack.region === activeRegion),
    [activeRegion, packs],
  )

  const filteredPacks = useMemo(() => {
    if (!deferredQuery) return visiblePacks
    return visiblePacks.filter((pack) => {
      const searchText = [
        pack.country,
        pack.languageName,
        pack.title,
        pack.description,
        pack.teaser,
      ].join(' ').toLowerCase()
      return searchText.includes(deferredQuery)
    })
  }, [deferredQuery, visiblePacks])

  const featuredPacks = useMemo(
    () => selectFeaturedPhraseCountrySummaries(filteredPacks),
    [filteredPacks],
  )

  const featuredSlugSet = useMemo(
    () => new Set(featuredPacks.map((pack) => pack.slug)),
    [featuredPacks],
  )

  const regionSections = useMemo(() => {
    const regions = activeRegion === 'all' ? PHRASE_REGIONS.filter((region): region is PhraseRegion => region !== 'all') : [activeRegion]

    return regions
      .map((region) => ({
        region,
        packs: filteredPacks.filter((pack) => pack.region === region && !featuredSlugSet.has(pack.slug)),
      }))
      .filter((section) => section.packs.length > 0)
  }, [activeRegion, featuredSlugSet, filteredPacks])

  return (
    <AppShell locale={locale} title={t('phrases.title')} description={t('phrases.description')} activeTool="travel-phrases">
      <Card tone="plain">
        <CardHeader className="gap-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="shell-brand-kicker">{t('phrases.subtitle')}</p>
              <CardTitle className="text-balance text-2xl md:text-3xl">{t('phrases.summary')}</CardTitle>
              <CardDescription className="max-w-3xl text-pretty text-sm leading-6 md:text-base">
                {t('phrases.aiAudioNotice')}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-muted px-4 py-3 text-sm font-medium text-foreground/80">
              <Volume2 className="size-4 text-primary" />
              {t('phrases.totalPacks', { count: packs.length })}
            </div>
          </div>
          <CardContent className="grid gap-4 p-0">
            <div className="grid gap-3">
              <label className="grid gap-2" data-testid="directory-search-row">
                <span className="text-sm font-medium text-foreground">{t('phrases.searchLabel')}</span>
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    aria-label={t('phrases.searchLabel')}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t('phrases.searchPlaceholder')}
                    className="pl-9"
                  />
                </div>
              </label>
              <div className="flex flex-wrap gap-2" data-testid="directory-filter-row">
                {PHRASE_REGIONS.map((region) => (
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

      {featuredPacks.length ? (
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="display text-2xl font-semibold text-foreground md:text-3xl">{t('phrases.featuredTitle')}</h2>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
              {t('phrases.featuredDescription')}
            </p>
          </div>
          <ul className="grid gap-3 md:grid-cols-2">
            {featuredPacks.map((pack) => (
              <li key={`featured-${pack.slug}`}>{renderPackRow(pack, true)}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {!featuredPacks.length && !regionSections.length ? (
        <Card tone="plain">
          <CardContent className="grid gap-2 pt-6">
            <CardTitle>{t('phrases.searchEmptyTitle')}</CardTitle>
            <CardDescription>{t('phrases.searchEmptyDescription')}</CardDescription>
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
                  {t('phrases.regionSectionTitle', { region: regionLabel })}
                </h2>
                <p className="text-sm leading-6 text-muted-foreground md:text-base">
                  {t('phrases.regionSectionDescription', { region: regionLabel, count: section.packs.length })}
                </p>
              </div>
              <ul className="grid gap-2" data-testid="phrases-region-directory">
                {section.packs.map((pack) => (
                  <li key={`directory-${pack.slug}`} data-testid="phrases-region-row">{renderPackRow(pack)}</li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </AppShell>
  )

  function renderPackRow(pack: PhraseCountrySummary, emphasizeTeaser = false) {
    return (
      <article className="phrases-directory-row">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="display flex items-center gap-3 text-xl font-semibold">
              <span className="text-2xl" aria-hidden="true">{pack.flag}</span>
              {pack.country}
            </h3>
            <Badge variant="outline">{pack.languageName}</Badge>
            <Badge variant="outline">{t('phrases.packCount', { count: pack.phraseCount })}</Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{emphasizeTeaser ? pack.teaser : pack.description}</p>
          <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/80">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1">
              <Languages className="size-4 text-primary" />
              {t(regionLabelKey[pack.region])}
            </span>
            {pack.audioCoverage !== 'all' ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-muted-foreground">
                <Volume2 className="size-4 text-primary" />
                {pack.audioCoverage === 'partial' ? t('phrases.audioPartialShort') : t('phrases.audioComingSoonShort')}
              </span>
            ) : null}
          </div>
        </div>
        <Button asChild variant="secondary" size="lg" className="w-full justify-between sm:w-auto">
          <Link to={getLocalizedPath(locale, `/travel-phrases/${pack.slug}`)}>
            {pack.title}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </article>
    )
  }
}
