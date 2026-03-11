import { useEffect, useMemo, useState } from 'react';
import { ActionButton, AmountDisplay, Field, HeroPanel, InfoChip, Panel, StatusBanner } from '@travel-tools/ui';
import { useI18n } from '../hooks/useI18n';
import { COMMON_CURRENCIES, formatCurrencyOption, normalizeCurrency } from '../lib/currencies';
import { detectCurrency, fetchCurrencyRates } from '../lib/api';
import type { FxRatesResponse } from '../lib/types';
import { readCachedCurrencyRates, readCurrencyPrefs, writeCachedCurrencyRates, writeCurrencyPrefs, writeLastTool } from '../lib/storage';
import { useLocalizedPath } from '../lib/routes';
import { APP_VERSION, BUILD_DATE } from '../lib/version';
import { SiteLayout } from '../components/SiteLayout';

export function CurrencyPage() {
  const { t, tError } = useI18n();
  const toLocalizedPath = useLocalizedPath();
  const [amount, setAmount] = useState('1');
  const [source, setSource] = useState('USD');
  const [target, setTarget] = useState('EUR');
  const [rates, setRates] = useState<FxRatesResponse | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [status, setStatus] = useState<
    | { kind: 'idle' }
    | { kind: 'loading' }
    | { kind: 'success' }
    | { kind: 'cached'; message: string }
    | { kind: 'offline'; message: string }
    | { kind: 'detected'; message: string }
    | { kind: 'error'; message: string }
  >({ kind: 'idle' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const buildInfo = t('common.buildInfo', { version: APP_VERSION, date: BUILD_DATE });

  useEffect(() => {
    writeLastTool('currency');
    const prefs = readCurrencyPrefs();
    setSource(prefs.source);
    setTarget(prefs.target);
    const cached = readCachedCurrencyRates();
    if (cached.raw) {
      try {
        setRates(JSON.parse(cached.raw) as FxRatesResponse);
        setUpdatedAt(cached.updatedAt);
      } catch {
        // ignore invalid cache
      }
    }
  }, []);

  useEffect(() => {
    writeCurrencyPrefs(source, target);
  }, [source, target]);

  useEffect(() => {
    const base = normalizeCurrency(source);
    if (!/^[A-Z]{3}$/.test(base)) return;

    void loadRates(base, false);
  }, [source, tError]);

  const loadRates = async (base: string, manualRefresh: boolean) => {
    if (!/^[A-Z]{3}$/.test(base)) return;
    setStatus({ kind: 'loading' });
    if (manualRefresh) setIsRefreshing(true);

    try {
      const data = await fetchCurrencyRates(base);
      setRates(data);
      setUpdatedAt(data.updatedAt);
      writeCachedCurrencyRates(JSON.stringify(data), data.updatedAt);

      if (!navigator.onLine || data.stale) {
        setStatus({ kind: 'offline', message: t('currency.offlineNotice') });
      } else if (data.cached) {
        setStatus({ kind: 'cached', message: t('currency.cacheNotice') });
      } else {
        setStatus({ kind: 'success' });
      }
    } catch (error) {
      const fallback = readCachedCurrencyRates();
      if (fallback.raw) {
        try {
          const parsed = JSON.parse(fallback.raw) as FxRatesResponse;
          setRates(parsed);
          setUpdatedAt(fallback.updatedAt);
          setStatus({ kind: navigator.onLine ? 'cached' : 'offline', message: navigator.onLine ? t('currency.cacheNotice') : t('currency.offlineNotice') });
          return;
        } catch {
          // ignore invalid fallback cache
        }
      }

      setStatus({ kind: 'error', message: tError((error as Error).message) });
    } finally {
      if (manualRefresh) setIsRefreshing(false);
    }
  };

  const converted = useMemo(() => {
    const value = Number(amount);
    const rate = rates?.rates?.[normalizeCurrency(target)];
    if (!Number.isFinite(value) || !rate) return '0.00';
    return (value * rate).toFixed(value >= 100 ? 2 : 4);
  }, [amount, rates, target]);

  const onDetect = async () => {
    setIsDetecting(true);
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const detected = await detectCurrency(tz);
      setSource(detected.currency);
      if (detected.currency === target) {
        setTarget(detected.currency === 'USD' ? 'EUR' : 'USD');
      }
      setStatus({ kind: 'detected', message: t('currency.detectedStatus', { currency: detected.currency, via: detected.detectedVia }) });
    } catch (error) {
      setStatus({ kind: 'error', message: tError((error as Error).message) });
    } finally {
      setIsDetecting(false);
    }
  };

  const freshnessLabel =
    status.kind === 'offline'
      ? t('currency.freshnessOffline')
      : status.kind === 'cached'
        ? t('currency.freshnessCached')
        : t('currency.freshnessLive');

  const formattedUpdatedAt = updatedAt ? new Date(updatedAt).toLocaleString() : t('common.unknown');

  return (
    <SiteLayout
      appName={t('app.name')}
      eyebrow={t('site.eyebrow')}
      settingsLabel={t('common.settings')}
      homePath={toLocalizedPath('/')}
      settingsPath={toLocalizedPath('/settings')}
      buildInfo={buildInfo}
      title={t('tool.currency.name')}
      subtitle={t('tool.currency.description')}
    >
      <datalist id="currency-options">
        {COMMON_CURRENCIES.map((code) => (
          <option key={code} value={code} label={formatCurrencyOption(code)}>
            {formatCurrencyOption(code)}
          </option>
        ))}
      </datalist>

      <HeroPanel
        className="mb-4"
        eyebrow={t('currency.resultLabel')}
        title={<AmountDisplay value={converted} currency={normalizeCurrency(target)} size="xl" className="mt-1" />}
        subtitle={
          <div className="space-y-2">
            <p>
              {t('currency.rateLabel')}: <span className="font-mono tabular-nums text-textp">{rates?.rates?.[normalizeCurrency(target)]?.toFixed(6) ?? '---'}</span>
            </p>
            <p>
              {t('currency.updatedLabel')}: <span className="text-textp">{formattedUpdatedAt}</span>
            </p>
          </div>
        }
        actions={<InfoChip tone={status.kind === 'offline' ? 'warning' : status.kind === 'cached' ? 'accent' : 'success'}>{freshnessLabel}</InfoChip>}
      />

      <Panel className="mb-4">
        <Field label={t('currency.amountLabel')}>
          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            inputMode="decimal"
            className="w-full border-0 bg-transparent px-0 py-0 font-display text-5xl leading-none text-textp"
            placeholder="0.00"
          />
        </Field>

        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-2">
          <Field label={t('currency.fromLabel')}>
            <input value={source} onChange={(event) => setSource(normalizeCurrency(event.target.value))} list="currency-options" className="w-full rounded-card border border-borderc bg-card px-4 py-3 font-mono tabular-nums text-textp" />
          </Field>
          <ActionButton
            variant="secondary"
            className="mb-[2px] h-12 w-12 px-0"
            aria-label={t('currency.swap')}
            onClick={() => {
              const nextSource = target;
              const nextTarget = source;
              setSource(nextSource);
              setTarget(nextTarget);
            }}
          >
            ⇄
          </ActionButton>
          <Field label={t('currency.toLabel')}>
            <input value={target} onChange={(event) => setTarget(normalizeCurrency(event.target.value))} list="currency-options" className="w-full rounded-card border border-borderc bg-card px-4 py-3 font-mono tabular-nums text-textp" />
          </Field>
        </div>

        <Field label={t('currency.quickAmounts')} className="mt-4">
          <div className="flex flex-wrap gap-2">
            {['10', '50', '100', '500'].map((value) => (
              <button key={value} type="button" onClick={() => setAmount(value)} className="rounded-full border border-borderc bg-[var(--surface-subtle)] px-3 py-1.5 text-sm text-textp">
                {value}
              </button>
            ))}
          </div>
        </Field>
      </Panel>

      <div className="grid grid-cols-2 gap-2">
        <ActionButton variant="secondary" onClick={() => void onDetect()} loading={isDetecting}>
          {t('currency.detectAction')}
        </ActionButton>
        <ActionButton onClick={() => void loadRates(normalizeCurrency(source), true)} loading={isRefreshing}>
          {t('currency.refreshAction')}
        </ActionButton>
      </div>

      {status.kind === 'detected' ? <StatusBanner className="mt-3" status="success" title={t('currency.detectedTitle')} description={status.message} /> : null}
      {status.kind === 'cached' ? <StatusBanner className="mt-3" status="warning" title={t('currency.freshnessCached')} description={status.message} /> : null}
      {status.kind === 'offline' ? <StatusBanner className="mt-3" status="offline" title={t('currency.freshnessOffline')} description={status.message} /> : null}
      {status.kind === 'error' ? <StatusBanner className="mt-3" status="error" title={t('currency.errorTitle')} description={status.message} /> : null}
    </SiteLayout>
  );
}
