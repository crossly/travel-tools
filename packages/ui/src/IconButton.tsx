import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from './cn';

export function IconButton({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-card border border-borderc bg-card text-sm text-textp shadow-card',
        'hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]',
        'active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
