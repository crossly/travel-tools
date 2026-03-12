import { format } from 'date-fns'
import { enUS, zhCN } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import type { Locale } from '@/lib/types'

const dateLocales = {
  'zh-CN': zhCN,
  'en-US': enUS,
} as const

export function DatePickerPanel({
  locale,
  selectedDate,
  disabled,
  onChange,
}: {
  locale: Locale
  selectedDate: Date | undefined
  disabled: boolean
  onChange: (nextValue: string) => void
}) {
  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={(nextDate) => {
        if (!nextDate) return
        onChange(format(nextDate, 'yyyy-MM-dd'))
      }}
      locale={dateLocales[locale]}
      initialFocus
      disabled={disabled}
    />
  )
}
