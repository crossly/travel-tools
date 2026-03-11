import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { cn } from './cn';

export function ActionButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  leadingIcon,
  className,
  disabled,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leadingIcon?: ReactNode;
}>) {
  const variantClass =
    variant === 'secondary'
      ? 'border border-borderc bg-card text-textp shadow-card'
      : variant === 'ghost'
        ? 'text-textp'
        : variant === 'danger'
          ? 'bg-[var(--status-danger)] text-white shadow-card'
          : 'bg-accent text-white shadow-card';

  const sizeClass = size === 'sm' ? 'px-3 py-2 text-sm' : size === 'lg' ? 'px-5 py-3.5 text-base' : 'px-4 py-3 text-sm';

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-card font-semibold',
        'transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60',
        variantClass,
        sizeClass,
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span aria-hidden="true" className="font-mono text-xs">...</span> : leadingIcon ? <span aria-hidden="true">{leadingIcon}</span> : null}
      <span>{children}</span>
    </button>
  );
}
