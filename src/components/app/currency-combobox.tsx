import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { buildCurrencyCatalog, searchCurrencyCatalog } from '@/lib/currencies'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/types'

type CurrencyComboboxProps = {
  value: string
  onValueChange: (nextValue: string) => void
  locale: Locale
  disabled?: boolean
  className?: string
}

const localeText = {
  'zh-CN': {
    searchPlaceholder: '搜索币种或国家/地区',
    empty: '没有匹配的币种',
  },
  'en-US': {
    searchPlaceholder: 'Search currency or country',
    empty: 'No currency found',
  },
} as const

export function CurrencyCombobox({ value, onValueChange, locale, disabled, className }: CurrencyComboboxProps) {
  const catalog = useMemo(() => buildCurrencyCatalog(locale), [locale])
  const selected = useMemo(
    () => catalog.find((item) => item.code === value) ?? catalog.find((item) => item.code === 'USD') ?? catalog[0],
    [catalog, value],
  )
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const filtered = useMemo(() => searchCurrencyCatalog(catalog, deferredQuery), [catalog, deferredQuery])
  const copy = localeText[locale]

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  useEffect(() => {
    if (!open) {
      setQuery('')
    }
  }, [open])

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <Button
        type="button"
        variant="outline"
        className="h-11 w-full justify-between rounded-xl px-3 text-left font-normal"
        onClick={() => setOpen((current) => !current)}
        disabled={disabled}
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

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl">
          <div className="border-b border-border p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.searchPlaceholder}
                className="pl-9"
              />
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="px-3 py-8 text-center text-sm text-muted-foreground">{copy.empty}</div>
            ) : (
              filtered.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left hover:bg-muted"
                  onClick={() => {
                    onValueChange(item.code)
                    setOpen(false)
                  }}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="text-lg leading-none">{item.icon}</span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-foreground">
                        {item.code} · {item.name}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {item.countryName} · {item.symbol}
                      </span>
                    </span>
                  </span>
                  {item.code === value ? <Check className="h-4 w-4 shrink-0 text-primary" /> : null}
                </button>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
