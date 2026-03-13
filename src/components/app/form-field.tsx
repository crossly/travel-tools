import { cloneElement, isValidElement, useId } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function FormField({
  id,
  label,
  helper,
  error,
  className,
  children,
}: {
  id?: string
  label: string
  helper?: string
  error?: string
  className?: string
  children: ReactNode
}) {
  const generatedId = useId().replace(/:/g, '')
  const fieldId = id ?? `field-${generatedId}`
  const messageId = error ? `${fieldId}-error` : helper ? `${fieldId}-helper` : undefined
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        id: (children as ReactElement<Record<string, unknown>>).props.id ?? fieldId,
        'aria-describedby': messageId,
        'aria-invalid': (children as ReactElement<Record<string, unknown>>).props['aria-invalid'] ?? (error ? true : undefined),
      })
    : children

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={fieldId}>{label}</Label>
      {control}
      {error ? <p id={`${fieldId}-error`} className="text-xs leading-5 text-[var(--danger)]">{error}</p> : helper ? <p id={`${fieldId}-helper`} className="text-xs leading-5 text-muted-foreground">{helper}</p> : null}
    </div>
  )
}
