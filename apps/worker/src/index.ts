import { Hono } from 'hono';
import { z } from 'zod';
import { cronHandler } from './lib/cron';
import { detectHandler } from './api/detect';
import { ratesHandler } from './api/rates';
import { getEnabledTools } from '@travel-tools/shared/site';

type Env = {
  Bindings: {
    DB: D1Database;
    APP_KV: KVNamespace;
    RATES_KV: KVNamespace;
    ASSETS: Fetcher;
    FX_API_BASE_URL?: string;
    APP_NAME?: string;
  };
};

type TripRow = {
  id: string;
  name: string;
  expense_currency: string | null;
  base_currency: string;
  split_count: number | null;
  share_code: string;
  owner_device_id: string;
  created_at: string;
  updated_at: string;
};

type ExpenseRow = {
  id: string;
  trip_id: string;
  creator_device_id: string;
  payer_member_id: string;
  title: string;
  note: string | null;
  amount_original: number;
  original_currency: string;
  fx_rate_to_base: number;
  amount_base: number;
  split_count: number | null;
  spent_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type SyncOperation = {
  opId: string;
  tripId: string;
  type: 'expense.create' | 'expense.update' | 'expense.delete';
  entityId: string;
  payload: Record<string, unknown>;
  ts: string;
};

const app = new Hono<Env>();

app.get('/api/site/health', (c) => c.json({ ok: true, now: nowIso(), app: c.env.APP_NAME ?? 'Travel Tools' }));
app.get('/api/site/tools', (c) => c.json({ tools: getEnabledTools() }));
app.get('/api/fx/detect', detectHandler);
app.get('/api/fx/rates', ratesHandler);
app.get('/api/detect', detectHandler);
app.get('/api/rates', ratesHandler);

const bootstrapSchema = z.object({ displayName: z.string().trim().min(1).max(30) });
const createTripSchema = z.object({
  name: z.string().trim().min(1).max(80),
  expenseCurrency: z.string().trim().length(3),
  settlementCurrency: z.string().trim().length(3),
  splitCount: z.number().int().min(1).max(999).optional(),
  ownerDisplayName: z.string().trim().min(1).max(30),
});
const updateTripSettingsSchema = z.object({
  splitCount: z.number().int().min(1).max(999),
});
const createExpenseSchema = z.object({
  title: z.string().trim().min(1).max(120),
  note: z.string().trim().max(500).optional(),
  amountOriginal: z.number().positive(),
  originalCurrency: z.string().trim().length(3),
  fxRateOverride: z.number().positive().optional(),
  spentAt: z.string().trim().min(8),
  splitCount: z.number().int().min(1).max(999).optional(),
  updatedAt: z.string().trim().optional(),
});
const updateExpenseSchema = z
  .object({
    title: z.string().trim().min(1).max(120).optional(),
    note: z.string().trim().max(500).nullable().optional(),
    updatedAt: z.string().trim().min(8),
  })
  .strict();

function nowIso(): string {
  return new Date().toISOString();
}

function id(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, '').slice(0, 20)}`;
}

async function parseJson<T>(req: Request, schema: z.Schema<T>): Promise<T> {
  const raw = await req.json();
  return schema.parse(raw);
}

function getDeviceId(req: Request): string | null {
  const value = req.headers.get('x-device-id');
  return value?.trim() || null;
}

async function getTripById(db: D1Database, tripId: string): Promise<TripRow | null> {
  return db.prepare('SELECT * FROM trips WHERE id = ?').bind(tripId).first<TripRow>();
}

async function requireOwnedTrip(db: D1Database, tripId: string, deviceId: string): Promise<TripRow | null> {
  const trip = await getTripById(db, tripId);
  if (!trip || trip.owner_device_id !== deviceId) return null;
  return trip;
}

async function getOwnerMemberId(db: D1Database, tripId: string, deviceId: string): Promise<string | null> {
  const owner = await db
    .prepare('SELECT id FROM members WHERE trip_id = ? AND device_id = ? AND is_owner = 1 LIMIT 1')
    .bind(tripId, deviceId)
    .first<{ id: string }>();
  return owner?.id ?? null;
}

async function fetchFxRate(env: Env['Bindings'], from: string, to: string, spentAt: string): Promise<number> {
  if (from === to) return 1;

  const day = spentAt.slice(0, 10);
  const key = `fx:${from}:${to}:${day}`;
  const cached = await env.APP_KV.get(key);
  if (cached) return Number(cached);

  const baseUrl = env.FX_API_BASE_URL || 'https://api.frankfurter.app';
  const datePath = /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : 'latest';
  const url = `${baseUrl}/${datePath}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('FX_FETCH_FAILED');

  const data = (await res.json()) as { rates?: Record<string, number> };
  const rate = data.rates?.[to];
  if (!rate || Number.isNaN(rate)) throw new Error('FX_RATE_UNAVAILABLE');

  await env.APP_KV.put(key, String(rate), { expirationTtl: 60 * 60 * 24 * 7 });
  return rate;
}

