import type { PropsWithChildren } from 'react';
import { cn } from './cn';

type PanelTone = 'default' | 'subtle' | 'hero' | 'accent' | 'success' | 'warning' | 'danger';
type PanelPadding = 'sm' | 'md' | 'lg';

const toneClasses: Record<PanelTone, string> = {
  default: 'border border-borderc bg-card shadow-card',
  subtle: 'border border-borderc bg-[var(--surface-subtle)] shadow-card',
  hero: 'border border-[var(--border-strong)] bg-[var(--surface-hero)] shadow-card',
  accent: 'border border-transparent bg-[var(--surface-accent-soft)] shadow-card',
  success: 'border border-transparent bg-[var(--status-success-soft)] shadow-card',
  warning: 'border border-transparent bg-[var(--status-warning-soft)] shadow-card',
  danger: 'border border-transparent bg-[var(--status-danger-soft)] shadow-card',
};

const paddingClasses: Record<PanelPadding, string> = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
};

export function Panel({
  tone = 'default',
  padding = 'md',
  interactive = false,
  className,
  children,
}: PropsWithChildren<{
  tone?: PanelTone;
  padding?: PanelPadding;
  interactive?: boolean;
  className?: string;
}>) {
  return (
    <section
      className={cn(
        'rounded-card',
        toneClasses[tone],
        paddingClasses[padding],
        interactive && 'transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.99]',
        className,
      )}
    >
      {children}
    </section>
  );
}
