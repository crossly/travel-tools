import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Layout } from '@travel-tools/ui';
import { bootstrapDevice, createTrip } from '../lib/api';
import { COMMON_CURRENCIES, formatCurrencyOption, normalizeCurrency } from '../lib/currencies';
import { useToast } from '../hooks/useToast';
import { readDevice, writeActiveTripId, writeDevice, writeLastTool } from '../lib/storage';
import type { Trip } from '../lib/types';
import { useI18n } from '../hooks/useI18n';
import { useLocalizedNavigate, useLocalizedPath } from '../lib/routes';
import { APP_VERSION, BUILD_DATE } from '../lib/version';

export function SplitBillHomePage() {
  const navigateLocalized = useLocalizedNavigate();
  const { t, tError } = useI18n();
  const toLocalizedPath = useLocalizedPath();
  const { pushToast } = useToast();
  const buildInfo = t('common.buildInfo', { version: APP_VERSION, date: BUILD_DATE });
  const [displayName, setDisplayName] = useState('');
  const [tripName, setTripName] = useState('');
  const [expenseCurrency, setExpenseCurrency] = useState('CNY');
  const [settlementCurrency, setSettlementCurrency] = useState('CNY');
  const [splitCount, setSplitCount] = useState('2');
  const [loading, setLoading] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isNameEditing, setIsNameEditing] = useState(true);

  useEffect(() => {
    writeLastTool('split-bill');
    const device = readDevice();
    if (device) {
      setDisplayName(device.displayName);
      setIsNameEditing(false);
      void fetch('/api/split-bill/trips', { headers: { 'x-device-id': device.deviceId } })
        .then((res) => (res.ok ? res.json() : { trips: [] }))
        .then((data) => setTrips(data.trips ?? []));
    }
  }, []);

  const onSetup = async () => {
    const trimmedName = displayName.trim();
    if (!trimmedName) {
      pushToast({ type: 'error', title: t('home.enterNickname') });
      return;
    }

    setLoading(true);
    try {
      const existing = readDevice();
      if (existing) {
        writeDevice({ ...existing, displayName: trimmedName });
      } else {
        const device = await bootstrapDevice(trimmedName);
        writeDevice(device);
      }
      setDisplayName(trimmedName);
      setIsNameEditing(false);
      pushToast({ type: 'success', title: t('settings.profileSaved') });
    } catch (e) {
      pushToast({ type: 'error', title: tError((e as Error).message) });
    } finally {
      setLoading(false);
    }
  };

  const onCreateTrip = async () => {
    if (!tripName.trim()) {
      pushToast({ type: 'error', title: t('home.enterTripName') });
      return;
    }

    const expense = normalizeCurrency(expenseCurrency);
    const settlement = normalizeCurrency(settlementCurrency);
    if (!/^[A-Z]{3}$/.test(expense) || !/^[A-Z]{3}$/.test(settlement)) {
      pushToast({ type: 'error', title: t('home.invalidCurrency') });
      return;
    }

    setLoading(true);
    try {
      const parsedSplitCount = Number(splitCount);
      if (!Number.isInteger(parsedSplitCount) || parsedSplitCount < 1) {
        pushToast({ type: 'error', title: t('home.invalidSplitCount') });
        setLoading(false);
        return;
      }

      const trip = await createTrip(tripName.trim(), expense, settlement, parsedSplitCount);
      writeActiveTripId(trip.id);
      navigateLocalized(`/tools/split-bill/trip/${trip.id}`);
    } catch (e) {
      pushToast({ type: 'error', title: tError((e as Error).message) });
    } finally {
      setLoading(false);
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
      title={t('tool.split-bill.name')}
      subtitle={t('tool.split-bill.description')}
    >
      <datalist id="currency-list">
        {COMMON_CURRENCIES.map((code) => (
          <option key={code} value={code} label={formatCurrencyOption(code)}>
            {formatCurrencyOption(code)}
          </option>
        ))}
      </datalist>

      <Card className="mb-4">
        <h2 className="text-sm font-medium text-pretty">{t('home.deviceNickname')}</h2>

        {isNameEditing ? (
          <>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-2 w-full rounded-card border border-borderc bg-card px-4 py-3"
              placeholder={t('home.nicknamePlaceholder')}
            />
            <button
              onClick={onSetup}
              className="mt-3 w-full rounded-card bg-accent px-4 py-3 font-semibold text-white transition-transform active:scale-[0.98]"
              disabled={loading}
            >
              {t('home.saveNickname')}
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsNameEditing(true)}
            aria-label={t('home.editNickname')}
            className="mt-2 w-full rounded-card border border-borderc bg-card px-4 py-3 text-left"
          >
            <p className="font-medium">{displayName}</p>
            <p className="mt-1 text-xs text-texts">{t('home.tapToEditNickname')}</p>
          </button>
        )}
      </Card>

      <Card className="mb-4">
        <h2 className="text-sm font-medium">{t('home.createTrip')}</h2>
        <input
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          className="mt-2 w-full rounded-card border border-borderc bg-card px-4 py-3"
          placeholder={t('home.tripNamePlaceholder')}
        />

        <div className="mt-2 grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-texts">{t('home.expenseCurrency')}</label>
            <input
              value={expenseCurrency}
              onChange={(e) => setExpenseCurrency(e.target.value)}
              list="currency-list"
              className="mt-1 w-full rounded-card border border-borderc bg-card px-4 py-3 font-display tabular-nums"
            />
          </div>
          <div>
            <label className="text-xs text-texts">{t('home.settlementCurrency')}</label>
            <input
              value={settlementCurrency}
              onChange={(e) => setSettlementCurrency(e.target.value)}
              list="currency-list"
              className="mt-1 w-full rounded-card border border-borderc bg-card px-4 py-3 font-display tabular-nums"
            />
          </div>
        </div>
        <div className="mt-2">
          <label className="text-xs text-texts">{t('home.splitCount')}</label>
          <input
            value={splitCount}
            onChange={(e) => setSplitCount(e.target.value)}
            inputMode="numeric"
            className="mt-1 w-full rounded-card border border-borderc bg-card px-4 py-3 font-display tabular-nums"
          />
        </div>

        <button
          onClick={onCreateTrip}
          className="mt-3 w-full rounded-card bg-accent px-4 py-3 font-semibold text-white transition-transform active:scale-[0.98]"
          disabled={loading}
        >
          {t('home.createStart')}
        </button>
      </Card>

      <Card>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-medium">{t('home.myTrips')}</h2>
          <Link to={toLocalizedPath('/')} className="text-xs uppercase tracking-[0.18em] text-texts">
            {t('common.home')}
          </Link>
        </div>
        <div className="space-y-2 text-sm">
          {trips.length === 0 ? <p className="text-texts">{t('home.noTrips')}</p> : null}
          {trips.map((trip) => (
            <Link key={trip.id} to={toLocalizedPath(`/tools/split-bill/trip/${trip.id}`)} className="block rounded-card border border-borderc px-3 py-3">
              <div className="font-medium">{trip.name}</div>
              <div className="mt-1 font-display text-xs text-texts tabular-nums">
                {trip.expenseCurrency} / {trip.settlementCurrency}
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </Layout>
  );
}
