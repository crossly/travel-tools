import type { PropsWithChildren, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AppShell } from './AppShell';

export function Layout({
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
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}>) {
  return (
    <AppShell
      eyebrow={eyebrow}
      appName={appName}
      homePath={homePath}
      title={title}
      subtitle={subtitle}
      topBarActions={
        <div className="flex items-center gap-3">
          {actions}
          <Link to={settingsPath} className="text-sm text-texts transition-colors hover:text-textp">
            {settingsLabel}
          </Link>
        </div>
      }
      footer={<span className="font-display tabular-nums">{buildInfo}</span>}
    >
      {children}
    </AppShell>
  );
}
