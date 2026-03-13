import { useEffect, useState } from 'react'
import { AppShell } from '@/components/app/app-shell'
import { InlineStatus } from '@/components/app/inline-status'
import { ExpenseFormCard } from './expense-form-card'
import { fetchSnapshot } from '@/lib/api/client'
import { useI18n } from '@/lib/i18n'
import type { Locale, TripSnapshot } from '@/lib/types'

export function AddExpensePage({ locale, tripId, initialSnapshot = null }: { locale: Locale; tripId: string; initialSnapshot?: TripSnapshot | null }) {
  const { t, tError } = useI18n()
  const [snapshot, setSnapshot] = useState<TripSnapshot | null>(initialSnapshot)
  const [status, setStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string; description?: string } | null>(null)

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
      <ExpenseFormCard locale={locale} tripId={tripId} snapshot={snapshot} submitLabel={t('common.save')} navigateAfterSave />
      {status ? <InlineStatus tone={status.tone} title={status.title} description={status.description} /> : null}
    </AppShell>
  )
}
