import { useEffect, useState } from 'react'
import { Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LocalAppPlatformLink } from '@/lib/types'

export function buildLocalAppFaviconUrl(links: LocalAppPlatformLink[]) {
  const officialLink = links.find((link) => link.platform === 'official')?.url
  if (!officialLink) return null

  try {
    const hostname = new URL(officialLink).hostname
    if (!hostname) return null

    return `https://favicon.is/${hostname}?larger=true`
  } catch {
    return null
  }
}

export function LocalAppIcon({
  appId,
  appName,
  links,
  className,
}: {
  appId: string
  appName: string
  links: LocalAppPlatformLink[]
  className?: string
}) {
  const faviconUrl = buildLocalAppFaviconUrl(links)
  const [imageFailed, setImageFailed] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    setImageFailed(false)
    setImageLoaded(false)
  }, [faviconUrl])

  const canAttemptFavicon = Boolean(faviconUrl) && !imageFailed
  const iconState = imageLoaded && canAttemptFavicon ? 'image' : canAttemptFavicon ? 'loading' : 'fallback'

  return (
    <div
      data-app-icon-id={appId}
      data-icon-state={iconState}
      className={cn(
        'relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted',
        className,
      )}
    >
      {canAttemptFavicon ? (
        <img
          src={faviconUrl ?? undefined}
          alt=""
          className={cn(
            'absolute inset-0 size-full p-1.5 object-contain transition-opacity duration-200',
            imageLoaded ? 'opacity-100' : 'opacity-0',
          )}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
        />
      ) : null}
      {!imageLoaded ? (
        <Smartphone className="size-5 text-muted-foreground" aria-hidden="true" />
      ) : null}
      <span className="sr-only">{appName}</span>
    </div>
  )
}
