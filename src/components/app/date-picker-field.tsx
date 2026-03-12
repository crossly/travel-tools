import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import { format, parse, isValid } from 'date-fns'
import { enUS, zhCN } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/types'

type DatePickerFieldProps = {
  value: string
  onChange: (nextValue: string) => void
  locale: Locale
  className?: string
}

const pickerCopy = {
  'zh-CN': {
    empty: '选择日期',
  },
  'en-US': {
    empty: 'Pick a date',
  },
} as const

const dateLocales = {
  'zh-CN': zhCN,
  'en-US': enUS,
} as const

function toDate(value: string) {
  const parsed = parse(value, 'yyyy-MM-dd', new Date())
  return isValid(parsed) ? parsed : undefined
}

export function DatePickerField({ value, onChange, locale, className }: DatePickerFieldProps) {
  const [open, setOpen] = useState(false)
  const selectedDate = toDate(value)
  const copy = pickerCopy[locale]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn('h-11 w-full justify-start rounded-xl px-3 text-left font-normal', className)}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          {selectedDate ? format(selectedDate, 'PPP', { locale: dateLocales[locale] }) : copy.empty}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(nextDate) => {
            if (!nextDate) return
            onChange(format(nextDate, 'yyyy-MM-dd'))
            setOpen(false)
          }}
          locale={dateLocales[locale]}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
