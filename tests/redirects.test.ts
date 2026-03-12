import { describe, expect, it } from 'vitest'
import { buildCanonicalRequest, redirectToCanonicalHost } from '@/server/redirects'

describe('canonical host redirects', () => {
  it('redirects apex traffic to the www host and preserves path and query', () => {
    const request = new Request('https://routecrate.com/en-US/tools/currency?base=USD')
    const response = redirectToCanonicalHost(request)

    expect(response?.status).toBe(308)
    expect(response?.headers.get('location')).toBe('https://www.routecrate.com/en-US/tools/currency?base=USD')
  })

  it('does not redirect requests that already use the www host', () => {
    const request = new Request('https://www.routecrate.com/en-US')

    expect(buildCanonicalRequest(request)).toBeNull()
    expect(redirectToCanonicalHost(request)).toBeNull()
  })
})
