import * as React from 'react'
import { cn } from '@/lib/utils'

const CARD_TONE_CLASSNAME = {
  default: 'glass rounded-3xl border border-border bg-card text-card-foreground shadow-sm',
  soft: 'glass rounded-3xl border border-border/70 bg-[color:var(--surface-floating)] text-card-foreground shadow-sm',
  plain: 'rounded-3xl border border-border/70 bg-transparent text-card-foreground',
} as const

type CardTone = keyof typeof CARD_TONE_CLASSNAME

export function Card({ className, tone = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { tone?: CardTone }) {
  return <div className={cn(CARD_TONE_CLASSNAME[tone], className)} {...props} />
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-2 p-6', className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('display text-lg font-semibold tracking-tight', className)} {...props} />
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}
