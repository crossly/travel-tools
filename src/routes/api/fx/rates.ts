import { createFileRoute } from '@tanstack/react-router'
import { getEnv } from '@/server/context'
import { getRates } from '@/server/fx'

export const Route = createFileRoute('/api/fx/rates')({
  server: {
    handlers: {
      GET: async ({ request, context }: any) => {
        const env = getEnv(context)
        const base = (new URL(request.url).searchParams.get('base') || 'USD').toUpperCase()
        const result = await getRates(env, base)
        return Response.json(result.body, { status: result.status })
      },
    },
  },
})
