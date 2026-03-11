import type { PropsWithChildren, ReactNode } from 'react';
import { Link } from 'react-router-dom';

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
    <main
      className="mx-auto min-h-dvh w-full max-w-phone px-4 pb-6 page-enter"
      style={{
        paddingTop: 'max(20px, env(safe-area-inset-top, 0px))',
        paddingLeft: 'max(16px, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(16px, env(safe-area-inset-right, 0px))',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom, 0px))',
      }}
    >
      <header className="mb-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <Link to={homePath} className="inline-flex flex-col">
            <span className="text-xs uppercase tracking-[0.28em] text-texts">{eyebrow}</span>
            <span className="font-display text-base text-textp">{appName}</span>
          </Link>
          <div className="flex items-center gap-3">
            {actions}
            <Link to={settingsPath} className="text-sm text-texts transition-colors hover:text-textp">
              {settingsLabel}
            </Link>
          </div>
        </div>
        <h1 className="text-3xl font-semibold leading-tight text-balance">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm leading-6 text-texts text-pretty">{subtitle}</p> : null}
      </header>
      {children}
      <footer className="mt-8 text-center text-xs text-texts opacity-70">
        <span className="font-display tabular-nums">{buildInfo}</span>
      </footer>
    </main>
  );
}
