import { Link } from 'react-router-dom';
import { Card, Layout } from '@travel-tools/ui';
import { useI18n } from '../hooks/useI18n';
import { useLocalizedPath } from '../lib/routes';
import { readLastTool, writeLastTool } from '../lib/storage';
import { getEnabledTools } from '@travel-tools/shared/site';
import { APP_VERSION, BUILD_DATE } from '../lib/version';

export function HomePage() {
  const { t } = useI18n();
  const toLocalizedPath = useLocalizedPath();
  const lastTool = readLastTool();
  const tools = getEnabledTools();
  const buildInfo = t('common.buildInfo', { version: APP_VERSION, date: BUILD_DATE });

  return (
    <Layout
      appName={t('app.name')}
      eyebrow={t('site.eyebrow')}
      settingsLabel={t('common.settings')}
      homePath={toLocalizedPath('/')}
      settingsPath={toLocalizedPath('/settings')}
      buildInfo={buildInfo}
      title={t('site.homeTitle')}
      subtitle={t('site.homeDescription')}
    >
      {lastTool ? (
        <Card className="mb-4 bg-[linear-gradient(135deg,rgba(249,115,22,0.12),rgba(255,255,255,0.9))]">
          <p className="text-xs uppercase tracking-[0.22em] text-texts">{t('site.recentToolLabel')}</p>
          <p className="mt-2 text-lg font-semibold">{t(`tool.${lastTool}.name`)}</p>
          <Link
            to={toLocalizedPath(lastTool === 'currency' ? '/tools/currency' : '/tools/split-bill')}
            className="mt-3 inline-flex rounded-card bg-accent px-4 py-2 text-sm font-semibold text-white"
          >
            {t('site.openRecentTool')}
          </Link>
        </Card>
      ) : null}

      <div className="space-y-4">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            to={toLocalizedPath(tool.entryPath)}
            onClick={() => writeLastTool(tool.slug)}
            className="block"
          >
            <Card className="overflow-hidden border-transparent bg-[linear-gradient(160deg,rgba(255,247,237,0.98),rgba(255,255,255,0.92))] transition-transform hover:-translate-y-0.5 dark:bg-[linear-gradient(160deg,rgba(28,20,16,0.96),rgba(28,25,23,0.92))]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-card bg-accent-soft text-2xl">{tool.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold">{t(`tool.${tool.slug}.name`)}</h2>
                    <span className="font-display text-xs uppercase tracking-[0.18em] text-texts">{t('site.toolReady')}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-texts">{t(`tool.${tool.slug}.description`)}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
