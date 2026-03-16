import { Suspense, lazy, useState } from 'react'
import { CalendarIcon, Clock3 } from 'lucide-react'
import { parse, isValid } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
    hour: '小时',
    minute: '分钟',
  },
  'en-US': {
    emptyDate: 'Pick date and time',
    loading: 'Loading calendar...',
    hour: 'hour',
    minute: 'minute',
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

const hourOptions = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0'))
const minuteOptions = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'))

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
  const [hour, minute] = time.split(':')
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
          <span className="flex shrink-0 items-center gap-2 rounded-full border border-border/70 bg-muted/60 px-3 py-1.5 text-sm text-muted-foreground">
            <Clock3 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span className="mono font-medium text-muted-foreground">{time}</span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[min(24rem,var(--radix-popover-trigger-width))] border-0 bg-transparent p-0 shadow-none">
        <div className="rounded-2xl border border-border bg-[var(--surface-floating)] p-2 shadow-2xl">
          <Suspense fallback={<div className="px-3 py-6 text-sm text-muted-foreground">{copy.loading}</div>}>
            <DatePickerPanel
              locale={locale}
              selectedDate={selectedDate}
              disabled={disabled}
              onChange={(nextDate) => onChange(joinDateTimeValue(nextDate, time))}
            />
          </Suspense>
          <div className="space-y-3 border-t border-border px-2 pt-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Clock3 className="h-4 w-4 text-muted-foreground" />
              <span>{timeLabel}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Select
                disabled={disabled}
                value={hour}
                onValueChange={(nextHour) => onChange(joinDateTimeValue(date, `${nextHour}:${minute}`))}
              >
                <SelectTrigger
                  aria-label={`${timeLabel} ${copy.hour}`}
                  className="h-11 w-full rounded-xl border-border bg-background px-3 text-left font-medium shadow-none"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {hourOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                disabled={disabled}
                value={minute}
                onValueChange={(nextMinute) => onChange(joinDateTimeValue(date, `${hour}:${nextMinute}`))}
              >
                <SelectTrigger
                  aria-label={`${timeLabel} ${copy.minute}`}
                  className="h-11 w-full rounded-xl border-border bg-background px-3 text-left font-medium shadow-none"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {minuteOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
