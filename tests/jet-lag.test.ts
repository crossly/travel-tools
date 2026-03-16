import { describe, expect, it } from 'vitest'
import { calculateJetLagPlan, getRecommendedJetLagIntensity, resolveDefaultOriginTimeZone } from '@/lib/jet-lag'

describe('jet lag helpers', () => {
  it('classifies recommended intensity from the timezone gap', () => {
    expect(getRecommendedJetLagIntensity(2)).toBe('light')
    expect(getRecommendedJetLagIntensity(6)).toBe('moderate')
    expect(getRecommendedJetLagIntensity(9)).toBe('heavy')
  })

  it('builds a westbound jet lag plan from zoned local datetimes', () => {
    const plan = calculateJetLagPlan({
      originTimeZone: 'Asia/Shanghai',
      destinationTimeZone: 'Europe/Paris',
      departureAt: '2026-01-15T09:00',
      arrivalAt: '2026-01-15T18:00',
      intensity: 'moderate',
    })

    expect(plan).toMatchObject({
      direction: 'west',
      recommendedIntensity: 'moderate',
      lightTiming: 'afternoon',
      napMinutes: 45,
      sleepAnchorHour: 22,
    })
    expect(plan?.hourDifference).toBe(-7)
    expect(plan?.flightDurationHours).toBe(16)
  })

  it('returns null when the trip timing is impossible', () => {
    expect(calculateJetLagPlan({
      originTimeZone: 'Europe/Paris',
      destinationTimeZone: 'Asia/Tokyo',
      departureAt: '2026-01-15T10:00',
      arrivalAt: '2026-01-15T09:00',
      intensity: 'light',
    })).toBeNull()
  })

  it('keeps the detected browser timezone even when it is outside the curated list', () => {
    expect(resolveDefaultOriginTimeZone('Asia/Kolkata')).toBe('Asia/Kolkata')
  })
})
