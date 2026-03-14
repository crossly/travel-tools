import { ZodError } from 'zod'

const BAD_REQUEST_ERROR_CODES = new Set([
  'INVALID_IMPORT_FORMAT',
  'INVALID_JSON_FORMAT',
  'INVALID_QUERY_PARAMS',
])

function jsonError(error: string, status: number) {
  return Response.json({ error }, { status })
}

export function toApiErrorResponse(error: unknown) {
  if (error instanceof ZodError || error instanceof SyntaxError) {
    return jsonError('INVALID_REQUEST_BODY', 400)
  }

  if (error instanceof Error && BAD_REQUEST_ERROR_CODES.has(error.message)) {
    return jsonError(error.message, 400)
  }

  return jsonError('REQUEST_FAILED', 500)
}
