import { createFileRoute } from '@tanstack/react-router'
import { bootstrapDevice } from '@/server/split-bill'

export const Route = createFileRoute('/api/split-bill/device/bootstrap')({
  server: {
    handlers: {
      POST: async ({ request }: any) => {
        try {
          return Response.json(await bootstrapDevice(request))
        } catch (error) {
          return Response.json({ error: (error as Error).message }, { status: 400 })
        }
      },
    },
  },
})
