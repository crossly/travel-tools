import { describe, expect, it, vi } from 'vitest'

describe('i18n message registry', () => {
  it('keeps feature catalogs out of the base registry until the feature module loads', async () => {
    vi.resetModules()

    const { translate } = await import('@/lib/i18n')

    expect(translate('en-US', 'app.name')).toBe('Route Crate')
    expect(translate('en-US', 'currency.amountLabel')).toBe('currency.amountLabel')
    expect(translate('en-US', 'settings.exportCurrentTrip')).toBe('settings.exportCurrentTrip')
    expect(translate('en-US', 'error.REQUEST_FAILED')).toBe('error.REQUEST_FAILED')
    expect(translate('en-US', 'tool.currency.description')).toBe('tool.currency.description')

    await import('@/lib/i18n/messages/currency')

    expect(translate('en-US', 'currency.amountLabel')).toBe('Amount')
    expect(translate('zh-CN', 'currency.amountLabel')).toBe('金额')

    await import('@/lib/i18n/messages/settings')

    expect(translate('en-US', 'settings.exportCurrentTrip')).toBe('Export current trip')
    expect(translate('zh-CN', 'settings.exportCurrentTrip')).toBe('导出当前行程')
    expect(translate('en-US', 'error.REQUEST_FAILED')).toBe('Request failed. Please try again.')
  })
})
