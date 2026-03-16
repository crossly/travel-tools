import { canonicalizeLocalePath } from '@/lib/site'

const APEX_HOST = 'routecrate.com'
const WWW_HOST = 'www.routecrate.com'
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1'])

export function buildCanonicalRequest(request: Request) {
  const url = new URL(request.url)
  let changed = false
  const isLocalHost = LOCAL_HOSTS.has(url.hostname)

  if (!isLocalHost && url.protocol !== 'https:') {
    url.protocol = 'https:'
    changed = true
  }

  if (!isLocalHost && url.hostname === APEX_HOST) {
    url.hostname = WWW_HOST
    changed = true
  }

  const canonicalPath = canonicalizeLocalePath(url.pathname)
  if (canonicalPath) {
    url.pathname = canonicalPath
    changed = true
  }

  if (!changed) return null
  return new Request(url.toString(), request)
}

export function redirectToCanonicalHost(request: Request) {
  const nextRequest = buildCanonicalRequest(request)
  if (!nextRequest) return null

  return Response.redirect(nextRequest.url, 308)
}
