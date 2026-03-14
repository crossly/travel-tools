import { createFileRoute } from '@tanstack/react-router'
import { toApiErrorResponse } from '@/server/api-errors'
import { getEnv } from '@/server/context'
import { getDeviceId, importTrip } from '@/server/split-bill'

export const Route = createFileRoute('/api/split-bill/trips/$tripId/import')({
  server: {
    handlers: {
      POST: async ({ request, params, context }: any) => {
        const deviceId = getDeviceId(request)
        if (!deviceId) return Response.json({ error: 'MISSING_DEVICE_ID' }, { status: 401 })
        try {
          const result = await importTrip(getEnv(context), params.tripId, deviceId, request)
          return Response.json(result.body, { status: result.status })
        } catch (error) {
          return toApiErrorResponse(error)
        }
      },
    },
  },
})
