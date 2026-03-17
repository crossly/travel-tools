import '@/lib/i18n/messages/phrases'
import { useEffect, useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Languages, Volume2 } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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

  useEffect(() => {
    writeLastTool('travel-phrases')
  }, [])

  const visiblePacks = useMemo(
    () => packs.filter((pack) => activeRegion === 'all' || pack.region === activeRegion),
    [activeRegion, packs],
  )

  const featuredPacks = useMemo(
    () => selectFeaturedPhraseCountrySummaries(visiblePacks),
    [visiblePacks],
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
        packs: visiblePacks.filter((pack) => pack.region === region && !featuredSlugSet.has(pack.slug)),
      }))
      .filter((section) => section.packs.length > 0)
  }, [activeRegion, featuredSlugSet, visiblePacks])

  return (
    <AppShell locale={locale} title={t('phrases.title')} description={t('phrases.description')} activeTool="travel-phrases">
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                {t('phrases.subtitle')}
              </Badge>
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
          <div className="flex flex-wrap gap-2">
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
        </CardHeader>
      </Card>

      {featuredPacks.length ? (
        <section className="space-y-4">
          <div className="space-y-2">
            <Badge variant="outline">{t('phrases.featuredTitle')}</Badge>
            <h2 className="display text-2xl font-semibold text-foreground md:text-3xl">{t('phrases.featuredTitle')}</h2>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
              {t('phrases.featuredDescription')}
            </p>
          </div>
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            {renderLeadPackCard(featuredPacks[0])}
            <div className="space-y-4">
              <div className="rounded-3xl border border-border/70 bg-[color:var(--surface-floating)] p-5">
                <h3 className="display text-xl font-semibold text-foreground">{t('phrases.audioReadyTitle')}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">
                  {t('phrases.audioReadyDescription')}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
                {featuredPacks.slice(1).map((pack) => renderPackCard(pack, true))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="space-y-6">
        <div className="space-y-2">
          <Badge variant="outline">{t('phrases.directoryTitle')}</Badge>
          <h2 className="display text-2xl font-semibold text-foreground md:text-3xl">{t('phrases.directoryTitle')}</h2>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
            {t('phrases.directoryDescription')}
          </p>
        </div>
        <div className="space-y-8">
          {regionSections.map((section) => {
            const regionLabel = t(regionLabelKey[section.region])
            return (
              <section key={section.region} className="space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline">{regionLabel}</Badge>
                  <h3 className="display text-2xl font-semibold text-foreground md:text-3xl">
                    {t('phrases.regionSectionTitle', { region: regionLabel })}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground md:text-base">
                    {t('phrases.regionSectionDescription', { region: regionLabel, count: section.packs.length })}
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {section.packs.map((pack) => renderPackCard(pack, false))}
                </div>
              </section>
            )
          })}
        </div>
      </section>
    </AppShell>
  )

  function renderLeadPackCard(pack: PhraseCountrySummary | undefined) {
    if (!pack) return null

    return (
      <Card key={`lead-${pack.slug}`} className="border-primary/20 bg-[linear-gradient(145deg,var(--surface-floating),color-mix(in_oklab,var(--surface-floating)_82%,var(--accent)_18%))]">
        <CardHeader className="gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">{t(regionLabelKey[pack.region])}</Badge>
              <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                <span className="text-3xl" aria-hidden="true">{pack.flag}</span>
                {pack.country}
              </CardTitle>
              <CardDescription className="max-w-2xl text-pretty text-sm leading-6 md:text-base">{pack.teaser}</CardDescription>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-sm font-medium text-foreground">
              {t('phrases.packCount', { count: pack.phraseCount })}
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(15rem,0.8fr)]">
          <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
            <p className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Volume2 className="size-4 text-primary" />
              {pack.audioCoverage === 'all' ? t('phrases.aiAudioNotice') : t('phrases.audioPartialNotice')}
            </p>
            {pack.highlights.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {pack.highlights.map((highlight) => (
                  <Badge key={highlight} variant="outline">{highlight}</Badge>
                ))}
              </div>
            ) : null}
          </div>
          <Button asChild variant="secondary" size="lg" className="h-full min-h-14 w-full justify-between">
            <Link to={getLocalizedPath(locale, `/travel-phrases/${pack.slug}`)}>
              {pack.title}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  function renderPackCard(pack: PhraseCountrySummary, emphasizeTeaser: boolean) {
    return (
      <Card key={`${emphasizeTeaser ? 'featured' : 'region'}-${pack.slug}`}>
        <CardHeader className="gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-3 text-xl">
                <span className="text-2xl" aria-hidden="true">{pack.flag}</span>
                {pack.country}
              </CardTitle>
              <CardDescription>{emphasizeTeaser ? pack.teaser : pack.description}</CardDescription>
            </div>
            <Badge variant="outline">{t(regionLabelKey[pack.region])}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-border bg-[color:var(--surface-floating)] p-4">
            <p className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Languages className="size-4 text-primary" />
              {pack.languageName}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{t('phrases.packCount', { count: pack.phraseCount })}</p>
            {pack.highlights.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {pack.highlights.map((highlight) => (
                  <Badge key={highlight} variant="outline">{highlight}</Badge>
                ))}
              </div>
            ) : null}
            {pack.audioCoverage !== 'all' ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {pack.audioCoverage === 'partial'
                  ? t('phrases.audioPartialShort')
                  : t('phrases.audioComingSoonShort')}
              </p>
            ) : null}
          </div>
          <Button asChild variant="secondary" size="lg" className="w-full justify-between">
            <Link to={getLocalizedPath(locale, `/travel-phrases/${pack.slug}`)}>
              {pack.title}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }
}
