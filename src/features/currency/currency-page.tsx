import '@/lib/i18n/messages/currency'
import { useEffect, useMemo, useRef, useState } from 'react'
import { RefreshCw, ScanSearch } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { CurrencyCombobox } from '@/components/app/currency-combobox'
import { FieldGroup } from '@/components/app/field-group'
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
import type { CurrencyPageData } from '@/server/currency-page-data'

type Status =
  | { tone: 'success' | 'warning' | 'danger'; title: string; description?: string }
  | null

export function matchesRatesBase(expectedBase: string, rates: Pick<FxRatesResponse, 'base'> | null | undefined) {
  return Boolean(rates && normalizeCurrency(rates.base) === normalizeCurrency(expectedBase))
}

export function shouldApplyRatesResponse(options: {
  requestId: number
  latestRequestId: number
  requestedBase: string
  currentSource: string
  responseBase: string
}) {
  return (
    options.requestId === options.latestRequestId
    && normalizeCurrency(options.responseBase) === normalizeCurrency(options.requestedBase)
    && normalizeCurrency(options.responseBase) === normalizeCurrency(options.currentSource)
  )
}

export function CurrencyPage({ locale, initialData }: { locale: Locale; initialData?: CurrencyPageData }) {
  const { t, tError } = useI18n()
  const [amount, setAmount] = useState('1')
  const [source, setSource] = useState(initialData?.source ?? 'USD')
  const [target, setTarget] = useState(initialData?.target ?? 'EUR')
  const [prefsReady, setPrefsReady] = useState(Boolean(initialData))
  const [rates, setRates] = useState<FxRatesResponse | null>(initialData?.rates ?? null)
  const [updatedAt, setUpdatedAt] = useState<string | null>(initialData?.rates?.updatedAt ?? null)
  const [loading, setLoading] = useState(false)
  const [detecting, setDetecting] = useState(false)
  const [status, setStatus] = useState<Status>(null)
  const skipInitialFetchRef = useRef(Boolean(initialData?.rates))
  const latestRequestIdRef = useRef(0)
  const currentSourceRef = useRef(normalizeCurrency(initialData?.source ?? 'USD'))

  currentSourceRef.current = normalizeCurrency(source)

  useEffect(() => {
    writeLastTool('currency')
    if (initialData) {
      writeCurrencyPrefs(initialData.source, initialData.target)
      if (initialData.rates) {
        writeCachedCurrencyRates(JSON.stringify(initialData.rates), initialData.rates.updatedAt)
      }
    }

    const prefs = readCurrencyPrefs()
    setSource(prefs.source)
    setTarget(prefs.target)
    const cached = readCachedCurrencyRates()
    if (!initialData?.rates && cached.raw) {
      try {
        const parsed = JSON.parse(cached.raw) as FxRatesResponse
        if (matchesRatesBase(prefs.source, parsed)) {
          setRates(parsed)
          setUpdatedAt(cached.updatedAt)
        }
      } catch {
        // ignore invalid local cache
      }
    }
    setPrefsReady(true)
    if (!initialData) {
      setPrefsReady(true)
      return
    }

    if (initialData.rates) {
      if (!navigator.onLine || initialData.rates.stale) {
        setStatus({ tone: 'warning', title: t('currency.freshnessOffline'), description: t('currency.offlineNotice') })
      } else if (initialData.rates.cached) {
        setStatus({ tone: 'warning', title: t('currency.freshnessCached'), description: t('currency.cacheNotice') })
      }
    }

    setPrefsReady(true)
  }, [initialData, t])

  useEffect(() => {
    if (!prefsReady) return
    writeCurrencyPrefs(source, target)
  }, [prefsReady, source, target])

  useEffect(() => {
    if (!prefsReady) return
    if (skipInitialFetchRef.current && initialData?.rates && normalizeCurrency(source) === normalizeCurrency(initialData.source)) {
      skipInitialFetchRef.current = false
      return
    }
    if (/^[A-Z]{3}$/.test(source)) {
      void loadRates(source, false)
    }
  }, [initialData?.rates, initialData?.source, prefsReady, source])

  async function loadRates(base: string, manual: boolean) {
    const normalizedBase = normalizeCurrency(base)
    const requestId = latestRequestIdRef.current + 1
    latestRequestIdRef.current = requestId
    setLoading(manual)
    try {
      const data = await fetchCurrencyRates(normalizedBase)
      if (!shouldApplyRatesResponse({
        requestId,
        latestRequestId: latestRequestIdRef.current,
        requestedBase: normalizedBase,
        currentSource: currentSourceRef.current,
        responseBase: data.base,
      })) return
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
      if (requestId !== latestRequestIdRef.current) return
      setStatus({ tone: 'danger', title: t('currency.errorTitle'), description: tError((error as Error).message) })
    } finally {
      if (requestId === latestRequestIdRef.current) {
        setLoading(false)
      }
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

  const freshnessVariant = status?.tone === 'danger' ? 'danger' : status?.tone === 'warning' ? 'warning' : 'success'

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
          <FieldGroup label={t('currency.amountLabel')}>
            <Input value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" placeholder={t('currency.placeholder')} className="h-14 text-2xl" />
          </FieldGroup>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <FieldGroup label={t('currency.fromLabel')}>
              <CurrencyCombobox value={source} onValueChange={(nextValue) => setSource(normalizeCurrency(nextValue))} locale={locale} />
            </FieldGroup>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="sm:mb-1"
              aria-label={t('currency.swap')}
              onClick={() => {
                const nextSource = target
                const nextTarget = source
                setSource(nextSource)
                setTarget(nextTarget)
              }}
            >
              ⇄
            </Button>
            <FieldGroup label={t('currency.toLabel')}>
              <CurrencyCombobox value={target} onValueChange={(nextValue) => setTarget(normalizeCurrency(nextValue))} locale={locale} />
            </FieldGroup>
          </div>
          <FieldGroup label={t('currency.quickAmounts')}>
            <div className="flex flex-wrap gap-2">
              {['10', '50', '100', '500'].map((value) => (
                <Button key={value} type="button" variant="outline" size="sm" onClick={() => setAmount(value)}>
                  {value}
                </Button>
              ))}
            </div>
          </FieldGroup>
          <div className="grid gap-2 sm:grid-cols-2">
            <Button type="button" variant="secondary" size="lg" onClick={() => void onDetect()} disabled={detecting}>
              <ScanSearch className="h-4 w-4" />
              {t('currency.detectAction')}
            </Button>
            <Button type="button" variant="secondary" size="lg" onClick={() => void loadRates(source, true)} disabled={loading}>
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
