import { useEffect, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { AppShell } from '@/components/app/app-shell'
import { CurrencyCombobox } from '@/components/app/currency-combobox'
import { FormField } from '@/components/app/form-field'
import { InlineStatus } from '@/components/app/inline-status'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { normalizeCurrency } from '@/lib/currencies'
import { bootstrapDevice, createTrip, listTrips } from '@/lib/api/client'
import { getLocalizedPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import { readDevice, writeActiveTripId, writeDevice, writeLastTool } from '@/lib/storage'
import type { DeviceIdentity, Locale, Trip } from '@/lib/types'

type SplitBillHomePageData = {
  device: DeviceIdentity | null
  trips: Trip[]
}

export function SplitBillHomePage({ locale, initialData }: { locale: Locale; initialData: SplitBillHomePageData }) {
  const { t, tError } = useI18n()
  const navigate = useNavigate()
  const [device, setDevice] = useState<DeviceIdentity | null>(initialData.device)
  const [tripName, setTripName] = useState('')
  const [expenseCurrency, setExpenseCurrency] = useState('CNY')
  const [settlementCurrency, setSettlementCurrency] = useState('CNY')
  const [splitCount, setSplitCount] = useState('2')
  const [fieldErrors, setFieldErrors] = useState<{ tripName?: string; expenseCurrency?: string; settlementCurrency?: string; splitCount?: string }>({})
  const [bootstrappingIdentity, setBootstrappingIdentity] = useState(false)
  const [status, setStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string; description?: string } | null>(null)
  const [trips, setTrips] = useState<Trip[]>(initialData.trips)
  const [loadingTrips, setLoadingTrips] = useState(false)
  const identityReady = device !== null

  async function loadTrips() {
    setLoadingTrips(true)
    const nextTrips = await listTrips().catch(() => [])
    setTrips(nextTrips)
    setLoadingTrips(false)
  }

  useEffect(() => {
    writeLastTool('split-bill')
    if (initialData.device) {
      writeDevice(initialData.device)
      return
    }

    const existingDevice = readDevice()
    if (existingDevice) {
      setDevice(existingDevice)
      void loadTrips()
      return
    }

    setBootstrappingIdentity(true)
    void bootstrapDevice()
      .then((nextDevice) => {
        writeDevice(nextDevice)
        setDevice(nextDevice)
        setTrips([])
      })
      .catch((error) => setStatus({ tone: 'danger', title: tError((error as Error).message) }))
      .finally(() => setBootstrappingIdentity(false))
  }, [initialData.device])

  async function onCreateTrip() {
    if (!identityReady) {
      setStatus({ tone: 'warning', title: t('home.createTripLocked') })
      return
    }
    const nextErrors: { tripName?: string; expenseCurrency?: string; settlementCurrency?: string; splitCount?: string } = {}
    if (!tripName.trim()) {
      nextErrors.tripName = t('home.enterTripName')
    }
    const expense = normalizeCurrency(expenseCurrency)
    const settlement = normalizeCurrency(settlementCurrency)
    if (!/^[A-Z]{3}$/.test(expense)) {
      nextErrors.expenseCurrency = t('home.invalidCurrency')
    }
    if (!/^[A-Z]{3}$/.test(settlement)) {
      nextErrors.settlementCurrency = t('home.invalidCurrency')
    }
    const count = Number(splitCount)
    if (!Number.isInteger(count) || count < 1) {
      nextErrors.splitCount = t('home.invalidSplitCount')
    }

    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors)
      return
    }

    try {
      setFieldErrors({})
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
              <CardTitle>{t('home.tripStepTitle')}</CardTitle>
              <CardDescription>{bootstrappingIdentity ? t('home.createTripLocked') : t('home.tripStepDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {bootstrappingIdentity ? (
                <div className="rounded-xl border border-dashed border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                  {t('home.identityGenerating')}
                </div>
              ) : device ? (
                <div className="rounded-xl border border-border bg-muted px-4 py-3">
                  <p className="text-xs text-muted-foreground">{t('home.identityInlineLabel')}</p>
                  <p className="mt-1 font-medium text-foreground">{device.displayName}</p>
                </div>
              ) : null}
              <FormField label={t('home.createTrip')} error={fieldErrors.tripName}>
                <Input
                  value={tripName}
                  onChange={(event) => {
                    setTripName(event.target.value)
                    if (fieldErrors.tripName) {
                      setFieldErrors((current) => ({ ...current, tripName: undefined }))
                    }
                  }}
                  placeholder={t('home.tripNamePlaceholder')}
                  disabled={!identityReady}
                  aria-invalid={fieldErrors.tripName ? 'true' : undefined}
                />
              </FormField>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label={t('home.expenseCurrency')} helper={t('home.expenseCurrencyHelper')} error={fieldErrors.expenseCurrency}>
                  <CurrencyCombobox
                    value={expenseCurrency}
                    onValueChange={(value) => {
                      setExpenseCurrency(value)
                      if (fieldErrors.expenseCurrency) {
                        setFieldErrors((current) => ({ ...current, expenseCurrency: undefined }))
                      }
                    }}
                    locale={locale}
                    disabled={!identityReady}
                  />
                </FormField>
                <FormField label={t('home.settlementCurrency')} helper={t('home.settlementCurrencyHelper')} error={fieldErrors.settlementCurrency}>
                  <CurrencyCombobox
                    value={settlementCurrency}
                    onValueChange={(value) => {
                      setSettlementCurrency(value)
                      if (fieldErrors.settlementCurrency) {
                        setFieldErrors((current) => ({ ...current, settlementCurrency: undefined }))
                      }
                    }}
                    locale={locale}
                    disabled={!identityReady}
                  />
                </FormField>
              </div>
              <FormField label={t('home.splitCount')} error={fieldErrors.splitCount}>
                <Input
                  value={splitCount}
                  onChange={(event) => {
                    setSplitCount(event.target.value)
                    if (fieldErrors.splitCount) {
                      setFieldErrors((current) => ({ ...current, splitCount: undefined }))
                    }
                  }}
                  inputMode="numeric"
                  className="mono"
                  disabled={!identityReady}
                  aria-invalid={fieldErrors.splitCount ? 'true' : undefined}
                />
              </FormField>
              <Button type="button" size="lg" className="w-full" onClick={() => void onCreateTrip()} disabled={!identityReady}>
                {t('home.createStart')}
              </Button>
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
