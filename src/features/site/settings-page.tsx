import { useState } from 'react'
import { AppShell } from '@/components/app/app-shell'
import { FormField } from '@/components/app/form-field'
import { InlineStatus } from '@/components/app/inline-status'
import { ThemeToggle } from '@/components/app/theme-toggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { exportTrip, importTrip } from '@/lib/api/client'
import { buildDatedJsonFilename, downloadTextFile } from '@/lib/files'
import { useI18n } from '@/lib/i18n'
import { readActiveTripId } from '@/lib/storage'
import type { Locale } from '@/lib/types'

function resolveExportFilename(tripId: string, content: string) {
  try {
    const parsed = JSON.parse(content) as { trip?: { name?: string } }
    return buildDatedJsonFilename(parsed.trip?.name || tripId)
  } catch {
    return buildDatedJsonFilename(tripId)
  }
}

export function SettingsPage({ locale }: { locale: Locale }) {
  const { t, tError } = useI18n()
  const [importContent, setImportContent] = useState('')
  const [exportStatus, setExportStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string } | null>(null)
  const [importStatus, setImportStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string } | null>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  async function onExport() {
    const tripId = readActiveTripId()
    if (!tripId) {
      setExportStatus({ tone: 'warning', title: t('settings.noTripToExport') })
      return
    }

    setIsExporting(true)
    setExportStatus(null)

    try {
      const content = await exportTrip(tripId)
      downloadTextFile(resolveExportFilename(tripId, content), content)
      setExportStatus({ tone: 'success', title: t('settings.exportSuccess') })
    } catch (error) {
      setExportStatus({ tone: 'danger', title: tError((error as Error).message) })
    } finally {
      setIsExporting(false)
    }
  }

  async function onImport() {
    const tripId = readActiveTripId()
    if (!tripId) {
      setImportStatus({ tone: 'warning', title: t('settings.noTripToImport') })
      return
    }

    const trimmedContent = importContent.trim()
    if (!trimmedContent) {
      setImportError(tError('MISSING_IMPORT_CONTENT'))
      setImportStatus(null)
      return
    }

    setIsImporting(true)
    setImportError(null)
    setImportStatus(null)

    try {
      await importTrip(tripId, trimmedContent)
      setImportStatus({ tone: 'success', title: t('settings.importSuccess') })
      setImportContent('')
    } catch (error) {
      const message = tError((error as Error).message)
      if ((error as Error).message === 'MISSING_IMPORT_CONTENT' || (error as Error).message === 'INVALID_JSON_FORMAT' || (error as Error).message === 'INVALID_IMPORT_FORMAT') {
        setImportError(message)
      } else {
        setImportStatus({ tone: 'danger', title: message })
      }
    } finally {
      setIsImporting(false)
    }
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
          <CardContent className="space-y-4">
            <Button type="button" onClick={() => void onExport()} disabled={isExporting}>
              {isExporting ? t('settings.exportPending') : t('settings.exportCurrentTrip')}
            </Button>
            {exportStatus ? <InlineStatus tone={exportStatus.tone} title={exportStatus.title} /> : null}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('settings.importTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField label={t('settings.importTitle')} error={importError ?? undefined}>
              <Textarea
                value={importContent}
                onChange={(event) => {
                  setImportContent(event.target.value)
                  setImportError(null)
                  setImportStatus(null)
                }}
                placeholder={t('settings.importPlaceholder')}
                aria-invalid={importError ? 'true' : undefined}
                disabled={isImporting}
              />
            </FormField>
            <Button type="button" onClick={() => void onImport()} disabled={isImporting}>
              {isImporting ? t('settings.importPending') : t('settings.importAction')}
            </Button>
            {importStatus ? <InlineStatus tone={importStatus.tone} title={importStatus.title} /> : null}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
