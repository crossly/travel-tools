import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Layout } from '@travel-tools/ui';
import { bootstrapDevice, exportTrip, importTrip } from '../lib/api';
import { useToast } from '../hooks/useToast';
import { readActiveTripId, readDevice, writeDevice } from '../lib/storage';
import type { Locale } from '@travel-tools/i18n';
import { useI18n } from '../hooks/useI18n';
import { useLocalizedPath } from '../lib/routes';
import { APP_VERSION, BUILD_DATE } from '../lib/version';

export function SettingsPage() {
  const navigate = useNavigate();
  const { t, tError, locale, setLocale } = useI18n();
  const toLocalizedPath = useLocalizedPath();
  const { pushToast } = useToast();
  const buildInfo = t('common.buildInfo', { version: APP_VERSION, date: BUILD_DATE });
  const activeTripId = readActiveTripId();
  const currentDevice = readDevice();
  const [displayName, setDisplayName] = useState(currentDevice?.displayName ?? '');
  const [importText, setImportText] = useState('');
  const [exportText, setExportText] = useState('');

  const onSaveProfile = async () => {
    const trimmedName = displayName.trim();
    if (!trimmedName) {
      pushToast({ type: 'error', title: t('home.enterNickname') });
      return;
    }

    try {
      const existing = readDevice();
      if (existing) {
        writeDevice({ ...existing, displayName: trimmedName });
      } else {
        const device = await bootstrapDevice(trimmedName);
        writeDevice(device);
      }
      setDisplayName(trimmedName);
      pushToast({ type: 'success', title: t('settings.profileSaved') });
    } catch (e) {
      pushToast({ type: 'error', title: tError((e as Error).message) });
    }
  };

  const onExport = async () => {
    if (!activeTripId) {
      pushToast({ type: 'error', title: t('settings.noTripToExport') });
      return;
    }
    try {
      const content = await exportTrip(activeTripId);
      setExportText(content);
      pushToast({ type: 'success', title: t('settings.exportSuccess') });
    } catch (e) {
      pushToast({ type: 'error', title: tError((e as Error).message) });
    }
  };

  const onImport = async () => {
    if (!activeTripId) {
      pushToast({ type: 'error', title: t('settings.noTripToImport') });
      return;
    }
    try {
      await importTrip(activeTripId, importText);
      pushToast({ type: 'success', title: t('settings.importSuccess') });
    } catch (e) {
      pushToast({ type: 'error', title: tError((e as Error).message) });
    }
  };

  const setLocaleValue = (next: Locale) => {
    setLocale(next);
  };

  return (
    <Layout
      appName={t('app.name')}
      eyebrow={t('site.eyebrow')}
      settingsLabel={t('common.settings')}
      homePath={toLocalizedPath('/')}
      settingsPath={toLocalizedPath('/settings')}
      buildInfo={buildInfo}
      title={t('settings.title')}
    >
      <div className="mb-4">
        <button onClick={() => navigate(toLocalizedPath('/'))} className="text-sm text-texts">
          {t('common.back')}
        </button>
      </div>

      <Card className="mb-4">
        <h2 className="text-sm font-medium">{t('settings.language')}</h2>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => setLocaleValue('zh-CN')}
            className={locale === 'zh-CN' ? 'rounded-card bg-accent px-4 py-2 text-sm font-medium text-white' : 'rounded-card border border-borderc px-4 py-2 text-sm'}
          >
            {t('settings.langZh')}
          </button>
          <button
            onClick={() => setLocaleValue('en-US')}
            className={locale === 'en-US' ? 'rounded-card bg-accent px-4 py-2 text-sm font-medium text-white' : 'rounded-card border border-borderc px-4 py-2 text-sm'}
          >
            {t('settings.langEn')}
          </button>
        </div>
      </Card>

      <Card className="mb-4">
        <h2 className="text-sm font-medium">{t('settings.deviceNickname')}</h2>
        <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="mt-2 w-full rounded-card border border-borderc px-4 py-3" />
        <button onClick={onSaveProfile} className="mt-3 rounded-card bg-accent px-4 py-2 text-sm font-semibold text-white">
          {t('common.save')}
        </button>
      </Card>

      <Card className="mb-4">
        <h2 className="text-sm font-medium">{t('settings.exportTitle')}</h2>
        <button onClick={onExport} className="mt-2 rounded-card border border-borderc px-4 py-2 text-sm">
          {t('settings.exportCurrentTrip')}
        </button>
        <textarea value={exportText} onChange={(e) => setExportText(e.target.value)} rows={6} className="mt-2 w-full rounded-card border border-borderc px-4 py-3 font-display text-xs tabular-nums" />
      </Card>

      <Card>
        <h2 className="text-sm font-medium">{t('settings.importTitle')}</h2>
        <textarea
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          rows={6}
          className="mt-2 w-full rounded-card border border-borderc px-4 py-3 font-display text-xs tabular-nums"
          placeholder={t('settings.importPlaceholder')}
        />
        <button onClick={onImport} className="mt-3 rounded-card bg-accent px-4 py-2 text-sm font-semibold text-white">
          {t('settings.importAction')}
        </button>
      </Card>
    </Layout>
  );
}
