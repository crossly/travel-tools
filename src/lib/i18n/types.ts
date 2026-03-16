import type { Locale } from '@/lib/types'

export type Messages = Record<Locale, Record<string, string>>
export type TranslationValues = Record<string, string | number>