function toTrip(row: TripRow) {
  const settlementCurrency = row.base_currency;
  const expenseCurrency = row.expense_currency || settlementCurrency;
  return {
    id: row.id,
    name: row.name,
    expenseCurrency,
    settlementCurrency,
    splitCount: row.split_count && row.split_count > 0 ? row.split_count : 1,
    baseCurrency: settlementCurrency,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function listExpenses(db: D1Database, tripId: string) {
  const rows = await db.prepare('SELECT * FROM expenses WHERE trip_id = ? ORDER BY spent_at DESC, created_at DESC').bind(tripId).all<ExpenseRow>();
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
  }));
}

app.get('/api/health', (c) => c.json({ ok: true, now: nowIso() }));

app.post('/api/device/bootstrap', async (c) => {
  try {
    const body = await parseJson(c.req.raw, bootstrapSchema);
    return c.json({ deviceId: id('dev'), displayName: body.displayName });
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
});

app.get('/api/trips', async (c) => {
  const deviceId = getDeviceId(c.req.raw);
  if (!deviceId) return c.json({ error: 'MISSING_DEVICE_ID' }, 401);

  const rows = await c.env.DB.prepare('SELECT * FROM trips WHERE owner_device_id = ? ORDER BY updated_at DESC').bind(deviceId).all<TripRow>();
  return c.json({ trips: rows.results.map(toTrip) });
});

app.post('/api/trips', async (c) => {
  const deviceId = getDeviceId(c.req.raw);
  if (!deviceId) return c.json({ error: 'MISSING_DEVICE_ID' }, 401);

  try {
    const body = await parseJson(c.req.raw, createTripSchema);
    const tripId = id('trip');
    const ownerMemberId = id('mem');
    const shareCode = `share_${crypto.randomUUID().replace(/-/g, '').slice(0, 10)}`;
    const now = nowIso();

    await c.env.DB.batch([
      c.env.DB.prepare(
        'INSERT INTO trips (id, name, expense_currency, base_currency, split_count, share_code, owner_device_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      ).bind(tripId, body.name, body.expenseCurrency.toUpperCase(), body.settlementCurrency.toUpperCase(), body.splitCount ?? 1, shareCode, deviceId, now, now),
      c.env.DB.prepare('INSERT INTO members (id, trip_id, display_name, device_id, is_owner, joined_at) VALUES (?, ?, ?, ?, 1, ?)').bind(
        ownerMemberId,
        tripId,
        body.ownerDisplayName,
        deviceId,
        now,
      ),
    ]);

    const trip = await getTripById(c.env.DB, tripId);
    return c.json({ trip: toTrip(trip as TripRow) });
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
});

app.patch('/api/trips/:tripId/settings', async (c) => {
  const tripId = c.req.param('tripId');
  const deviceId = getDeviceId(c.req.raw);
  if (!deviceId) return c.json({ error: 'MISSING_DEVICE_ID' }, 401);

  const trip = await getTripById(c.env.DB, tripId);
  if (!trip) return c.json({ error: 'TRIP_NOT_FOUND' }, 404);
  if (trip.owner_device_id !== deviceId) return c.json({ error: 'ONLY_OWNER_CAN_EDIT_TRIP' }, 403);

  try {
    const body = await parseJson(c.req.raw, updateTripSettingsSchema);
    const updatedAt = nowIso();
    await c.env.DB.prepare('UPDATE trips SET split_count = ?, updated_at = ? WHERE id = ?').bind(body.splitCount, updatedAt, tripId).run();
    return c.json({ ok: true, splitCount: body.splitCount, updatedAt });
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
});

app.delete('/api/trips/:tripId', async (c) => {
  const tripId = c.req.param('tripId');
  const deviceId = getDeviceId(c.req.raw);
  if (!deviceId) return c.json({ error: 'MISSING_DEVICE_ID' }, 401);

  const trip = await getTripById(c.env.DB, tripId);
  if (!trip) return c.json({ error: 'TRIP_NOT_FOUND' }, 404);
  if (trip.owner_device_id !== deviceId) return c.json({ error: 'ONLY_OWNER_CAN_DELETE_TRIP' }, 403);

  await c.env.DB.batch([
    c.env.DB.prepare('DELETE FROM expense_participants WHERE trip_id = ?').bind(tripId),
    c.env.DB.prepare('DELETE FROM expenses WHERE trip_id = ?').bind(tripId),
    c.env.DB.prepare('DELETE FROM sync_operations WHERE trip_id = ?').bind(tripId),
    c.env.DB.prepare('DELETE FROM members WHERE trip_id = ?').bind(tripId),
    c.env.DB.prepare('DELETE FROM trips WHERE id = ?').bind(tripId),
  ]);

  return c.json({ ok: true });
});

app.get('/api/trips/:tripId/snapshot', async (c) => {
  const tripId = c.req.param('tripId');
  const deviceId = getDeviceId(c.req.raw);
  if (!deviceId) return c.json({ error: 'MISSING_DEVICE_ID' }, 401);

  const trip = await requireOwnedTrip(c.env.DB, tripId, deviceId);
  if (!trip) return c.json({ error: 'FORBIDDEN_TRIP_ACCESS' }, 403);

  const expenses = await listExpenses(c.env.DB, tripId);
  const cursor = expenses.reduce((max, current) => (current.updatedAt > max ? current.updatedAt : max), trip.updated_at);

  return c.json({ trip: toTrip(trip), members: [], expenses, cursor });
});

app.get('/api/trips/:tripId/fx-quote', async (c) => {
  const tripId = c.req.param('tripId');
  const deviceId = getDeviceId(c.req.raw);
  if (!deviceId) return c.json({ error: 'MISSING_DEVICE_ID' }, 401);

  const trip = await requireOwnedTrip(c.env.DB, tripId, deviceId);
  if (!trip) return c.json({ error: 'FORBIDDEN_TRIP_ACCESS' }, 403);

  const fromCurrency = (c.req.query('fromCurrency') ?? '').trim().toUpperCase();
  const toCurrency = (c.req.query('toCurrency') ?? '').trim().toUpperCase();
  const spentAt = (c.req.query('spentAt') ?? '').trim();
  if (!/^[A-Z]{3}$/.test(fromCurrency) || !/^[A-Z]{3}$/.test(toCurrency) || !spentAt) {
    return c.json({ error: 'INVALID_QUERY_PARAMS' }, 400);
  }

  try {
    const rate = await fetchFxRate(c.env, fromCurrency, toCurrency, spentAt);
    return c.json({ rate, fromCurrency, toCurrency });
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
});

app.post('/api/trips/:tripId/expenses', async (c) => {
  const tripId = c.req.param('tripId');
  const deviceId = getDeviceId(c.req.raw);
  if (!deviceId) return c.json({ error: 'MISSING_DEVICE_ID' }, 401);

  const trip = await requireOwnedTrip(c.env.DB, tripId, deviceId);
  if (!trip) return c.json({ error: 'FORBIDDEN_TRIP_ACCESS' }, 403);

  try {
    const body = await parseJson(c.req.raw, createExpenseSchema);
    const payerMemberId = await getOwnerMemberId(c.env.DB, tripId, deviceId);
    if (!payerMemberId) return c.json({ error: 'TRIP_NOT_FOUND' }, 404);

    const expenseId = id('exp');
    const now = body.updatedAt || nowIso();
    const originalCurrency = body.originalCurrency.toUpperCase();
    const settlementCurrency = trip.base_currency.toUpperCase();
    const fxRate = body.fxRateOverride ?? (await fetchFxRate(c.env, originalCurrency, settlementCurrency, body.spentAt));
    const amountBase = Math.round(body.amountOriginal * fxRate * 100) / 100;
    const splitCount = body.splitCount ?? (trip.split_count && trip.split_count > 0 ? trip.split_count : 1);

    await c.env.DB.batch([
      c.env.DB.prepare(
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
      c.env.DB.prepare('UPDATE trips SET updated_at = ? WHERE id = ?').bind(now, tripId),
    ]);

    const created = (await listExpenses(c.env.DB, tripId)).find((row) => row.id === expenseId) ?? null;
    return c.json({ expense: created });
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
});

app.patch('/api/trips/:tripId/expenses/:expenseId', async (c) => {
  const { tripId, expenseId } = c.req.param();
  const deviceId = getDeviceId(c.req.raw);
  if (!deviceId) return c.json({ error: 'MISSING_DEVICE_ID' }, 401);

  const trip = await requireOwnedTrip(c.env.DB, tripId, deviceId);
  if (!trip) return c.json({ error: 'FORBIDDEN_TRIP_ACCESS' }, 403);

  const current = await c.env.DB
    .prepare('SELECT id, creator_device_id, updated_at FROM expenses WHERE id = ? AND trip_id = ?')
    .bind(expenseId, tripId)
    .first<{ id: string; creator_device_id: string; updated_at: string }>();
  if (!current) return c.json({ error: 'EXPENSE_NOT_FOUND' }, 404);
  if (current.creator_device_id !== deviceId) return c.json({ error: 'ONLY_CREATOR_CAN_EDIT' }, 403);

  try {
    const body = await parseJson(c.req.raw, updateExpenseSchema);
    if (body.updatedAt <= current.updated_at) {
      return c.json({ error: 'STALE_VERSION' }, 409);
    }

    await c.env.DB.prepare('UPDATE expenses SET title = COALESCE(?, title), note = ?, updated_at = ? WHERE id = ? AND trip_id = ?').bind(
      body.title ?? null,
      body.note ?? null,
      body.updatedAt,
      expenseId,
      tripId,
    ).run();
    await c.env.DB.prepare('UPDATE trips SET updated_at = ? WHERE id = ?').bind(body.updatedAt, tripId).run();
    return c.json({ ok: true, updatedAt: body.updatedAt });
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
});

app.delete('/api/trips/:tripId/expenses/:expenseId', async (c) => {
  const { tripId, expenseId } = c.req.param();
  const deviceId = getDeviceId(c.req.raw);
  if (!deviceId) return c.json({ error: 'MISSING_DEVICE_ID' }, 401);

  const trip = await requireOwnedTrip(c.env.DB, tripId, deviceId);
  if (!trip) return c.json({ error: 'FORBIDDEN_TRIP_ACCESS' }, 403);

  const current = await c.env.DB.prepare('SELECT creator_device_id FROM expenses WHERE id = ? AND trip_id = ?').bind(expenseId, tripId).first<{ creator_device_id: string }>();
  if (!current) return c.json({ error: 'EXPENSE_NOT_FOUND' }, 404);
  if (current.creator_device_id !== deviceId) return c.json({ error: 'ONLY_CREATOR_CAN_DELETE' }, 403);

  const deletedAt = nowIso();
  await c.env.DB.prepare('UPDATE expenses SET deleted_at = ?, updated_at = ? WHERE id = ? AND trip_id = ?').bind(deletedAt, deletedAt, expenseId, tripId).run();
  await c.env.DB.prepare('UPDATE trips SET updated_at = ? WHERE id = ?').bind(deletedAt, tripId).run();
  return c.json({ ok: true, deletedAt });
});

app.post('/api/trips/:tripId/sync/batch', async (c) => {
  const tripId = c.req.param('tripId');
  const deviceId = getDeviceId(c.req.raw);
  if (!deviceId) return c.json({ error: 'MISSING_DEVICE_ID' }, 401);

  const trip = await requireOwnedTrip(c.env.DB, tripId, deviceId);
  if (!trip) return c.json({ error: 'FORBIDDEN_TRIP_ACCESS' }, 403);
  const payerMemberId = await getOwnerMemberId(c.env.DB, tripId, deviceId);
  if (!payerMemberId) return c.json({ error: 'TRIP_NOT_FOUND' }, 404);

  const body = (await c.req.json().catch(() => ({}))) as { operations?: SyncOperation[] };
  const operations = body.operations ?? [];
  const applied: string[] = [];
  const rejected: string[] = [];

  for (const op of operations) {
    if (op.tripId !== tripId) {
      rejected.push(op.opId);
      continue;
    }

    const dedupeKey = `op:${tripId}:${op.opId}`;
    const exists = await c.env.APP_KV.get(dedupeKey);
    if (exists) {
      applied.push(op.opId);
      continue;
    }

    try {
      if (op.type === 'expense.create') {
        const payload = createExpenseSchema.parse(op.payload);
        const existing = await c.env.DB.prepare('SELECT id FROM expenses WHERE id = ? AND trip_id = ?').bind(op.entityId, tripId).first<{ id: string }>();
        if (!existing) {
          const originalCurrency = payload.originalCurrency.toUpperCase();
          const settlementCurrency = trip.base_currency.toUpperCase();
          const fxRate = payload.fxRateOverride ?? (await fetchFxRate(c.env, originalCurrency, settlementCurrency, payload.spentAt));
          const amountBase = Math.round(payload.amountOriginal * fxRate * 100) / 100;
          const splitCount = payload.splitCount ?? (trip.split_count && trip.split_count > 0 ? trip.split_count : 1);
          const ts = payload.updatedAt || op.ts || nowIso();
          await c.env.DB.batch([
            c.env.DB.prepare(
              `INSERT INTO expenses
              (id, trip_id, creator_device_id, payer_member_id, title, note, amount_original, original_currency, fx_rate_to_base, amount_base, split_count, spent_at, created_at, updated_at, deleted_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)`,
            ).bind(
              op.entityId,
              tripId,
              deviceId,
              payerMemberId,
              payload.title,
              payload.note ?? null,
              payload.amountOriginal,
              originalCurrency,
              fxRate,
              amountBase,
              splitCount,
              payload.spentAt,
              ts,
              ts,
            ),
            c.env.DB.prepare('UPDATE trips SET updated_at = ? WHERE id = ?').bind(ts, tripId),
          ]);
        }
      } else if (op.type === 'expense.update') {
        const payload = updateExpenseSchema.parse(op.payload);
        const current = await c.env.DB
          .prepare('SELECT creator_device_id, updated_at FROM expenses WHERE id = ? AND trip_id = ?')
          .bind(op.entityId, tripId)
          .first<{ creator_device_id: string; updated_at: string }>();
        if (!current || current.creator_device_id !== deviceId || payload.updatedAt <= current.updated_at) {
          rejected.push(op.opId);
          continue;
        }
        await c.env.DB.prepare('UPDATE expenses SET title = COALESCE(?, title), note = ?, updated_at = ? WHERE id = ? AND trip_id = ?').bind(
          payload.title ?? null,
          payload.note ?? null,
          payload.updatedAt,
          op.entityId,
          tripId,
        ).run();
      } else if (op.type === 'expense.delete') {
        const current = await c.env.DB.prepare('SELECT creator_device_id FROM expenses WHERE id = ? AND trip_id = ?').bind(op.entityId, tripId).first<{
          creator_device_id: string;
        }>();
        if (!current || current.creator_device_id !== deviceId) {
          rejected.push(op.opId);
          continue;
        }
        const ts = op.ts || nowIso();
        await c.env.DB.prepare('UPDATE expenses SET deleted_at = ?, updated_at = ? WHERE id = ? AND trip_id = ?').bind(ts, ts, op.entityId, tripId).run();
      }

      await c.env.APP_KV.put(dedupeKey, '1', { expirationTtl: 60 * 60 * 24 * 30 });
      applied.push(op.opId);
    } catch {
      rejected.push(op.opId);
    }
  }

  return c.json({ applied, rejected, newCursor: nowIso() });
});

app.get('/api/trips/:tripId/settlement', async (c) => {
  const tripId = c.req.param('tripId');
  const deviceId = getDeviceId(c.req.raw);
  if (!deviceId) return c.json({ error: 'MISSING_DEVICE_ID' }, 401);

  const trip = await requireOwnedTrip(c.env.DB, tripId, deviceId);
  if (!trip) return c.json({ error: 'FORBIDDEN_TRIP_ACCESS' }, 403);

  const expenses = (await listExpenses(c.env.DB, tripId)).filter((expense) => !expense.deletedAt);

  const paidMap = new Map<string, number>();
  const owedMap = new Map<string, number>();
  paidMap.set('p1', 0);
  owedMap.set('p1', 0);

  for (const expense of expenses) {
    const splitCount = expense.splitCount && expense.splitCount > 0 ? expense.splitCount : 1;
    const each = expense.amountBase / splitCount;
    paidMap.set('p1', (paidMap.get('p1') ?? 0) + expense.amountBase);
    for (let i = 1; i <= splitCount; i += 1) {
      const id = `p${i}`;
      owedMap.set(id, (owedMap.get(id) ?? 0) + each);
      if (!paidMap.has(id)) paidMap.set(id, 0);
    }
  }

  const participantIds = Array.from(new Set([...paidMap.keys(), ...owedMap.keys()])).sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)));
  const balances = participantIds
    .map((participantId) => {
      const paid = round2(paidMap.get(participantId) ?? 0);
      const owed = round2(owedMap.get(participantId) ?? 0);
      return { memberId: participantId, paid, owed, net: round2(paid - owed) };
    })
    .filter((row) => Math.abs(row.net) > 0.01);

  const debtors = balances.filter((b) => b.net < -0.01).map((b) => ({ memberId: b.memberId, amount: Math.abs(b.net) }));
  const creditors = balances.filter((b) => b.net > 0.01).map((b) => ({ memberId: b.memberId, amount: b.net }));

  const transfers: Array<{ fromMemberId: string; toMemberId: string; amountBase: number }> = [];
  let i = 0;
  let j = 0;
  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amount, creditors[j].amount);
    if (pay > 0.01) {
      transfers.push({ fromMemberId: debtors[i].memberId, toMemberId: creditors[j].memberId, amountBase: round2(pay) });
    }
    debtors[i].amount = round2(debtors[i].amount - pay);
    creditors[j].amount = round2(creditors[j].amount - pay);
    if (debtors[i].amount <= 0.01) i++;
    if (creditors[j].amount <= 0.01) j++;
  }

  const nameMap = new Map<string, string>();
  for (const participantId of participantIds) {
    const index = Number(participantId.slice(1));
    const letter = String.fromCharCode(64 + Math.min(index, 26));
    const label = index === 1 ? `YOU (${letter})` : `MEMBER (${letter})`;
    nameMap.set(participantId, label);
  }

  const expenseConversions = expenses.map((expense) => ({
    expenseId: expense.id,
    title: expense.title,
    spentAt: expense.spentAt,
    originalAmount: round2(expense.amountOriginal),
    originalCurrency: expense.originalCurrency,
    fxRateToSettlement: round6(expense.fxRateToBase),
    settlementAmount: round2(expense.amountBase),
  }));

  const summaryText = transfers.length
    ? transfers.map((t) => `${nameMap.get(t.fromMemberId)} -> ${nameMap.get(t.toMemberId)}: ${t.amountBase.toFixed(2)}`).join('\n')
    : 'NO_TRANSFER_NEEDED';
  const fxText = expenseConversions
    .map((row) => `${row.title}: ${row.originalAmount.toFixed(2)} ${row.originalCurrency} -> ${row.settlementAmount.toFixed(2)} ${trip.base_currency} @ ${row.fxRateToSettlement.toFixed(6)}`)
    .join('\n');

  return c.json({
    balances,
    transfers,
    summaryText: fxText ? `${summaryText}\n\nFX:\n${fxText}` : summaryText,
    currencySummary: {
      expenseCurrency: trip.expense_currency || trip.base_currency,
      settlementCurrency: trip.base_currency,
    },
    expenseConversions,
  });
});

app.post('/api/trips/:tripId/export', async (c) => {
  const tripId = c.req.param('tripId');
  const deviceId = getDeviceId(c.req.raw);
  if (!deviceId) return c.json({ error: 'MISSING_DEVICE_ID' }, 401);

  const trip = await requireOwnedTrip(c.env.DB, tripId, deviceId);
  if (!trip) return c.json({ error: 'FORBIDDEN_TRIP_ACCESS' }, 403);

  const expenses = await listExpenses(c.env.DB, tripId);
  const content = JSON.stringify({ version: 1, exportedAt: nowIso(), trip: toTrip(trip), expenses }, null, 2);
  return c.json({ content });
});

app.post('/api/trips/:tripId/import', async (c) => {
  const tripId = c.req.param('tripId');
  const deviceId = getDeviceId(c.req.raw);
  if (!deviceId) return c.json({ error: 'MISSING_DEVICE_ID' }, 401);

  const trip = await requireOwnedTrip(c.env.DB, tripId, deviceId);
  if (!trip) return c.json({ error: 'FORBIDDEN_TRIP_ACCESS' }, 403);

  const body = (await c.req.json().catch(() => ({}))) as { content?: string };
  if (!body.content) return c.json({ error: 'MISSING_IMPORT_CONTENT' }, 400);

  let parsed: { expenses?: Array<{ id: string; title: string; note: string | null; updatedAt: string }> };
  try {
    parsed = JSON.parse(body.content) as { expenses?: Array<{ id: string; title: string; note: string | null; updatedAt: string }> };
  } catch {
    return c.json({ error: 'INVALID_JSON_FORMAT' }, 400);
  }

  const expenses = parsed.expenses ?? [];
  for (const expense of expenses) {
    await c.env.DB.prepare('UPDATE expenses SET title = COALESCE(?, title), note = ?, updated_at = ? WHERE id = ? AND trip_id = ?').bind(
      expense.title,
      expense.note,
      expense.updatedAt || nowIso(),
      expense.id,
      tripId,
    ).run();
  }

  return c.json({ ok: true, imported: expenses.length });
});

app.all('/api/split-bill/*', (c) => {
  const url = new URL(c.req.url);
  url.pathname = url.pathname.replace('/api/split-bill', '/api');
  return app.fetch(new Request(url.toString(), c.req.raw), c.env, c.executionCtx);
});

app.all('/api/*', (c) => c.json({ error: 'Not Found' }, 404));

app.get('*', async (c) => {
  const res = await c.env.ASSETS.fetch(c.req.raw);
  if (res.status !== 404) return res;
  return c.env.ASSETS.fetch(new Request(new URL('/', c.req.url).toString(), c.req.raw));
});

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function round6(value: number): number {
  return Math.round(value * 1000000) / 1000000;
}

export default {
  fetch: app.fetch,
  async scheduled(_event: ScheduledController, env: Env['Bindings'], ctx: ExecutionContext) {
    ctx.waitUntil(cronHandler(env.RATES_KV));
  },
};
