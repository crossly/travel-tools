import { Link } from '@tanstack/react-router'
import { ArrowRight, Languages, ReceiptText, WalletCards } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getLocalizedPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import type { Locale } from '@/lib/types'

export function HomePage({ locale }: { locale: Locale }) {
  const { t } = useI18n()

  return (
    <AppShell locale={locale} title={t('site.homeTitle')} description={t('site.homeDescription')} showPageIntro={false}>
      <Card className="hero-card overflow-hidden">
        <CardHeader className="hero-grid gap-8">
          <div className="hero-copy space-y-5">
            <Badge variant="outline" className="w-fit">
              {t('site.tagline')}
            </Badge>
            <p className="hero-eyebrow text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {t('site.heroEyebrow')}
            </p>
            <CardTitle className="max-w-3xl text-4xl leading-tight sm:text-5xl">{t('site.heroTitle')}</CardTitle>
            <CardDescription className="max-w-2xl text-base leading-7 sm:text-lg">
              {t('site.heroDescription')}
            </CardDescription>
            <p className="hero-highlight-line text-sm font-medium text-foreground/80">
              {t('site.heroHighlights')}
            </p>
          </div>
          <HeroArtwork
            rateLabel={t('site.heroLabelRate')}
            splitLabel={t('site.heroLabelSplit')}
            settleLabel={t('site.heroLabelSettle')}
            rateMetric={t('site.heroMetricRate')}
            splitMetric={t('site.heroMetricSplit')}
            settleMetric={t('site.heroMetricSettle')}
          />
        </CardHeader>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <WalletCards className="h-6 w-6 text-primary" />
              <Badge variant="outline">FX</Badge>
            </div>
            <CardTitle>{t('tool.currency.name')}</CardTitle>
            <CardDescription>{t('site.currencyPreview')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border bg-muted p-4">
              <p className="mono text-2xl font-medium">{t('site.currencyMetric')}</p>
            </div>
            <Button asChild variant="secondary" size="lg" className="w-full justify-between">
              <Link to={getLocalizedPath(locale, '/currency')}>
                {t('tool.currency.name')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Languages className="h-6 w-6 text-primary" />
              <Badge variant="outline">{t('phrases.audioBadge')}</Badge>
            </div>
            <CardTitle>{t('tool.travelPhrases.name')}</CardTitle>
            <CardDescription>{t('site.phrasesPreview')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border bg-muted p-4">
              <p className="mono text-2xl font-medium">{t('site.phrasesMetric')}</p>
            </div>
            <Button asChild variant="secondary" size="lg" className="w-full justify-between">
              <Link to={getLocalizedPath(locale, '/travel-phrases')}>
                {t('tool.travelPhrases.name')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <ReceiptText className="h-6 w-6 text-primary" />
              <Badge variant="outline">Trip</Badge>
            </div>
            <CardTitle>{t('tool.splitBill.name')}</CardTitle>
            <CardDescription>{t('site.splitPreview')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border bg-muted p-4">
              <p className="mono text-2xl font-medium">{t('site.splitMetric')}</p>
            </div>
            <Button asChild variant="secondary" size="lg" className="w-full justify-between">
              <Link to={getLocalizedPath(locale, '/bill-splitter')}>
                {t('tool.splitBill.name')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}

function HeroArtwork({
  rateLabel,
  splitLabel,
  settleLabel,
  rateMetric,
  splitMetric,
  settleMetric,
}: {
  rateLabel: string
  splitLabel: string
  settleLabel: string
  rateMetric: string
  splitMetric: string
  settleMetric: string
}) {
  return (
    <div className="hero-art-wrap" aria-hidden="true">
      <svg viewBox="0 0 520 360" className="hero-art-svg">
        <defs>
          <linearGradient id="heroRouteGlow" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="var(--hero-route-glow-start)" />
            <stop offset="100%" stopColor="var(--hero-route-glow-end)" />
          </linearGradient>
          <linearGradient id="heroSurface" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="var(--hero-surface-start)" />
            <stop offset="100%" stopColor="var(--hero-surface-end)" />
          </linearGradient>
        </defs>

        <circle className="hero-orb hero-orb-one" cx="110" cy="92" r="56" />
        <circle className="hero-orb hero-orb-two" cx="382" cy="268" r="72" />

        <path
          className="hero-route-dash"
          d="M80 238C126 204 148 132 214 128C278 124 286 204 342 208C392 212 418 170 452 118"
        />
        <path
          className="hero-route-solid"
          d="M80 238C126 204 148 132 214 128C278 124 286 204 342 208C392 212 418 170 452 118"
        />

        <g className="hero-cardlet hero-cardlet-top">
          <rect x="66" y="58" width="160" height="88" rx="28" fill="url(#heroSurface)" />
          <text x="92" y="92" className="hero-cardlet-label">{rateLabel}</text>
          <text x="92" y="126" className="hero-cardlet-value">{rateMetric}</text>
        </g>

        <g className="hero-cardlet hero-cardlet-mid">
          <rect x="188" y="196" width="148" height="84" rx="28" fill="url(#heroSurface)" />
          <text x="214" y="228" className="hero-cardlet-label">{splitLabel}</text>
          <text x="214" y="260" className="hero-cardlet-value">{splitMetric}</text>
        </g>

        <g className="hero-cardlet hero-cardlet-side">
          <rect x="344" y="86" width="124" height="74" rx="24" fill="url(#heroSurface)" />
          <text x="368" y="116" className="hero-cardlet-label">{settleLabel}</text>
          <text x="368" y="144" className="hero-cardlet-value">{settleMetric}</text>
        </g>

        <circle className="hero-node" cx="80" cy="238" r="8" />
        <circle className="hero-node" cx="214" cy="128" r="9" />
        <circle className="hero-node" cx="342" cy="208" r="8" />
        <circle className="hero-node" cx="452" cy="118" r="9" />
      </svg>
    </div>
  )
}
