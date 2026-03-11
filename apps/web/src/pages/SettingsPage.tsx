import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionButton, Field, SegmentedControl, SettingsGroup } from '@travel-tools/ui';
import { bootstrapDevice, exportTrip, importTrip } from '../lib/api';
import { useToast } from '../hooks/useToast';
import { readActiveTripId, readDevice, writeDevice } from '../lib/storage';
import type { Locale } from '@travel-tools/i18n';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../hooks/useTheme';
import { useLocalizedPath } from '../lib/routes';
import { APP_VERSION, BUILD_DATE } from '../lib/version';
import { SiteLayout } from '../components/SiteLayout';

export function SettingsPage() {
  const navigate = useNavigate();
  const { t, tError, locale, setLocale } = useI18n();
  const { theme, setTheme } = useTheme();
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
    <SiteLayout
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

      <div className="space-y-4">
        <SettingsGroup title={t('settings.appearance')} description={t('settings.theme')} className="mb-4">
          <SegmentedControl
            value={theme}
            options={[
              { value: 'light', label: t('settings.themeLight') },
              { value: 'dark', label: t('settings.themeDark') },
              { value: 'system', label: t('settings.themeSystem') },
            ]}
            onChange={setTheme}
            className="w-full"
          />
        </SettingsGroup>

        <SettingsGroup title={t('settings.language')} className="mb-4">
          <SegmentedControl
            value={locale}
            options={[
              { value: 'zh-CN', label: t('settings.langZh') },
              { value: 'en-US', label: t('settings.langEn') },
            ]}
            onChange={setLocaleValue}
            className="w-full"
          />
        </SettingsGroup>

        <SettingsGroup title={t('settings.deviceNickname')} className="mb-4">
          <Field>
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full rounded-card border border-borderc bg-card px-4 py-3 text-textp" />
          </Field>
          <ActionButton className="mt-3" onClick={onSaveProfile}>
            {t('common.save')}
          </ActionButton>
        </SettingsGroup>

        <SettingsGroup title={t('settings.exportTitle')} className="mb-4">
          <ActionButton variant="secondary" onClick={onExport}>
            {t('settings.exportCurrentTrip')}
          </ActionButton>
          <Field className="mt-3">
            <textarea value={exportText} onChange={(e) => setExportText(e.target.value)} rows={6} className="w-full rounded-card border border-borderc bg-card px-4 py-3 font-mono text-xs tabular-nums text-textp" />
          </Field>
        </SettingsGroup>

        <SettingsGroup title={t('settings.importTitle')}>
          <Field>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              rows={6}
              className="w-full rounded-card border border-borderc bg-card px-4 py-3 font-mono text-xs tabular-nums text-textp"
              placeholder={t('settings.importPlaceholder')}
            />
          </Field>
          <ActionButton className="mt-3" onClick={onImport}>
            {t('settings.importAction')}
          </ActionButton>
        </SettingsGroup>
      </div>
    </SiteLayout>
  );
}
