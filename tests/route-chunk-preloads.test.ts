import { describe, expect, it } from 'vitest'
import { getRouteChunkPreloadEntries } from '@/components/app/route-chunk-preloads'

describe('route chunk preloads', () => {
  it('preloads the shell-reachable top-level routes except the active tool route', () => {
    const entries = getRouteChunkPreloadEntries('jet-lag').map((entry) => entry.key)

    expect(entries).toContain('home')
    expect(entries).toContain('settings')
    expect(entries).toContain('currency')
    expect(entries).toContain('packing-list')
    expect(entries).toContain('local-apps')
    expect(entries).toContain('travel-phrases')
    expect(entries).toContain('split-bill')
    expect(entries).not.toContain('jet-lag')
  })
})
