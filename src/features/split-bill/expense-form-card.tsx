import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type output as Output } from 'zod/v4-mini'
import { useNavigate } from '@tanstack/react-router'
import { CurrencyCombobox } from '@/components/app/currency-combobox'
import { DatePickerField } from '@/components/app/date-picker-field'
import { InlineStatus } from '@/components/app/inline-status'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createExpense, fetchFxQuote } from '@/lib/api/client'
import { createExpenseFormSchema } from '@/lib/form-schemas'
import { useI18n } from '@/lib/i18n'
import { normalizeCurrency } from '@/lib/currencies'
import { getLocalizedPath } from '@/lib/site'
import type { Locale, TripSnapshot } from '@/lib/types'

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

type ExpenseFormValues = Output<ReturnType<typeof createExpenseFormSchema>>

export function ExpenseFormCard({
  locale,
  tripId,
  snapshot,
  submitLabel,
  onSaved,
  navigateAfterSave = false,
}: {
  locale: Locale
  tripId: string
  snapshot: TripSnapshot | null
  submitLabel: string
  onSaved?: () => Promise<void> | void
  navigateAfterSave?: boolean
}) {
  const { t, tError } = useI18n()
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string; description?: string } | null>(null)
  const [fxQuoteState, setFxQuoteState] = useState<{ status: 'idle' | 'loading' | 'ready' | 'error'; rate?: number }>({ status: 'idle' })
  const expenseSchema = useMemo(() => createExpenseFormSchema({
    titleRequired: t('addExpense.titleRequired'),
    amountRequired: t('addExpense.amountRequired'),
    currencyInvalid: t('addExpense.currencyInvalid'),
    splitCountInvalid: t('home.invalidSplitCount'),
    manualFxInvalid: t('addExpense.manualFxInvalid'),
    dateRequired: t('addExpense.labelDate'),
  }), [t])
  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: '',
      amount: '',
      currency: snapshot?.trip.expenseCurrency ?? 'CNY',
      spentAt: getToday(),
      splitCount: snapshot ? String(snapshot.trip.splitCount) : '1',
      manualFx: '',
      note: '',
    },
  })
  const amountValue = form.watch('amount')
  const currencyValue = form.watch('currency')
  const spentAtValue = form.watch('spentAt')
  const manualFxValue = form.watch('manualFx')
  const settlementCurrency = snapshot?.trip.settlementCurrency ?? ''
  const normalizedCurrency = normalizeCurrency(currencyValue || (snapshot?.trip.expenseCurrency ?? 'CNY'))
  const numericAmount = Number(amountValue)
  const hasConvertibleAmount = Number.isFinite(numericAmount) && numericAmount > 0
  const manualFxRate = Number(manualFxValue)
  const hasManualFx = manualFxValue.trim().length > 0 && Number.isFinite(manualFxRate) && manualFxRate > 0

  useEffect(() => {
    if (!snapshot) return
    form.setValue('currency', snapshot.trip.expenseCurrency)
    form.setValue('splitCount', String(snapshot.trip.splitCount))
  }, [form, snapshot])

  useEffect(() => {
    if (!snapshot || !hasConvertibleAmount || !spentAtValue) {
      setFxQuoteState({ status: 'idle' })
      return
    }

    if (normalizedCurrency === settlementCurrency || manualFxValue.trim()) {
      setFxQuoteState({ status: 'idle' })
      return
    }

    let cancelled = false
    const timeoutId = window.setTimeout(() => {
      setFxQuoteState((current) => ({ status: 'loading', rate: current.rate }))
      void fetchFxQuote(tripId, normalizedCurrency, settlementCurrency, spentAtValue)
        .then((quote) => {
          if (cancelled) return
          setFxQuoteState({ status: 'ready', rate: quote.rate })
        })
        .catch(() => {
          if (cancelled) return
          setFxQuoteState({ status: 'error' })
        })
    }, 250)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [snapshot, hasConvertibleAmount, manualFxValue, normalizedCurrency, settlementCurrency, spentAtValue, tripId])

  const convertedAmount = hasManualFx
    ? (numericAmount * manualFxRate).toFixed(2)
    : fxQuoteState.status === 'ready' && fxQuoteState.rate
      ? (numericAmount * fxQuoteState.rate).toFixed(2)
      : null
  const formattedOriginalAmount = hasConvertibleAmount ? numericAmount.toFixed(2) : null
  const fxPreviewMessage = !hasConvertibleAmount
    ? t('addExpense.fxPreviewEmpty')
    : normalizedCurrency === settlementCurrency
      ? t('addExpense.fxPreviewNoConversion')
      : hasManualFx && formattedOriginalAmount && convertedAmount
        ? t('addExpense.fxPreviewManual', {
            amount: formattedOriginalAmount,
            fromCurrency: normalizedCurrency,
            converted: convertedAmount,
            toCurrency: settlementCurrency,
          })
        : fxQuoteState.status === 'loading'
          ? t('addExpense.fxPreviewPending')
          : fxQuoteState.status === 'ready' && formattedOriginalAmount && convertedAmount
            ? t('addExpense.fxPreviewAuto', {
                amount: formattedOriginalAmount,
                fromCurrency: normalizedCurrency,
                converted: convertedAmount,
                toCurrency: settlementCurrency,
              })
            : fxQuoteState.status === 'error'
              ? t('addExpense.fxPreviewUnavailable')
              : t('addExpense.fxPreviewPending')

  async function onCreate(values: ExpenseFormValues) {
    if (isSaving) return

    try {
      setIsSaving(true)
      setStatus(null)
      let fxRateOverride: number | undefined
      const normalizedCurrency = normalizeCurrency(values.currency)
      const numericAmount = Number(values.amount)
      const numericSplitCount = Number(values.splitCount)
      if (values.manualFx.trim()) {
        fxRateOverride = Number(values.manualFx)
      } else if (snapshot && normalizedCurrency !== snapshot.trip.settlementCurrency) {
        const quote = await fetchFxQuote(tripId, normalizedCurrency, snapshot.trip.settlementCurrency, values.spentAt)
        fxRateOverride = quote.rate
      }
      await createExpense(tripId, {
        title: values.title.trim(),
        note: values.note.trim() || undefined,
        amountOriginal: numericAmount,
        originalCurrency: normalizedCurrency,
        spentAt: values.spentAt,
        splitCount: numericSplitCount,
        fxRateOverride,
      })
      await onSaved?.()
      if (navigateAfterSave) {
        navigate({ to: getLocalizedPath(locale, `/bill-splitter/${tripId}`) })
        return
      }
      form.reset({
        title: '',
        amount: '',
        currency: snapshot?.trip.expenseCurrency ?? 'CNY',
        spentAt: getToday(),
        splitCount: snapshot ? String(snapshot.trip.splitCount) : '1',
        manualFx: '',
        note: '',
      })
      setStatus({ tone: 'success', title: t('addExpense.saved') })
    } catch (error) {
      setStatus({ tone: 'danger', title: tError((error as Error).message) })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('addExpense.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              void form.handleSubmit((values) => onCreate(values))(event)
            }}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('addExpense.labelTitle')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('addExpense.titlePlaceholder')}
                      disabled={!snapshot || isSaving}
                      onChange={(event) => {
                        field.onChange(event)
                        setStatus(null)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('addExpense.labelAmount')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        inputMode="decimal"
                        disabled={!snapshot || isSaving}
                        onChange={(event) => {
                          field.onChange(event)
                          setStatus(null)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('addExpense.labelCurrency')}</FormLabel>
                    <FormControl>
                      <CurrencyCombobox
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value)
                          setStatus(null)
                        }}
                        locale={locale}
                        disabled={!snapshot || isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="spentAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('addExpense.labelDate')}</FormLabel>
                    <FormControl>
                      <DatePickerField
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value)
                          setStatus(null)
                        }}
                        locale={locale}
                        disabled={!snapshot || isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="splitCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('addExpense.splitCount')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        inputMode="numeric"
                        className="mono"
                        disabled={!snapshot || isSaving}
                        onChange={(event) => {
                          field.onChange(event)
                          setStatus(null)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="manualFx"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('addExpense.manualFx')}</FormLabel>
                  <p className="text-sm text-muted-foreground">{t('addExpense.manualFxDescription')}</p>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('addExpense.manualFxPlaceholder')}
                      inputMode="decimal"
                      disabled={!snapshot || isSaving}
                      onChange={(event) => {
                        field.onChange(event)
                        setStatus(null)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="rounded-2xl border border-border/70 bg-[color:var(--surface-floating)] p-4">
              <p className="text-sm font-medium text-foreground">{t('addExpense.fxPreviewTitle')}</p>
              <p className="mt-2 text-sm text-muted-foreground">{fxPreviewMessage}</p>
            </div>
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('addExpense.labelNote')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!snapshot || isSaving}
                      onChange={(event) => {
                        field.onChange(event)
                        setStatus(null)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full" disabled={!snapshot || isSaving} aria-busy={isSaving}>
              {isSaving ? t('common.saving') : submitLabel}
            </Button>
          </form>
        </Form>
        {status ? <InlineStatus tone={status.tone} title={status.title} description={status.description} /> : null}
      </CardContent>
    </Card>
  )
}
