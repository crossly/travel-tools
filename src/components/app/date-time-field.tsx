import { Suspense, lazy, useState } from 'react'
import { CalendarIcon, ChevronDown, Clock3 } from 'lucide-react'
import { parse, isValid } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { translate } from '@/lib/i18n'
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
  const emptyDateLabel = translate(locale, 'common.pickDateTime')
  const loadingLabel = translate(locale, 'common.loadingCalendar')
  const hourLabel = translate(locale, 'common.hour')
  const minuteLabel = translate(locale, 'common.minute')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          className={cn('min-h-11 h-auto w-full justify-between rounded-xl px-3 py-2 text-left font-normal whitespace-normal', className)}
          disabled={disabled}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
        >
          <span className="flex min-w-0 items-start gap-3">
            <CalendarIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="min-w-0 space-y-1">
              <span className="block truncate font-medium text-foreground">
                {selectedDate ? formatDisplayDate(selectedDate, locale) : emptyDateLabel}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock3 className="h-3.5 w-3.5 shrink-0" />
                <span className="mono">{time}</span>
              </span>
            </span>
          </span>
          <ChevronDown className="ml-3 mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto max-w-[calc(100vw-2rem)] border-0 bg-transparent p-0 shadow-none">
        <div className="w-fit max-w-full rounded-2xl border border-border bg-[var(--surface-floating)] p-2 shadow-2xl">
          <Suspense fallback={<div className="px-3 py-6 text-sm text-muted-foreground">{loadingLabel}</div>}>
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
            <div className="space-y-3">
              <label className="space-y-1.5">
                <span className="block text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                  {hourLabel}
                </span>
                <Select
                  disabled={disabled}
                  value={hour}
                  onValueChange={(nextHour) => onChange(joinDateTimeValue(date, `${nextHour}:${minute}`))}
                >
                  <SelectTrigger
                    aria-label={`${timeLabel} ${hourLabel}`}
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
              </label>
              <label className="space-y-1.5">
                <span className="block text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                  {minuteLabel}
                </span>
                <Select
                  disabled={disabled}
                  value={minute}
                  onValueChange={(nextMinute) => onChange(joinDateTimeValue(date, `${hour}:${nextMinute}`))}
                >
                  <SelectTrigger
                    aria-label={`${timeLabel} ${minuteLabel}`}
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
              </label>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
