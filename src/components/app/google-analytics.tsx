import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    umami?: {
      track: (...args: unknown[]) => void
    }
  }
}

export function GoogleAnalyticsScripts({ measurementId }: { measurementId: string }) {
  const initScript = [
    'window.dataLayer = window.dataLayer || [];',
    'function gtag(){dataLayer.push(arguments);}',
    'window.gtag = gtag;',
    "gtag('js', new Date());",
    `gtag('config', ${JSON.stringify(measurementId)}, { send_page_view: false });`,
  ].join('')

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`} />
      <script dangerouslySetInnerHTML={{ __html: initScript }} />
    </>
  )
}

export function GoogleAnalyticsPageviews({ measurementId }: { measurementId: string }) {
  const location = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
    const search =
      typeof window.location?.search === 'string'
        ? window.location.search
        : typeof location.search === 'string'
          ? location.search
          : ''

    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${location.pathname}${search}${location.hash ?? ''}`,
    })
  }, [location.hash, location.pathname, location.search, measurementId])

  return null
}

export function UmamiScripts({
  websiteId,
  scriptUrl,
}: {
  websiteId: string
  scriptUrl: string
}) {
  return (
    <script
      defer
      src={scriptUrl}
      data-website-id={websiteId}
      data-auto-track="false"
    />
  )
}

export function UmamiPageviews({ websiteId }: { websiteId: string }) {
  const location = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.umami?.track !== 'function') return
    void websiteId
    window.umami.track()
  }, [location.hash, location.pathname, location.search, websiteId])

  return null
}
