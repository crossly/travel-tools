import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, Layout } from '@travel-tools/ui';
import { deleteExpense, deleteTrip, fetchSnapshot, flushOfflineQueue, updateTripSettings } from '../lib/api';
import type { Expense, TripSnapshot } from '../lib/types';
import { useInterval } from '../hooks/useInterval';
import { useToast } from '../hooks/useToast';
import { writeActiveTripId } from '../lib/storage';
import { useI18n } from '../hooks/useI18n';
import { useLocalizedNavigate, useLocalizedPath } from '../lib/routes';
import { APP_VERSION, BUILD_DATE } from '../lib/version';

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
    <Layout
      appName={t('app.name')}
      eyebrow={t('site.eyebrow')}
      settingsLabel={t('common.settings')}
      homePath={toLocalizedPath('/')}
      settingsPath={toLocalizedPath('/settings')}
      buildInfo={buildInfo}
      title={snapshot?.trip.name ?? t('trip.titleFallback')}
    >
      <div className="mb-4 flex gap-2">
        <button onClick={() => navigateLocalized('/tools/split-bill')} className="rounded-card border border-borderc px-4 py-2 text-sm">
          {t('common.back')}
        </button>
        <Link to={toLocalizedPath(`/tools/split-bill/trip/${tripId}/settlement`)} className="rounded-card border border-accent px-4 py-2 text-sm text-accent">
          {t('trip.settlement')}
        </Link>
        <Link to={toLocalizedPath(`/tools/split-bill/trip/${tripId}/add`)} className="flex-1 rounded-card bg-accent px-4 py-2 text-center text-sm font-semibold text-white">
          {t('trip.addExpense')}
        </Link>
      </div>

      {canDeleteTrip ? (
        <AlertDialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialog.Trigger asChild>
            <button className="mb-4 w-full rounded-card border border-red-400 px-4 py-2 text-sm text-red-600" disabled={deletingTrip}>
              {t('trip.deleteTrip')}
            </button>
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 z-overlay bg-black/40" />
            <AlertDialog.Content className="fixed inset-x-4 top-1/2 z-modal mx-auto w-full max-w-phone -translate-y-1/2 rounded-card border border-borderc bg-card p-4 shadow-card">
              <AlertDialog.Title className="text-base font-semibold text-textp text-balance">{t('trip.deleteTripConfirmTitle')}</AlertDialog.Title>
              <AlertDialog.Description className="mt-2 text-sm text-texts text-pretty">{t('trip.deleteTripConfirmBody')}</AlertDialog.Description>
              <div className="mt-4 flex gap-2">
                <AlertDialog.Cancel asChild>
                  <button className="flex-1 rounded-card border border-borderc px-4 py-2 text-sm">{t('common.cancel')}</button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <button
                    onClick={() => void onDeleteTrip()}
                    className="flex-1 rounded-card bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                    disabled={deletingTrip}
                  >
                    {t('trip.deleteTripAction')}
                  </button>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      ) : null}

      <Card className="mb-4">
        <p className="text-xs text-texts">
          {t('trip.splitCount')}: <span className="font-display tabular-nums">{snapshot?.trip.splitCount ?? 1}</span>
        </p>
        {canDeleteTrip ? (
          <div className="mt-2 flex gap-2">
            <input
              value={splitCountInput}
              onChange={(e) => setSplitCountInput(e.target.value)}
              inputMode="numeric"
              className="flex-1 rounded-card border border-borderc px-3 py-2 text-sm font-display tabular-nums"
            />
            <button onClick={() => void onUpdateSplitCount()} className="rounded-card border border-borderc px-3 py-2 text-sm">
              {t('trip.saveSplitCount')}
            </button>
          </div>
        ) : null}
      </Card>

      <Card>
        <h2 className="text-sm font-medium">{t('trip.expenseList')}</h2>
        <div className="mt-2 space-y-2">
          {(snapshot?.expenses ?? []).filter((expense) => !expense.deletedAt).map((expense) => (
            <div key={expense.id} className="rounded-card border border-borderc px-3 py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{expense.title}</p>
                  <p className="mt-1 text-xs text-texts">{expense.spentAt.slice(0, 10)}</p>
                </div>
                <button
                  onClick={() => void onDeleteExpense(expense)}
                  aria-label={t('trip.deleteExpense')}
                  className="rounded-card border border-borderc px-2 py-1 text-xs text-texts"
                >
                  {t('trip.deleteExpense')}
                </button>
              </div>
              <p className="mt-2 font-display text-xl tabular-nums">
                {expense.amountBase.toFixed(2)} {snapshot?.trip.baseCurrency}
              </p>
            </div>
          ))}
          {snapshot && snapshot.expenses.filter((expense) => !expense.deletedAt).length === 0 ? <p className="text-sm text-texts">{t('trip.noExpenses')}</p> : null}
        </div>
      </Card>

      {syncMsg ? <p className="mt-3 text-xs text-accent">{syncMsg}</p> : null}
    </Layout>
  );
}
