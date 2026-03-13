import { z } from 'zod'
import { getDeviceIdentityFromCookie } from '@/lib/device-cookie'
import { generateDeviceDisplayName } from '@/lib/device-identity'
import type { Expense, Trip } from '@/lib/types'
import { round2, round6 } from '@/lib/utils'
import { fetchFxRate } from './fx'

type TripRow = {
  id: string
  name: string
  expense_currency: string | null
  base_currency: string
  split_count: number | null
  share_code: string
  owner_device_id: string
  created_at: string
  updated_at: string
}

type ExpenseRow = {
  id: string
  trip_id: string
  creator_device_id: string
  payer_member_id: string
  title: string
  note: string | null
  amount_original: number
  original_currency: string
  fx_rate_to_base: number
  amount_base: number
  split_count: number | null
  spent_at: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

const createTripSchema = z.object({
  name: z.string().trim().min(1).max(80),
  expenseCurrency: z.string().trim().length(3),
  settlementCurrency: z.string().trim().length(3),
  splitCount: z.number().int().min(1).max(999),
  ownerDisplayName: z.string().trim().min(1).max(30),
})
const updateTripSettingsSchema = z.object({ splitCount: z.number().int().min(1).max(999) })
const createExpenseSchema = z.object({
  title: z.string().trim().min(1).max(120),
  note: z.string().trim().max(500).optional(),
  amountOriginal: z.number().positive(),
  originalCurrency: z.string().trim().length(3),
  fxRateOverride: z.number().positive().optional(),
  spentAt: z.string().trim().min(8),
  splitCount: z.number().int().min(1).max(999).optional(),
  updatedAt: z.string().trim().optional(),
})
const importSchema = z.object({ content: z.string().trim().min(1) })
const tripExportTripSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1).max(80),
  expenseCurrency: z.string().trim().length(3),
  settlementCurrency: z.string().trim().length(3),
  splitCount: z.number().int().min(1).max(999),
  baseCurrency: z.string().trim().length(3),
  createdAt: z.string().trim().min(1),
  updatedAt: z.string().trim().min(1),
})
const tripExportExpenseSchema = z.object({
  id: z.string().trim().min(1),
  tripId: z.string().trim().min(1),
  creatorDeviceId: z.string().trim().min(1),
  title: z.string().trim().min(1).max(120),
  note: z.string().trim().max(500).nullable(),
  amountOriginal: z.number().positive(),
  originalCurrency: z.string().trim().length(3),
  fxRateToBase: z.number().positive(),
  amountBase: z.number().nonnegative(),
  splitCount: z.number().int().min(1).max(999),
  spentAt: z.string().trim().min(8),
  createdAt: z.string().trim().min(1),
  updatedAt: z.string().trim().min(1),
  deletedAt: z.string().trim().min(1).nullable(),
})
const tripExportSchema = z.object({
  version: z.number().int().min(1),
  exportedAt: z.string().trim().min(1),
  trip: tripExportTripSchema,
  expenses: z.array(tripExportExpenseSchema),
})

function nowIso() {
  return new Date().toISOString()
}

