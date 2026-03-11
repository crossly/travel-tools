import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ActionButton, Field, Panel, StatusBanner } from '@travel-tools/ui';
import { deleteExpense, deleteTrip, fetchSnapshot, flushOfflineQueue, updateTripSettings } from '../lib/api';
import type { Expense, TripSnapshot } from '../lib/types';
import { useInterval } from '../hooks/useInterval';
import { useToast } from '../hooks/useToast';
import { writeActiveTripId } from '../lib/storage';
import { useI18n } from '../hooks/useI18n';
import { useLocalizedNavigate, useLocalizedPath } from '../lib/routes';
import { APP_VERSION, BUILD_DATE } from '../lib/version';
import { SiteLayout } from '../components/SiteLayout';

export function TripPage() {
  const { tripId = '' } = useParams();
  const navigate = useNavigate();
  const navigateLocalized = useLocalizedNavigate();
  const { t, tError } = useI18n();
  const toLocalizedPath = useLocalizedPath();
  const { pushToast } = useToast();
  const buildInfo = t('common.buildInfo', { version: APP_VERSION, date: BUILD_DATE });
  const [snapshot, setSnapshot] = useState<TripSnapshot | null>(null);
  const [syncMsg, setSyncMsg] = useState('');
  const [deletingTrip, setDeletingTrip] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [splitCountInput, setSplitCountInput] = useState('1');

  const loadSnapshot = useCallback(async () => {
    if (!tripId) return;
    try {
      const data = await fetchSnapshot(tripId);
      setSnapshot(data);
      setSplitCountInput(String(data.trip.splitCount || 1));
      writeActiveTripId(tripId);
    } catch (e) {
      pushToast({ type: 'error', title: tError((e as Error).message) });
    }
  }, [tripId, pushToast, tError]);

  useEffect(() => {
    void loadSnapshot();
  }, [loadSnapshot]);

  useInterval(() => {
    if (!tripId) return;
    void flushOfflineQueue(tripId)
      .then((count) => {
        if (count > 0) setSyncMsg(t('trip.syncedOffline', { count }));
      })
      .catch(() => {
        // ignore sync failure in polling cycle
      })
      .finally(() => {
        void loadSnapshot();
      });
  }, 10000);

  const canDeleteTrip = useMemo(() => {
    return Boolean(snapshot);
  }, [snapshot]);

  const onDeleteExpense = async (expense: Expense) => {
    try {
      await deleteExpense(tripId, expense.id);
      await loadSnapshot();
    } catch (e) {
      pushToast({ type: 'error', title: tError((e as Error).message) });
    }
  };

  const onDeleteTrip = async () => {
    if (!tripId || deletingTrip) return;

    setDeletingTrip(true);
    try {
      await deleteTrip(tripId);
      setConfirmOpen(false);
      pushToast({ type: 'success', title: t('trip.deleteTripSuccess') });
      navigateLocalized('/tools/split-bill');
    } catch (e) {
      pushToast({ type: 'error', title: tError((e as Error).message) });
    } finally {
      setDeletingTrip(false);
    }
  };

  const onUpdateSplitCount = async () => {
    if (!tripId || !canDeleteTrip) return;
    const nextCount = Number(splitCountInput);
    if (!Number.isInteger(nextCount) || nextCount < 1) {
      pushToast({ type: 'error', title: t('home.invalidSplitCount') });
      return;
    }
    try {
      await updateTripSettings(tripId, nextCount);
      pushToast({ type: 'success', title: t('trip.splitCountSaved') });
      await loadSnapshot();
    } catch (e) {
      pushToast({ type: 'error', title: tError((e as Error).message) });
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
      title={snapshot?.trip.name ?? t('trip.titleFallback')}
    >
      <div className="mb-4 flex gap-2">
        <ActionButton variant="secondary" onClick={() => navigateLocalized('/tools/split-bill')}>
          {t('common.back')}
        </ActionButton>
        <Link to={toLocalizedPath(`/tools/split-bill/trip/${tripId}/settlement`)} className="inline-flex items-center rounded-card border border-[var(--accent-primary)] px-4 py-2 text-sm font-medium text-[var(--accent-primary)]">
          {t('trip.settlement')}
        </Link>
        <Link to={toLocalizedPath(`/tools/split-bill/trip/${tripId}/add`)} className="inline-flex flex-1 items-center justify-center rounded-card bg-accent px-4 py-2 text-center text-sm font-semibold text-white shadow-card">
          {t('trip.addExpense')}
        </Link>
      </div>

      {canDeleteTrip ? (
        <AlertDialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialog.Trigger asChild>
            <ActionButton className="mb-4 w-full" variant="danger" disabled={deletingTrip}>
              {t('trip.deleteTrip')}
            </ActionButton>
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 z-overlay bg-black/40" />
            <AlertDialog.Content className="fixed inset-x-4 top-1/2 z-modal mx-auto w-full max-w-phone -translate-y-1/2 rounded-card border border-borderc bg-card p-4 shadow-card">
              <AlertDialog.Title className="text-base font-semibold text-textp text-balance">{t('trip.deleteTripConfirmTitle')}</AlertDialog.Title>
              <AlertDialog.Description className="mt-2 text-sm text-texts text-pretty">{t('trip.deleteTripConfirmBody')}</AlertDialog.Description>
              <div className="mt-4 flex gap-2">
                <AlertDialog.Cancel asChild>
                  <ActionButton className="flex-1" variant="secondary">{t('common.cancel')}</ActionButton>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <ActionButton
                    onClick={() => void onDeleteTrip()}
                    className="flex-1"
                    variant="danger"
                    disabled={deletingTrip}
                  >
                    {t('trip.deleteTripAction')}
                  </ActionButton>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      ) : null}

      <Panel className="mb-4">
        <p className="text-xs text-texts">
          {t('trip.splitCount')}: <span className="font-display tabular-nums">{snapshot?.trip.splitCount ?? 1}</span>
        </p>
        {canDeleteTrip ? (
          <div className="mt-2 flex gap-2">
            <Field className="flex-1">
              <input
                value={splitCountInput}
                onChange={(e) => setSplitCountInput(e.target.value)}
                inputMode="numeric"
                className="w-full rounded-card border border-borderc bg-card px-3 py-2 text-sm font-mono tabular-nums text-textp"
              />
            </Field>
            <ActionButton variant="secondary" onClick={() => void onUpdateSplitCount()}>
              {t('trip.saveSplitCount')}
            </ActionButton>
          </div>
        ) : null}
      </Panel>

      <Panel>
        <h2 className="text-sm font-medium">{t('trip.expenseList')}</h2>
        <div className="mt-2 space-y-2">
          {(snapshot?.expenses ?? []).filter((expense) => !expense.deletedAt).map((expense) => (
            <div key={expense.id} className="rounded-card border border-borderc bg-card px-3 py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-textp">{expense.title}</p>
                  <p className="mt-1 text-xs text-texts">{expense.spentAt.slice(0, 10)}</p>
                </div>
                <ActionButton
                  onClick={() => void onDeleteExpense(expense)}
                  variant="ghost"
                  size="sm"
                  aria-label={t('trip.deleteExpense')}
                >
                  {t('trip.deleteExpense')}
                </ActionButton>
              </div>
              <p className="mt-2 font-mono text-xl tabular-nums text-textp">
                {expense.amountBase.toFixed(2)} {snapshot?.trip.baseCurrency}
              </p>
            </div>
          ))}
          {snapshot && snapshot.expenses.filter((expense) => !expense.deletedAt).length === 0 ? <p className="text-sm text-texts">{t('trip.noExpenses')}</p> : null}
        </div>
      </Panel>

      {syncMsg ? <StatusBanner className="mt-3" status="success" title={syncMsg} /> : null}
    </SiteLayout>
  );
}
