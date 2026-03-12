const APEX_HOST = 'routecrate.com'
const WWW_HOST = 'www.routecrate.com'

export function buildCanonicalRequest(request: Request) {
  const url = new URL(request.url)
  if (url.hostname !== APEX_HOST) return null

  url.hostname = WWW_HOST
  url.protocol = 'https:'

  return new Request(url.toString(), request)
}

export function redirectToCanonicalHost(request: Request) {
  const nextRequest = buildCanonicalRequest(request)
  if (!nextRequest) return null

  return Response.redirect(nextRequest.url, 308)
}
