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
  formatJetLagDualZoneTime,
  formatJetLagInstant,
  formatHourValue,
  formatJetLagTime,
  getDefaultJetLagPrefs,
  getJetLagTimezoneOption,
  getInitialJetLagPrefs,
  getResetJetLagPrefs,
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
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

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
    const tick = () => setCurrentTime(new Date())
    tick()
    const intervalId = window.setInterval(tick, 60 * 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (!ready) return
    writeJetLagPrefs(prefs)
  }, [prefs, ready])

  const plan = calculateJetLagPlan(prefs)
  const arrivalDisplay = formatJetLagTime(prefs.arrivalAt, prefs.destinationTimeZone, locale)
  const nextStepDescription = plan ? t('jetLag.nextStepDescription', { hour: plan.sleepAnchorHour }) : null
  const hourDifferenceLabel = plan
    ? plan.direction === 'east'
      ? t('jetLag.relative.ahead', { hours: `${formatHourValue(Math.abs(plan.hourDifference))}${t('jetLag.hoursSuffix')}` })
      : plan.direction === 'west'
        ? t('jetLag.relative.behind', { hours: `${formatHourValue(Math.abs(plan.hourDifference))}${t('jetLag.hoursSuffix')}` })
        : t('jetLag.relative.same')
    : null

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
              <Card
                data-testid="jetlag-primary-plan"
                className="border-primary/25 bg-[linear-gradient(135deg,var(--surface-floating),color-mix(in_oklab,var(--surface-floating)_78%,var(--accent)_22%))]"
              >
                <CardContent className="grid gap-3 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">{t('jetLag.nextStepBadge')}</p>
                  <div className="grid gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] md:items-end">
                    <div className="space-y-2">
                      <h2 className="display text-balance text-2xl font-semibold text-foreground md:text-3xl">{t('jetLag.nextStepTitle')}</h2>
                      <p className="max-w-2xl text-pretty text-sm leading-6 text-muted-foreground md:text-base">
                        {nextStepDescription}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                      <p className="text-sm font-medium text-muted-foreground">{t('jetLag.arrivalLocal')}</p>
                      <p className="mt-2 text-xl font-semibold tabular-nums text-foreground md:text-2xl">{arrivalDisplay}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{t(`jetLag.lightTiming.${plan.lightTiming}`)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div data-testid="jetlag-supporting-layer" className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
                <Card data-testid="jetlag-playbook-card">
                  <CardHeader>
                    <CardTitle className="text-balance">{t('jetLag.summaryTitle')}</CardTitle>
                    <CardDescription className="text-pretty">{t('jetLag.summaryDescription')}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-5">
                    <div className="grid gap-3 sm:grid-cols-2">
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
                    </div>

                    <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
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

                    <div className="rounded-2xl border border-border/80 bg-[color:var(--surface-floating)] p-4">
                      <p className="text-sm font-medium text-foreground">{t('jetLag.napTitle')}</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {t('jetLag.napAdvice', { minutes: plan.napMinutes, hour: plan.napCutoffHour })}
                      </p>
                      <Button
                        type="button"
                        variant="secondary"
                        className="mt-3"
                        onClick={() => setPrefs((current) => getResetJetLagPrefs(current))}
                      >
                        {t('jetLag.reset')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card data-testid="jetlag-timing-card">
                  <CardHeader>
                    <CardTitle className="text-balance">{t('jetLag.clockTitle')}</CardTitle>
                    <CardDescription className="text-pretty">{t('jetLag.clockDescription')}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
                      <StatCard
                        icon={Clock3}
                        label={t('jetLag.originNow')}
                        value={currentTime ? formatJetLagInstant(currentTime, prefs.originTimeZone, locale) : '---'}
                        helper={getClockHelperLabel(prefs.originTimeZone)}
                      />
                      <StatCard
                        icon={Clock3}
                        label={t('jetLag.destinationNow')}
                        value={currentTime ? formatJetLagInstant(currentTime, prefs.destinationTimeZone, locale) : '---'}
                        helper={getClockHelperLabel(prefs.destinationTimeZone)}
                      />
                      <StatCard
                        icon={PlaneLanding}
                        label={t('jetLag.clockDifference')}
                        value={plan ? `${formatHourValue(Math.abs(plan.hourDifference))}${t('jetLag.hoursSuffix')}` : '---'}
                        helper={hourDifferenceLabel ?? t('jetLag.invalidTimingDescription')}
                      />
                    </div>

                    <div className="grid gap-3">
                      <DualZoneTimeCard
                        title={t('jetLag.departureDualTitle')}
                        originLabel={t('jetLag.clockOriginColumn')}
                        destinationLabel={t('jetLag.clockDestinationColumn')}
                        originValue={formatJetLagDualZoneTime(prefs.departureAt, prefs.originTimeZone, prefs.originTimeZone, locale)}
                        destinationValue={formatJetLagDualZoneTime(prefs.departureAt, prefs.originTimeZone, prefs.destinationTimeZone, locale)}
                      />
                      <DualZoneTimeCard
                        title={t('jetLag.arrivalDualTitle')}
                        originLabel={t('jetLag.clockOriginColumn')}
                        destinationLabel={t('jetLag.clockDestinationColumn')}
                        originValue={formatJetLagDualZoneTime(prefs.arrivalAt, prefs.destinationTimeZone, prefs.originTimeZone, locale)}
                        destinationValue={formatJetLagDualZoneTime(prefs.arrivalAt, prefs.destinationTimeZone, prefs.destinationTimeZone, locale)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </AppShell>
  )
}

function getClockHelperLabel(timeZone: string) {
  return getJetLagTimezoneOption(timeZone)?.label ?? timeZone
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

function DualZoneTimeCard({
  title,
  originLabel,
  originValue,
  destinationLabel,
  destinationValue,
}: {
  title: string
  originLabel: string
  originValue: string
  destinationLabel: string
  destinationValue: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-[color:var(--surface-floating)] p-4">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <dl className="mt-4 grid gap-3">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-card/55 px-3 py-2">
          <dt className="text-sm text-muted-foreground">{originLabel}</dt>
          <dd className="text-right text-sm font-medium tabular-nums text-foreground">{originValue}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-card/55 px-3 py-2">
          <dt className="text-sm text-muted-foreground">{destinationLabel}</dt>
          <dd className="text-right text-sm font-medium tabular-nums text-foreground">{destinationValue}</dd>
        </div>
      </dl>
    </div>
  )
}
