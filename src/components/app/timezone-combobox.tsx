import { Suspense, lazy, useMemo, useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getJetLagTimezoneOption } from '@/lib/jet-lag'
import { translate } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/types'

type TimezoneComboboxProps = {
  id?: string
  value: string
  onValueChange: (nextValue: string) => void
  locale: Locale
  disabled?: boolean
  className?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean | 'true' | 'false'
}

const TimezoneComboboxPanel = lazy(async () => {
  const module = await import('./timezone-combobox-panel')
  return { default: module.TimezoneComboboxPanel }
})

function splitTimezoneLabel(label: string, fallbackValue: string) {
  const match = /^(.*) \((.*)\)$/.exec(label)
  return {
    title: match?.[1] ?? label,
    subtitle: match?.[2] ?? fallbackValue,
  }
}

export function TimezoneCombobox({
  id,
  value,
  onValueChange,
  locale,
  disabled,
  className,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
}: TimezoneComboboxProps) {
  const [open, setOpen] = useState(false)
  const selected = useMemo(() => getJetLagTimezoneOption(value, [value]), [value])
  const loadingLabel = translate(locale, 'common.loadingTimezones')
  const display = splitTimezoneLabel(selected?.label ?? value, value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          className={cn('h-11 w-full justify-between rounded-xl px-3 text-left font-normal', className)}
          disabled={disabled}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
        >
          <span className="min-w-0">
            <span className="block truncate font-medium text-foreground">{display.title}</span>
            <span className="block truncate text-xs text-muted-foreground">{display.subtitle}</span>
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[min(26rem,var(--radix-popover-trigger-width))] border-0 bg-transparent p-0 shadow-none">
        <Suspense fallback={<div className="rounded-2xl border border-border bg-[var(--surface-floating)] px-3 py-6 text-sm text-muted-foreground shadow-2xl">{loadingLabel}</div>}>
          <TimezoneComboboxPanel
            locale={locale}
            value={value}
            extraValues={[value]}
            onValueChange={(nextValue) => {
              onValueChange(nextValue)
              setOpen(false)
            }}
          />
        </Suspense>
      </PopoverContent>
    </Popover>
  )
}
