import { cn } from './cn';

export function AmountDisplay({
  value,
  currency,
  size = 'lg',
  className,
}: {
  value: string;
  currency?: string;
  size?: 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const sizeClass = size === 'md' ? 'text-3xl' : size === 'xl' ? 'text-5xl' : 'text-4xl';
  return (
    <div className={cn('font-mono tabular-nums text-textp', sizeClass, className)}>
      {value}
      {currency ? <span className="ml-2 text-[0.5em] uppercase tracking-[0.18em] text-texts">{currency}</span> : null}
    </div>
  );
}
