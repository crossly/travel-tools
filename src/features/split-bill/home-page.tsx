import { useEffect, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { AppShell } from '@/components/app/app-shell'
import { FormField } from '@/components/app/form-field'
import { InlineStatus } from '@/components/app/inline-status'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { COMMON_CURRENCIES, normalizeCurrency } from '@/lib/currencies'
import { bootstrapDevice, createTrip, listTrips } from '@/lib/api/client'
import { getLocalizedPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import { readDevice, writeActiveTripId, writeDevice, writeLastTool } from '@/lib/storage'
import type { Locale, Trip } from '@/lib/types'

export function SplitBillHomePage({ locale }: { locale: Locale }) {
  const { t, tError } = useI18n()
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState('')
  const [tripName, setTripName] = useState('')
  const [expenseCurrency, setExpenseCurrency] = useState('CNY')
  const [settlementCurrency, setSettlementCurrency] = useState('CNY')
  const [splitCount, setSplitCount] = useState('2')
  const [editingIdentity, setEditingIdentity] = useState(true)
  const [status, setStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string; description?: string } | null>(null)
  const [trips, setTrips] = useState<Trip[]>([])
  const [loadingTrips, setLoadingTrips] = useState(false)
  const identityReady = !editingIdentity && displayName.trim().length > 0

  useEffect(() => {
    writeLastTool('split-bill')
    const device = readDevice()
    if (!device) return
    setDisplayName(device.displayName)
    setEditingIdentity(false)
    setLoadingTrips(true)
    void listTrips()
      .then(setTrips)
      .catch(() => setTrips([]))
      .finally(() => setLoadingTrips(false))
  }, [])

  async function onSaveIdentity() {
    const trimmed = displayName.trim()
    if (!trimmed) {
      setStatus({ tone: 'danger', title: t('home.enterNickname') })
      return
    }
    try {
      const existing = readDevice()
      const device = existing ? { ...existing, displayName: trimmed } : await bootstrapDevice(trimmed)
      writeDevice(device)
      setDisplayName(trimmed)
      setEditingIdentity(false)
      setStatus({ tone: 'success', title: t('settings.profileSaved') })
      const latestTrips = await listTrips().catch(() => [])
      setTrips(latestTrips)
    } catch (error) {
      setStatus({ tone: 'danger', title: tError((error as Error).message) })
    }
  }

  async function onCreateTrip() {
    if (!identityReady) {
      setStatus({ tone: 'warning', title: t('home.createTripLocked') })
      return
    }
    if (!tripName.trim()) {
      setStatus({ tone: 'danger', title: t('home.enterTripName') })
      return
    }
    const expense = normalizeCurrency(expenseCurrency)
    const settlement = normalizeCurrency(settlementCurrency)
    if (!/^[A-Z]{3}$/.test(expense) || !/^[A-Z]{3}$/.test(settlement)) {
      setStatus({ tone: 'danger', title: t('home.invalidCurrency') })
      return
    }
    const count = Number(splitCount)
    if (!Number.isInteger(count) || count < 1) {
      setStatus({ tone: 'danger', title: t('home.invalidSplitCount') })
      return
    }

    try {
      const trip = await createTrip(tripName.trim(), expense, settlement, count)
      writeActiveTripId(trip.id)
      navigate({ to: getLocalizedPath(locale, `/tools/split-bill/${trip.id}`) })
    } catch (error) {
      setStatus({ tone: 'danger', title: tError((error as Error).message) })
    }
  }

  return (
    <AppShell locale={locale} title={t('split.title')} description={t('split.description')} activeTool="split-bill">
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('home.identityStepTitle')}</CardTitle>
              <CardDescription>{t('home.identityStepDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingIdentity ? (
                <>
                  <FormField label={t('home.deviceNickname')}>
                    <Input value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder={t('home.nicknamePlaceholder')} />
                  </FormField>
                  <Button type="button" onClick={() => void onSaveIdentity()}>{t('home.saveNickname')}</Button>
                </>
              ) : (
                <div className="rounded-2xl border border-border bg-muted p-4">
                  <p className="font-medium">{displayName}</p>
                  <button type="button" className="mt-1 text-sm text-muted-foreground" onClick={() => setEditingIdentity(true)}>
                    {t('home.tapToEditNickname')}
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('home.tripStepTitle')}</CardTitle>
              <CardDescription>{identityReady ? t('home.tripStepDescription') : t('home.createTripLocked')}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField label={t('home.createTrip')}>
                <Input value={tripName} onChange={(event) => setTripName(event.target.value)} placeholder={t('home.tripNamePlaceholder')} disabled={!identityReady} />
              </FormField>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label={t('home.expenseCurrency')} helper={t('home.expenseCurrencyHelper')}>
                  <Input list="currency-options" value={expenseCurrency} onChange={(event) => setExpenseCurrency(event.target.value)} className="mono" disabled={!identityReady} />
                </FormField>
                <FormField label={t('home.settlementCurrency')} helper={t('home.settlementCurrencyHelper')}>
                  <Input list="currency-options" value={settlementCurrency} onChange={(event) => setSettlementCurrency(event.target.value)} className="mono" disabled={!identityReady} />
                </FormField>
              </div>
              <FormField label={t('home.splitCount')}>
                <Input value={splitCount} onChange={(event) => setSplitCount(event.target.value)} inputMode="numeric" className="mono" disabled={!identityReady} />
              </FormField>
              <Button type="button" onClick={() => void onCreateTrip()} disabled={!identityReady}>{t('home.createStart')}</Button>
              <datalist id="currency-options">
                {COMMON_CURRENCIES.map((code) => (
                  <option key={code} value={code} />
                ))}
              </datalist>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('home.recentStepTitle')}</CardTitle>
            <CardDescription>{t('home.recentStepDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loadingTrips ? <p className="text-sm text-muted-foreground">{t('common.loading')}</p> : null}
            {!loadingTrips && trips.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-5 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{t('home.noTrips')}</p>
                <p className="mt-1">{t('home.noTripsDescription')}</p>
              </div>
            ) : null}
            {trips.slice(0, 6).map((trip) => (
              <Link key={trip.id} to={getLocalizedPath(locale, `/tools/split-bill/${trip.id}`)} className="block rounded-2xl border border-border bg-muted p-4">
                <p className="font-medium">{trip.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{trip.expenseCurrency} / {trip.settlementCurrency}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {status ? <InlineStatus tone={status.tone} title={status.title} description={status.description} /> : null}
    </AppShell>
  )
}
