import { createServerEntry } from '@tanstack/react-start/server-entry'
import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import type { AppRequestContext } from './router'
import { syncLatestRates } from './server/fx'

const handler = createStartHandler(defaultStreamHandler)

const entry = createServerEntry({
  fetch(request: Request, envOrOpts: unknown, executionContext?: ExecutionContext) {
    const isCloudflareInvocation =
      executionContext !== undefined || (envOrOpts && typeof envOrOpts === 'object' && 'APP_KV' in (envOrOpts as object))

    if (isCloudflareInvocation) {
      const context: AppRequestContext = {
        cloudflare: {
          env: envOrOpts as CloudflareEnv,
          ctx: executionContext as ExecutionContext,
        },
      }
      return (handler as any)(request, { context })
    }

    return (handler as any)(request, envOrOpts as { context?: AppRequestContext })
  },
})

export default {
  fetch: entry.fetch,
  scheduled(_controller: ScheduledController, env: CloudflareEnv, ctx: ExecutionContext) {
    ctx.waitUntil(syncLatestRates(env))
  },
} as any
