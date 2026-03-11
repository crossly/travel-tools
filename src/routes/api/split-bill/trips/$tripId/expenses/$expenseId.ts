import { createFileRoute } from '@tanstack/react-router'
import { getEnv } from '@/server/context'
import { getDeviceId, removeExpense } from '@/server/split-bill'

export const Route = createFileRoute('/api/split-bill/trips/$tripId/expenses/$expenseId')({
  server: {
    handlers: {
      DELETE: async ({ request, params, context }: any) => {
        const deviceId = getDeviceId(request)
        if (!deviceId) return Response.json({ error: 'MISSING_DEVICE_ID' }, { status: 401 })
        const result = await removeExpense(getEnv(context), params.tripId, params.expenseId, deviceId)
        return Response.json(result.body, { status: result.status })
      },
    },
  },
})
