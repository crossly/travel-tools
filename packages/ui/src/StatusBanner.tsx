import type { ReactNode } from 'react';
import { cn } from './cn';

export function StatusBanner({
  status,
  title,
  description,
  action,
  className,
}: {
  status: 'success' | 'info' | 'warning' | 'error' | 'offline';
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  const toneClass =
    status === 'success'
      ? 'border-transparent bg-[var(--status-success-soft)] text-[var(--status-success)]'
      : status === 'warning'
        ? 'border-transparent bg-[var(--status-warning-soft)] text-[var(--status-warning)]'
        : status === 'error'
          ? 'border-transparent bg-[var(--status-danger-soft)] text-[var(--status-danger)]'
          : status === 'offline'
            ? 'border-transparent bg-[var(--surface-accent-soft)] text-textp'
            : 'border-transparent bg-[var(--status-info-soft)] text-[var(--status-info)]';

  return (
    <div className={cn('rounded-card border px-4 py-3 shadow-card', toneClass, className)} role="status" aria-live="polite">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          {description ? <p className="mt-1 text-xs leading-5 opacity-90">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}
