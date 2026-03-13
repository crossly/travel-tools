import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type output as Output } from 'zod/v4-mini'
import { Link, useNavigate } from '@tanstack/react-router'
import { AppShell } from '@/components/app/app-shell'
import { CurrencyCombobox } from '@/components/app/currency-combobox'
import { InlineStatus } from '@/components/app/inline-status'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { normalizeCurrency } from '@/lib/currencies'
import { bootstrapDevice, createTrip, listTrips } from '@/lib/api/client'
import { createTripFormSchema } from '@/lib/form-schemas'
import { getLocalizedPath } from '@/lib/site'
import { useI18n } from '@/lib/i18n'
import { readDevice, writeActiveTripId, writeDevice, writeLastTool } from '@/lib/storage'
import type { DeviceIdentity, Locale, Trip } from '@/lib/types'

type SplitBillHomePageData = {
  device: DeviceIdentity | null
  trips: Trip[]
}

type TripFormValues = Output<ReturnType<typeof createTripFormSchema>>

export function SplitBillHomePage({ locale, initialData }: { locale: Locale; initialData: SplitBillHomePageData }) {
  const { t, tError } = useI18n()
  const navigate = useNavigate()
  const [device, setDevice] = useState<DeviceIdentity | null>(initialData.device)
  const [bootstrappingIdentity, setBootstrappingIdentity] = useState(false)
  const [status, setStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string; description?: string } | null>(null)
  const [trips, setTrips] = useState<Trip[]>(initialData.trips)
  const [loadingTrips, setLoadingTrips] = useState(false)
  const identityReady = device !== null
  const tripSchema = useMemo(() => createTripFormSchema({
    tripNameRequired: t('home.enterTripName'),
    currencyInvalid: t('home.invalidCurrency'),
    splitCountInvalid: t('home.invalidSplitCount'),
  }), [t])
  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      tripName: '',
      expenseCurrency: 'CNY',
      settlementCurrency: 'CNY',
      splitCount: '2',
    },
  })

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

  async function onCreateTrip(values: TripFormValues) {
    if (!identityReady) {
      setStatus({ tone: 'warning', title: t('home.createTripLocked') })
      return
    }

    try {
      const trip = await createTrip(
        values.tripName.trim(),
        normalizeCurrency(values.expenseCurrency),
        normalizeCurrency(values.settlementCurrency),
        Number(values.splitCount),
      )
      writeActiveTripId(trip.id)
      navigate({ to: getLocalizedPath(locale, `/bill-splitter/${trip.id}`) })
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
              <Form {...form}>
                <form
                  className="grid gap-4"
                  onSubmit={(event) => {
                    event.preventDefault()
                    void form.handleSubmit((values) => onCreateTrip(values))(event)
                  }}
                >
                  <FormField
                    control={form.control}
                    name="tripName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('home.createTrip')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t('home.tripNamePlaceholder')}
                            disabled={!identityReady}
                            onChange={(event) => {
                              field.onChange(event)
                              setStatus(null)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="expenseCurrency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('home.expenseCurrency')}</FormLabel>
                          <FormControl>
                            <CurrencyCombobox
                              value={field.value}
                              onValueChange={(value) => {
                                field.onChange(value)
                                setStatus(null)
                              }}
                              locale={locale}
                              disabled={!identityReady}
                            />
                          </FormControl>
                          <FormDescription>{t('home.expenseCurrencyHelper')}</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="settlementCurrency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('home.settlementCurrency')}</FormLabel>
                          <FormControl>
                            <CurrencyCombobox
                              value={field.value}
                              onValueChange={(value) => {
                                field.onChange(value)
                                setStatus(null)
                              }}
                              locale={locale}
                              disabled={!identityReady}
                            />
                          </FormControl>
                          <FormDescription>{t('home.settlementCurrencyHelper')}</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="splitCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('home.splitCount')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            inputMode="numeric"
                            className="mono"
                            disabled={!identityReady}
                            onChange={(event) => {
                              field.onChange(event)
                              setStatus(null)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full" disabled={!identityReady}>
                    {t('home.createStart')}
                  </Button>
                </form>
              </Form>
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
              <Link key={trip.id} to={getLocalizedPath(locale, `/bill-splitter/${trip.id}`)} className="block rounded-2xl border border-border bg-muted p-4">
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
