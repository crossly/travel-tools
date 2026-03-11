import type { PropsWithChildren, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppShell, IconButton, SegmentedControl } from '@travel-tools/ui';
import { getEnabledTools, getToolFromPathname, resolveLocaleFromPath } from '@travel-tools/shared/site';
import type { SiteTheme } from '@travel-tools/shared/storage';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../hooks/useTheme';
import { writeLastTool } from '../lib/storage';
import { useLocalizedPath } from '../lib/routes';

function nextTheme(theme: SiteTheme): SiteTheme {
  if (theme === 'system') return 'light';
  if (theme === 'light') return 'dark';
  return 'system';
}

function themeGlyph(theme: SiteTheme): string {
  if (theme === 'light') return '☼';
  if (theme === 'dark') return '☾';
  return '◐';
}

export function SiteLayout({
  appName,
  eyebrow,
  settingsLabel,
  homePath,
  settingsPath,
  buildInfo,
  title,
  subtitle,
  actions,
  children,
}: PropsWithChildren<{
  appName: string;
  eyebrow: string;
  settingsLabel: string;
  homePath: string;
  settingsPath: string;
  buildInfo: string;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}>) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, locale, setLocale } = useI18n();
  const { theme, setTheme } = useTheme();
  const toLocalizedPath = useLocalizedPath();
  const currentTool = getToolFromPathname(location.pathname);
  const { pathname: normalizedPath } = resolveLocaleFromPath(location.pathname);

  const currentLabel = currentTool
    ? t(`tool.${currentTool.slug}.name`)
    : normalizedPath === '/settings'
      ? t('common.settings')
      : t('common.home');

  const bottomNavItems = [
    { label: t('nav.home'), href: homePath, active: normalizedPath === '/', icon: '⌂' },
    { label: t('nav.currency'), href: toLocalizedPath('/tools/currency'), active: currentTool?.slug === 'currency', icon: '💱' },
    { label: t('nav.splitBill'), href: toLocalizedPath('/tools/split-bill'), active: currentTool?.slug === 'split-bill', icon: '🧾' },
    { label: t('nav.settings'), href: settingsPath, active: normalizedPath === '/settings', icon: '⚙' },
  ];

  return (
    <AppShell
      eyebrow={eyebrow}
      appName={appName}
      homePath={homePath}
      currentLabel={currentLabel}
      title={title}
      subtitle={subtitle}
      topBarActions={
        <>
          {actions}
          <SegmentedControl
            value={locale}
            options={[
              { value: 'zh-CN', label: 'ZH' },
              { value: 'en-US', label: 'EN' },
            ]}
            onChange={setLocale}
            className="hidden sm:inline-flex"
          />
          <IconButton
            aria-label={t('shell.themeSwitcherLabel')}
            title={`${t('settings.theme')}: ${theme === 'system' ? t('settings.themeSystem') : theme === 'light' ? t('settings.themeLight') : t('settings.themeDark')}`}
            onClick={() => setTheme(nextTheme(theme))}
          >
            <span aria-hidden="true">{themeGlyph(theme)}</span>
          </IconButton>
          <Link to={settingsPath} className="inline-flex h-10 items-center rounded-card border border-borderc bg-card px-3 text-sm text-textp shadow-card">
            {settingsLabel}
          </Link>
        </>
      }
      topBarBelow={
        currentTool ? (
          <SegmentedControl
            value={currentTool.slug}
            options={getEnabledTools().map((tool) => ({ value: tool.slug, label: t(`tool.${tool.slug}.name`) }))}
            onChange={(nextSlug) => {
              const nextTool = getEnabledTools().find((tool) => tool.slug === nextSlug);
              if (!nextTool) return;
              writeLastTool(nextTool.slug);
              navigate(toLocalizedPath(nextTool.entryPath));
            }}
            className="w-full"
          />
        ) : undefined
      }
      footer={<span className="font-mono tabular-nums">{buildInfo}</span>}
      bottomNavItems={bottomNavItems}
    >
      {children}
    </AppShell>
  );
}
