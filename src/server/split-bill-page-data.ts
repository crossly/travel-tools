import { createMiddleware, createServerFn } from '@tanstack/react-start'
import { getDeviceIdentityFromCookie } from '@/lib/device-cookie'
import type { DeviceIdentity, SettlementResponse, Trip, TripSnapshot } from '@/lib/types'
import type { AppRequestContext } from '@/router'
import { listTrips, settlement, snapshotTrip } from './split-bill'

export type SplitBillHomePageData = {
  device: DeviceIdentity | null
  trips: Trip[]
}

export type SettlementPageData = {
  device: DeviceIdentity | null
  trip: TripSnapshot | null
  settlement: SettlementResponse | null
}

function isTripSnapshot(body: unknown): body is TripSnapshot {
  return body !== null && typeof body === 'object' && 'trip' in body && 'expenses' in body && 'cursor' in body
}

function isSettlementResponse(body: unknown): body is SettlementResponse {
  return body !== null && typeof body === 'object' && 'transfers' in body && 'balances' in body && 'currencySummary' in body
}

const splitBillDeviceMiddleware = createMiddleware({ type: 'request' }).server(async ({ request, context, next }) => {
  const requestContext = context as unknown as AppRequestContext

  return next({
    context: {
      cloudflare: requestContext.cloudflare,
      device: getDeviceIdentityFromCookie(request.headers.get('cookie')),
    },
  })
})

export const loadSplitBillHomeData = createServerFn({ method: 'GET' })
  .middleware([splitBillDeviceMiddleware])
  .handler(async ({ context }) => {
    const emptyState: SplitBillHomePageData = {
      device: null,
      trips: [],
    }

    if (!context.device) {
      return emptyState
    }

    const result = await listTrips(context.cloudflare.env, context.device.deviceId)

    const pageData: SplitBillHomePageData = {
      device: context.device,
      trips: result.trips,
    }

    return pageData
  })

export const loadTripSnapshotData = createServerFn({ method: 'GET' })
  .middleware([splitBillDeviceMiddleware])
  .inputValidator((data: { tripId: string }) => data)
  .handler(async ({ data, context }) => {
    if (!context.device) return null

    const result = await snapshotTrip(context.cloudflare.env, data.tripId, context.device.deviceId)

    const pageData: TripSnapshot | null = result.status === 200 && isTripSnapshot(result.body) ? result.body : null

    return pageData
  })

export const loadSettlementPageData = createServerFn({ method: 'GET' })
  .middleware([splitBillDeviceMiddleware])
  .inputValidator((data: { tripId: string }) => data)
  .handler(async ({ data, context }) => {
    const emptyState: SettlementPageData = {
      device: null,
      trip: null,
      settlement: null,
    }

    if (!context.device) {
      return emptyState
    }

    const [tripResult, settlementResult] = await Promise.all([
      snapshotTrip(context.cloudflare.env, data.tripId, context.device.deviceId),
      settlement(context.cloudflare.env, data.tripId, context.device.deviceId),
    ])

    const pageData: SettlementPageData = {
      device: context.device,
      trip: tripResult.status === 200 && isTripSnapshot(tripResult.body) ? tripResult.body : null,
      settlement: settlementResult.status === 200 && isSettlementResponse(settlementResult.body) ? settlementResult.body : null,
    }

    return pageData
  })
