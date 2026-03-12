import { useDeferredValue, useMemo, useState } from 'react'
import { Check, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { buildCurrencyCatalog, searchCurrencyCatalog } from '@/lib/currencies'
import type { Locale } from '@/lib/types'

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

export function CurrencyComboboxPanel({
  locale,
  value,
  onValueChange,
}: {
  locale: Locale
  value: string
  onValueChange: (nextValue: string) => void
}) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const catalog = useMemo(() => buildCurrencyCatalog(locale), [locale])
  const filtered = useMemo(() => searchCurrencyCatalog(catalog, deferredQuery), [catalog, deferredQuery])
  const copy = localeText[locale]

  return (
    <div role="listbox" className="overflow-hidden rounded-2xl border border-border bg-[var(--surface-floating)] shadow-2xl">
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
              onClick={() => onValueChange(item.code)}
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
  )
}
