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

  return (
    <AppShell locale={locale} title={t('site.homeTitle')} description={t('site.homeDescription')} showPageIntro={false}>
      <Card tone="soft" className="hero-card home-hero-card overflow-hidden">
        <CardHeader className="hero-grid home-hero-grid gap-6">
          <div className="hero-copy home-hero-copy space-y-4">
            <p className="shell-brand-kicker">{t('site.tagline')}</p>
            <p className="hero-eyebrow text-sm font-medium text-muted-foreground">
              {t('site.heroEyebrow')}
            </p>
            <h1 className="display max-w-3xl text-balance text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02] font-semibold tracking-tight">
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
        <CardContent className="home-hero-priority pt-0">
          <div className="home-section-intro space-y-2">
            <p className="shell-brand-kicker">{t('site.quickToolsLabel')}</p>
            <h2 className="display text-balance text-2xl font-semibold text-foreground" id="home-section-primary">
              {t('site.primaryToolsTitle')}
            </h2>
            <p className="max-w-3xl text-pretty text-sm leading-6 text-muted-foreground md:text-base">
              {t('site.primaryToolsDescription')}
            </p>
          </div>
          <ul className="home-priority-rail" data-testid="home-priority-rail">
            {primaryCards.map((card) => (
              <HomePriorityItem key={card.path} locale={locale} {...card} />
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-8">
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

function HomePriorityItem({ locale, icon: Icon, badge, title, description, metric, path }: HomeToolCardDefinition & { locale: Locale }) {
  return (
    <li data-testid="home-priority-item">
      <Link to={getLocalizedPath(locale, path)} className="home-priority-item">
        <div className="home-priority-item-top">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-primary/8 px-3 py-1 text-xs font-semibold text-foreground">
            <Icon className="size-4" />
            <span>{badge}</span>
          </div>
          <ArrowRight className="size-4 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="display text-xl font-semibold text-foreground">{title}</h3>
          <p className="mono text-lg font-medium tabular-nums text-foreground/92">{metric}</p>
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      </Link>
    </li>
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
        <Button asChild variant="nav" className="home-companion-cta mt-auto w-full justify-between rounded-xl border border-border bg-[color:var(--surface-floating)] px-4 py-2.5 text-sm">
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