function id(prefix: string) {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, '').slice(0, 20)}`
}

export function buildTripExportContent({
  trip,
  expenses,
  exportedAt = nowIso(),
}: {
  trip: Trip
  expenses: Expense[]
  exportedAt?: string
}) {
  return JSON.stringify({ version: 1, exportedAt, trip, expenses }, null, 2)
}

export function parseTripImportContent(content: string) {
  let parsed: unknown
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('INVALID_JSON_FORMAT')
  }

  const result = tripExportSchema.safeParse(parsed)
  if (!result.success) {
    throw new Error('INVALID_IMPORT_FORMAT')
  }

  const expenseIds = new Set<string>()
  for (const expense of result.data.expenses) {
    if (expenseIds.has(expense.id)) {
      throw new Error('INVALID_IMPORT_FORMAT')
    }
    expenseIds.add(expense.id)
  }

  return result.data
}

export function getDeviceId(request: Request) {
  const headerDeviceId = request.headers.get('x-device-id')?.trim()
  if (headerDeviceId) return headerDeviceId

  return getDeviceIdentityFromCookie(request.headers.get('cookie'))?.deviceId ?? null
}

async function parseJson<T>(request: Request, schema: z.Schema<T>) {
  const raw = await request.json()
  return schema.parse(raw)
}

async function getTripById(db: D1Database, tripId: string) {
  return db.prepare('SELECT * FROM trips WHERE id = ?').bind(tripId).first<TripRow>()
}

async function requireOwnedTrip(db: D1Database, tripId: string, deviceId: string) {
  const trip = await getTripById(db, tripId)
  if (!trip || trip.owner_device_id !== deviceId) return null
  return trip
}

async function getOwnerMemberId(db: D1Database, tripId: string, deviceId: string) {
  const owner = await db
    .prepare('SELECT id FROM members WHERE trip_id = ? AND device_id = ? AND is_owner = 1 LIMIT 1')
    .bind(tripId, deviceId)
    .first<{ id: string }>()
  return owner?.id ?? null
}

function toTrip(row: TripRow) {
  const settlementCurrency = row.base_currency
  const expenseCurrency = row.expense_currency || settlementCurrency
  return {
    id: row.id,
    name: row.name,
    expenseCurrency,
    settlementCurrency,
    splitCount: row.split_count && row.split_count > 0 ? row.split_count : 1,
    baseCurrency: settlementCurrency,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

async function listExpenses(db: D1Database, tripId: string) {
  const rows = await db.prepare('SELECT * FROM expenses WHERE trip_id = ? ORDER BY spent_at DESC, created_at DESC').bind(tripId).all<ExpenseRow>()
  return rows.results.map((row) => ({
    id: row.id,
    tripId: row.trip_id,
    creatorDeviceId: row.creator_device_id,
    title: row.title,
    note: row.note,
    amountOriginal: row.amount_original,
    originalCurrency: row.original_currency,
    fxRateToBase: row.fx_rate_to_base,
    amountBase: row.amount_base,
    splitCount: row.split_count && row.split_count > 0 ? row.split_count : 1,
    spentAt: row.spent_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,
  }))
}

export async function bootstrapDevice() {
  return { deviceId: id('dev'), displayName: generateDeviceDisplayName() }
}

export async function listTrips(env: CloudflareEnv, deviceId: string) {
  const rows = await env.DB.prepare('SELECT * FROM trips WHERE owner_device_id = ? ORDER BY updated_at DESC').bind(deviceId).all<TripRow>()
  return { trips: rows.results.map(toTrip) }
}

export async function createTrip(env: CloudflareEnv, deviceId: string, request: Request) {
  const body = await parseJson(request, createTripSchema)
  const tripId = id('trip')
  const ownerMemberId = id('mem')
  const shareCode = `share_${crypto.randomUUID().replace(/-/g, '').slice(0, 10)}`
  const now = nowIso()

  await env.DB.batch([
    env.DB.prepare(
      'INSERT INTO trips (id, name, expense_currency, base_currency, split_count, share_code, owner_device_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    ).bind(tripId, body.name, body.expenseCurrency.toUpperCase(), body.settlementCurrency.toUpperCase(), body.splitCount, shareCode, deviceId, now, now),
    env.DB.prepare('INSERT INTO members (id, trip_id, display_name, device_id, is_owner, joined_at) VALUES (?, ?, ?, ?, 1, ?)').bind(
      ownerMemberId,
      tripId,
      body.ownerDisplayName,
      deviceId,
      now,
    ),
  ])

  const trip = await getTripById(env.DB, tripId)
  return { trip: toTrip(trip as TripRow) }
}

export async function updateTripSettings(env: CloudflareEnv, tripId: string, deviceId: string, request: Request) {
  const trip = await getTripById(env.DB, tripId)
  if (!trip) return { status: 404, body: { error: 'TRIP_NOT_FOUND' } }
  if (trip.owner_device_id !== deviceId) return { status: 403, body: { error: 'ONLY_OWNER_CAN_EDIT_TRIP' } }
  const body = await parseJson(request, updateTripSettingsSchema)
  const updatedAt = nowIso()
  await env.DB.prepare('UPDATE trips SET split_count = ?, updated_at = ? WHERE id = ?').bind(body.splitCount, updatedAt, tripId).run()
  return { status: 200, body: { ok: true, splitCount: body.splitCount, updatedAt } }
}

export async function removeTrip(env: CloudflareEnv, tripId: string, deviceId: string) {
  const trip = await getTripById(env.DB, tripId)
  if (!trip) return { status: 404, body: { error: 'TRIP_NOT_FOUND' } }
  if (trip.owner_device_id !== deviceId) return { status: 403, body: { error: 'ONLY_OWNER_CAN_DELETE_TRIP' } }

  await env.DB.batch([
    env.DB.prepare('DELETE FROM expense_participants WHERE trip_id = ?').bind(tripId),
    env.DB.prepare('DELETE FROM expenses WHERE trip_id = ?').bind(tripId),
    env.DB.prepare('DELETE FROM members WHERE trip_id = ?').bind(tripId),
    env.DB.prepare('DELETE FROM trips WHERE id = ?').bind(tripId),
  ])

  return { status: 200, body: { ok: true } }
}

export async function snapshotTrip(env: CloudflareEnv, tripId: string, deviceId: string) {
  const trip = await requireOwnedTrip(env.DB, tripId, deviceId)
  if (!trip) return { status: 403, body: { error: 'FORBIDDEN_TRIP_ACCESS' } }
  const expenses = await listExpenses(env.DB, tripId)
  const cursor = expenses.reduce((max, current) => (current.updatedAt > max ? current.updatedAt : max), trip.updated_at)
  return { status: 200, body: { trip: toTrip(trip), members: [], expenses, cursor } }
}

export async function getFxQuote(env: CloudflareEnv, tripId: string, deviceId: string, request: Request) {
  const trip = await requireOwnedTrip(env.DB, tripId, deviceId)
  if (!trip) return { status: 403, body: { error: 'FORBIDDEN_TRIP_ACCESS' } }
  const url = new URL(request.url)
  const fromCurrency = (url.searchParams.get('fromCurrency') ?? '').trim().toUpperCase()
  const toCurrency = (url.searchParams.get('toCurrency') ?? '').trim().toUpperCase()
  const spentAt = (url.searchParams.get('spentAt') ?? '').trim()
  if (!/^[A-Z]{3}$/.test(fromCurrency) || !/^[A-Z]{3}$/.test(toCurrency) || !spentAt) {
    return { status: 400, body: { error: 'INVALID_QUERY_PARAMS' } }
  }
  const rate = await fetchFxRate(env, fromCurrency, toCurrency, spentAt)
  return { status: 200, body: { rate, fromCurrency, toCurrency } }
}

export async function addExpense(env: CloudflareEnv, tripId: string, deviceId: string, request: Request) {
  const trip = await requireOwnedTrip(env.DB, tripId, deviceId)
  if (!trip) return { status: 403, body: { error: 'FORBIDDEN_TRIP_ACCESS' } }

  const body = await parseJson(request, createExpenseSchema)
  const payerMemberId = await getOwnerMemberId(env.DB, tripId, deviceId)
  if (!payerMemberId) return { status: 404, body: { error: 'TRIP_NOT_FOUND' } }

  const expenseId = id('exp')
  const now = body.updatedAt || nowIso()
  const originalCurrency = body.originalCurrency.toUpperCase()
  const settlementCurrency = trip.base_currency.toUpperCase()
  const fxRate = body.fxRateOverride ?? (await fetchFxRate(env, originalCurrency, settlementCurrency, body.spentAt))
  const amountBase = round2(body.amountOriginal * fxRate)
  const splitCount = body.splitCount ?? (trip.split_count && trip.split_count > 0 ? trip.split_count : 1)

  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO expenses
      (id, trip_id, creator_device_id, payer_member_id, title, note, amount_original, original_currency, fx_rate_to_base, amount_base, split_count, spent_at, created_at, updated_at, deleted_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)`,
    ).bind(
      expenseId,
      tripId,
      deviceId,
      payerMemberId,
      body.title,
      body.note ?? null,
      body.amountOriginal,
      originalCurrency,
      fxRate,
      amountBase,
      splitCount,
      body.spentAt,
      now,
      now,
    ),
    env.DB.prepare('UPDATE trips SET updated_at = ? WHERE id = ?').bind(now, tripId),
  ])

  const expense = (await listExpenses(env.DB, tripId)).find((row) => row.id === expenseId) ?? null
  return { status: 200, body: { expense } }
}

