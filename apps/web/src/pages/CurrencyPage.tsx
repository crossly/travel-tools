import { useEffect, useMemo, useState } from 'react';
import { Card, Layout } from '@travel-tools/ui';
import { useI18n } from '../hooks/useI18n';
import { COMMON_CURRENCIES, formatCurrencyOption, normalizeCurrency } from '../lib/currencies';
import { detectCurrency, fetchCurrencyRates } from '../lib/api';
import type { FxRatesResponse } from '../lib/types';
import { readCachedCurrencyRates, readCurrencyPrefs, writeCachedCurrencyRates, writeCurrencyPrefs, writeLastTool } from '../lib/storage';
import { useLocalizedPath } from '../lib/routes';
import { APP_VERSION, BUILD_DATE } from '../lib/version';

export function CurrencyPage() {
  const { t, tError } = useI18n();
  const toLocalizedPath = useLocalizedPath();
  const [amount, setAmount] = useState('1');
  const [source, setSource] = useState('USD');
  const [target, setTarget] = useState('EUR');
  const [rates, setRates] = useState<FxRatesResponse | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [status, setStatus] = useState('');
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

    void fetchCurrencyRates(base)
      .then((data) => {
        setRates(data);
        setUpdatedAt(data.updatedAt);
        writeCachedCurrencyRates(JSON.stringify(data), data.updatedAt);
        setStatus('');
      })
      .catch((error) => setStatus(tError((error as Error).message)));
  }, [source, tError]);

  const converted = useMemo(() => {
    const value = Number(amount);
    const rate = rates?.rates?.[normalizeCurrency(target)];
    if (!Number.isFinite(value) || !rate) return '0.00';
    return (value * rate).toFixed(value >= 100 ? 2 : 4);
  }, [amount, rates, target]);

  const onDetect = async () => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const detected = await detectCurrency(tz);
      setSource(detected.currency);
      if (detected.currency === target) {
        setTarget(detected.currency === 'USD' ? 'EUR' : 'USD');
      }
      setStatus(t('currency.detectedStatus', { currency: detected.currency, via: detected.detectedVia }));
    } catch (error) {
      setStatus(tError((error as Error).message));
    }
  };

  return (
    <Layout
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

      <Card className="mb-4 bg-[linear-gradient(160deg,rgba(255,247,237,0.98),rgba(255,255,255,0.92))] dark:bg-[linear-gradient(160deg,rgba(28,20,16,0.96),rgba(28,25,23,0.92))]">
        <p className="text-xs uppercase tracking-[0.22em] text-texts">{t('currency.amountLabel')}</p>
        <input
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          inputMode="decimal"
          className="mt-3 w-full border-0 bg-transparent px-0 py-0 font-display text-5xl leading-none text-textp"
          placeholder="0.00"
        />
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-2">
          <div>
            <label className="text-xs text-texts">{t('currency.fromLabel')}</label>
            <input value={source} onChange={(event) => setSource(normalizeCurrency(event.target.value))} list="currency-options" className="mt-1 w-full rounded-card border border-borderc bg-card px-4 py-3 font-display tabular-nums" />
          </div>
          <button
            onClick={() => {
              const nextSource = target;
              const nextTarget = source;
              setSource(nextSource);
              setTarget(nextTarget);
            }}
            className="mb-1 inline-flex h-11 w-11 items-center justify-center rounded-card border border-borderc bg-card text-lg"
            aria-label={t('currency.swap')}
          >
            ⇄
          </button>
          <div>
            <label className="text-xs text-texts">{t('currency.toLabel')}</label>
            <input value={target} onChange={(event) => setTarget(normalizeCurrency(event.target.value))} list="currency-options" className="mt-1 w-full rounded-card border border-borderc bg-card px-4 py-3 font-display tabular-nums" />
          </div>
        </div>
      </Card>

      <Card className="mb-4">
        <p className="text-xs uppercase tracking-[0.22em] text-texts">{t('currency.resultLabel')}</p>
        <p className="mt-3 font-display text-4xl tabular-nums">
          {converted} {normalizeCurrency(target)}
        </p>
        <p className="mt-2 text-sm text-texts">
          {t('currency.rateLabel')}: <span className="font-display tabular-nums">{rates?.rates?.[normalizeCurrency(target)]?.toFixed(6) ?? '---'}</span>
        </p>
        <p className="mt-1 text-sm text-texts">
          {t('currency.updatedLabel')}: {updatedAt ? new Date(updatedAt).toLocaleString() : t('common.unknown')}
        </p>
      </Card>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => void onDetect()} className="rounded-card border border-borderc px-4 py-3 text-sm font-medium">
          {t('currency.detectAction')}
        </button>
        <button onClick={() => void fetchCurrencyRates(source).then((data) => setRates(data)).catch(() => undefined)} className="rounded-card bg-accent px-4 py-3 text-sm font-semibold text-white">
          {t('currency.refreshAction')}
        </button>
      </div>

      {status ? <p className="mt-3 text-sm text-texts">{status}</p> : null}
    </Layout>
  );
}
