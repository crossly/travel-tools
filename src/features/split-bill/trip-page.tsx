import { useEffect, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { AppShell } from '@/components/app/app-shell'
import { ConfirmActionDialog } from '@/components/app/confirm-action-dialog'
import { FormField } from '@/components/app/form-field'
import { InlineStatus } from '@/components/app/inline-status'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { deleteExpense, deleteTrip, fetchSnapshot, updateTripSettings } from '@/lib/api/client'
import { getLocalizedPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import { writeActiveTripId } from '@/lib/storage'
import type { Locale, TripSnapshot } from '@/lib/types'

export function TripPage({ locale, tripId }: { locale: Locale; tripId: string }) {
  const { t, tError } = useI18n()
  const navigate = useNavigate()
  const [snapshot, setSnapshot] = useState<TripSnapshot | null>(null)
  const [splitCount, setSplitCount] = useState('1')
  const [status, setStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string; description?: string } | null>(null)

  useEffect(() => {
    writeActiveTripId(tripId)
    void fetchSnapshot(tripId)
      .then((data) => {
        setSnapshot(data)
        setSplitCount(String(data.trip.splitCount))
      })
      .catch((error) => setStatus({ tone: 'danger', title: tError((error as Error).message) }))
  }, [tripId])

  async function onSaveSplitCount() {
    const count = Number(splitCount)
    if (!Number.isInteger(count) || count < 1) {
      setStatus({ tone: 'danger', title: t('home.invalidSplitCount') })
      return
    }
    try {
      await updateTripSettings(tripId, count)
      setStatus({ tone: 'success', title: t('trip.splitCountSaved') })
      const latest = await fetchSnapshot(tripId)
      setSnapshot(latest)
    } catch (error) {
      setStatus({ tone: 'danger', title: tError((error as Error).message) })
    }
  }

  async function onDeleteExpense(expenseId: string) {
    if (!window.confirm(t('trip.deleteTripConfirmBody'))) return
    try {
      await deleteExpense(tripId, expenseId)
      const latest = await fetchSnapshot(tripId)
      setSnapshot(latest)
    } catch (error) {
      setStatus({ tone: 'danger', title: tError((error as Error).message) })
    }
  }

  async function onDeleteTrip() {
    if (!window.confirm(t('trip.deleteTripConfirmBody'))) return
    try {
      await deleteTrip(tripId)
      setStatus({ tone: 'success', title: t('trip.deleteTripSuccess') })
      navigate({ to: getLocalizedPath(locale, '/tools/split-bill') })
    } catch (error) {
      setStatus({ tone: 'danger', title: tError((error as Error).message) })
    }
  }

  return (
    <AppShell
      locale={locale}
      title={snapshot?.trip.name ?? t('trip.titleFallback')}
      description={snapshot ? `${snapshot.trip.expenseCurrency} / ${snapshot.trip.settlementCurrency}` : t('split.description')}
      activeTool="split-bill"
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('trip.expenseList')}</CardTitle>
              <CardDescription>{snapshot?.trip.name ?? t('common.loading')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {snapshot?.expenses.filter((item) => !item.deletedAt).length ? (
                snapshot.expenses
                  .filter((item) => !item.deletedAt)
                  .map((expense) => (
                    <div key={expense.id} className="rounded-2xl border border-border bg-muted p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium">{expense.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{expense.amountOriginal.toFixed(2)} {expense.originalCurrency}</p>
                        </div>
                        <Button type="button" variant="ghost" size="sm" onClick={() => void onDeleteExpense(expense.id)}>
                          {t('trip.deleteExpense')}
                        </Button>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-muted-foreground">{t('trip.noExpenses')}</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('trip.splitCount')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField label={t('trip.splitCount')}>
                <Input value={splitCount} onChange={(event) => setSplitCount(event.target.value)} inputMode="numeric" className="mono" />
              </FormField>
              <Button type="button" onClick={() => void onSaveSplitCount()}>{t('trip.saveSplitCount')}</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="grid gap-3 pt-6">
              <Button asChild>
                <Link to={getLocalizedPath(locale, `/tools/split-bill/${tripId}/add`)}>{t('trip.addExpense')}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to={getLocalizedPath(locale, `/tools/split-bill/${tripId}/settlement`)}>{t('trip.settlement')}</Link>
              </Button>
              <ConfirmActionDialog
                triggerLabel={t('trip.deleteTrip')}
                title={t('trip.deleteTripConfirmTitle')}
                description={t('trip.deleteTripConfirmBody')}
                confirmLabel={t('trip.deleteTripAction')}
                cancelLabel={t('common.cancel')}
                onConfirm={onDeleteTrip}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {status ? <InlineStatus tone={status.tone} title={status.title} description={status.description} /> : null}
    </AppShell>
  )
}