export async function removeExpense(env: CloudflareEnv, tripId: string, expenseId: string, deviceId: string) {
  const trip = await requireOwnedTrip(env.DB, tripId, deviceId)
  if (!trip) return { status: 403, body: { error: 'FORBIDDEN_TRIP_ACCESS' } }
  const current = await env.DB.prepare('SELECT creator_device_id FROM expenses WHERE id = ? AND trip_id = ?').bind(expenseId, tripId).first<{ creator_device_id: string }>()
  if (!current) return { status: 404, body: { error: 'EXPENSE_NOT_FOUND' } }
  if (current.creator_device_id !== deviceId) return { status: 403, body: { error: 'ONLY_CREATOR_CAN_DELETE' } }
  const deletedAt = nowIso()
  await env.DB.prepare('UPDATE expenses SET deleted_at = ?, updated_at = ? WHERE id = ? AND trip_id = ?').bind(deletedAt, deletedAt, expenseId, tripId).run()
  await env.DB.prepare('UPDATE trips SET updated_at = ? WHERE id = ?').bind(deletedAt, tripId).run()
  return { status: 200, body: { ok: true, deletedAt } }
}

export async function settlement(env: CloudflareEnv, tripId: string, deviceId: string) {
  const trip = await requireOwnedTrip(env.DB, tripId, deviceId)
  if (!trip) return { status: 403, body: { error: 'FORBIDDEN_TRIP_ACCESS' } }

  const expenses = (await listExpenses(env.DB, tripId)).filter((expense) => !expense.deletedAt)
  const paidMap = new Map<string, number>([['p1', 0]])
  const owedMap = new Map<string, number>([['p1', 0]])

  for (const expense of expenses) {
    const splitCount = expense.splitCount && expense.splitCount > 0 ? expense.splitCount : 1
    const each = expense.amountBase / splitCount
    paidMap.set('p1', (paidMap.get('p1') ?? 0) + expense.amountBase)
    for (let index = 1; index <= splitCount; index += 1) {
      const memberId = `p${index}`
      owedMap.set(memberId, (owedMap.get(memberId) ?? 0) + each)
      if (!paidMap.has(memberId)) paidMap.set(memberId, 0)
    }
  }

  const participantIds = Array.from(new Set([...paidMap.keys(), ...owedMap.keys()])).sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)))
  const balances = participantIds
    .map((memberId) => {
      const paid = round2(paidMap.get(memberId) ?? 0)
      const owed = round2(owedMap.get(memberId) ?? 0)
      return { memberId, paid, owed, net: round2(paid - owed) }
    })
    .filter((row) => Math.abs(row.net) > 0.01)

  const debtors = balances.filter((item) => item.net < -0.01).map((item) => ({ memberId: item.memberId, amount: Math.abs(item.net) }))
  const creditors = balances.filter((item) => item.net > 0.01).map((item) => ({ memberId: item.memberId, amount: item.net }))
  const transfers: Array<{ fromMemberId: string; toMemberId: string; amountBase: number }> = []
  let debtorIndex = 0
  let creditorIndex = 0

  while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
    const pay = Math.min(debtors[debtorIndex].amount, creditors[creditorIndex].amount)
    if (pay > 0.01) {
      transfers.push({
        fromMemberId: debtors[debtorIndex].memberId,
        toMemberId: creditors[creditorIndex].memberId,
        amountBase: round2(pay),
      })
    }
    debtors[debtorIndex].amount = round2(debtors[debtorIndex].amount - pay)
    creditors[creditorIndex].amount = round2(creditors[creditorIndex].amount - pay)
    if (debtors[debtorIndex].amount <= 0.01) debtorIndex += 1
    if (creditors[creditorIndex].amount <= 0.01) creditorIndex += 1
  }

  const expenseConversions = expenses.map((expense) => ({
    expenseId: expense.id,
    title: expense.title,
    spentAt: expense.spentAt,
    originalAmount: round2(expense.amountOriginal),
    originalCurrency: expense.originalCurrency,
    fxRateToSettlement: round6(expense.fxRateToBase),
    settlementAmount: round2(expense.amountBase),
  }))

  const summaryText = transfers.length
    ? transfers.map((item) => `${item.fromMemberId} -> ${item.toMemberId}: ${item.amountBase.toFixed(2)}`).join('\n')
    : 'NO_TRANSFER_NEEDED'

  return {
    status: 200,
    body: {
      balances,
      transfers,
      summaryText,
      currencySummary: {
        expenseCurrency: trip.expense_currency || trip.base_currency,
        settlementCurrency: trip.base_currency,
      },
      expenseConversions,
    },
  }
}

