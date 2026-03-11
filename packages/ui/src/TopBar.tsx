import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from './cn';

export function TopBar({
  eyebrow,
  brand,
  homeHref,
  currentLabel,
  rightActions,
  below,
  className,
}: {
  eyebrow: string;
  brand: string;
  homeHref: string;
  currentLabel?: string;
  rightActions?: ReactNode;
  below?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn('mb-5', className)}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <Link to={homeHref} className="inline-flex min-w-0 flex-col">
          <span className="text-xs uppercase tracking-[0.28em] text-texts">{eyebrow}</span>
          <span className="font-display text-base text-textp">{brand}</span>
          {currentLabel ? <span className="mt-1 text-xs uppercase tracking-[0.18em] text-texts">{currentLabel}</span> : null}
        </Link>
        {rightActions ? <div className="flex shrink-0 items-center gap-2">{rightActions}</div> : null}
      </div>
      {below}
    </header>
  );
}
