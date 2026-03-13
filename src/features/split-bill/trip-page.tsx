import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Minus, Plus } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { ConfirmActionDialog } from '@/components/app/confirm-action-dialog'
import { InlineStatus } from '@/components/app/inline-status'
import { ExpenseFormCard } from './expense-form-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { deleteExpense, deleteTrip, fetchSnapshot, updateTripSettings } from '@/lib/api/client'
import { getLocalizedPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import { writeActiveTripId } from '@/lib/storage'
import type { Locale, TripSnapshot } from '@/lib/types'

export function TripPage({ locale, tripId, initialSnapshot = null }: { locale: Locale; tripId: string; initialSnapshot?: TripSnapshot | null }) {
  const { t, tError } = useI18n()
  const navigate = useNavigate()
  const [snapshot, setSnapshot] = useState<TripSnapshot | null>(initialSnapshot)
  const [isSavingSplitCount, setIsSavingSplitCount] = useState(false)
  const [status, setStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string; description?: string } | null>(null)

  useEffect(() => {
    writeActiveTripId(tripId)
    if (initialSnapshot) {
      setSnapshot(initialSnapshot)
      return
    }

    void fetchSnapshot(tripId)
      .then((data) => setSnapshot(data))
      .catch((error) => setStatus({ tone: 'danger', title: tError((error as Error).message) }))
  }, [initialSnapshot, tripId, tError])

  async function onChangeSplitCount(nextCount: number) {
    if (!Number.isInteger(nextCount) || nextCount < 1 || !snapshot || isSavingSplitCount) {
      setStatus({ tone: 'danger', title: t('home.invalidSplitCount') })
      return
    }
    try {
      setIsSavingSplitCount(true)
      setStatus(null)
      await updateTripSettings(tripId, nextCount)
      const latest = await fetchSnapshot(tripId)
      setSnapshot(latest)
    } catch (error) {
      setStatus({ tone: 'danger', title: tError((error as Error).message) })
    } finally {
      setIsSavingSplitCount(false)
    }
  }

  async function onDeleteExpense(expenseId: string) {
    try {
      await deleteExpense(tripId, expenseId)
      const latest = await fetchSnapshot(tripId)
      setSnapshot(latest)
    } catch (error) {
      setStatus({ tone: 'danger', title: tError((error as Error).message) })
    }
  }

  async function onDeleteTrip() {
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
      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.8fr)]">
        <div className="xl:order-1">
          <Card>
            <CardHeader>
              <CardTitle>{t('trip.expenseList')}</CardTitle>
              <CardDescription>{snapshot?.trip.name ?? t('common.loading')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {!snapshot ? (
                <>
                  <div className="rounded-2xl border border-border bg-muted p-4">
                    <div className="h-5 w-32 rounded bg-background/70" />
                    <div className="mt-2 h-4 w-24 rounded bg-background/60" />
                  </div>
                  <div className="rounded-2xl border border-border bg-muted p-4">
                    <div className="h-5 w-28 rounded bg-background/70" />
                    <div className="mt-2 h-4 w-20 rounded bg-background/60" />
                  </div>
                </>
              ) : snapshot.expenses.filter((item) => !item.deletedAt).length ? (
                snapshot.expenses
                  .filter((item) => !item.deletedAt)
                  .map((expense) => (
                    <div key={expense.id} className="rounded-2xl border border-border bg-muted p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium">{expense.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{expense.amountOriginal.toFixed(2)} {expense.originalCurrency}</p>
                        </div>
                        <ConfirmActionDialog
                          triggerLabel={t('trip.deleteExpense')}
                          title={t('trip.deleteExpenseConfirmTitle')}
                          description={t('trip.deleteExpenseConfirmBody')}
                          confirmLabel={t('trip.deleteExpenseAction')}
                          cancelLabel={t('common.cancel')}
                          onConfirm={() => onDeleteExpense(expense.id)}
                          triggerVariant="ghost"
                          triggerSize="sm"
                        />
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-muted-foreground">{t('trip.noExpenses')}</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 xl:order-2">
          <Card>
            <CardContent className="flex flex-wrap items-center justify-between gap-4 pt-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('trip.splitCount')}</p>
                <p className="mt-1 text-3xl font-semibold tabular-nums">{snapshot?.trip.splitCount ?? '--'}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                  disabled={!snapshot || isSavingSplitCount || snapshot.trip.splitCount <= 1}
                  aria-label={t('trip.decreaseSplitCount')}
                  onClick={() => void onChangeSplitCount((snapshot?.trip.splitCount ?? 1) - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                  disabled={!snapshot || isSavingSplitCount}
                  aria-label={t('trip.increaseSplitCount')}
                  onClick={() => void onChangeSplitCount((snapshot?.trip.splitCount ?? 0) + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="w-full text-sm text-muted-foreground">
                {isSavingSplitCount ? t('common.saving') : t('trip.splitCountSavedInline')}
              </p>
            </CardContent>
          </Card>

          <ExpenseFormCard
            locale={locale}
            tripId={tripId}
            snapshot={snapshot}
            submitLabel={t('trip.addExpense')}
            onSaved={async () => {
              const latest = await fetchSnapshot(tripId)
              setSnapshot(latest)
            }}
          />

          <Card>
            <CardContent className="grid gap-3 pt-6 md:grid-cols-2">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full"
                disabled={!snapshot}
                onClick={() => navigate({ to: getLocalizedPath(locale, `/tools/split-bill/${tripId}/settlement`) })}
              >
                {t('trip.settlement')}
              </Button>
              <ConfirmActionDialog
                triggerLabel={t('trip.deleteTrip')}
                title={t('trip.deleteTripConfirmTitle')}
                description={t('trip.deleteTripConfirmBody')}
                confirmLabel={t('trip.deleteTripAction')}
                cancelLabel={t('common.cancel')}
                onConfirm={onDeleteTrip}
                triggerDisabled={!snapshot}
                triggerSize="lg"
                triggerClassName="w-full"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {status ? <InlineStatus tone={status.tone} title={status.title} description={status.description} /> : null}
    </AppShell>
  )
}
