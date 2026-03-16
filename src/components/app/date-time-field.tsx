import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/types'
import { DatePickerField } from './date-picker-field'

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
  const { date, time } = splitDateTimeValue(value)

  return (
    <div className={cn('grid gap-3 sm:grid-cols-[minmax(0,1fr)_9rem]', className)}>
      <DatePickerField
        id={id}
        value={date}
        onChange={(nextDate) => onChange(joinDateTimeValue(nextDate, time))}
        locale={locale}
        disabled={disabled}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
      />
      <Input
        type="time"
        step={60}
        value={time}
        aria-label={timeLabel}
        disabled={disabled}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        onChange={(event) => onChange(joinDateTimeValue(date, event.target.value))}
      />
    </div>
  )
}