export async function exportTrip(env: CloudflareEnv, tripId: string, deviceId: string) {
  const trip = await requireOwnedTrip(env.DB, tripId, deviceId)
  if (!trip) return { status: 403, body: { error: 'FORBIDDEN_TRIP_ACCESS' } }
  const expenses = await listExpenses(env.DB, tripId)
  return {
    status: 200,
    body: { content: buildTripExportContent({ trip: toTrip(trip), expenses }) },
  }
}

export async function importTrip(env: CloudflareEnv, tripId: string, deviceId: string, request: Request) {
  const trip = await requireOwnedTrip(env.DB, tripId, deviceId)
  if (!trip) return { status: 403, body: { error: 'FORBIDDEN_TRIP_ACCESS' } }
  const body = await parseJson(request, importSchema)
  const ownerMemberId = await getOwnerMemberId(env.DB, tripId, deviceId)
  if (!ownerMemberId) return { status: 404, body: { error: 'TRIP_NOT_FOUND' } }

  let parsed: z.infer<typeof tripExportSchema>
  try {
    parsed = parseTripImportContent(body.content)
  } catch (error) {
    return { status: 400, body: { error: (error as Error).message } }
  }

  const statements = [
    env.DB.prepare(
      'UPDATE trips SET name = ?, expense_currency = ?, base_currency = ?, split_count = ?, created_at = ?, updated_at = ? WHERE id = ?',
    ).bind(
      parsed.trip.name,
      parsed.trip.expenseCurrency.toUpperCase(),
      parsed.trip.settlementCurrency.toUpperCase(),
      parsed.trip.splitCount,
      parsed.trip.createdAt,
      parsed.trip.updatedAt,
      tripId,
    ),
    env.DB.prepare('DELETE FROM expense_participants WHERE trip_id = ?').bind(tripId),
    env.DB.prepare('DELETE FROM expenses WHERE trip_id = ?').bind(tripId),
  ]

  for (const expense of parsed.expenses) {
    statements.push(
      env.DB.prepare(
        `INSERT INTO expenses
        (id, trip_id, creator_device_id, payer_member_id, title, note, amount_original, original_currency, fx_rate_to_base, amount_base, split_count, spent_at, created_at, updated_at, deleted_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ).bind(
        expense.id,
        tripId,
        deviceId,
        ownerMemberId,
        expense.title,
        expense.note,
        expense.amountOriginal,
        expense.originalCurrency.toUpperCase(),
        expense.fxRateToBase,
        expense.amountBase,
        expense.splitCount,
        expense.spentAt,
        expense.createdAt,
        expense.updatedAt,
        expense.deletedAt,
      ),
    )
  }

  await env.DB.batch(statements)

  return { status: 200, body: { ok: true } }
}
