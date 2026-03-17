import '@/lib/i18n/messages/settings'
import { useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type output as Output } from 'zod/v4-mini'
import { AppShell } from '@/components/app/app-shell'
import { InlineStatus } from '@/components/app/inline-status'
import { LocaleSwitcher } from '@/components/app/locale-switcher'
import { ThemeToggle } from '@/components/app/theme-toggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { exportTrip, importTrip } from '@/lib/api/client'
import { buildDatedJsonFilename, downloadTextFile } from '@/lib/files'
import { createImportFormSchema } from '@/lib/form-schemas'
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

type ImportFormValues = Output<ReturnType<typeof createImportFormSchema>>

export function SettingsPage({ locale }: { locale: Locale }) {
  const { t, tError } = useI18n()
  const activeTripId = readActiveTripId()
  const hasActiveTrip = Boolean(activeTripId)
  const [exportStatus, setExportStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string } | null>(null)
  const [importStatus, setImportStatus] = useState<{ tone: 'success' | 'warning' | 'danger'; title: string } | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const importSchema = useMemo(() => createImportFormSchema(tError('MISSING_IMPORT_CONTENT')), [tError])
  const importForm = useForm<ImportFormValues>({
    resolver: zodResolver(importSchema),
    defaultValues: {
      content: '',
    },
  })

  async function onExport() {
    if (!activeTripId) {
      setExportStatus({ tone: 'warning', title: t('settings.noTripToExport') })
      return
    }

    setIsExporting(true)
    setExportStatus(null)

    try {
      const content = await exportTrip(activeTripId)
      downloadTextFile(resolveExportFilename(activeTripId, content), content)
      setExportStatus({ tone: 'success', title: t('settings.exportSuccess') })
    } catch (error) {
      setExportStatus({ tone: 'danger', title: tError((error as Error).message) })
    } finally {
      setIsExporting(false)
    }
  }

  async function onImport(values: ImportFormValues) {
    if (!activeTripId) {
      setImportStatus({ tone: 'warning', title: t('settings.noTripToImport') })
      return
    }

    setIsImporting(true)
    setImportStatus(null)

    try {
      await importTrip(activeTripId, values.content)
      setImportStatus({ tone: 'success', title: t('settings.importSuccess') })
      importForm.reset()
    } catch (error) {
      const message = tError((error as Error).message)
      if ((error as Error).message === 'MISSING_IMPORT_CONTENT' || (error as Error).message === 'INVALID_JSON_FORMAT' || (error as Error).message === 'INVALID_IMPORT_FORMAT') {
        importForm.setError('content', { message })
      } else {
        setImportStatus({ tone: 'danger', title: message })
      }
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <AppShell locale={locale} title={t('settings.title')} activeTool={undefined}>
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('settings.language')}</CardTitle>
            <CardDescription>{t('settings.languageDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <LocaleSwitcher className="min-w-[10rem]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('settings.appearance')}</CardTitle>
            <CardDescription>{t('settings.themeDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeToggle className="min-w-[10rem]" />
          </CardContent>
        </Card>
      </div>

      <Card tone="soft">
        <CardHeader>
          <CardTitle>{t('settings.tripDataTitle')}</CardTitle>
          <CardDescription>{t('settings.tripDataDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!hasActiveTrip ? (
            <InlineStatus tone="warning" title={t('settings.tripRequiredHint')} />
          ) : null}
          <div className="grid gap-4 xl:grid-cols-2">
            <Card tone="plain">
              <CardHeader>
                <CardTitle>{t('settings.exportCurrentTrip')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button type="button" onClick={() => void onExport()} disabled={!hasActiveTrip || isExporting}>
                  {isExporting ? t('settings.exportPending') : t('settings.exportAction')}
                </Button>
                {exportStatus ? <InlineStatus tone={exportStatus.tone} title={exportStatus.title} /> : null}
              </CardContent>
            </Card>
            <Card tone="plain">
              <CardHeader>
                <CardTitle>{t('settings.importTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Form {...importForm}>
                  <form
                    className="space-y-4"
                    onSubmit={(event) => {
                      event.preventDefault()
                      void importForm.handleSubmit((values) => onImport(values))(event)
                    }}
                  >
                    <FormField
                      control={importForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('settings.importTitle')}</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder={t('settings.importPlaceholder')}
                              disabled={!hasActiveTrip || isImporting}
                              onChange={(event) => {
                                field.onChange(event)
                                importForm.clearErrors('content')
                                setImportStatus(null)
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={!hasActiveTrip || isImporting}>
                      {isImporting ? t('settings.importPending') : t('settings.importAction')}
                    </Button>
                  </form>
                </Form>
                {importStatus ? <InlineStatus tone={importStatus.tone} title={importStatus.title} /> : null}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  )
}
