import { createServerEntry } from '@tanstack/react-start/server-entry'
import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import type { AppRequestContext } from './router'

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

export default entry as any
