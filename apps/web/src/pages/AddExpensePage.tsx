import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, Layout } from '@travel-tools/ui';
import { createExpense, fetchFxQuote, fetchSnapshot } from '../lib/api';
import { COMMON_CURRENCIES, formatCurrencyOption, normalizeCurrency } from '../lib/currencies';
import type { TripSnapshot } from '../lib/types';
import { useI18n } from '../hooks/useI18n';
import { useToast } from '../hooks/useToast';
import { useLocalizedPath } from '../lib/routes';
import { APP_VERSION, BUILD_DATE } from '../lib/version';

export function AddExpensePage() {
  const { tripId = '' } = useParams();
  const navigate = useNavigate();
  const { t, tError } = useI18n();
  const toLocalizedPath = useLocalizedPath();
  const { pushToast } = useToast();
  const buildInfo = t('common.buildInfo', { version: APP_VERSION, date: BUILD_DATE });
  const [snapshot, setSnapshot] = useState<TripSnapshot | null>(null);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [amountOriginal, setAmountOriginal] = useState('');
  const [originalCurrency, setOriginalCurrency] = useState('');
  const [spentAt, setSpentAt] = useState(new Date().toISOString().slice(0, 10));
  const [splitCount, setSplitCount] = useState('1');
  const [fxRateOverride, setFxRateOverride] = useState('');
  const [autoFxRate, setAutoFxRate] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const settlementCurrency = snapshot?.trip.settlementCurrency ?? snapshot?.trip.baseCurrency ?? '';

  useEffect(() => {
    void fetchSnapshot(tripId)
      .then((data) => {
        setSnapshot(data);
        setOriginalCurrency(data.trip.expenseCurrency || data.trip.baseCurrency);
        setSplitCount(String(data.trip.splitCount || 1));
      })
      .catch((e) => pushToast({ type: 'error', title: tError((e as Error).message) }));
  }, [tripId, pushToast, tError]);

  useEffect(() => {
    if (!snapshot) return;
    const from = normalizeCurrency(originalCurrency);
    const to = normalizeCurrency(settlementCurrency);
    if (!/^[A-Z]{3}$/.test(from) || !/^[A-Z]{3}$/.test(to) || !spentAt) {
      setAutoFxRate(null);
      return;
    }

    if (from === to) {
      setAutoFxRate(1);
      return;
    }

    void fetchFxQuote(tripId, from, to, spentAt)
      .then((quote) => setAutoFxRate(quote.rate))
      .catch(() => setAutoFxRate(null));
  }, [tripId, originalCurrency, settlementCurrency, spentAt, snapshot]);

  const canSubmit = useMemo(() => {
    const from = normalizeCurrency(originalCurrency);
    const to = normalizeCurrency(settlementCurrency);
    const override = fxRateOverride.trim() ? Number(fxRateOverride) : null;
    const split = Number(splitCount);
    const fxReady = from === to || (override !== null && override > 0) || (autoFxRate !== null && autoFxRate > 0);
    return (
      title.trim() &&
      Number(amountOriginal) > 0 &&
      /^[A-Z]{3}$/.test(from) &&
      /^[A-Z]{3}$/.test(to) &&
      spentAt &&
      split >= 1 &&
      fxReady
    );
  }, [title, amountOriginal, originalCurrency, settlementCurrency, spentAt, fxRateOverride, autoFxRate, splitCount]);

  const onSubmit = async () => {
    if (!canSubmit) {
      pushToast({ type: 'error', title: t('addExpense.incomplete') });
      return;
    }
    setSaving(true);

    try {
      const normalizedCurrency = normalizeCurrency(originalCurrency);
      const overrideValue = fxRateOverride.trim() ? Number(fxRateOverride) : undefined;
      const parsedSplitCount = Number(splitCount);
      await createExpense(tripId, {
        title: title.trim(),
        note: note.trim() || undefined,
        amountOriginal: Number(amountOriginal),
        originalCurrency: normalizedCurrency,
        spentAt,
        splitCount: parsedSplitCount,
        fxRateOverride: overrideValue,
      });
      navigate(toLocalizedPath(`/tools/split-bill/trip/${tripId}`));
    } catch (e) {
      pushToast({ type: 'error', title: tError((e as Error).message) });
    } finally {
      setSaving(false);
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
      title={t('addExpense.title')}
    >
      <datalist id="currency-list">
        {COMMON_CURRENCIES.map((code) => (
          <option key={code} value={code} label={formatCurrencyOption(code)}>
            {formatCurrencyOption(code)}
          </option>
        ))}
      </datalist>

      <div className="mb-4">
        <Link to={toLocalizedPath(`/tools/split-bill/trip/${tripId}`)} className="text-sm text-texts">
          {t('addExpense.backToTrip')}
        </Link>
      </div>
      <Card>
        <label className="text-sm">{t('addExpense.labelTitle')}</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-card border border-borderc px-4 py-3" placeholder={t('addExpense.titlePlaceholder')} />

        <label className="mt-3 block text-sm">{t('addExpense.labelAmount')}</label>
        <input
          value={amountOriginal}
          onChange={(e) => setAmountOriginal(e.target.value)}
          inputMode="decimal"
          className="mt-2 w-full rounded-card border border-borderc px-4 py-3 font-display text-3xl tabular-nums"
          placeholder="0.00"
        />

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm">{t('addExpense.labelCurrency')}</label>
            <input
              value={originalCurrency}
              onChange={(e) => setOriginalCurrency(e.target.value)}
              list="currency-list"
              className="mt-2 w-full rounded-card border border-borderc px-4 py-3 font-display tabular-nums"
            />
          </div>
          <div>
            <label className="text-sm">{t('addExpense.labelDate')}</label>
            <input value={spentAt} onChange={(e) => setSpentAt(e.target.value)} type="date" className="mt-2 w-full rounded-card border border-borderc px-4 py-3" />
          </div>
        </div>

        <div className="mt-3 rounded-card border border-borderc p-3 text-xs">
          <p className="text-texts">{t('addExpense.settlementCurrency')}: <span className="font-display tabular-nums">{settlementCurrency || '---'}</span></p>
          <p className="mt-1 text-texts">
            {t('addExpense.autoFx')}: <span className="font-display tabular-nums">{autoFxRate ? autoFxRate.toFixed(6) : '---'}</span>
          </p>
          <label className="mt-2 block text-sm text-textp">{t('addExpense.manualFx')}</label>
          <input
            value={fxRateOverride}
            onChange={(e) => setFxRateOverride(e.target.value)}
            inputMode="decimal"
            placeholder={t('addExpense.manualFxPlaceholder')}
            className="mt-1 w-full rounded-card border border-borderc px-4 py-2 font-display tabular-nums"
          />
        </div>

        <label className="mt-3 block text-sm">{t('addExpense.splitCount')}</label>
        <div className="mt-2">
          <input
            value={splitCount}
            onChange={(e) => setSplitCount(e.target.value)}
            inputMode="numeric"
            className="mt-1 w-full rounded-card border border-borderc px-4 py-2 font-display tabular-nums"
          />
        </div>

        <label className="mt-3 block text-sm">{t('addExpense.labelNote')}</label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} className="mt-2 w-full rounded-card border border-borderc px-4 py-3" rows={3} />

        <button onClick={onSubmit} className="mt-4 w-full rounded-card bg-accent px-4 py-3 font-semibold text-white" disabled={saving}>
          {t('common.save')}
        </button>
      </Card>
    </Layout>
  );
}
