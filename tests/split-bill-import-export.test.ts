import { describe, expect, it } from 'vitest'
import { buildTripExportContent, parseTripImportContent } from '@/server/split-bill'

describe('split bill import/export payloads', () => {
  it('round-trips a full trip export payload', () => {
    const content = buildTripExportContent({
      exportedAt: '2026-03-13T00:00:00.000Z',
      trip: {
        id: 'trip_123',
        name: 'Tokyo',
        expenseCurrency: 'JPY',
        settlementCurrency: 'CNY',
        splitCount: 3,
        baseCurrency: 'CNY',
        createdAt: '2026-03-10T00:00:00.000Z',
        updatedAt: '2026-03-12T00:00:00.000Z',
      },
      expenses: [
        {
          id: 'exp_123',
          tripId: 'trip_123',
          creatorDeviceId: 'dev_123',
          title: 'Sushi',
          note: null,
          amountOriginal: 1200,
          originalCurrency: 'JPY',
          fxRateToBase: 0.048,
          amountBase: 57.6,
          splitCount: 3,
          spentAt: '2026-03-11',
          createdAt: '2026-03-11T00:00:00.000Z',
          updatedAt: '2026-03-11T00:00:00.000Z',
          deletedAt: null,
        },
      ],
    })

    const parsed = parseTripImportContent(content)

    expect(parsed.trip.name).toBe('Tokyo')
    expect(parsed.trip.expenseCurrency).toBe('JPY')
    expect(parsed.expenses).toHaveLength(1)
    expect(parsed.expenses[0]?.title).toBe('Sushi')
  })

  it('rejects malformed json', () => {
    expect(() => parseTripImportContent('{bad json')).toThrowError('INVALID_JSON_FORMAT')
  })

  it('rejects invalid payload structure', () => {
    expect(() => parseTripImportContent(JSON.stringify({ version: 1, exportedAt: '2026-03-13T00:00:00.000Z', trip: { name: 'Tokyo' } }))).toThrowError(
      'INVALID_IMPORT_FORMAT',
    )
  })
})
