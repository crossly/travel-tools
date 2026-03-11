import { createFileRoute } from '@tanstack/react-router'
import { getEnv } from '@/server/context'
import { getDeviceId, settlement } from '@/server/split-bill'

export const Route = createFileRoute('/api/split-bill/trips/$tripId/settlement')({
  server: {
    handlers: {
      GET: async ({ request, params, context }: any) => {
        const deviceId = getDeviceId(request)
        if (!deviceId) return Response.json({ error: 'MISSING_DEVICE_ID' }, { status: 401 })
        const result = await settlement(getEnv(context), params.tripId, deviceId)
        return Response.json(result.body, { status: result.status })
      },
    },
  },
})
