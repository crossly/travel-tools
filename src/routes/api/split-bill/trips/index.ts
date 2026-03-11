import { createFileRoute } from '@tanstack/react-router'
import { getEnv } from '@/server/context'
import { createTrip, getDeviceId, listTrips } from '@/server/split-bill'

export const Route = createFileRoute('/api/split-bill/trips/')({
  server: {
    handlers: {
      GET: async ({ request, context }: any) => {
        const deviceId = getDeviceId(request)
        if (!deviceId) return Response.json({ error: 'MISSING_DEVICE_ID' }, { status: 401 })
        return Response.json(await listTrips(getEnv(context), deviceId))
      },
      POST: async ({ request, context }: any) => {
        const deviceId = getDeviceId(request)
        if (!deviceId) return Response.json({ error: 'MISSING_DEVICE_ID' }, { status: 401 })
        try {
          return Response.json(await createTrip(getEnv(context), deviceId, request))
        } catch (error) {
          return Response.json({ error: (error as Error).message }, { status: 400 })
        }
      },
    },
  },
})
