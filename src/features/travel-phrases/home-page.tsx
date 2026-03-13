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
import { PHRASE_REGIONS } from '@/lib/travel-phrases'
import { writeLastTool } from '@/lib/storage'
import type { Locale } from '@/lib/types'

const regionLabelKey: Record<typeof PHRASE_REGIONS[number], string> = {
  all: 'phrases.regionAll',
  asia: 'phrases.regionAsia',
  europe: 'phrases.regionEurope',
  americas: 'phrases.regionAmericas',
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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visiblePacks.map((pack) => (
          <Card key={pack.slug}>
            <CardHeader className="gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <span className="text-2xl" aria-hidden="true">{pack.flag}</span>
                    {pack.country}
                  </CardTitle>
                  <CardDescription>{pack.description}</CardDescription>
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
                {!pack.hasAudio ? (
                  <p className="mt-2 text-sm text-muted-foreground">{t('phrases.audioComingSoonShort')}</p>
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
        ))}
      </div>
    </AppShell>
  )
}
