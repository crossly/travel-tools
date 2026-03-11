import { Link } from 'react-router-dom';
import { cn } from './cn';

export function BottomNav({
  items,
  className,
}: {
  items: Array<{ label: string; href: string; active?: boolean; icon?: string }>;
  className?: string;
}) {
  return (
    <nav className={cn('fixed inset-x-0 bottom-0 z-overlay mx-auto w-full max-w-phone px-4 pb-4 md:hidden', className)} aria-label="Primary">
      <div className="grid grid-cols-4 gap-2 rounded-[22px] border border-borderc bg-[var(--surface-subtle)] p-2 shadow-card backdrop-blur">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'flex min-h-[56px] flex-col items-center justify-center rounded-card px-2 py-2 text-center text-[11px] font-medium',
              item.active ? 'bg-card text-textp shadow-card' : 'text-texts',
            )}
          >
            {item.icon ? <span className="mb-1 text-base">{item.icon}</span> : null}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
