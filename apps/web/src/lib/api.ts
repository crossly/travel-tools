import { enqueueOperation, listOperations, readDevice, removeOperation } from './storage';
import type { DeviceIdentity, Expense, FxDetectResponse, FxRatesResponse, OfflineOperation, SettlementResponse, Trip, TripSnapshot } from './types';

const jsonHeaders = { 'Content-Type': 'application/json' };
const SPLIT_BILL_API_PREFIX = '/api/split-bill';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function getDeviceOrThrow(): DeviceIdentity {
  const device = readDevice();
  if (!device) {
    throw new ApiError('MISSING_DEVICE_PROFILE', 401);
  }
  return device;
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const message = (await res.json().catch(() => ({ error: 'REQUEST_FAILED' }))).error ?? 'REQUEST_FAILED';
    throw new ApiError(message, res.status);
  }
  return (await res.json()) as T;
}

export async function bootstrapDevice(displayName: string): Promise<DeviceIdentity> {
  const data = await request<{ deviceId: string; displayName: string }>(`${SPLIT_BILL_API_PREFIX}/device/bootstrap`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ displayName }),
  });
  return { deviceId: data.deviceId, displayName: data.displayName };
}

export async function createTrip(name: string, expenseCurrency: string, settlementCurrency: string, splitCount: number): Promise<Trip> {
  const device = getDeviceOrThrow();
  const data = await request<{ trip: Trip }>(`${SPLIT_BILL_API_PREFIX}/trips`, {
    method: 'POST',
    headers: { ...jsonHeaders, 'x-device-id': device.deviceId },
    body: JSON.stringify({ name, expenseCurrency, settlementCurrency, splitCount, ownerDisplayName: device.displayName }),
  });
  return data.trip;
}

export async function deleteTrip(tripId: string): Promise<void> {
  const device = getDeviceOrThrow();
  await request(`${SPLIT_BILL_API_PREFIX}/trips/${tripId}`, {
    method: 'DELETE',
    headers: { 'x-device-id': device.deviceId },
  });
}

export async function updateTripSettings(tripId: string, splitCount: number): Promise<void> {
  const device = getDeviceOrThrow();
  await request(`${SPLIT_BILL_API_PREFIX}/trips/${tripId}/settings`, {
    method: 'PATCH',
    headers: { ...jsonHeaders, 'x-device-id': device.deviceId },
    body: JSON.stringify({ splitCount }),
  });
}

export async function fetchSnapshot(tripId: string): Promise<TripSnapshot> {
  const device = getDeviceOrThrow();
  return request<TripSnapshot>(`${SPLIT_BILL_API_PREFIX}/trips/${tripId}/snapshot`, {
    headers: { 'x-device-id': device.deviceId },
  });
}

export async function createExpense(
  tripId: string,
  payload: {
    title: string;
    note?: string;
    amountOriginal: number;
    originalCurrency: string;
    spentAt: string;
    splitCount?: number;
    fxRateOverride?: number;
  },
): Promise<Expense | null> {
  const device = getDeviceOrThrow();
    const body = { ...payload, updatedAt: new Date().toISOString() };
  try {
    const data = await request<{ expense: Expense }>(`${SPLIT_BILL_API_PREFIX}/trips/${tripId}/expenses`, {
      method: 'POST',
      headers: { ...jsonHeaders, 'x-device-id': device.deviceId },
      body: JSON.stringify(body),
    });
    return data.expense;
  } catch (error) {
    if (!navigator.onLine) {
      const op: OfflineOperation = {
        opId: crypto.randomUUID(),
        tripId,
        type: 'expense.create',
        entityId: crypto.randomUUID(),
        payload: body,
        ts: new Date().toISOString(),
      };
      await enqueueOperation(op);
      return null;
    }
    throw error;
  }
}

