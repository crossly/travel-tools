import { createFileRoute } from '@tanstack/react-router'
import { detectCurrencyFromRequest } from '@/server/fx'

export const Route = createFileRoute('/api/fx/detect')({
  server: {
    handlers: {
      GET: ({ request }: any) => Response.json(detectCurrencyFromRequest(request)),
    },
  },
})
