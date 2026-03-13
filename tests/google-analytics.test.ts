// @vitest-environment jsdom
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const gtagMock = vi.fn()
const umamiTrackMock = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useLocation: () => ({
    pathname: '/en-US/currency',
    search: { base: 'USD' },
    hash: '',
  }),
}))

describe('GoogleAnalyticsPageviews', () => {
  it('tracks a page view without assuming location.search is URLSearchParams', async () => {
    Object.defineProperty(window, 'gtag', { value: gtagMock, configurable: true })
    Object.defineProperty(window, 'umami', { value: { track: umamiTrackMock }, configurable: true })
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://routecrate.com/en-US/currency?base=USD',
        search: '?base=USD',
      },
      configurable: true,
    })

    const { GoogleAnalyticsPageviews } = await import('@/components/app/google-analytics')
    const { UmamiPageviews } = await import('@/components/app/google-analytics')

    render(createElement(GoogleAnalyticsPageviews, { measurementId: 'G-41BFL5B41F' }))
    render(createElement(UmamiPageviews, { websiteId: 'a9367edf-7fe2-46c4-ba26-8dd04cbd66ff' }))

    expect(gtagMock).toHaveBeenCalledWith('event', 'page_view', expect.objectContaining({
      page_location: 'https://routecrate.com/en-US/currency?base=USD',
      page_path: '/en-US/currency?base=USD',
    }))

    expect(umamiTrackMock).toHaveBeenCalledTimes(1)
  })
})

describe('analytics scripts', () => {
  it('renders the Umami script with configurable attributes', async () => {
    const { UmamiScripts } = await import('@/components/app/google-analytics')

    const html = renderToStaticMarkup(
      createElement(UmamiScripts, {
        websiteId: 'a9367edf-7fe2-46c4-ba26-8dd04cbd66ff',
        scriptUrl: 'https://cloud.umami.is/script.js',
      }),
    )

    expect(html).toContain('src="https://cloud.umami.is/script.js"')
    expect(html).toContain('data-website-id="a9367edf-7fe2-46c4-ba26-8dd04cbd66ff"')
    expect(html).toContain('data-auto-track="false"')
  })
})
