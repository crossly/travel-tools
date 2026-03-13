import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { CurrencyCombobox } from '@/components/app/currency-combobox'
import { DatePickerField } from '@/components/app/date-picker-field'
import { FormField } from '@/components/app/form-field'
import { InlineStatus } from '@/components/app/inline-status'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createExpense, fetchFxQuote } from '@/lib/api/client'
import { useI18n } from '@/lib/i18n'
import { normalizeCurrency } from '@/lib/currencies'
import { getLocalizedPath } from '@/lib/site'
import type { Locale, TripSnapshot } from '@/lib/types'

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

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
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState(snapshot?.trip.expenseCurrency ?? 'CNY')
  const [spentAt, setSpentAt] = useState(getToday())
  const [note, setNote] = useState('')
  const [manualFx, setManualFx] = useState('')
  const [splitCount, setSplitCount] = useState(snapshot ? String(snapshot.trip.splitCount) : '1')
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string; description?: string } | null>(null)

  useEffect(() => {
    if (!snapshot) return
    setCurrency(snapshot.trip.expenseCurrency)
    setSplitCount(String(snapshot.trip.splitCount))
  }, [snapshot])

  async function onCreate() {
    if (isSaving) return
    const numericAmount = Number(amount)
    const numericSplitCount = Number(splitCount)
    const normalizedCurrency = normalizeCurrency(currency)
    if (!title.trim() || !numericAmount || !/^[A-Z]{3}$/.test(normalizedCurrency)) {
      setStatus({ tone: 'danger', title: t('addExpense.incomplete') })
      return
    }

    try {
      setIsSaving(true)
      setStatus(null)
      let fxRateOverride: number | undefined
      if (manualFx.trim()) {
        fxRateOverride = Number(manualFx)
      } else if (snapshot && normalizedCurrency !== snapshot.trip.settlementCurrency) {
        const quote = await fetchFxQuote(tripId, normalizedCurrency, snapshot.trip.settlementCurrency, spentAt)
        fxRateOverride = quote.rate
      }
      await createExpense(tripId, {
        title: title.trim(),
        note: note.trim() || undefined,
        amountOriginal: numericAmount,
        originalCurrency: normalizedCurrency,
        spentAt,
        splitCount: numericSplitCount,
        fxRateOverride,
      })
      await onSaved?.()
      if (navigateAfterSave) {
        navigate({ to: getLocalizedPath(locale, `/tools/split-bill/${tripId}`) })
        return
      }
      setTitle('')
      setAmount('')
      setNote('')
      setManualFx('')
      setSpentAt(getToday())
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
      <CardContent className="grid gap-4">
        <FormField label={t('addExpense.labelTitle')}>
          <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder={t('addExpense.titlePlaceholder')} disabled={!snapshot || isSaving} />
        </FormField>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label={t('addExpense.labelAmount')}>
            <Input value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" disabled={!snapshot || isSaving} />
          </FormField>
          <FormField label={t('addExpense.labelCurrency')}>
            <CurrencyCombobox value={currency} onValueChange={setCurrency} locale={locale} disabled={!snapshot || isSaving} />
          </FormField>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label={t('addExpense.labelDate')}>
            <DatePickerField value={spentAt} onChange={setSpentAt} locale={locale} disabled={!snapshot || isSaving} />
          </FormField>
          <FormField label={t('addExpense.splitCount')}>
            <Input value={splitCount} onChange={(event) => setSplitCount(event.target.value)} inputMode="numeric" className="mono" disabled={!snapshot || isSaving} />
          </FormField>
        </div>
        <FormField label={t('addExpense.manualFx')}>
          <Input value={manualFx} onChange={(event) => setManualFx(event.target.value)} placeholder={t('addExpense.manualFxPlaceholder')} inputMode="decimal" disabled={!snapshot || isSaving} />
        </FormField>
        <FormField label={t('addExpense.labelNote')}>
          <Input value={note} onChange={(event) => setNote(event.target.value)} disabled={!snapshot || isSaving} />
        </FormField>
        <Button type="button" size="lg" className="w-full" onClick={() => void onCreate()} disabled={!snapshot || isSaving} aria-busy={isSaving}>
          {isSaving ? t('common.saving') : submitLabel}
        </Button>
        {status ? <InlineStatus tone={status.tone} title={status.title} description={status.description} /> : null}
      </CardContent>
    </Card>
  )
}
