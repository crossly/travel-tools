import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ActionButton, EmptyState, Field, InfoChip, Panel, StepPanel } from '@travel-tools/ui';
import { bootstrapDevice, createTrip } from '../lib/api';
import { COMMON_CURRENCIES, formatCurrencyOption, normalizeCurrency } from '../lib/currencies';
import { useToast } from '../hooks/useToast';
import { readDevice, writeActiveTripId, writeDevice, writeLastTool } from '../lib/storage';
import type { Trip } from '../lib/types';
import { useI18n } from '../hooks/useI18n';
import { useLocalizedNavigate, useLocalizedPath } from '../lib/routes';
import { APP_VERSION, BUILD_DATE } from '../lib/version';
import { SiteLayout } from '../components/SiteLayout';

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
  const [savingIdentity, setSavingIdentity] = useState(false);
  const [creatingTrip, setCreatingTrip] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isNameEditing, setIsNameEditing] = useState(true);
  const identityReady = !isNameEditing && displayName.trim().length > 0;

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

    setSavingIdentity(true);
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
      setSavingIdentity(false);
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

    if (!identityReady) {
      pushToast({ type: 'info', title: t('home.createTripLocked') });
      return;
    }

    setCreatingTrip(true);
    try {
      const parsedSplitCount = Number(splitCount);
      if (!Number.isInteger(parsedSplitCount) || parsedSplitCount < 1) {
        pushToast({ type: 'error', title: t('home.invalidSplitCount') });
        setCreatingTrip(false);
        return;
      }

      const trip = await createTrip(tripName.trim(), expense, settlement, parsedSplitCount);
      writeActiveTripId(trip.id);
      navigateLocalized(`/tools/split-bill/trip/${trip.id}`);
    } catch (e) {
      pushToast({ type: 'error', title: tError((e as Error).message) });
    } finally {
      setCreatingTrip(false);
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

      <div className="space-y-4">
        <StepPanel
          stepNumber={1}
          title={t('home.identityStepTitle')}
          description={t('home.identityStepDescription')}
          status={identityReady ? 'complete' : 'active'}
          actions={identityReady ? <InfoChip tone="success">{t('home.identityCompleted')}</InfoChip> : undefined}
          className="mb-4"
        >
          {isNameEditing ? (
            <>
              <Field label={t('home.deviceNickname')}>
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full rounded-card border border-borderc bg-card px-4 py-3 text-textp"
                  placeholder={t('home.nicknamePlaceholder')}
                />
              </Field>
              <ActionButton className="mt-3 w-full" onClick={onSetup} loading={savingIdentity}>
                {t('home.saveNickname')}
              </ActionButton>
            </>
          ) : (
            <Panel tone="subtle">
              <button
                onClick={() => setIsNameEditing(true)}
                aria-label={t('home.editNickname')}
                className="w-full text-left"
              >
                <p className="font-medium text-textp">{displayName}</p>
                <p className="mt-1 text-xs text-texts">{t('home.tapToEditNickname')}</p>
              </button>
            </Panel>
          )}
        </StepPanel>

        <StepPanel
          stepNumber={2}
          title={t('home.tripStepTitle')}
          description={identityReady ? t('home.tripStepDescription') : t('home.createTripLocked')}
          status={identityReady ? 'active' : 'pending'}
          className="mb-4"
        >
          <div className={identityReady ? '' : 'pointer-events-none opacity-55'}>
            <Field label={t('home.createTrip')}>
              <input
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                className="w-full rounded-card border border-borderc bg-card px-4 py-3 text-textp"
                placeholder={t('home.tripNamePlaceholder')}
              />
            </Field>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Field label={t('home.expenseCurrency')} helperText={t('home.expenseCurrencyHelper')}>
                <input
                  value={expenseCurrency}
                  onChange={(e) => setExpenseCurrency(e.target.value)}
                  list="currency-list"
                  className="w-full rounded-card border border-borderc bg-card px-4 py-3 font-mono tabular-nums text-textp"
                />
              </Field>
              <Field label={t('home.settlementCurrency')} helperText={t('home.settlementCurrencyHelper')}>
                <input
                  value={settlementCurrency}
                  onChange={(e) => setSettlementCurrency(e.target.value)}
                  list="currency-list"
                  className="w-full rounded-card border border-borderc bg-card px-4 py-3 font-mono tabular-nums text-textp"
                />
              </Field>
            </div>
            <Field className="mt-3" label={t('home.splitCount')} helperText={t('home.splitLocalFirst')}>
              <input
                value={splitCount}
                onChange={(e) => setSplitCount(e.target.value)}
                inputMode="numeric"
                className="w-full rounded-card border border-borderc bg-card px-4 py-3 font-mono tabular-nums text-textp"
              />
            </Field>

            <ActionButton
              className="mt-3 w-full"
              onClick={onCreateTrip}
              loading={creatingTrip}
              disabled={!identityReady}
            >
              {t('home.createStart')}
            </ActionButton>
          </div>
        </StepPanel>

        <StepPanel
          stepNumber={3}
          title={t('home.recentStepTitle')}
          description={t('home.recentStepDescription')}
          status={trips.length > 0 ? 'complete' : 'pending'}
        >
          {trips.length === 0 ? (
            <EmptyState
              title={t('home.noTrips')}
              description={t('home.noTripsDescription')}
              action={
                <Link to={toLocalizedPath('/')} className="inline-flex rounded-card border border-borderc bg-card px-4 py-2 text-sm font-medium text-textp shadow-card">
                  {t('common.home')}
                </Link>
              }
            />
          ) : (
            <div className="space-y-2 text-sm">
              {trips.slice(0, 3).map((trip) => (
                <Link key={trip.id} to={toLocalizedPath(`/tools/split-bill/trip/${trip.id}`)} className="block rounded-card border border-borderc bg-card px-3 py-3 shadow-card">
                  <div className="font-medium text-textp">{trip.name}</div>
                  <div className="mt-1 font-mono text-xs text-texts tabular-nums">
                    {trip.expenseCurrency} / {trip.settlementCurrency}
                  </div>
                </Link>
              ))}
              {trips[0] ? (
                <ActionButton
                  variant="secondary"
                  className="mt-2 w-full"
                  onClick={() => navigateLocalized(`/tools/split-bill/trip/${trips[0].id}`)}
                >
                  {t('home.continueRecentTrip')}
                </ActionButton>
              ) : null}
            </div>
          )}
        </StepPanel>
      </div>
    </SiteLayout>
  );
}
