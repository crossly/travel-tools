import '@/lib/i18n/messages/tipping'
import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { AppShell } from '@/components/app/app-shell'
import { PageState } from '@/components/app/page-state'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getLocalizedPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import { writeLastTool } from '@/lib/storage'
import { TIPPING_CATEGORY_IDS, type TippingCountryPack } from '@/lib/tipping'
import type { Locale } from '@/lib/types'

const categoryLabelKey: Record<typeof TIPPING_CATEGORY_IDS[number], string> = {
  restaurant: 'tipping.restaurantLabel',
  cafe: 'tipping.cafeLabel',
  bar: 'tipping.barLabel',
  taxi: 'tipping.taxiLabel',
  hotel: 'tipping.hotelLabel',
  guide: 'tipping.guideLabel',
  porter: 'tipping.porterLabel',
  delivery: 'tipping.deliveryLabel',
}

export function TippingCountryPage({
  locale,
  pack,
}: {
  locale: Locale
  pack: TippingCountryPack | null
}) {
  const { t } = useI18n()

  useEffect(() => {
    writeLastTool('tipping')
  }, [])

  if (!pack) {
    return (
      <AppShell locale={locale} title={t('tipping.title')} description={t('tipping.description')} activeTool="tipping">
        <PageState
          tone="danger"
          title={t('tipping.notFoundTitle')}
          description={t('tipping.notFoundDescription')}
          action={(
            <Button asChild>
              <Link to={getLocalizedPath(locale, '/tipping')}>{t('tipping.backToHome')}</Link>
            </Button>
          )}
        />
      </AppShell>
    )
  }

  return (
    <AppShell locale={locale} title={pack.title} description={pack.description} activeTool="tipping">
      <Card tone="plain">
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                {t('tipping.countryMetric', { country: pack.country, region: pack.region })}
              </Badge>
              <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                <span className="text-3xl" aria-hidden="true">{pack.flag}</span>
                {pack.country}
              </CardTitle>
              <CardDescription className="max-w-3xl text-pretty text-sm leading-6 md:text-base">
                {pack.description}
              </CardDescription>
            </div>
            <div className="rounded-2xl border border-border bg-[color:var(--surface-floating)] px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{t('tipping.headlineLabel')}</p>
              <p className="mt-2 text-sm leading-6 text-foreground">{pack.headlineRule}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                {t('tipping.reviewedLabel', { date: pack.lastReviewed })}
                {' · '}
                {t('tipping.sourceCountLabel', { count: pack.sourceCount })}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="display text-2xl font-semibold text-foreground md:text-3xl">{t('tipping.directoryTitle')}</h2>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">{t('tipping.directoryDescription')}</p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {TIPPING_CATEGORY_IDS.map((category) => (
            <Card key={category}>
              <CardHeader className="gap-2">
                <CardTitle className="text-lg">{t(categoryLabelKey[category])}</CardTitle>
                <CardDescription>{pack.rules[category]}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Card tone="soft">
          <CardHeader className="gap-3">
            <CardTitle>{t('tipping.notesLabel')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            {pack.notes.map((note) => (
              <p key={note} className="rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-sm leading-6 text-muted-foreground">
                {note}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card tone="soft">
          <CardHeader className="gap-3">
            <CardTitle>{t('tipping.sourcesLabel')}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 pt-0">
            {pack.sources.map((source) => (
              <Button key={source.href} asChild variant="secondary" className="w-full justify-between">
                <a href={source.href} target="_blank" rel="noreferrer">
                  <span>{source.label}</span>
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>
      </section>
    </AppShell>
  )
}
