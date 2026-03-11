import type { PropsWithChildren, ReactNode } from 'react';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';

export function AppShell({
  eyebrow,
  appName,
  homePath,
  currentLabel,
  topBarActions,
  topBarBelow,
  title,
  subtitle,
  footer,
  bottomNavItems,
  children,
}: PropsWithChildren<{
  eyebrow: string;
  appName: string;
  homePath: string;
  currentLabel?: string;
  topBarActions?: ReactNode;
  topBarBelow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  footer?: ReactNode;
  bottomNavItems?: Array<{ label: string; href: string; active?: boolean; icon?: string }>;
}>) {
  return (
    <>
      <main
        className="mx-auto min-h-dvh w-full max-w-phone px-4 pb-24 page-enter"
        style={{
          paddingTop: 'max(20px, env(safe-area-inset-top, 0px))',
          paddingLeft: 'max(16px, env(safe-area-inset-left, 0px))',
          paddingRight: 'max(16px, env(safe-area-inset-right, 0px))',
          paddingBottom: bottomNavItems?.length ? 'max(104px, calc(88px + env(safe-area-inset-bottom, 0px)))' : 'max(24px, env(safe-area-inset-bottom, 0px))',
        }}
      >
        <TopBar eyebrow={eyebrow} brand={appName} homeHref={homePath} currentLabel={currentLabel} rightActions={topBarActions} below={topBarBelow} />
        <div className="mb-5">
          <h1 className="text-3xl font-semibold leading-tight text-balance text-textp">{title}</h1>
          {subtitle ? <p className="mt-2 text-sm leading-6 text-texts text-pretty">{subtitle}</p> : null}
        </div>
        {children}
        {footer ? <footer className="mt-8 text-center text-xs text-texts opacity-70">{footer}</footer> : null}
      </main>
      {bottomNavItems?.length ? <BottomNav items={bottomNavItems} /> : null}
    </>
  );
}
