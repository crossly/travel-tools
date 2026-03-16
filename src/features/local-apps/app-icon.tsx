import { useEffect, useState } from 'react'
import { Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LocalAppPlatformLink } from '@/lib/types'

export function buildLocalAppFaviconUrl(links: LocalAppPlatformLink[]) {
  const officialLink = links.find((link) => link.platform === 'official')?.url
  if (!officialLink) return null

  try {
    return `${new URL(officialLink).origin}/favicon.ico`
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

  useEffect(() => {
    setImageFailed(false)
  }, [faviconUrl])

  const showFavicon = Boolean(faviconUrl) && !imageFailed

  return (
    <div
      data-app-icon-id={appId}
      data-icon-state={showFavicon ? 'image' : 'fallback'}
      className={cn(
        'flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted',
        className,
      )}
    >
      {showFavicon ? (
        <img
          src={faviconUrl ?? undefined}
          alt=""
          className="size-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <Smartphone className="size-5 text-muted-foreground" aria-hidden="true" />
      )}
      <span className="sr-only">{appName}</span>
    </div>
  )
}
