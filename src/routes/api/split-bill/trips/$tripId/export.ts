import { createFileRoute } from '@tanstack/react-router'
import { getEnv } from '@/server/context'
import { exportTrip, getDeviceId } from '@/server/split-bill'

export const Route = createFileRoute('/api/split-bill/trips/$tripId/export')({
  server: {
    handlers: {
      POST: async ({ request, params, context }: any) => {
        const deviceId = getDeviceId(request)
        if (!deviceId) return Response.json({ error: 'MISSING_DEVICE_ID' }, { status: 401 })
        const result = await exportTrip(getEnv(context), params.tripId, deviceId)
        return Response.json(result.body, { status: result.status })
      },
    },
  },
})
