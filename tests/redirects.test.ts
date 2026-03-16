import { describe, expect, it } from 'vitest'
import { buildCanonicalRequest, redirectToCanonicalHost } from '@/server/redirects'

describe('canonical host redirects', () => {
  it('redirects apex traffic to the www host and preserves path and query', () => {
    const request = new Request('https://routecrate.com/en-US/currency?base=USD')
    const response = redirectToCanonicalHost(request)

    expect(response?.status).toBe(308)
    expect(response?.headers.get('location')).toBe('https://www.routecrate.com/en-us/currency?base=USD')
  })

  it('does not redirect requests that already use the www host', () => {
    const request = new Request('https://www.routecrate.com/en-us')

    expect(buildCanonicalRequest(request)).toBeNull()
    expect(redirectToCanonicalHost(request)).toBeNull()
  })

  it('redirects http requests on the canonical host to https', () => {
    const request = new Request('http://www.routecrate.com/en-us')
    const response = redirectToCanonicalHost(request)

    expect(response?.status).toBe(308)
    expect(response?.headers.get('location')).toBe('https://www.routecrate.com/en-us')
  })

  it('does not force https for localhost preview requests', () => {
    const request = new Request('http://localhost:4173/en-us')

    expect(buildCanonicalRequest(request)).toBeNull()
    expect(redirectToCanonicalHost(request)).toBeNull()
  })

  it('redirects legacy mixed-case locale URLs on the canonical host to lowercase locale slugs', () => {
    const request = new Request('https://www.routecrate.com/zh-CN/bill-splitter')
    const response = redirectToCanonicalHost(request)

    expect(response?.status).toBe(308)
    expect(response?.headers.get('location')).toBe('https://www.routecrate.com/zh-cn/bill-splitter')
  })
})
