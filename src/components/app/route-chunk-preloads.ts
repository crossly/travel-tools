import type { ToolDefinition } from '@/lib/types'

type RouteChunkPreloadEntry = {
  key: string
  tool?: ToolDefinition['slug']
  preload: () => Promise<unknown>
}

const ROUTE_CHUNK_PRELOAD_ENTRIES: RouteChunkPreloadEntry[] = [
  {
    key: 'home',
    preload: () => import('@/routes/$locale/-index.route-component'),
  },
  {
    key: 'settings',
    preload: () => import('@/routes/$locale/-settings.route-component'),
  },
  {
    key: 'currency',
    tool: 'currency',
    preload: () => import('@/routes/$locale/-currency.route-component'),
  },
  {
    key: 'jet-lag',
    tool: 'jet-lag',
    preload: () => import('@/routes/$locale/-jet-lag.route-component'),
  },
  {
    key: 'packing-list',
    tool: 'packing-list',
    preload: () => import('@/routes/$locale/-packing-list.route-component'),
  },
  {
    key: 'local-apps',
    tool: 'local-apps',
    preload: () => import('@/routes/$locale/local-apps/-index.route-component'),
  },
  {
    key: 'travel-phrases',
    tool: 'travel-phrases',
    preload: () => import('@/routes/$locale/travel-phrases/-index.route-component'),
  },
  {
    key: 'split-bill',
    tool: 'split-bill',
    preload: () => import('@/routes/$locale/bill-splitter/-index.route-component'),
  },
]

let hasScheduledGlobalRouteChunkPreload = false

export function getRouteChunkPreloadEntries(activeTool?: ToolDefinition['slug']) {
  return ROUTE_CHUNK_PRELOAD_ENTRIES.filter((entry) => entry.tool !== activeTool)
}

export function scheduleGlobalRouteChunkPreload(activeTool?: ToolDefinition['slug']) {
  if (hasScheduledGlobalRouteChunkPreload || typeof window === 'undefined') {
    return () => {}
  }

  hasScheduledGlobalRouteChunkPreload = true

  const startPreload = () => {
    void Promise.allSettled(getRouteChunkPreloadEntries(activeTool).map((entry) => entry.preload()))
  }

  if ('requestIdleCallback' in window && typeof window.requestIdleCallback === 'function') {
    const idleId = window.requestIdleCallback(startPreload, { timeout: 1200 })
    return () => window.cancelIdleCallback?.(idleId)
  }

  const timeoutId = window.setTimeout(startPreload, 120)
  return () => window.clearTimeout(timeoutId)
}
