// @vitest-environment jsdom
import { createElement } from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const gtagMock = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useLocation: () => ({
    pathname: '/en-US/tools/currency',
    search: { base: 'USD' },
    hash: '',
  }),
}))

describe('GoogleAnalyticsPageviews', () => {
  it('tracks a page view without assuming location.search is URLSearchParams', async () => {
    Object.defineProperty(window, 'gtag', { value: gtagMock, configurable: true })
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://routecrate.com/en-US/tools/currency?base=USD',
        search: '?base=USD',
      },
      configurable: true,
    })

    const { GoogleAnalyticsPageviews } = await import('@/components/app/google-analytics')

    render(createElement(GoogleAnalyticsPageviews, { measurementId: 'G-41BFL5B41F' }))

    expect(gtagMock).toHaveBeenCalledWith('event', 'page_view', expect.objectContaining({
      page_location: 'https://routecrate.com/en-US/tools/currency?base=USD',
      page_path: '/en-US/tools/currency?base=USD',
    }))
  })
})
