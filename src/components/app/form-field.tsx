import type { ReactNode } from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function FormField({
  label,
  helper,
  error,
  className,
  children,
}: {
  label: string
  helper?: string
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs leading-5 text-[var(--danger)]">{error}</p> : helper ? <p className="text-xs leading-5 text-muted-foreground">{helper}</p> : null}
    </div>
  )
}
