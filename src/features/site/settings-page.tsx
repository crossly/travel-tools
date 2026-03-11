import { useState } from 'react'
import { AppShell } from '@/components/app/app-shell'
import { FormField } from '@/components/app/form-field'
import { InlineStatus } from '@/components/app/inline-status'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { exportTrip, importTrip } from '@/lib/api/client'
import { useI18n } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'
import { readActiveTripId, readDevice, writeDevice } from '@/lib/storage'
import type { Locale, SiteTheme } from '@/lib/types'

const THEMES: SiteTheme[] = ['light', 'dark', 'system']

export function SettingsPage({ locale }: { locale: Locale }) {
  const { t } = useI18n()
  const { theme, setTheme } = useTheme()
  const device = readDevice()
  const [displayName, setDisplayName] = useState(device?.displayName ?? '')
  const [importContent, setImportContent] = useState('')
  const [status, setStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string } | null>(null)

  async function onExport() {
    const tripId = readActiveTripId()
    if (!tripId) {
      setStatus({ tone: 'warning', title: t('settings.noTripToExport') })
      return
    }
    const content = await exportTrip(tripId)
    await navigator.clipboard.writeText(content)
    setStatus({ tone: 'success', title: t('settings.exportSuccess') })
  }

  async function onImport() {
    const tripId = readActiveTripId()
    if (!tripId) {
      setStatus({ tone: 'warning', title: t('settings.noTripToImport') })
      return
    }
    await importTrip(tripId, importContent)
    setStatus({ tone: 'success', title: t('settings.importSuccess') })
    setImportContent('')
  }

  return (
    <AppShell locale={locale} title={t('settings.title')} activeTool={undefined}>
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('settings.appearance')}</CardTitle>
            <CardDescription>{t('settings.theme')}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {THEMES.map((item) => (
              <Button key={item} type="button" variant={theme === item ? 'default' : 'outline'} onClick={() => setTheme(item)}>
                {item === 'light' ? t('settings.themeLight') : item === 'dark' ? t('settings.themeDark') : t('settings.themeSystem')}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('settings.deviceNickname')}</CardTitle>
            <CardDescription>{t('home.identityStepDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField label={t('settings.deviceNickname')}>
              <Input value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
            </FormField>
            <Button
              type="button"
              onClick={() => {
                if (device) {
                  writeDevice({ ...device, displayName: displayName.trim() })
                  setStatus({ tone: 'success', title: t('settings.profileSaved') })
                }
              }}
            >
              {t('common.save')}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('settings.exportCurrentTrip')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button type="button" onClick={() => void onExport()}>{t('settings.exportCurrentTrip')}</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('settings.importTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea value={importContent} onChange={(event) => setImportContent(event.target.value)} placeholder={t('settings.importPlaceholder')} />
            <Button type="button" onClick={() => void onImport()}>{t('settings.importAction')}</Button>
          </CardContent>
        </Card>
      </div>

      {status ? <InlineStatus tone={status.tone} title={status.title} /> : null}
    </AppShell>
  )
}
