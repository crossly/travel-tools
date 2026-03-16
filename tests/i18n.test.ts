import { describe, expect, it } from 'vitest'
import { validateMessageCatalog } from '@/lib/i18n/catalog'

describe('i18n catalog', () => {
  it('keeps the same translation keys across all locales', () => {
    expect(validateMessageCatalog()).toEqual([])
  })
})
