import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { AppShell } from '@/components/app/app-shell'
import { PageState } from '@/components/app/page-state'
import { ExpenseFormCard } from './expense-form-card'
import { Button } from '@/components/ui/button'
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
    <AppShell locale={locale} title={t('addExpense.title')} description={snapshot?.trip.name ?? ''} activeTool="split-bill">
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
      ) : (
        <ExpenseFormCard locale={locale} tripId={tripId} snapshot={snapshot} submitLabel={t('common.save')} navigateAfterSave />
      )}
    </AppShell>
  )
}
