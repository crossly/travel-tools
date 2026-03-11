import { createFileRoute } from '@tanstack/react-router'
import { getEnv } from '@/server/context'
import { getDeviceId, updateTripSettings } from '@/server/split-bill'

export const Route = createFileRoute('/api/split-bill/trips/$tripId/settings')({
  server: {
    handlers: {
      PATCH: async ({ request, params, context }: any) => {
        const deviceId = getDeviceId(request)
        if (!deviceId) return Response.json({ error: 'MISSING_DEVICE_ID' }, { status: 401 })
        try {
          const result = await updateTripSettings(getEnv(context), params.tripId, deviceId, request)
          return Response.json(result.body, { status: result.status })
        } catch (error) {
          return Response.json({ error: (error as Error).message }, { status: 400 })
        }
      },
    },
  },
})
