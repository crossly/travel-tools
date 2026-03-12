import { useEffect, useState } from 'react'
import { AppShell } from '@/components/app/app-shell'
import { InlineStatus } from '@/components/app/inline-status'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchSettlement, fetchSnapshot } from '@/lib/api/client'
import { useI18n } from '@/lib/i18n'
import { readDevice, writeDevice } from '@/lib/storage'
import type { DeviceIdentity, Locale, SettlementResponse, TripSnapshot } from '@/lib/types'

type SettlementPageData = {
  device: DeviceIdentity | null
  trip: TripSnapshot | null
  settlement: SettlementResponse | null
}

export function SettlementPage({ locale, tripId, initialData }: { locale: Locale; tripId: string; initialData?: SettlementPageData }) {
  const { t, tError } = useI18n()
  const resolvedInitialData = initialData ?? { device: null, trip: null, settlement: null }
  const [device, setDevice] = useState<DeviceIdentity | null>(resolvedInitialData.device)
  const [trip, setTrip] = useState<TripSnapshot | null>(resolvedInitialData.trip)
  const [settlement, setSettlement] = useState<SettlementResponse | null>(resolvedInitialData.settlement)
  const [status, setStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string; description?: string } | null>(null)

  function getParticipantLabel(memberId: string) {
    const index = Number(memberId.slice(1))
    if (memberId === 'p1') {
      return device?.displayName ? t('settlement.ownerLabel', { name: device.displayName }) : t('common.you')
    }
    return Number.isFinite(index) ? t('settlement.teammateLabel', { index: index - 1 }) : memberId
  }

  const summaryText = settlement?.transfers.length
    ? settlement.transfers.map((item) => `${getParticipantLabel(item.fromMemberId)} -> ${getParticipantLabel(item.toMemberId)}: ${item.amountBase.toFixed(2)}`).join('\n')
    : 'NO_TRANSFER_NEEDED'

  useEffect(() => {
    if (resolvedInitialData.device) {
      writeDevice(resolvedInitialData.device)
      return
    }

    const existingDevice = readDevice()
    if (existingDevice) {
      setDevice(existingDevice)
    }
  }, [resolvedInitialData.device])

  useEffect(() => {
    if (resolvedInitialData.trip && resolvedInitialData.settlement) {
      setTrip(resolvedInitialData.trip)
      setSettlement(resolvedInitialData.settlement)
      return
    }

    void Promise.all([fetchSnapshot(tripId), fetchSettlement(tripId)])
      .then(([snapshot, result]) => {
        setTrip(snapshot)
        setSettlement(result)
      })
      .catch((error) => setStatus({ tone: 'danger', title: tError((error as Error).message) }))
  }, [resolvedInitialData.settlement, resolvedInitialData.trip, tripId, tError])

  return (
    <AppShell locale={locale} title={t('settlement.title')} description={trip?.trip.name ?? ''} activeTool="split-bill">
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>{t('settlement.transferSuggestion')}</CardTitle>
            <CardDescription>{trip?.trip.settlementCurrency ?? ''}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {!settlement ? (
              <>
                <div className="rounded-2xl border border-border bg-muted p-4">
                  <div className="h-5 w-40 rounded bg-background/70" />
                  <div className="mt-2 h-4 w-24 rounded bg-background/60" />
                </div>
                <div className="rounded-2xl border border-border bg-muted p-4">
                  <div className="h-5 w-36 rounded bg-background/70" />
                  <div className="mt-2 h-4 w-20 rounded bg-background/60" />
                </div>
              </>
            ) : settlement.transfers.length ? settlement.transfers.map((transfer) => (
              <div key={`${transfer.fromMemberId}-${transfer.toMemberId}`} className="rounded-2xl border border-border bg-muted p-4">
                <p className="font-medium">{getParticipantLabel(transfer.fromMemberId)} → {getParticipantLabel(transfer.toMemberId)}</p>
                <p className="mt-1 mono text-sm text-muted-foreground">{transfer.amountBase.toFixed(2)} {trip?.trip.settlementCurrency}</p>
              </div>
            )) : <p className="text-sm text-muted-foreground">{t('settlement.noTransfer')}</p>}
            {settlement ? (
              <Button
                type="button"
                size="lg"
                className="w-full"
                onClick={async () => {
                  await navigator.clipboard.writeText(summaryText)
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
              {!settlement ? (
                <>
                  <div className="flex items-center justify-between">
                    <span>{t('settlement.expenseCurrency')}</span>
                    <div className="h-6 w-16 rounded bg-muted" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t('settlement.settlementCurrency')}</span>
                    <div className="h-6 w-16 rounded bg-muted" />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span>{t('settlement.expenseCurrency')}</span>
                    <Badge variant="outline">{settlement.currencySummary.expenseCurrency}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t('settlement.settlementCurrency')}</span>
                    <Badge variant="outline">{settlement.currencySummary.settlementCurrency}</Badge>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('settlement.fxDetails')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {!settlement ? (
                <>
                  <div className="rounded-2xl border border-border bg-muted p-4">
                    <div className="h-5 w-28 rounded bg-background/70" />
                    <div className="mt-2 h-4 w-44 rounded bg-background/60" />
                  </div>
                  <div className="rounded-2xl border border-border bg-muted p-4">
                    <div className="h-5 w-24 rounded bg-background/70" />
                    <div className="mt-2 h-4 w-40 rounded bg-background/60" />
                  </div>
                </>
              ) : settlement.expenseConversions.map((row) => (
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
