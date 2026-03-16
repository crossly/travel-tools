import { describe, expect, it } from 'vitest'
import { getManualChunk } from '@/lib/build/manual-chunks'

describe('getManualChunk', () => {
  it('extracts framework runtime dependencies out of the entry chunk', () => {
    expect(getManualChunk('/workspace/node_modules/react/index.js')).toBe('framework')
    expect(getManualChunk('/workspace/node_modules/react-dom/client.js')).toBe('framework')
    expect(getManualChunk('/workspace/node_modules/@tanstack/react-router/dist/index.js')).toBe('framework')
    expect(getManualChunk('/workspace/node_modules/@tanstack/react-start/dist/index.js')).toBe('framework')
  })

  it('groups form, calendar, and shared ui vendor dependencies into stable chunks', () => {
    expect(getManualChunk('/workspace/node_modules/react-hook-form/dist/index.esm.mjs')).toBe('forms')
    expect(getManualChunk('/workspace/node_modules/@hookform/resolvers/zod.js')).toBe('forms')
    expect(getManualChunk('/workspace/node_modules/zod/v4-mini/index.js')).toBe('forms')

    expect(getManualChunk('/workspace/node_modules/react-day-picker/dist/index.js')).toBe('calendar')
    expect(getManualChunk('/workspace/node_modules/date-fns/format.js')).toBe('calendar')

    expect(getManualChunk('/workspace/node_modules/@radix-ui/react-select/dist/index.mjs')).toBe('ui-vendor')
    expect(getManualChunk('/workspace/node_modules/lucide-react/dist/esm/icons/calendar.js')).toBe('ui-vendor')
  })

  it('leaves app source modules on Vite default chunking', () => {
    expect(getManualChunk('/workspace/src/routes/$locale/currency.tsx')).toBeUndefined()
  })
})
