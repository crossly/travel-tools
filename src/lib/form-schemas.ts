import { z } from 'zod/v4-mini'
import { normalizeCurrency } from '@/lib/currencies'

export function requiredTextField(message: string) {
  return z.string().check(z.trim(), z.minLength(1, message))
}

export function currencyCodeField(message: string) {
  return z.string().check(
    z.trim(),
    z.refine((value) => /^[A-Z]{3}$/.test(normalizeCurrency(value)), message),
  )
}

export function positiveIntegerStringField(message: string) {
  return z.string().check(
    z.trim(),
    z.refine((value) => {
      const count = Number(value)
      return Number.isInteger(count) && count >= 1
    }, message),
  )
}

export function positiveNumberStringField(message: string) {
  return z.string().check(
    z.trim(),
    z.refine((value) => Number(value) > 0, message),
  )
}

export function optionalPositiveNumberStringField(message: string) {
  return z.string().check(
    z.trim(),
    z.refine((value) => !value || Number(value) > 0, message),
  )
}

export function createTripFormSchema(messages: {
  tripNameRequired: string
  currencyInvalid: string
  splitCountInvalid: string
}) {
  return z.object({
    tripName: requiredTextField(messages.tripNameRequired),
    expenseCurrency: currencyCodeField(messages.currencyInvalid),
    settlementCurrency: currencyCodeField(messages.currencyInvalid),
    splitCount: positiveIntegerStringField(messages.splitCountInvalid),
  })
}

export function createExpenseFormSchema(messages: {
  titleRequired: string
  amountRequired: string
  currencyInvalid: string
  splitCountInvalid: string
  manualFxInvalid: string
  dateRequired: string
}) {
  return z.object({
    title: requiredTextField(messages.titleRequired),
    amount: positiveNumberStringField(messages.amountRequired),
    currency: currencyCodeField(messages.currencyInvalid),
    spentAt: z.string().check(z.trim(), z.minLength(8, messages.dateRequired)),
    splitCount: positiveIntegerStringField(messages.splitCountInvalid),
    manualFx: optionalPositiveNumberStringField(messages.manualFxInvalid),
    note: z.string(),
  })
}

export function createImportFormSchema(message: string) {
  return z.object({
    content: requiredTextField(message),
  })
}