export async function fetchFxQuote(
  tripId: string,
  fromCurrency: string,
  toCurrency: string,
  spentAt: string,
): Promise<{ rate: number; fromCurrency: string; toCurrency: string }> {
  const device = getDeviceOrThrow();
  const query = new URLSearchParams({
    fromCurrency: fromCurrency.toUpperCase(),
    toCurrency: toCurrency.toUpperCase(),
    spentAt,
  });

  return request<{ rate: number; fromCurrency: string; toCurrency: string }>(`${SPLIT_BILL_API_PREFIX}/trips/${tripId}/fx-quote?${query.toString()}`, {
    headers: { 'x-device-id': device.deviceId },
  });
}

export async function updateExpense(tripId: string, expenseId: string, payload: Partial<Expense>): Promise<void> {
  const device = getDeviceOrThrow();
  const body = { ...payload, updatedAt: new Date().toISOString() };
  try {
    await request(`${SPLIT_BILL_API_PREFIX}/trips/${tripId}/expenses/${expenseId}`, {
      method: 'PATCH',
      headers: { ...jsonHeaders, 'x-device-id': device.deviceId },
      body: JSON.stringify(body),
    });
  } catch (error) {
    if (!navigator.onLine) {
      const op: OfflineOperation = {
        opId: crypto.randomUUID(),
        tripId,
        type: 'expense.update',
        entityId: expenseId,
        payload: body,
        ts: new Date().toISOString(),
      };
      await enqueueOperation(op);
      return;
    }
    throw error;
  }
}

export async function deleteExpense(tripId: string, expenseId: string): Promise<void> {
  const device = getDeviceOrThrow();
  try {
    await request(`${SPLIT_BILL_API_PREFIX}/trips/${tripId}/expenses/${expenseId}`, {
      method: 'DELETE',
      headers: { 'x-device-id': device.deviceId },
    });
  } catch (error) {
    if (!navigator.onLine) {
      const op: OfflineOperation = {
        opId: crypto.randomUUID(),
        tripId,
        type: 'expense.delete',
        entityId: expenseId,
        payload: {},
        ts: new Date().toISOString(),
      };
      await enqueueOperation(op);
      return;
    }
    throw error;
  }
}

export async function flushOfflineQueue(tripId: string): Promise<number> {
  const device = getDeviceOrThrow();
  const operations = await listOperations(tripId);
  if (!operations.length) return 0;

  const result = await request<{ applied: string[]; rejected: string[] }>(`${SPLIT_BILL_API_PREFIX}/trips/${tripId}/sync/batch`, {
    method: 'POST',
    headers: { ...jsonHeaders, 'x-device-id': device.deviceId },
    body: JSON.stringify({ operations }),
  });

  const done = [...result.applied, ...result.rejected];
  await Promise.all(done.map((opId) => removeOperation(opId)));
  return result.applied.length;
}

export async function fetchSettlement(tripId: string): Promise<SettlementResponse> {
  const device = getDeviceOrThrow();
  return request<SettlementResponse>(`${SPLIT_BILL_API_PREFIX}/trips/${tripId}/settlement`, {
    headers: { 'x-device-id': device.deviceId },
  });
}

export async function exportTrip(tripId: string): Promise<string> {
  const device = getDeviceOrThrow();
  const data = await request<{ content: string }>(`${SPLIT_BILL_API_PREFIX}/trips/${tripId}/export`, {
    method: 'POST',
    headers: { 'x-device-id': device.deviceId },
  });
  return data.content;
}

export async function importTrip(tripId: string, content: string): Promise<void> {
  const device = getDeviceOrThrow();
  await request(`${SPLIT_BILL_API_PREFIX}/trips/${tripId}/import`, {
    method: 'POST',
    headers: { ...jsonHeaders, 'x-device-id': device.deviceId },
    body: JSON.stringify({ content }),
  });
}

export async function detectCurrency(tz: string): Promise<FxDetectResponse> {
  const query = new URLSearchParams({ tz });
  return request<FxDetectResponse>(`/api/fx/detect?${query.toString()}`);
}

export async function fetchCurrencyRates(base: string): Promise<FxRatesResponse> {
  const query = new URLSearchParams({ base: base.toUpperCase() });
  return request<FxRatesResponse>(`/api/fx/rates?${query.toString()}`);
}
