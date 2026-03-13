import { Suspense, lazy, useMemo, useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getCurrencyCatalogItem } from '@/lib/currencies'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/types'

type CurrencyComboboxProps = {
  id?: string
  value: string
  onValueChange: (nextValue: string) => void
  locale: Locale
  disabled?: boolean
  className?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean | 'true' | 'false'
}

const localeText = {
  'zh-CN': {
    loading: '正在加载币种...',
  },
  'en-US': {
    loading: 'Loading currencies...',
  },
} as const

const CurrencyComboboxPanel = lazy(async () => {
  const module = await import('./currency-combobox-panel')
  return { default: module.CurrencyComboboxPanel }
})

export function CurrencyCombobox({ id, value, onValueChange, locale, disabled, className, 'aria-describedby': ariaDescribedBy, 'aria-invalid': ariaInvalid }: CurrencyComboboxProps) {
  const [open, setOpen] = useState(false)
  const selected = useMemo(() => getCurrencyCatalogItem(locale, value || 'USD'), [locale, value])
  const copy = localeText[locale]

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
          <span className="flex min-w-0 items-center gap-3">
            <span className="text-lg leading-none">{selected?.icon ?? '💱'}</span>
            <span className="min-w-0">
              <span className="block truncate font-medium text-foreground">{selected?.code ?? value}</span>
              <span className="block truncate text-xs text-muted-foreground">
                {selected ? `${selected.name} · ${selected.countryName}` : value}
              </span>
            </span>
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[min(24rem,var(--radix-popover-trigger-width))] border-0 bg-transparent p-0 shadow-none">
        <Suspense fallback={<div className="rounded-2xl border border-border bg-[var(--surface-floating)] px-3 py-6 text-sm text-muted-foreground shadow-2xl">{copy.loading}</div>}>
          <CurrencyComboboxPanel
            locale={locale}
            value={value}
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
