import type { PropsWithChildren } from 'react';

export function Card({ className, children }: PropsWithChildren<{ className?: string }>) {
  return <section className={['rounded-card border border-borderc bg-card p-4 shadow-card', className].filter(Boolean).join(' ')}>{children}</section>;
}
