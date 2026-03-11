export interface DeviceIdentity {
  deviceId: string;
  displayName: string;
}

export interface Trip {
  id: string;
  name: string;
  expenseCurrency: string;
  settlementCurrency: string;
  splitCount: number;
  baseCurrency: string;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: string;
  tripId: string;
  displayName: string;
  deviceId: string | null;
  isOwner: boolean;
  joinedAt: string;
}

export interface Expense {
  id: string;
  tripId: string;
  creatorDeviceId: string;
  title: string;
  note: string | null;
  amountOriginal: number;
  originalCurrency: string;
  fxRateToBase: number;
  amountBase: number;
  splitCount: number;
  spentAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TripSnapshot {
  trip: Trip;
  members: Member[];
  expenses: Expense[];
  cursor: string;
}

export interface SettlementTransfer {
  fromMemberId: string;
  toMemberId: string;
  amountBase: number;
}

export interface ExpenseConversionRow {
  expenseId: string;
  title: string;
  spentAt: string;
  originalAmount: number;
  originalCurrency: string;
  fxRateToSettlement: number;
  settlementAmount: number;
}

export interface SettlementResponse {
  balances: Array<{ memberId: string; paid: number; owed: number; net: number }>;
  transfers: SettlementTransfer[];
  summaryText: string;
  currencySummary: {
    expenseCurrency: string;
    settlementCurrency: string;
  };
  expenseConversions: ExpenseConversionRow[];
}

export interface OfflineOperation {
  opId: string;
  tripId: string;
  type: 'expense.create' | 'expense.update' | 'expense.delete';
  entityId: string;
  payload: Record<string, unknown>;
  ts: string;
}

export interface FxRatesResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
  updatedAt: string;
  cached?: boolean;
  stale?: boolean;
}

export interface FxDetectResponse {
  country: string;
  currency: string;
  name: string;
  flag: string;
  symbol: string;
  tz: string;
  tzCurrency: string | null;
  detectedVia: 'timezone' | 'ip';
}
