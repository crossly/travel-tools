import type {
  JetLagDirection,
  JetLagIntensity,
  JetLagLightTiming,
  JetLagPlan,
  JetLagPrefs,
  JetLagTimezoneOption,
  Locale,
} from '@/lib/types'

const intensityRank: Record<JetLagIntensity, number> = {
  light: 0,
  moderate: 1,
  heavy: 2,
}

export const JET_LAG_TIMEZONES: JetLagTimezoneOption[] = [
  { value: 'America/Los_Angeles', label: 'Los Angeles (America/Los_Angeles)' },
  { value: 'America/Denver', label: 'Denver (America/Denver)' },
  { value: 'America/Chicago', label: 'Chicago (America/Chicago)' },
  { value: 'America/New_York', label: 'New York (America/New_York)' },
  { value: 'America/Toronto', label: 'Toronto (America/Toronto)' },
  { value: 'America/Mexico_City', label: 'Mexico City (America/Mexico_City)' },
  { value: 'Europe/London', label: 'London (Europe/London)' },
  { value: 'Europe/Paris', label: 'Paris (Europe/Paris)' },
  { value: 'Europe/Berlin', label: 'Berlin (Europe/Berlin)' },
  { value: 'Europe/Rome', label: 'Rome (Europe/Rome)' },
  { value: 'Europe/Istanbul', label: 'Istanbul (Europe/Istanbul)' },
  { value: 'Africa/Cairo', label: 'Cairo (Africa/Cairo)' },
  { value: 'Asia/Dubai', label: 'Dubai (Asia/Dubai)' },
  { value: 'Asia/Bangkok', label: 'Bangkok (Asia/Bangkok)' },
  { value: 'Asia/Singapore', label: 'Singapore (Asia/Singapore)' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong (Asia/Hong_Kong)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (Asia/Shanghai)' },
  { value: 'Asia/Seoul', label: 'Seoul (Asia/Seoul)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (Asia/Tokyo)' },
  { value: 'Australia/Sydney', label: 'Sydney (Australia/Sydney)' },
  { value: 'Pacific/Auckland', label: 'Auckland (Pacific/Auckland)' },
]

const curatedJetLagTimezones = new Map(JET_LAG_TIMEZONES.map((option) => [option.value, option]))

const INITIAL_JET_LAG_PREFS: JetLagPrefs = {
  originTimeZone: 'Asia/Shanghai',
  destinationTimeZone: 'Europe/Paris',
  departureAt: '2026-01-15T09:00',
  arrivalAt: '2026-01-15T18:00',
  intensity: 'moderate',
}

export function getInitialJetLagPrefs(): JetLagPrefs {
  return { ...INITIAL_JET_LAG_PREFS }
}

export function getDefaultJetLagPrefs(originTimeZone = resolveDefaultOriginTimeZone()): JetLagPrefs {
  const now = new Date()
  const departureAt = toDateTimeInputValue(new Date(now.getTime() + 24 * 60 * 60 * 1000))
  const arrivalAt = toDateTimeInputValue(new Date(now.getTime() + 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000))

  return {
    originTimeZone,
    destinationTimeZone: originTimeZone === 'Europe/Paris' ? 'Asia/Tokyo' : 'Europe/Paris',
    departureAt,
    arrivalAt,
    intensity: 'moderate',
  }
}

export function getResetJetLagPrefs(currentPrefs: JetLagPrefs, now = new Date()): JetLagPrefs {
  const departureAt = toDateTimeInputValue(new Date(now.getTime() + 24 * 60 * 60 * 1000))
  const arrivalAt = toDateTimeInputValue(new Date(now.getTime() + 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000))

  return {
    ...currentPrefs,
    departureAt,
    arrivalAt,
  }
}

export function resolveDefaultOriginTimeZone(browserTimeZone = getResolvedBrowserTimeZone()) {
  if (browserTimeZone?.trim()) {
    return browserTimeZone
  }

  return 'Asia/Shanghai'
}

function buildFallbackTimezoneOption(value: string): JetLagTimezoneOption {
  const normalizedValue = value.trim()
  const cityName = normalizedValue.includes('/')
    ? normalizedValue.split('/').at(-1)?.replace(/_/g, ' ')
    : null

  return {
    value: normalizedValue,
    label: cityName ? `${cityName} (${normalizedValue})` : normalizedValue,
  }
}

function listJetLagTimezoneOptions(extraValues: string[] = []) {
  if (!extraValues.length) {
    return JET_LAG_TIMEZONES
  }

  const fallbackOptions = extraValues
    .map((value) => value.trim())
    .filter((value) => value && !curatedJetLagTimezones.has(value))
    .map((value) => buildFallbackTimezoneOption(value))

  return [...fallbackOptions, ...JET_LAG_TIMEZONES]
}

export function getJetLagTimezoneOption(value: string, extraValues: string[] = []) {
  return listJetLagTimezoneOptions(extraValues).find((option) => option.value === value) ?? null
}

export function searchJetLagTimezones(query: string, extraValues: string[] = []) {
  const normalizedQuery = query.trim().toLowerCase()
  const options = listJetLagTimezoneOptions(extraValues)
  if (!normalizedQuery) return options

  return options.filter((option) => {
    const haystack = `${option.label} ${option.value}`.toLowerCase()
    return haystack.includes(normalizedQuery)
  })
}

export function getRecommendedJetLagIntensity(hourDifference: number): JetLagIntensity {
  const absoluteHours = Math.abs(hourDifference)
  if (absoluteHours <= 3) return 'light'
  if (absoluteHours <= 7) return 'moderate'
  return 'heavy'
}

export function calculateJetLagPlan(prefs: JetLagPrefs): JetLagPlan | null {
  if (!prefs.departureAt || !prefs.arrivalAt) return null

  const departureUtc = zonedDateTimeToUtc(prefs.departureAt, prefs.originTimeZone)
  const arrivalUtc = zonedDateTimeToUtc(prefs.arrivalAt, prefs.destinationTimeZone)
  if (!departureUtc || !arrivalUtc) return null

  const flightDurationHours = Number(((arrivalUtc.getTime() - departureUtc.getTime()) / (60 * 60 * 1000)).toFixed(1))
  if (!Number.isFinite(flightDurationHours) || flightDurationHours <= 0) {
    return null
  }

  const hourDifference = Number((
    (getTimeZoneOffsetMinutes(arrivalUtc, prefs.destinationTimeZone) - getTimeZoneOffsetMinutes(arrivalUtc, prefs.originTimeZone))
    / 60
  ).toFixed(1))

  const recommendedIntensity = getRecommendedJetLagIntensity(hourDifference)
  const direction = resolveDirection(hourDifference)
  const absoluteHours = Math.abs(hourDifference)
  const intensityOffset = intensityRank[prefs.intensity]
  const arrivalLocalHour = extractHour(prefs.arrivalAt)
  const sleepAnchorHour = getSleepAnchorHour(arrivalLocalHour, direction, intensityOffset)
  const napMinutes = [90, 45, 20][intensityOffset] ?? 45
  const napCutoffHour = clampHour(sleepAnchorHour - 6)
  const caffeineDelayHours = [0.5, 1.5, 3][intensityOffset] ?? 1.5
  const lightTiming = resolveLightTiming(direction, absoluteHours)
  const recoveryDivisor = direction === 'east' ? [2.5, 2, 1.5][intensityOffset] : [3, 2.5, 2][intensityOffset]
  const recoveryDays = Math.max(1, Math.ceil(absoluteHours / recoveryDivisor))

  return {
    selectedIntensity: prefs.intensity,
    recommendedIntensity,
    direction,
    lightTiming,
    hourDifference,
    flightDurationHours,
    recoveryDays,
    arrivalLocalHour,
    sleepAnchorHour,
    napCutoffHour,
    napMinutes,
    caffeineDelayHours,
  }
}

export function formatJetLagTime(dateTime: string, timeZone: string, locale: Locale) {
  const utcDate = zonedDateTimeToUtc(dateTime, timeZone)
  if (!utcDate) return '---'
  return formatJetLagInstant(utcDate, timeZone, locale)
}

export function formatJetLagInstant(date: Date, timeZone: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export function formatJetLagDualZoneTime(dateTime: string, sourceTimeZone: string, displayTimeZone: string, locale: Locale) {
  const utcDate = zonedDateTimeToUtc(dateTime, sourceTimeZone)
  if (!utcDate) return '---'
  return formatJetLagInstant(utcDate, displayTimeZone, locale)
}

export function formatHourValue(value: number) {
  const normalized = Number(value.toFixed(1))
  return Number.isInteger(normalized) ? String(normalized) : normalized.toFixed(1)
}

function resolveDirection(hourDifference: number): JetLagDirection {
  if (hourDifference > 0.5) return 'east'
  if (hourDifference < -0.5) return 'west'
  return 'same'
}

function resolveLightTiming(direction: JetLagDirection, absoluteHours: number): JetLagLightTiming {
  if (absoluteHours <= 2) return 'balanced'
  if (direction === 'east') return 'morning'
  if (direction === 'west') return 'afternoon'
  return 'balanced'
}

function getSleepAnchorHour(arrivalLocalHour: number, direction: JetLagDirection, intensityOffset: number) {
  if (direction === 'east') {
    if (arrivalLocalHour < 6) return 21
    if (arrivalLocalHour < 13) return 22
    if (arrivalLocalHour < 18) return clampHour(21 + intensityOffset)
    return 22
  }

  if (direction === 'west') {
    if (arrivalLocalHour < 6) return 22
    if (arrivalLocalHour < 13) return clampHour(22 + intensityOffset)
    if (arrivalLocalHour < 18) return 21
    return 22
  }

  return arrivalLocalHour < 15 ? 22 : 23
}

function clampHour(value: number) {
  if (value < 0) return 0
  if (value > 23) return 23
  return value
}

function extractHour(dateTime: string) {
  const [, time = '00:00'] = dateTime.split('T', 2)
  const [hour = '0'] = time.split(':', 2)
  return Number.parseInt(hour, 10) || 0
}

function parseDateTimeParts(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value)
  if (!match) return null

  return {
    year: Number.parseInt(match[1], 10),
    month: Number.parseInt(match[2], 10),
    day: Number.parseInt(match[3], 10),
    hour: Number.parseInt(match[4], 10),
    minute: Number.parseInt(match[5], 10),
  }
}

function zonedDateTimeToUtc(value: string, timeZone: string) {
  const parts = parseDateTimeParts(value)
  if (!parts) return null

  const utcGuess = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute)
  let result = new Date(utcGuess - getTimeZoneOffsetMinutes(new Date(utcGuess), timeZone) * 60 * 1000)
  const secondPassOffset = getTimeZoneOffsetMinutes(result, timeZone)
  result = new Date(utcGuess - secondPassOffset * 60 * 1000)
  return result
}

function getTimeZoneOffsetMinutes(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date)

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  const asUtc = Date.UTC(
    Number.parseInt(values.year, 10),
    Number.parseInt(values.month, 10) - 1,
    Number.parseInt(values.day, 10),
    Number.parseInt(values.hour, 10),
    Number.parseInt(values.minute, 10),
    Number.parseInt(values.second, 10),
  )

  return (asUtc - date.getTime()) / (60 * 1000)
}

function toDateTimeInputValue(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hour}:${minute}`
}

function getResolvedBrowserTimeZone() {
  return typeof Intl !== 'undefined'
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : null
}
