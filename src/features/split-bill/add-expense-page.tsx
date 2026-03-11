import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { AppShell } from '@/components/app/app-shell'
import { CurrencyCombobox } from '@/components/app/currency-combobox'
import { FormField } from '@/components/app/form-field'
import { InlineStatus } from '@/components/app/inline-status'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createExpense, fetchFxQuote, fetchSnapshot } from '@/lib/api/client'
import { normalizeCurrency } from '@/lib/currencies'
import { getLocalizedPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import type { Locale, TripSnapshot } from '@/lib/types'

export function AddExpensePage({ locale, tripId }: { locale: Locale; tripId: string }) {
  const { t, tError } = useI18n()
  const navigate = useNavigate()
  const [snapshot, setSnapshot] = useState<TripSnapshot | null>(null)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('CNY')
  const [spentAt, setSpentAt] = useState(new Date().toISOString().slice(0, 10))
  const [note, setNote] = useState('')
  const [manualFx, setManualFx] = useState('')
  const [splitCount, setSplitCount] = useState('1')
  const [status, setStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string; description?: string } | null>(null)

  useEffect(() => {
    void fetchSnapshot(tripId)
      .then((data) => {
        setSnapshot(data)
        setCurrency(data.trip.expenseCurrency)
        setSplitCount(String(data.trip.splitCount))
      })
      .catch((error) => setStatus({ tone: 'danger', title: tError((error as Error).message) }))
  }, [tripId])

  async function onCreate() {
    const numericAmount = Number(amount)
    const numericSplitCount = Number(splitCount)
    const normalizedCurrency = normalizeCurrency(currency)
    if (!title.trim() || !numericAmount || !/^[A-Z]{3}$/.test(normalizedCurrency)) {
      setStatus({ tone: 'danger', title: t('addExpense.incomplete') })
      return
    }

    try {
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
      navigate({ to: getLocalizedPath(locale, `/tools/split-bill/${tripId}`) })
    } catch (error) {
      setStatus({ tone: 'danger', title: tError((error as Error).message) })
    }
  }

  return (
    <AppShell locale={locale} title={t('addExpense.title')} description={snapshot?.trip.name ?? ''} activeTool="split-bill">
      <Card>
        <CardHeader>
          <CardTitle>{t('addExpense.title')}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <FormField label={t('addExpense.labelTitle')}>
            <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder={t('addExpense.titlePlaceholder')} />
          </FormField>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label={t('addExpense.labelAmount')}>
              <Input value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" />
            </FormField>
            <FormField label={t('addExpense.labelCurrency')}>
              <CurrencyCombobox value={currency} onValueChange={setCurrency} locale={locale} />
            </FormField>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label={t('addExpense.labelDate')}>
              <Input type="date" value={spentAt} onChange={(event) => setSpentAt(event.target.value)} />
            </FormField>
            <FormField label={t('addExpense.splitCount')}>
              <Input value={splitCount} onChange={(event) => setSplitCount(event.target.value)} inputMode="numeric" className="mono" />
            </FormField>
          </div>
          <FormField label={t('addExpense.manualFx')}>
            <Input value={manualFx} onChange={(event) => setManualFx(event.target.value)} placeholder={t('addExpense.manualFxPlaceholder')} inputMode="decimal" />
          </FormField>
          <FormField label={t('addExpense.labelNote')}>
            <Input value={note} onChange={(event) => setNote(event.target.value)} />
          </FormField>
          <Button type="button" onClick={() => void onCreate()}>{t('common.save')}</Button>
        </CardContent>
      </Card>
      {status ? <InlineStatus tone={status.tone} title={status.title} description={status.description} /> : null}
    </AppShell>
  )
}
