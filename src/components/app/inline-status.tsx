import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function InlineStatus({
  tone,
  title,
  description,
  className,
}: {
  tone: 'default' | 'success' | 'warning' | 'danger'
  title: string
  description?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-4',
        tone === 'success' && 'border-[var(--success-soft)] bg-[var(--success-soft)]',
        tone === 'warning' && 'border-[var(--warning-soft)] bg-[var(--warning-soft)]',
        tone === 'danger' && 'border-[var(--danger-soft)] bg-[var(--danger-soft)]',
        tone === 'default' && 'border-border bg-muted',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Badge variant={tone === 'default' ? 'outline' : tone}>{title}</Badge>
      </div>
      {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
    </div>
  )
}
