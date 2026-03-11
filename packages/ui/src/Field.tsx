import type { PropsWithChildren, ReactNode } from 'react';
import { cn } from './cn';

export function Field({
  label,
  helperText,
  errorText,
  action,
  className,
  children,
}: PropsWithChildren<{
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  action?: ReactNode;
  className?: string;
}>) {
  return (
    <label className={cn('block', className)}>
      {(label || action) ? (
        <span className="mb-2 flex items-center justify-between gap-3">
          {label ? <span className="text-sm font-medium text-textp">{label}</span> : <span />}
          {action ? <span className="text-xs text-texts">{action}</span> : null}
        </span>
      ) : null}
      {children}
      {errorText ? <span className="mt-2 block text-xs text-[var(--status-danger)]">{errorText}</span> : null}
      {!errorText && helperText ? <span className="mt-2 block text-xs text-texts">{helperText}</span> : null}
    </label>
  );
}
