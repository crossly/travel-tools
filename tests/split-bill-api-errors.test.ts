import { beforeEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'

const createTrip = vi.fn()
const getDeviceId = vi.fn(() => 'dev_123')
const getEnv = vi.fn(() => ({ DB: {} }))

vi.mock('@/server/split-bill', () => ({
  createTrip,
  getDeviceId,
}))

vi.mock('@/server/context', () => ({
  getEnv,
}))

function getPostHandler(route: { options?: { server?: { handlers?: unknown } } }) {
  return (route.options?.server?.handlers as Record<string, (args: unknown) => Promise<Response>>).POST
}

describe('split bill api error handling', () => {
  beforeEach(() => {
    createTrip.mockReset()
    getDeviceId.mockReturnValue('dev_123')
    getEnv.mockReturnValue({ DB: {} })
  })

  it('returns REQUEST_FAILED with 500 when createTrip throws an unexpected error', async () => {
    createTrip.mockRejectedValueOnce(new Error('DB exploded'))
    const { Route } = await import('@/routes/api/split-bill/trips/index')
    const post = getPostHandler(Route)

    const response = await post({
      request: new Request('https://example.com/api/split-bill/trips', {
        method: 'POST',
        body: JSON.stringify({}),
      }),
      context: {},
    })

    expect(response.status).toBe(500)
    await expect(response.json()).resolves.toEqual({ error: 'REQUEST_FAILED' })
  })

  it('returns INVALID_REQUEST_BODY with 400 when createTrip throws a zod error', async () => {
    let thrown: unknown
    try {
      z.object({ name: z.string() }).parse({})
    } catch (error) {
      thrown = error
    }
    createTrip.mockRejectedValueOnce(thrown)
    const { Route } = await import('@/routes/api/split-bill/trips/index')
    const post = getPostHandler(Route)

    const response = await post({
      request: new Request('https://example.com/api/split-bill/trips', {
        method: 'POST',
        body: JSON.stringify({}),
      }),
      context: {},
    })

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error: 'INVALID_REQUEST_BODY' })
  })
})
