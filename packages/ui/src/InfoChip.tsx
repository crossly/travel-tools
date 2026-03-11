import type { PropsWithChildren } from 'react';
import { cn } from './cn';

export function InfoChip({
  children,
  tone = 'default',
  className,
}: PropsWithChildren<{
  tone?: 'default' | 'accent' | 'success' | 'warning';
  className?: string;
}>) {
  const toneClass =
    tone === 'accent'
      ? 'bg-[var(--surface-accent-soft)] text-textp'
      : tone === 'success'
        ? 'bg-[var(--status-success-soft)] text-[var(--status-success)]'
        : tone === 'warning'
          ? 'bg-[var(--status-warning-soft)] text-[var(--status-warning)]'
          : 'bg-[var(--surface-subtle)] text-texts';

  return <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium', toneClass, className)}>{children}</span>;
}
