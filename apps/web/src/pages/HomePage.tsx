import { Link } from 'react-router-dom';
import { HeroPanel, InfoChip, Panel, ToolFeatureCard } from '@travel-tools/ui';
import { useI18n } from '../hooks/useI18n';
import { useLocalizedPath } from '../lib/routes';
import { readLastTool, writeLastTool } from '../lib/storage';
import { getEnabledTools } from '@travel-tools/shared/site';
import { APP_VERSION, BUILD_DATE } from '../lib/version';
import { SiteLayout } from '../components/SiteLayout';

export function HomePage() {
  const { t } = useI18n();
  const toLocalizedPath = useLocalizedPath();
  const lastTool = readLastTool();
  const tools = getEnabledTools();
  const buildInfo = t('common.buildInfo', { version: APP_VERSION, date: BUILD_DATE });

  return (
    <SiteLayout
      appName={t('app.name')}
      eyebrow={t('site.eyebrow')}
      settingsLabel={t('common.settings')}
      homePath={toLocalizedPath('/')}
      settingsPath={toLocalizedPath('/settings')}
      buildInfo={buildInfo}
      title={t('site.homeTitle')}
      subtitle={t('site.homeDescription')}
    >
      <HeroPanel
        className="mb-5"
        eyebrow={t('site.eyebrow')}
        title={t('site.heroTitle')}
        subtitle={t('site.heroDescription')}
        actions={lastTool ? <InfoChip tone="accent">{t('site.recentToolLabel')}</InfoChip> : undefined}
      >
        <div className="flex flex-wrap gap-3">
          {lastTool ? (
            <Link
              to={toLocalizedPath(lastTool === 'currency' ? '/tools/currency' : '/tools/split-bill')}
              className="inline-flex rounded-card bg-accent px-4 py-2 text-sm font-semibold text-white shadow-card"
            >
              {t('site.openRecentTool')}
            </Link>
          ) : null}
          <a href="#tool-grid" className="inline-flex rounded-card border border-borderc bg-card px-4 py-2 text-sm font-medium text-textp shadow-card">
            {t('site.exploreTools')}
          </a>
        </div>
      </HeroPanel>

      <div id="tool-grid" className="space-y-4">
        {tools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => writeLastTool(tool.slug)}
          >
            <ToolFeatureCard
              title={t(`tool.${tool.slug}.name`)}
              description={t(`tool.${tool.slug}.description`)}
              icon={tool.icon}
              href={toLocalizedPath(tool.entryPath)}
              tone={tool.slug === 'currency' ? 'hero' : 'accent'}
              meta={
                tool.slug === 'currency'
                  ? [t('site.homeCurrencyMeta'), t('site.homeCurrencyMeta2')]
                  : [t('site.homeSplitMeta'), t('site.homeSplitMeta2')]
              }
              ctaLabel={t('site.openRecentTool')}
              preview={
                tool.slug === 'currency' ? (
                  <div className="rounded-card border border-borderc bg-card px-4 py-3">
                    <div className="font-mono text-2xl tabular-nums text-textp">100 USD → 728.42 CNY</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.18em] text-texts">{t('site.toolReady')}</div>
                  </div>
                ) : (
                  <div className="rounded-card border border-borderc bg-card px-4 py-3">
                    <div className="font-mono text-2xl tabular-nums text-textp">6 people · 2 currencies</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.18em] text-texts">1 unsettled trip</div>
                  </div>
                )
              }
            />
          </div>
        ))}
      </div>

      <Panel tone="subtle" className="mt-5">
        <p className="text-xs uppercase tracking-[0.22em] text-texts">{t('site.futureToolsTitle')}</p>
        <p className="mt-2 text-sm leading-6 text-texts">{t('site.futureToolsDescription')}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <InfoChip>{t('site.futureTool.taxRefund')}</InfoChip>
          <InfoChip>{t('site.futureTool.packing')}</InfoChip>
          <InfoChip>{t('site.futureTool.tips')}</InfoChip>
        </div>
      </Panel>
    </SiteLayout>
  );
}
