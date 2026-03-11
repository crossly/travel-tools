import type { PropsWithChildren, ReactNode } from 'react';
import { Panel } from './Panel';
import { cn } from './cn';

export function StepPanel({
  stepNumber,
  title,
  description,
  status,
  actions,
  className,
  children,
}: PropsWithChildren<{
  stepNumber: number;
  title: ReactNode;
  description?: ReactNode;
  status: 'pending' | 'active' | 'complete';
  actions?: ReactNode;
  className?: string;
}>) {
  const badgeClass =
    status === 'complete'
      ? 'bg-[var(--status-success-soft)] text-[var(--status-success)]'
      : status === 'active'
        ? 'bg-[var(--surface-accent-soft)] text-textp'
        : 'bg-[var(--surface-subtle)] text-texts';

  return (
    <Panel className={cn(className, status === 'active' && 'border-[var(--border-strong)]')}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold', badgeClass)}>{stepNumber}</div>
          <div>
            <h2 className="text-base font-semibold text-textp">{title}</h2>
            {description ? <p className="mt-1 text-sm leading-6 text-texts">{description}</p> : null}
          </div>
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
      {children}
    </Panel>
  );
}
