import type { PropsWithChildren, ReactNode } from 'react';
import { Panel } from './Panel';
import { cn } from './cn';

export function HeroPanel({
  eyebrow,
  title,
  subtitle,
  actions,
  className,
  children,
}: PropsWithChildren<{
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  className?: string;
}>) {
  return (
    <Panel tone="hero" padding="lg" className={cn('overflow-hidden', className)}>
      {(eyebrow || title || subtitle || actions) ? (
        <div className="mb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              {eyebrow ? <p className="text-xs uppercase tracking-[0.22em] text-texts">{eyebrow}</p> : null}
              {title ? <div className="mt-2 text-2xl font-semibold leading-tight text-textp">{title}</div> : null}
              {subtitle ? <div className="mt-2 text-sm leading-6 text-texts">{subtitle}</div> : null}
            </div>
            {actions ? <div className="shrink-0">{actions}</div> : null}
          </div>
        </div>
      ) : null}
      {children}
    </Panel>
  );
}
