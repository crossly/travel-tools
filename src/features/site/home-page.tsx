import '@/lib/i18n/messages/phrases'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Briefcase, Clock3, Languages, ReceiptText, Smartphone, WalletCards } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { HomePageStats } from '@/features/site/home-page-stats'
import { getLocalizedPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import type { Locale } from '@/lib/types'

export function HomePage({ locale, stats }: { locale: Locale; stats: HomePageStats }) {
  const { t } = useI18n()
  const primaryCards: HomeToolCardDefinition[] = [
    {
      icon: WalletCards,
      badge: t('site.toolBadgeCurrency'),
      title: t('tool.currency.name'),
      description: t('site.currencyPreview'),
      metric: t('site.currencyMetric'),
      path: '/currency',
    },
    {
      icon: ReceiptText,
      badge: t('site.toolBadgeSplitBill'),
      title: t('tool.splitBill.name'),
      description: t('site.splitPreview'),
      metric: t('site.splitMetric'),
      path: '/bill-splitter',
    },
    {
      icon: Briefcase,
      badge: t('site.toolBadgePacking'),
      title: t('tool.packingList.name'),
      description: t('site.packingPreview'),
      metric: t('site.packingMetric', { count: stats.packingTemplateCount }),
      path: '/packing-list',
    },
  ]
  const companionCards: HomeToolCardDefinition[] = [
    {
      icon: Languages,
      badge: t('phrases.audioBadge'),
      title: t('tool.travelPhrases.name'),
      description: t('site.phrasesPreview'),
      metric: t('site.phrasesMetric', { packs: stats.phrasePackCount, phrases: stats.totalPhraseCount }),
      path: '/travel-phrases',
    },
    {
      icon: Smartphone,
      badge: t('site.toolBadgeLocalApps'),
      title: t('tool.localApps.name'),
      description: t('site.localAppsPreview'),
      metric: t('site.localAppsMetric', { ready: stats.localAppsReadyCount, tracked: stats.localAppsTrackedCount }),
      path: '/local-apps',
    },
    {
      icon: Clock3,
      badge: t('site.toolBadgeJetLag'),
      title: t('tool.jetLag.name'),
      description: t('site.jetLagPreview'),
      metric: t('site.jetLagMetric', { count: stats.timeZoneCount }),
      path: '/jet-lag',
    },
  ]
  const [featuredCard, ...supportingCards] = primaryCards

  return (
    <AppShell locale={locale} title={t('site.homeTitle')} description={t('site.homeDescription')} showPageIntro={false}>
      <Card tone="soft" className="hero-card overflow-hidden">
        <CardHeader className="hero-grid gap-8">
          <div className="hero-copy space-y-5">
            <Badge variant="outline" className="w-fit">
              {t('site.tagline')}
            </Badge>
            <p className="hero-eyebrow text-xs font-semibold uppercase text-muted-foreground">
              {t('site.heroEyebrow')}
            </p>
            <h1 className="display max-w-3xl text-balance text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
              {t('site.heroTitle')}
            </h1>
            <CardDescription className="max-w-2xl text-pretty text-base leading-7 sm:text-lg">
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

      <div className="space-y-8">
        <section className="home-section home-section-primary space-y-4" aria-labelledby="home-section-primary">
          <div className="home-section-intro space-y-2">
            <Badge variant="outline">{t('site.primaryToolsBadge')}</Badge>
            <h2 id="home-section-primary" className="display text-balance text-2xl font-semibold text-foreground">
              {t('site.primaryToolsTitle')}
            </h2>
            <p className="max-w-3xl text-pretty text-sm leading-6 text-muted-foreground md:text-base">
              {t('site.primaryToolsDescription')}
            </p>
          </div>
          <div className="home-primary-layout">
            <FeaturedHomeToolCard locale={locale} {...featuredCard} />
            <div className="home-supporting-stack">
              {supportingCards.map((card) => (
                <HomeToolCard key={card.path} locale={locale} compact testId="home-supporting-tool" {...card} />
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-section-guides space-y-4" aria-labelledby="home-section-guides">
          <div className="home-section-intro space-y-2">
            <Badge variant="outline">{t('site.companionToolsBadge')}</Badge>
            <h2 id="home-section-guides" className="display text-balance text-2xl font-semibold text-foreground">
              {t('site.companionToolsTitle')}
            </h2>
            <p className="max-w-3xl text-pretty text-sm leading-6 text-muted-foreground md:text-base">
              {t('site.companionToolsDescription')}
            </p>
          </div>
          <ul className="home-companion-list" data-testid="home-companion-list">
            {companionCards.map((card) => (
              <CompanionToolItem key={card.path} locale={locale} {...card} />
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  )
}

type HomeToolCardDefinition = {
  icon: LucideIcon
  badge: string
  title: string
  description: string
  metric: string
  path: string
}

function FeaturedHomeToolCard({ locale, icon: Icon, badge, title, description, metric, path }: HomeToolCardDefinition & { locale: Locale }) {
  return (
    <Card tone="soft" className="home-featured-card" data-testid="home-featured-tool">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-foreground">
            <Icon className="size-4" />
            <span>{badge}</span>
          </div>
          <Badge variant="outline">{title}</Badge>
        </div>
        <CardTitle className="text-balance text-2xl md:text-3xl">{title}</CardTitle>
        <CardDescription className="max-w-xl text-pretty text-base leading-7">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="home-featured-metric rounded-2xl border border-primary/20 bg-[color:var(--surface-floating)] p-5">
          <p className="mono text-3xl font-medium tabular-nums md:text-4xl">{metric}</p>
        </div>
        <Button asChild size="lg" className="w-full justify-between md:w-auto">
          <Link to={getLocalizedPath(locale, path)}>
            {title}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function HomeToolCard({
  locale,
  icon: Icon,
  badge,
  title,
  description,
  metric,
  path,
  compact = false,
  testId,
}: HomeToolCardDefinition & { locale: Locale; compact?: boolean; testId?: string }) {
  return (
    <Card tone="soft" className={compact ? 'home-supporting-card' : undefined} data-testid={testId}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Icon className="size-6 text-primary" />
          <Badge variant="outline">{badge}</Badge>
        </div>
        <CardTitle className="text-balance">{title}</CardTitle>
        <CardDescription className="text-pretty">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-2xl border border-border bg-muted p-4">
          <p className={compact ? 'mono text-xl font-medium tabular-nums' : 'mono text-2xl font-medium tabular-nums'}>{metric}</p>
        </div>
        <Button asChild variant="secondary" size="lg" className="w-full justify-between">
          <Link to={getLocalizedPath(locale, path)}>
            {title}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function CompanionToolItem({ locale, icon: Icon, badge, title, description, metric, path }: HomeToolCardDefinition & { locale: Locale }) {
  return (
    <li className="home-companion-item" data-testid="home-companion-item">
      <article className="home-companion-panel">
        <div className="flex items-center gap-3">
          <div className="inline-flex size-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <Icon className="size-4 text-primary" />
          </div>
          <Badge variant="outline">{badge}</Badge>
        </div>
        <h3 className="display mt-3 text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        <p className="mono mt-4 text-sm font-medium tabular-nums text-foreground/90">{metric}</p>
        <Button asChild variant="nav" className="mt-auto w-full justify-between rounded-xl border border-border bg-[color:var(--surface-floating)] px-4 py-2.5 text-sm">
          <Link to={getLocalizedPath(locale, path)}>
            {title}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </article>
    </li>
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
