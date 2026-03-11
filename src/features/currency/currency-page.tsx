import { useEffect, useMemo, useState } from 'react'
import { RefreshCw, ScanSearch } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { CurrencyCombobox } from '@/components/app/currency-combobox'
import { FormField } from '@/components/app/form-field'
import { InlineStatus } from '@/components/app/inline-status'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { normalizeCurrency } from '@/lib/currencies'
import { detectCurrency, fetchCurrencyRates } from '@/lib/api/client'
import { useI18n } from '@/lib/i18n'
import { readCachedCurrencyRates, readCurrencyPrefs, writeCachedCurrencyRates, writeCurrencyPrefs, writeLastTool } from '@/lib/storage'
import type { FxRatesResponse, Locale } from '@/lib/types'

type Status =
  | { tone: 'success' | 'warning' | 'danger'; title: string; description?: string }
  | null

export function CurrencyPage({ locale }: { locale: Locale }) {
  const { t, tError } = useI18n()
  const [amount, setAmount] = useState('1')
  const [source, setSource] = useState('USD')
  const [target, setTarget] = useState('EUR')
  const [rates, setRates] = useState<FxRatesResponse | null>(null)
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [detecting, setDetecting] = useState(false)
  const [status, setStatus] = useState<Status>(null)

  useEffect(() => {
    writeLastTool('currency')
    const prefs = readCurrencyPrefs()
    setSource(prefs.source)
    setTarget(prefs.target)
    const cached = readCachedCurrencyRates()
    if (cached.raw) {
      try {
        const parsed = JSON.parse(cached.raw) as FxRatesResponse
        setRates(parsed)
        setUpdatedAt(cached.updatedAt)
      } catch {
        // ignore invalid local cache
      }
    }
  }, [])

  useEffect(() => {
    writeCurrencyPrefs(source, target)
  }, [source, target])

  useEffect(() => {
    if (/^[A-Z]{3}$/.test(source)) {
      void loadRates(source, false)
    }
  }, [source])

  async function loadRates(base: string, manual: boolean) {
    setLoading(manual)
    try {
      const data = await fetchCurrencyRates(base)
      setRates(data)
      setUpdatedAt(data.updatedAt)
      writeCachedCurrencyRates(JSON.stringify(data), data.updatedAt)
      if (!navigator.onLine || data.stale) {
        setStatus({ tone: 'warning', title: t('currency.freshnessOffline'), description: t('currency.offlineNotice') })
      } else if (data.cached) {
        setStatus({ tone: 'warning', title: t('currency.freshnessCached'), description: t('currency.cacheNotice') })
      } else {
        setStatus(null)
      }
    } catch (error) {
      setStatus({ tone: 'danger', title: t('currency.errorTitle'), description: tError((error as Error).message) })
    } finally {
      setLoading(false)
    }
  }

  async function onDetect() {
    setDetecting(true)
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      const detected = await detectCurrency(tz)
      setSource(detected.currency)
      if (detected.currency === target) {
        setTarget(detected.currency === 'USD' ? 'EUR' : 'USD')
      }
      setStatus({
        tone: 'success',
        title: t('currency.detectedTitle'),
        description: t('currency.detectedStatus', { currency: detected.currency, via: detected.detectedVia }),
      })
    } catch (error) {
      setStatus({ tone: 'danger', title: t('currency.errorTitle'), description: tError((error as Error).message) })
    } finally {
      setDetecting(false)
    }
  }

  const converted = useMemo(() => {
    const rate = rates?.rates?.[normalizeCurrency(target)]
    const numeric = Number(amount)
    if (!rate || Number.isNaN(numeric)) return '0.00'
    return (numeric * rate).toFixed(numeric >= 100 ? 2 : 4)
  }, [amount, rates, target])

  const freshnessVariant = status?.tone === 'warning' ? 'warning' : 'success'

  return (
    <AppShell locale={locale} title={t('currency.title')} description={t('currency.description')} activeTool="currency">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardDescription>{t('currency.resultLabel')}</CardDescription>
              <CardTitle className="mt-2 text-4xl">{converted} {normalizeCurrency(target)}</CardTitle>
            </div>
            <Badge variant={freshnessVariant}>{status?.title ?? t('currency.freshnessLive')}</Badge>
          </div>
          <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <p>{t('currency.rateLabel')}: <span className="mono text-foreground">{rates?.rates?.[normalizeCurrency(target)]?.toFixed(6) ?? '---'}</span></p>
            <p>{t('currency.updatedLabel')}: <span className="text-foreground">{updatedAt ? new Date(updatedAt).toLocaleString() : '---'}</span></p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <FormField label={t('currency.amountLabel')}>
            <Input value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" placeholder={t('currency.placeholder')} className="h-14 text-2xl" />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <FormField label={t('currency.fromLabel')}>
              <CurrencyCombobox value={source} onValueChange={(nextValue) => setSource(normalizeCurrency(nextValue))} locale={locale} />
            </FormField>
            <Button type="button" variant="outline" size="icon" className="sm:mb-1" onClick={() => {
              const nextSource = target
              const nextTarget = source
              setSource(nextSource)
              setTarget(nextTarget)
            }}>
              ⇄
            </Button>
            <FormField label={t('currency.toLabel')}>
              <CurrencyCombobox value={target} onValueChange={(nextValue) => setTarget(normalizeCurrency(nextValue))} locale={locale} />
            </FormField>
          </div>
          <FormField label={t('currency.quickAmounts')}>
            <div className="flex flex-wrap gap-2">
              {['10', '50', '100', '500'].map((value) => (
                <Button key={value} type="button" variant="outline" size="sm" onClick={() => setAmount(value)}>
                  {value}
                </Button>
              ))}
            </div>
          </FormField>
          <div className="grid gap-2 sm:grid-cols-2">
            <Button type="button" variant="secondary" onClick={() => void onDetect()} disabled={detecting}>
              <ScanSearch className="h-4 w-4" />
              {t('currency.detectAction')}
            </Button>
            <Button type="button" onClick={() => void loadRates(source, true)} disabled={loading}>
              <RefreshCw className="h-4 w-4" />
              {t('currency.refreshAction')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {status ? <InlineStatus tone={status.tone} title={status.title} description={status.description} /> : null}
    </AppShell>
  )
}
