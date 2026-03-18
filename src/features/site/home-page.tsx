import '@/lib/i18n/messages/phrases'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Briefcase, Clock3, Languages, ReceiptText, Smartphone, WalletCards } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
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
      <div className="home-layout space-y-8">
        <section className="home-intro" aria-labelledby="home-intro-title">
          <h1 id="home-intro-title" className="display home-intro-title text-balance text-3xl font-semibold text-foreground sm:text-4xl">
            {t('site.homeTitle')}
          </h1>
        </section>

        <section className="home-section home-section-primary space-y-4" aria-labelledby="home-section-primary">
          <div className="home-section-intro">
            <h2 className="display text-balance text-2xl font-semibold text-foreground" id="home-section-primary">
              {t('site.primaryToolsTitle')}
            </h2>
          </div>
          <ul className="home-priority-rail" data-testid="home-priority-rail">
            {primaryCards.map((card) => (
              <HomePriorityItem key={card.path} locale={locale} {...card} />
            ))}
          </ul>
        </section>

        <section className="home-section home-section-guides space-y-4" aria-labelledby="home-section-guides">
          <div className="home-section-intro">
            <h2 id="home-section-guides" className="display text-balance text-2xl font-semibold text-foreground">
              {t('site.companionToolsTitle')}
            </h2>
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
