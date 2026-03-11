import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ActionButton, Field, Panel, StatusBanner } from '@travel-tools/ui';
import { createExpense, fetchFxQuote, fetchSnapshot } from '../lib/api';
import { COMMON_CURRENCIES, formatCurrencyOption, normalizeCurrency } from '../lib/currencies';
import type { TripSnapshot } from '../lib/types';
import { useI18n } from '../hooks/useI18n';
import { useToast } from '../hooks/useToast';
import { useLocalizedPath } from '../lib/routes';
import { APP_VERSION, BUILD_DATE } from '../lib/version';
import { SiteLayout } from '../components/SiteLayout';

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
  const [fxNotice, setFxNotice] = useState<'auto' | 'manual' | 'missing'>('auto');

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
      setFxNotice('missing');
      return;
    }

    if (from === to) {
      setAutoFxRate(1);
      setFxNotice('auto');
      return;
    }

    void fetchFxQuote(tripId, from, to, spentAt)
      .then((quote) => {
        setAutoFxRate(quote.rate);
        setFxNotice('auto');
      })
      .catch(() => {
        setAutoFxRate(null);
        setFxNotice('missing');
      });
  }, [tripId, originalCurrency, settlementCurrency, spentAt, snapshot]);

  useEffect(() => {
    setFxNotice(fxRateOverride.trim() ? 'manual' : autoFxRate !== null ? 'auto' : 'missing');
  }, [autoFxRate, fxRateOverride]);

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
    <SiteLayout
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
      <Panel>
        <Field label={t('addExpense.labelTitle')}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-card border border-borderc bg-card px-4 py-3 text-textp" placeholder={t('addExpense.titlePlaceholder')} />
        </Field>

        <Field className="mt-3" label={t('addExpense.labelAmount')}>
          <input
            value={amountOriginal}
            onChange={(e) => setAmountOriginal(e.target.value)}
            inputMode="decimal"
            className="w-full rounded-card border border-borderc bg-card px-4 py-3 font-mono text-3xl tabular-nums text-textp"
            placeholder="0.00"
          />
        </Field>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <Field label={t('addExpense.labelCurrency')}>
            <input
              value={originalCurrency}
              onChange={(e) => setOriginalCurrency(e.target.value)}
              list="currency-list"
              className="w-full rounded-card border border-borderc bg-card px-4 py-3 font-mono tabular-nums text-textp"
            />
          </Field>
          <Field label={t('addExpense.labelDate')}>
            <input value={spentAt} onChange={(e) => setSpentAt(e.target.value)} type="date" className="w-full rounded-card border border-borderc bg-card px-4 py-3 text-textp" />
          </Field>
        </div>

        <Panel tone="subtle" className="mt-3">
          <div className="space-y-2 text-xs text-texts">
            <p>{t('addExpense.settlementCurrency')}: <span className="font-mono tabular-nums text-textp">{settlementCurrency || '---'}</span></p>
            <p>{t('addExpense.autoFx')}: <span className="font-mono tabular-nums text-textp">{autoFxRate ? autoFxRate.toFixed(6) : '---'}</span></p>
          </div>
          <Field className="mt-3" label={t('addExpense.manualFx')}>
            <input
              value={fxRateOverride}
              onChange={(e) => setFxRateOverride(e.target.value)}
              inputMode="decimal"
              placeholder={t('addExpense.manualFxPlaceholder')}
              className="w-full rounded-card border border-borderc bg-card px-4 py-2 font-mono tabular-nums text-textp"
            />
          </Field>
        </Panel>

        {fxNotice === 'missing' ? (
          <StatusBanner
            className="mt-3"
            status="warning"
            title={t('addExpense.autoFx')}
            description={t('addExpense.manualFx')}
          />
        ) : null}

        <Field className="mt-3" label={t('addExpense.splitCount')}>
          <input
            value={splitCount}
            onChange={(e) => setSplitCount(e.target.value)}
            inputMode="numeric"
            className="w-full rounded-card border border-borderc bg-card px-4 py-2 font-mono tabular-nums text-textp"
          />
        </Field>

        <Field className="mt-3" label={t('addExpense.labelNote')}>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} className="w-full rounded-card border border-borderc bg-card px-4 py-3 text-textp" rows={3} />
        </Field>

        <ActionButton onClick={onSubmit} className="mt-4 w-full" loading={saving}>
          {t('common.save')}
        </ActionButton>
      </Panel>
    </SiteLayout>
  );
}
