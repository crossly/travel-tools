import type { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function PageState({
  tone = 'default',
  title,
  description,
  action,
}: {
  tone?: 'default' | 'danger'
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <Card className={cn(tone === 'danger' && 'border-[var(--danger-soft)] bg-[var(--danger-soft)]/55')}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription className="text-pretty text-sm leading-6">{description}</CardDescription> : null}
      </CardHeader>
      {action ? <CardContent>{action}</CardContent> : null}
    </Card>
  )
}
