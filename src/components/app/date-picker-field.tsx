import { Suspense, lazy, useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import { parse, isValid } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { translate } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/types'

type DatePickerFieldProps = {
  id?: string
  value: string
  onChange: (nextValue: string) => void
  locale: Locale
  className?: string
  disabled?: boolean
  'aria-describedby'?: string
  'aria-invalid'?: boolean | 'true' | 'false'
}

const DatePickerPanel = lazy(async () => {
  const module = await import('./date-picker-panel')
  return { default: module.DatePickerPanel }
})

function toDate(value: string) {
  const parsed = parse(value, 'yyyy-MM-dd', new Date())
  return isValid(parsed) ? parsed : undefined
}

function formatDisplayDate(value: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(value)
}

export function DatePickerField({
  id,
  value,
  onChange,
  locale,
  className,
  disabled = false,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
}: DatePickerFieldProps) {
  const [open, setOpen] = useState(false)
  const selectedDate = toDate(value)
  const emptyLabel = translate(locale, 'common.pickDate')
  const loadingLabel = translate(locale, 'common.loadingCalendar')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          className={cn('h-11 w-full justify-start rounded-xl px-3 text-left font-normal', className)}
          disabled={disabled}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          {selectedDate ? formatDisplayDate(selectedDate, locale) : emptyLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <Suspense fallback={<div className="px-3 py-6 text-sm text-muted-foreground">{loadingLabel}</div>}>
          <DatePickerPanel
            locale={locale}
            selectedDate={selectedDate}
            disabled={disabled}
            onChange={(nextValue) => {
              onChange(nextValue)
              setOpen(false)
            }}
          />
        </Suspense>
      </PopoverContent>
    </Popover>
  )
}
