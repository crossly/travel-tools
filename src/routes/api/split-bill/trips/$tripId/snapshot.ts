import { createFileRoute } from '@tanstack/react-router'
import { getEnv } from '@/server/context'
import { getDeviceId, snapshotTrip } from '@/server/split-bill'

export const Route = createFileRoute('/api/split-bill/trips/$tripId/snapshot')({
  server: {
    handlers: {
      GET: async ({ request, params, context }: any) => {
        const deviceId = getDeviceId(request)
        if (!deviceId) return Response.json({ error: 'MISSING_DEVICE_ID' }, { status: 401 })
        const result = await snapshotTrip(getEnv(context), params.tripId, deviceId)
        return Response.json(result.body, { status: result.status })
      },
    },
  },
})
