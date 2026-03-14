import { createFileRoute } from '@tanstack/react-router'
import { toApiErrorResponse } from '@/server/api-errors'
import { bootstrapDevice } from '@/server/split-bill'

export const Route = createFileRoute('/api/split-bill/device/bootstrap')({
  server: {
    handlers: {
      POST: async ({ request }: any) => {
        try {
          return Response.json(await bootstrapDevice())
        } catch (error) {
          return toApiErrorResponse(error)
        }
      },
    },
  },
})
