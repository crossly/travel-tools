import { createFileRoute } from '@tanstack/react-router'
import { serveOgImage } from '@/server/og-image'

export const Route = createFileRoute('/api/og-image')({
  server: {
    handlers: {
      GET: ({ request }: any) => serveOgImage(request),
      HEAD: ({ request }: any) => serveOgImage(request, { headOnly: true }),
    },
  },
})
