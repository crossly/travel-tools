import { useDeferredValue, useMemo, useState } from 'react'
import { Check, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { searchJetLagTimezones } from '@/lib/jet-lag'
import type { Locale } from '@/lib/types'

const localeText = {
  'zh-CN': {
    searchPlaceholder: '搜索城市或时区',
    empty: '没有匹配的时区',
  },
  'en-US': {
    searchPlaceholder: 'Search city or timezone',
    empty: 'No time zone found',
  },
} as const

function splitTimezoneLabel(label: string, fallbackValue: string) {
  const match = /^(.*) \((.*)\)$/.exec(label)
  return {
    title: match?.[1] ?? label,
    subtitle: match?.[2] ?? fallbackValue,
  }
}

export function TimezoneComboboxPanel({
  locale,
  value,
  extraValues = [],
  onValueChange,
}: {
  locale: Locale
  value: string
  extraValues?: string[]
  onValueChange: (nextValue: string) => void
}) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const filtered = useMemo(() => searchJetLagTimezones(deferredQuery, extraValues), [deferredQuery, extraValues])
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
          filtered.map((option) => {
            const display = splitTimezoneLabel(option.label, option.value)

            return (
              <button
                key={option.value}
                type="button"
                className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left hover:bg-muted"
                onClick={() => onValueChange(option.value)}
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium text-foreground">{display.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">{display.subtitle}</span>
                </span>
                {option.value === value ? <Check className="h-4 w-4 shrink-0 text-primary" /> : null}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
