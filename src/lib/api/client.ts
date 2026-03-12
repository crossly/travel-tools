import { readDevice } from '@/lib/storage'
import type { DeviceIdentity, Expense, FxDetectResponse, FxRatesResponse, SettlementResponse, Trip, TripSnapshot } from '@/lib/types'

const jsonHeaders = { 'Content-Type': 'application/json' }

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
  }
}

function getDeviceOrThrow(): DeviceIdentity {
  const device = readDevice()
  if (!device) throw new ApiError('MISSING_DEVICE_PROFILE', 401)
  return device
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init)
  if (!response.ok) {
    const body = (await response.json().catch(() => ({ error: 'REQUEST_FAILED' }))) as { error?: string }
    throw new ApiError(body.error ?? 'REQUEST_FAILED', response.status)
  }
  return (await response.json()) as T
}

export async function bootstrapDevice() {
  return request<DeviceIdentity>('/api/split-bill/device/bootstrap', {
    method: 'POST',
  })
}

export async function listTrips() {
  const device = getDeviceOrThrow()
  const data = await request<{ trips: Trip[] }>('/api/split-bill/trips', {
    headers: { 'x-device-id': device.deviceId },
  })
  return data.trips
}

export async function createTrip(name: string, expenseCurrency: string, settlementCurrency: string, splitCount: number) {
  const device = getDeviceOrThrow()
  const data = await request<{ trip: Trip }>('/api/split-bill/trips', {
    method: 'POST',
    headers: { ...jsonHeaders, 'x-device-id': device.deviceId },
    body: JSON.stringify({ name, expenseCurrency, settlementCurrency, splitCount, ownerDisplayName: device.displayName }),
  })
  return data.trip
}

export async function fetchSnapshot(tripId: string) {
  const device = getDeviceOrThrow()
  return request<TripSnapshot>(`/api/split-bill/trips/${tripId}/snapshot`, {
    headers: { 'x-device-id': device.deviceId },
  })
}

export async function updateTripSettings(tripId: string, splitCount: number) {
  const device = getDeviceOrThrow()
  return request<{ ok: true }>(`/api/split-bill/trips/${tripId}/settings`, {
    method: 'PATCH',
    headers: { ...jsonHeaders, 'x-device-id': device.deviceId },
    body: JSON.stringify({ splitCount }),
  })
}

export async function deleteTrip(tripId: string) {
  const device = getDeviceOrThrow()
  return request<{ ok: true }>(`/api/split-bill/trips/${tripId}`, {
    method: 'DELETE',
    headers: { 'x-device-id': device.deviceId },
  })
}

export async function createExpense(
  tripId: string,
  payload: {
    title: string
    note?: string
    amountOriginal: number
    originalCurrency: string
    spentAt: string
    splitCount?: number
    fxRateOverride?: number
  },
) {
  const device = getDeviceOrThrow()
  const data = await request<{ expense: Expense }>(`/api/split-bill/trips/${tripId}/expenses`, {
    method: 'POST',
    headers: { ...jsonHeaders, 'x-device-id': device.deviceId },
    body: JSON.stringify({ ...payload, updatedAt: new Date().toISOString() }),
  })
  return data.expense
}

export async function deleteExpense(tripId: string, expenseId: string) {
  const device = getDeviceOrThrow()
  return request<{ ok: true }>(`/api/split-bill/trips/${tripId}/expenses/${expenseId}`, {
    method: 'DELETE',
    headers: { 'x-device-id': device.deviceId },
  })
}

export async function fetchFxQuote(tripId: string, fromCurrency: string, toCurrency: string, spentAt: string) {
  const device = getDeviceOrThrow()
  const query = new URLSearchParams({ fromCurrency, toCurrency, spentAt })
  return request<{ rate: number; fromCurrency: string; toCurrency: string }>(`/api/split-bill/trips/${tripId}/fx-quote?${query.toString()}`, {
    headers: { 'x-device-id': device.deviceId },
  })
}

export async function fetchSettlement(tripId: string) {
  const device = getDeviceOrThrow()
  return request<SettlementResponse>(`/api/split-bill/trips/${tripId}/settlement`, {
    headers: { 'x-device-id': device.deviceId },
  })
}

export async function exportTrip(tripId: string) {
  const device = getDeviceOrThrow()
  const data = await request<{ content: string }>(`/api/split-bill/trips/${tripId}/export`, {
    method: 'POST',
    headers: { 'x-device-id': device.deviceId },
  })
  return data.content
}

export async function importTrip(tripId: string, content: string) {
  const device = getDeviceOrThrow()
  return request<{ ok: true }>(`/api/split-bill/trips/${tripId}/import`, {
    method: 'POST',
    headers: { ...jsonHeaders, 'x-device-id': device.deviceId },
    body: JSON.stringify({ content }),
  })
}

export async function detectCurrency(tz: string) {
  const query = new URLSearchParams({ tz })
  return request<FxDetectResponse>(`/api/fx/detect?${query.toString()}`)
}

export async function fetchCurrencyRates(base: string) {
  const query = new URLSearchParams({ base })
  return request<FxRatesResponse>(`/api/fx/rates?${query.toString()}`)
}
