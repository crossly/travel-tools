import { useState } from 'react'
import { AppShell } from '@/components/app/app-shell'
import { InlineStatus } from '@/components/app/inline-status'
import { ThemeToggle } from '@/components/app/theme-toggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { exportTrip, importTrip } from '@/lib/api/client'
import { useI18n } from '@/lib/i18n'
import { readActiveTripId } from '@/lib/storage'
import type { Locale } from '@/lib/types'

export function SettingsPage({ locale }: { locale: Locale }) {
  const { t } = useI18n()
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
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.appearance')}</CardTitle>
          <CardDescription>{t('settings.theme')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeToggle className="min-w-[10rem]" />
        </CardContent>
      </Card>

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
