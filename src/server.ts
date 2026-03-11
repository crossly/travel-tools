import { createServerEntry } from '@tanstack/react-start/server-entry'
import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import type { AppRequestContext } from './router'

const handler = createStartHandler(defaultStreamHandler)

export default createServerEntry({
  fetch(request, opts) {
    return (handler as any)(request, opts as { context: AppRequestContext })
  },
})
