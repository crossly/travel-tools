import '@/lib/i18n/messages/split-bill'
import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { AppShell } from '@/components/app/app-shell'
import { PageState } from '@/components/app/page-state'
import { ExpenseFormCard } from './expense-form-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchSnapshot } from '@/lib/api/client'
import { useI18n } from '@/lib/i18n'
import { getLocalizedPath } from '@/lib/site'
import type { Locale, TripSnapshot } from '@/lib/types'

export function AddExpensePage({ locale, tripId, initialSnapshot = null }: { locale: Locale; tripId: string; initialSnapshot?: TripSnapshot | null }) {
  const { t, tError } = useI18n()
  const navigate = useNavigate()
  const [snapshot, setSnapshot] = useState<TripSnapshot | null>(initialSnapshot)
  const [status, setStatus] = useState<{ tone: 'danger'; title: string; description?: string } | null>(null)

  useEffect(() => {
    if (initialSnapshot) {
      setSnapshot(initialSnapshot)
      return
    }

    void fetchSnapshot(tripId)
      .then((data) => setSnapshot(data))
      .catch((error) => setStatus({ tone: 'danger', title: tError((error as Error).message) }))
  }, [initialSnapshot, tError, tripId])

  return (
    <AppShell locale={locale} title={t('addExpense.title')} description={snapshot?.trip.name ?? t('addExpense.pageLead')} activeTool="split-bill">
      {status && !snapshot ? (
        <PageState
          tone="danger"
          title={status.title}
          description={status.description}
          action={
            <Button type="button" variant="secondary" onClick={() => navigate({ to: getLocalizedPath(locale, '/bill-splitter') })}>
              {t('common.backToSplitBill')}
            </Button>
          }
        />
      ) : !snapshot ? (
        <div className="grid gap-4">
          <Card className="border-primary/20 bg-[linear-gradient(145deg,var(--surface-floating),color-mix(in_oklab,var(--surface-floating)_78%,var(--accent)_22%))]">
            <CardContent className="grid gap-4 p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="space-y-2">
                <div className="h-4 w-28 rounded bg-background/70" />
                <div className="h-10 w-full max-w-xl rounded bg-background/70" />
              </div>
              <div className="h-11 w-full rounded-xl bg-background/60 md:w-48" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="grid gap-4 p-6">
              <div className="h-5 w-36 rounded bg-background/70" />
              <div className="grid gap-4 rounded-2xl border border-border/70 bg-[color:var(--surface-floating)] p-4">
                <div className="h-10 rounded bg-background/60" />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="h-10 rounded bg-background/60" />
                  <div className="h-10 rounded bg-background/60" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="h-10 rounded bg-background/60" />
                  <div className="h-10 rounded bg-background/60" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-4">
          <Card className="border-primary/20 bg-[linear-gradient(145deg,var(--surface-floating),color-mix(in_oklab,var(--surface-floating)_78%,var(--accent)_22%))]">
            <CardContent className="grid gap-4 p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{snapshot.trip.name}</p>
                <p className="display text-balance text-2xl font-semibold text-foreground">{t('addExpense.pageLead')}</p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full md:w-auto"
                onClick={() => navigate({ to: getLocalizedPath(locale, `/bill-splitter/${tripId}`) })}
              >
                {t('addExpense.backToTrip')}
              </Button>
            </CardContent>
          </Card>

          <ExpenseFormCard locale={locale} tripId={tripId} snapshot={snapshot} submitLabel={t('common.save')} navigateAfterSave />
        </div>
      )}
    </AppShell>
  )
}
