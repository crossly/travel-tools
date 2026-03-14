import { describe, expect, it } from 'vitest'
import { z } from 'zod'

import { toApiErrorResponse } from '@/server/api-errors'

async function readJson(response: Response) {
  return (await response.json()) as { error?: string }
}

describe('toApiErrorResponse', () => {
  it('returns INVALID_REQUEST_BODY for zod validation failures', async () => {
    let thrown: unknown
    try {
      z.object({ name: z.string() }).parse({})
    } catch (error) {
      thrown = error
    }

    const response = toApiErrorResponse(thrown)

    expect(response.status).toBe(400)
    await expect(readJson(response)).resolves.toEqual({ error: 'INVALID_REQUEST_BODY' })
  })

  it('preserves known client input errors as bad requests', async () => {
    const response = toApiErrorResponse(new Error('INVALID_IMPORT_FORMAT'))

    expect(response.status).toBe(400)
    await expect(readJson(response)).resolves.toEqual({ error: 'INVALID_IMPORT_FORMAT' })
  })

  it('maps unexpected errors to REQUEST_FAILED with a 500 status', async () => {
    const response = toApiErrorResponse(new Error('DB exploded'))

    expect(response.status).toBe(500)
    await expect(readJson(response)).resolves.toEqual({ error: 'REQUEST_FAILED' })
  })

  it('maps non-Error throws to REQUEST_FAILED with a 500 status', async () => {
    const response = toApiErrorResponse('boom')

    expect(response.status).toBe(500)
    await expect(readJson(response)).resolves.toEqual({ error: 'REQUEST_FAILED' })
  })
})
