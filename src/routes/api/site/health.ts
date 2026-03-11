import { createFileRoute } from '@tanstack/react-router'
import { getEnv } from '@/server/context'

export const Route = createFileRoute('/api/site/health')({
  server: {
    handlers: {
      GET: ({ context }: any) => {
        const env = getEnv(context)
        return Response.json({ ok: true, now: new Date().toISOString(), app: env.APP_NAME ?? 'Travel Tools' })
      },
    },
  },
})
