import { useEffect, useState } from 'react'
import { AppShell } from '@/components/app/app-shell'
import { InlineStatus } from '@/components/app/inline-status'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchSettlement, fetchSnapshot } from '@/lib/api/client'
import { useI18n } from '@/lib/i18n'
import type { Locale, SettlementResponse, TripSnapshot } from '@/lib/types'

export function SettlementPage({ locale, tripId }: { locale: Locale; tripId: string }) {
  const { t, tError } = useI18n()
  const [trip, setTrip] = useState<TripSnapshot | null>(null)
  const [settlement, setSettlement] = useState<SettlementResponse | null>(null)
  const [status, setStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string; description?: string } | null>(null)

  useEffect(() => {
    void Promise.all([fetchSnapshot(tripId), fetchSettlement(tripId)])
      .then(([snapshot, result]) => {
        setTrip(snapshot)
        setSettlement(result)
      })
      .catch((error) => setStatus({ tone: 'danger', title: tError((error as Error).message) }))
  }, [tripId])

  return (
    <AppShell locale={locale} title={t('settlement.title')} description={trip?.trip.name ?? ''} activeTool="split-bill">
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>{t('settlement.transferSuggestion')}</CardTitle>
            <CardDescription>{trip?.trip.settlementCurrency ?? ''}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {settlement?.transfers.length ? settlement.transfers.map((transfer) => (
              <div key={`${transfer.fromMemberId}-${transfer.toMemberId}`} className="rounded-2xl border border-border bg-muted p-4">
                <p className="font-medium">{transfer.fromMemberId} → {transfer.toMemberId}</p>
                <p className="mt-1 mono text-sm text-muted-foreground">{transfer.amountBase.toFixed(2)} {trip?.trip.settlementCurrency}</p>
              </div>
            )) : <p className="text-sm text-muted-foreground">{t('settlement.noTransfer')}</p>}
            {settlement ? (
              <Button
                type="button"
                variant="secondary"
                onClick={async () => {
                  await navigator.clipboard.writeText(settlement.summaryText)
                  setStatus({ tone: 'success', title: t('settlement.copySuccess') })
                }}
              >
                {t('settlement.copyText')}
              </Button>
            ) : null}
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('settlement.currencySummary')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>{t('settlement.expenseCurrency')}</span>
                <Badge variant="outline">{settlement?.currencySummary.expenseCurrency ?? '---'}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>{t('settlement.settlementCurrency')}</span>
                <Badge variant="outline">{settlement?.currencySummary.settlementCurrency ?? '---'}</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('settlement.fxDetails')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {settlement?.expenseConversions.map((row) => (
                <div key={row.expenseId} className="rounded-2xl border border-border bg-muted p-4">
                  <p className="font-medium">{row.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {row.originalAmount.toFixed(2)} {row.originalCurrency} → {row.settlementAmount.toFixed(2)} {trip?.trip.settlementCurrency}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      {status ? <InlineStatus tone={status.tone} title={status.title} description={status.description} /> : null}
    </AppShell>
  )
}
