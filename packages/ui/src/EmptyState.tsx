import type { ReactNode } from 'react';

export function EmptyState({
  title,
  description,
  action,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-card border border-dashed border-borderc bg-[var(--surface-subtle)] px-4 py-5 text-center">
      <p className="text-sm font-medium text-textp">{title}</p>
      {description ? <p className="mt-2 text-sm leading-6 text-texts">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
