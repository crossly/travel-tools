import { Suspense, lazy, useState } from 'react'
import { CalendarIcon, Clock3 } from 'lucide-react'
import { parse, isValid } from 'date-fns'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/types'

type DateTimeFieldProps = {
  id?: string
  value: string
  onChange: (nextValue: string) => void
  locale: Locale
  timeLabel: string
  className?: string
  disabled?: boolean
  'aria-describedby'?: string
  'aria-invalid'?: boolean | 'true' | 'false'
}

const pickerCopy = {
  'zh-CN': {
    emptyDate: '选择日期和时间',
    loading: '正在加载日历...',
  },
  'en-US': {
    emptyDate: 'Pick date and time',
    loading: 'Loading calendar...',
  },
} as const

const DatePickerPanel = lazy(async () => {
  const module = await import('./date-picker-panel')
  return { default: module.DatePickerPanel }
})

function splitDateTimeValue(value: string) {
  const [date = '', time = ''] = value.split('T', 2)
  return {
    date,
    time: /^\d{2}:\d{2}$/.test(time) ? time : '00:00',
  }
}

function joinDateTimeValue(date: string, time: string) {
  if (!date) return ''
  const normalizedTime = /^\d{2}:\d{2}$/.test(time) ? time : '00:00'
  return `${date}T${normalizedTime}`
}

function toDate(value: string) {
  const parsed = parse(value, 'yyyy-MM-dd', new Date())
  return isValid(parsed) ? parsed : undefined
}

function formatDisplayDate(value: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(value)
}

export function DateTimeField({
  id,
  value,
  onChange,
  locale,
  timeLabel,
  className,
  disabled = false,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
}: DateTimeFieldProps) {
  const [open, setOpen] = useState(false)
  const { date, time } = splitDateTimeValue(value)
  const selectedDate = toDate(date)
  const copy = pickerCopy[locale]

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
            <CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="min-w-0">
              <span className="block truncate text-foreground">
                {selectedDate ? formatDisplayDate(selectedDate, locale) : copy.emptyDate}
              </span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2 rounded-lg border border-border bg-[var(--surface-floating)] px-2.5 py-1 text-sm text-muted-foreground">
            <Clock3 className="h-3.5 w-3.5" />
            <span className="mono text-foreground">{time}</span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <div className="space-y-3">
          <Suspense fallback={<div className="px-3 py-6 text-sm text-muted-foreground">{copy.loading}</div>}>
            <DatePickerPanel
              locale={locale}
              selectedDate={selectedDate}
              disabled={disabled}
              onChange={(nextDate) => onChange(joinDateTimeValue(nextDate, time))}
            />
          </Suspense>
          <div className="border-t border-border px-2 pt-3">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Clock3 className="h-4 w-4 text-muted-foreground" />
              <span>{timeLabel}</span>
              <Input
                type="time"
                step={60}
                value={time}
                aria-label={timeLabel}
                disabled={disabled}
                aria-describedby={ariaDescribedBy}
                aria-invalid={ariaInvalid}
                className="ml-auto w-32"
                onChange={(event) => onChange(joinDateTimeValue(date, event.target.value))}
              />
            </label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
