import '@/lib/i18n/messages/split-bill'
import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Minus, Plus } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { ConfirmActionDialog } from '@/components/app/confirm-action-dialog'
import { InlineStatus } from '@/components/app/inline-status'
import { PageState } from '@/components/app/page-state'
import { ExpenseFormCard } from './expense-form-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { deleteExpense, deleteTrip, fetchSnapshot, updateTripSettings } from '@/lib/api/client'
import { getLocalizedPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import { clearActiveTripId, writeActiveTripId } from '@/lib/storage'
import type { Locale, TripSnapshot } from '@/lib/types'

export function TripPage({ locale, tripId, initialSnapshot = null }: { locale: Locale; tripId: string; initialSnapshot?: TripSnapshot | null }) {
  const { t, tError } = useI18n()
  const navigate = useNavigate()
  const [snapshot, setSnapshot] = useState<TripSnapshot | null>(initialSnapshot)
  const [isSavingSplitCount, setIsSavingSplitCount] = useState(false)
  const [hasSavedSplitCount, setHasSavedSplitCount] = useState(false)
  const [pageStatus, setPageStatus] = useState<{ tone: 'danger'; title: string; description?: string } | null>(null)
  const [status, setStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string; description?: string } | null>(null)
  const activeExpenses = snapshot?.expenses.filter((item) => !item.deletedAt) ?? []

  useEffect(() => {
    writeActiveTripId(tripId)
    if (initialSnapshot) {
      setSnapshot(initialSnapshot)
      return
    }

    void fetchSnapshot(tripId)
      .then((data) => setSnapshot(data))
      .catch((error) => setPageStatus({ tone: 'danger', title: tError((error as Error).message) }))
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
      setHasSavedSplitCount(true)
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
      clearActiveTripId()
      setStatus({ tone: 'success', title: t('trip.deleteTripSuccess') })
      navigate({ to: getLocalizedPath(locale, '/bill-splitter') })
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
      {pageStatus && !snapshot ? (
        <PageState
          tone="danger"
          title={pageStatus.title}
          description={pageStatus.description}
          action={
            <Button type="button" variant="secondary" onClick={() => navigate({ to: getLocalizedPath(locale, '/bill-splitter') })}>
              {t('common.backToSplitBill')}
            </Button>
          }
        />
      ) : null}
      {!pageStatus || snapshot ? (
      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.8fr)]">
        <div className="order-2 xl:order-1">
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
              ) : activeExpenses.length ? (
                activeExpenses.map((expense) => (
                    <div key={expense.id} className="rounded-2xl border border-border bg-muted p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium">{expense.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{expense.amountOriginal.toFixed(2)} {expense.originalCurrency}</p>
                          <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span className="rounded-full border border-border/70 bg-background/80 px-2.5 py-1">
                              {t('trip.expenseDateLabel', { date: expense.spentAt })}
                            </span>
                            <span className="rounded-full border border-border/70 bg-background/80 px-2.5 py-1">
                              {t('trip.expenseSplitCountLabel', { count: expense.splitCount })}
                            </span>
                          </div>
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
                <div className="rounded-2xl border border-dashed border-border/80 bg-[color:var(--surface-floating)] p-5">
                  <p className="text-base font-semibold text-foreground">{t('trip.emptyExpensesTitle')}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{t('trip.emptyExpensesDescription')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="order-1 grid gap-4 xl:order-2">
          <Card className="border-primary/20 bg-[linear-gradient(145deg,var(--surface-floating),color-mix(in_oklab,var(--surface-floating)_78%,var(--accent)_22%))]">
            <CardContent className="grid gap-3 p-6 md:grid-cols-[minmax(0,1.3fr)_auto] md:items-center">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{snapshot?.trip.name ?? t('trip.titleFallback')}</p>
                <p className="display text-balance text-2xl font-semibold text-foreground">{t('trip.addExpense')}</p>
                <p className="text-sm leading-6 text-muted-foreground">{t('trip.splitCountHint')}</p>
              </div>
              <Button
                type="button"
                size="lg"
                className="w-full md:w-auto"
                disabled={!snapshot}
                onClick={() => navigate({ to: getLocalizedPath(locale, `/bill-splitter/${tripId}/add`) })}
              >
                {t('trip.addExpense')}
              </Button>
            </CardContent>
          </Card>

          <Card tone="soft">
            <CardContent className="grid gap-3 pt-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                <p className="text-sm font-medium text-muted-foreground">{t('trip.summaryExpenses')}</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">{snapshot ? activeExpenses.length : '--'}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                <p className="text-sm font-medium text-muted-foreground">{t('trip.splitCount')}</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">{snapshot?.trip.splitCount ?? '--'}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                <p className="text-sm font-medium text-muted-foreground">{t('trip.summarySettlementCurrency')}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{snapshot?.trip.settlementCurrency ?? '--'}</p>
              </div>
            </CardContent>
          </Card>

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
                {isSavingSplitCount
                  ? t('common.saving')
                  : hasSavedSplitCount
                    ? t('trip.splitCountSavedInline')
                    : t('trip.splitCountHint')}
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
                onClick={() => navigate({ to: getLocalizedPath(locale, `/bill-splitter/${tripId}/settlement`) })}
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
      ) : null}

      {status && (!pageStatus || snapshot) ? <InlineStatus tone={status.tone} title={status.title} description={status.description} /> : null}
    </AppShell>
  )
}
