import '@/lib/i18n/messages/jet-lag'
import { useEffect, useState } from 'react'
import { Clock3, Coffee, MoonStar, PlaneLanding, SunMedium } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { DateTimeField } from '@/components/app/date-time-field'
import { FieldGroup } from '@/components/app/field-group'
import { InlineStatus } from '@/components/app/inline-status'
import { TimezoneCombobox } from '@/components/app/timezone-combobox'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  calculateJetLagPlan,
  formatHourValue,
  formatJetLagTime,
  getDefaultJetLagPrefs,
  getInitialJetLagPrefs,
  resolveDefaultOriginTimeZone,
} from '@/lib/jet-lag'
import { useI18n } from '@/lib/i18n'
import { readJetLagPrefs, writeJetLagPrefs, writeLastTool } from '@/lib/storage'
import type { JetLagIntensity, JetLagPrefs, Locale } from '@/lib/types'

const intensities: JetLagIntensity[] = ['light', 'moderate', 'heavy']

export function JetLagPage({ locale }: { locale: Locale }) {
  const { t } = useI18n()
  const [prefs, setPrefs] = useState<JetLagPrefs>(() => getInitialJetLagPrefs())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    writeLastTool('jet-lag')
    const storedPrefs = readJetLagPrefs()
    if (storedPrefs) {
      setPrefs(storedPrefs)
    } else {
      setPrefs(getDefaultJetLagPrefs(resolveDefaultOriginTimeZone()))
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    writeJetLagPrefs(prefs)
  }, [prefs, ready])

  const plan = calculateJetLagPlan(prefs)
  const arrivalDisplay = formatJetLagTime(prefs.arrivalAt, prefs.destinationTimeZone, locale)

  return (
    <AppShell locale={locale} title={t('jetLag.title')} description={t('jetLag.description')} activeTool="jet-lag">
      <div className="grid gap-4 xl:grid-cols-[1fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-balance">{t('jetLag.inputTitle')}</CardTitle>
            <CardDescription className="text-pretty">{t('jetLag.inputDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FieldGroup label={t('jetLag.originTimeZone')}>
              <TimezoneCombobox
                value={prefs.originTimeZone}
                onValueChange={(nextValue) => setPrefs((current) => ({ ...current, originTimeZone: nextValue }))}
                locale={locale}
              />
            </FieldGroup>

            <FieldGroup label={t('jetLag.destinationTimeZone')}>
              <TimezoneCombobox
                value={prefs.destinationTimeZone}
                onValueChange={(nextValue) => setPrefs((current) => ({ ...current, destinationTimeZone: nextValue }))}
                locale={locale}
              />
            </FieldGroup>

            <div className="grid gap-4 md:grid-cols-2">
              <FieldGroup label={t('jetLag.departureAt')}>
                <DateTimeField
                  value={prefs.departureAt}
                  onChange={(nextValue) => setPrefs((current) => ({ ...current, departureAt: nextValue }))}
                  locale={locale}
                  timeLabel={t('jetLag.departureTimeLabel')}
                />
              </FieldGroup>

              <FieldGroup label={t('jetLag.arrivalAt')}>
                <DateTimeField
                  value={prefs.arrivalAt}
                  onChange={(nextValue) => setPrefs((current) => ({ ...current, arrivalAt: nextValue }))}
                  locale={locale}
                  timeLabel={t('jetLag.arrivalTimeLabel')}
                />
              </FieldGroup>
            </div>

            <Tabs
              value={prefs.intensity}
              onValueChange={(nextValue) => setPrefs((current) => ({ ...current, intensity: nextValue as JetLagIntensity }))}
            >
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">{t('jetLag.modeLabel')}</p>
                <TabsList>
                  {intensities.map((intensity) => (
                    <TabsTrigger key={intensity} value={intensity}>
                      {t(`jetLag.intensity.${intensity}`)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              {intensities.map((intensity) => (
                <TabsContent key={intensity} value={intensity}>
                  <Card className="border-dashed">
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">{t(`jetLag.intensityDescription.${intensity}`)}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {!plan ? (
            <InlineStatus tone="warning" title={t('jetLag.invalidTiming')} description={t('jetLag.invalidTimingDescription')} />
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-balance">{t('jetLag.summaryTitle')}</CardTitle>
                  <CardDescription className="text-pretty">{t('jetLag.summaryDescription')}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-2">
                  <StatCard
                    icon={Clock3}
                    label={t('jetLag.hourDifference')}
                    value={`${formatHourValue(Math.abs(plan.hourDifference))}${t('jetLag.hoursSuffix')}`}
                    helper={t(`jetLag.direction.${plan.direction}`)}
                  />
                  <StatCard
                    icon={PlaneLanding}
                    label={t('jetLag.flightDuration')}
                    value={`${formatHourValue(plan.flightDurationHours)}${t('jetLag.hoursSuffix')}`}
                    helper={t('jetLag.recommendedMode', { intensity: t(`jetLag.intensity.${plan.recommendedIntensity}`) })}
                  />
                  <StatCard
                    icon={MoonStar}
                    label={t('jetLag.recoveryDays')}
                    value={`${plan.recoveryDays}${t('jetLag.daysSuffix')}`}
                    helper={t('jetLag.sleepAnchor', { hour: plan.sleepAnchorHour })}
                  />
                  <StatCard
                    icon={SunMedium}
                    label={t('jetLag.arrivalLocal')}
                    value={arrivalDisplay}
                    helper={t(`jetLag.lightTiming.${plan.lightTiming}`)}
                  />
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-3">
                <AdviceCard
                  icon={MoonStar}
                  title={t('jetLag.sleepTitle')}
                  description={t('jetLag.sleepAdvice', { hour: plan.sleepAnchorHour })}
                />
                <AdviceCard
                  icon={SunMedium}
                  title={t('jetLag.lightTitle')}
                  description={t(`jetLag.lightAdvice.${plan.lightTiming}`)}
                />
                <AdviceCard
                  icon={Coffee}
                  title={t('jetLag.caffeineTitle')}
                  description={t('jetLag.caffeineAdvice', { hours: formatHourValue(plan.caffeineDelayHours) })}
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-balance">{t('jetLag.napTitle')}</CardTitle>
                  <CardDescription className="text-pretty">
                    {t('jetLag.napAdvice', { minutes: plan.napMinutes, hour: plan.napCutoffHour })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setPrefs(getDefaultJetLagPrefs())}
                  >
                    {t('jetLag.reset')}
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </AppShell>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: typeof Clock3
  label: string
  value: string
  helper: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-[color:var(--surface-floating)] p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4 text-primary" />
        {label}
      </div>
      <p className="mt-3 text-2xl font-semibold tabular-nums text-foreground">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{helper}</p>
    </div>
  )
}

function AdviceCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Clock3
  title: string
  description: string
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-primary" />
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-pretty text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
