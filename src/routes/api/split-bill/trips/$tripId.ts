import { createFileRoute } from '@tanstack/react-router'
import { getEnv } from '@/server/context'
import { getDeviceId, removeTrip } from '@/server/split-bill'

export const Route = createFileRoute('/api/split-bill/trips/$tripId')({
  server: {
    handlers: {
      DELETE: async ({ request, params, context }: any) => {
        const deviceId = getDeviceId(request)
        if (!deviceId) return Response.json({ error: 'MISSING_DEVICE_ID' }, { status: 401 })
        const result = await removeTrip(getEnv(context), params.tripId, deviceId)
        return Response.json(result.body, { status: result.status })
      },
    },
  },
})
