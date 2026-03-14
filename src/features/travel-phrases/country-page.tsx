import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Languages, LoaderCircle, Play, Square, Volume2 } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { InlineStatus } from '@/components/app/inline-status'
import { PageState } from '@/components/app/page-state'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/lib/i18n'
import { getLocalizedPath } from '@/lib/site'
import { buildPhraseAudioPath, PHRASE_CATEGORIES } from '@/lib/travel-phrases'
import { writeLastTool } from '@/lib/storage'
import { cn } from '@/lib/utils'
import type { Locale, PhraseCard, PhraseCategory, PhraseCountryPack } from '@/lib/types'

const categoryLabelKey: Record<PhraseCategory, string> = {
  basics: 'phrases.category.basics',
  transport: 'phrases.category.transport',
  hotel: 'phrases.category.hotel',
  dining: 'phrases.category.dining',
  shopping: 'phrases.category.shopping',
  emergency: 'phrases.category.emergency',
}

const categoryDescriptionKey: Record<PhraseCategory, string> = {
  basics: 'phrases.categorySectionDescription.basics',
  transport: 'phrases.categorySectionDescription.transport',
  hotel: 'phrases.categorySectionDescription.hotel',
  dining: 'phrases.categorySectionDescription.dining',
  shopping: 'phrases.categorySectionDescription.shopping',
  emergency: 'phrases.categorySectionDescription.emergency',
}

function splitLeadSentence(copy: string) {
  const normalizedCopy = copy.trim()

  if (!normalizedCopy) {
    return { lead: '', rest: '' }
  }

  const sentenceMatch = normalizedCopy.match(/^(.+?[.!?。！？])/u)

  if (!sentenceMatch) {
    return { lead: normalizedCopy, rest: '' }
  }

  return {
    lead: sentenceMatch[1].trim(),
    rest: normalizedCopy.slice(sentenceMatch[0].length).trim(),
  }
}

export function TravelPhrasesCountryPage({
  locale,
  pack,
}: {
  locale: Locale
  pack: PhraseCountryPack | null
}) {
  const { t } = useI18n()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const activePhraseIdRef = useRef<string | null>(null)
  const audioUrlMapRef = useRef(new Map<string, string>())
  const audioLoadMapRef = useRef(new Map<string, Promise<string>>())
  const [activePhraseId, setActivePhraseId] = useState<string | null>(null)
  const [loadingPhraseId, setLoadingPhraseId] = useState<string | null>(null)
  const [errorPhraseId, setErrorPhraseId] = useState<string | null>(null)
  const categoryJumpRef = useRef<HTMLDivElement | null>(null)
  const [isCategoryJumpCompact, setIsCategoryJumpCompact] = useState(false)

  useEffect(() => {
    writeLastTool('travel-phrases')
  }, [])

  useEffect(() => {
    activePhraseIdRef.current = activePhraseId
  }, [activePhraseId])

  useEffect(() => {
    return () => {
      for (const objectUrl of audioUrlMapRef.current.values()) {
        URL.revokeObjectURL(objectUrl)
      }
      audioUrlMapRef.current.clear()
      audioLoadMapRef.current.clear()
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => setActivePhraseId(null)
    const handleError = () => {
      setErrorPhraseId((current) => current ?? activePhraseIdRef.current)
      setLoadingPhraseId(null)
      setActivePhraseId(null)
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.pause()
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    let frameId = 0

    const updateCompactState = () => {
      frameId = 0
      const categoryJump = categoryJumpRef.current
      if (!categoryJump) {
        return
      }

      const stickyOffset = window.innerWidth >= 768 ? 16 : 8
      const shouldCompact = categoryJump.getBoundingClientRect().top <= stickyOffset + 1

      setIsCategoryJumpCompact((current) => (current === shouldCompact ? current : shouldCompact))
    }

    const requestUpdate = () => {
      if (frameId) {
        return
      }
      frameId = window.requestAnimationFrame(updateCompactState)
    }

    updateCompactState()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  const phraseSections = useMemo(
    () => PHRASE_CATEGORIES.map((category) => ({
      category,
      phrases: pack?.phrases.filter((phrase) => phrase.category === category) ?? [],
    })),
    [pack],
  )
  const introCopy = useMemo(() => splitLeadSentence(pack?.intro ?? ''), [pack?.intro])
  const visibleTravelTips = useMemo(() => pack?.travelTips.slice(0, 3) ?? [], [pack?.travelTips])
  const overflowTravelTips = useMemo(() => pack?.travelTips.slice(3) ?? [], [pack?.travelTips])

  function stopPlayback() {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    setLoadingPhraseId(null)
    setActivePhraseId(null)
  }

  async function togglePlayback(phrase: PhraseCard) {
    const audio = audioRef.current
    if (!audio || !pack || !phrase.audioKey) return

    if (activePhraseId === phrase.id) {
      stopPlayback()
      return
    }

    setErrorPhraseId(null)
    setLoadingPhraseId(phrase.id)
    audio.pause()
    audio.currentTime = 0

    try {
      const audioSrc = await primePhraseAudio(phrase)
      audio.src = audioSrc
      setActivePhraseId(phrase.id)
      setLoadingPhraseId(null)
      await audio.play()
    } catch {
      setLoadingPhraseId(null)
      setActivePhraseId(null)
      setErrorPhraseId(phrase.id)
    }
  }

  function primePhraseAudio(phrase: PhraseCard) {
    if (!pack || !phrase.audioKey || typeof fetch !== 'function' || typeof URL.createObjectURL !== 'function') {
      return Promise.resolve(buildPhraseAudioPath(pack?.slug ?? '', phrase.id))
    }

    const cachedAudioUrl = audioUrlMapRef.current.get(phrase.id)
    if (cachedAudioUrl) {
      return Promise.resolve(cachedAudioUrl)
    }

    const pendingRequest = audioLoadMapRef.current.get(phrase.id)
    if (pendingRequest) {
      return pendingRequest
    }

    const request = fetch(buildPhraseAudioPath(pack.slug, phrase.id))
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`AUDIO_FETCH_FAILED_${response.status}`)
        }
        const blob = await response.blob()
        const objectUrl = URL.createObjectURL(blob)
        audioUrlMapRef.current.set(phrase.id, objectUrl)
        return objectUrl
      })
      .catch(() => buildPhraseAudioPath(pack.slug, phrase.id))
      .finally(() => {
        audioLoadMapRef.current.delete(phrase.id)
      })

    audioLoadMapRef.current.set(phrase.id, request)
    return request
  }

  if (!pack) {
    return (
      <AppShell locale={locale} title={t('phrases.title')} description={t('phrases.description')} activeTool="travel-phrases">
        <PageState
          tone="danger"
          title={t('phrases.notFoundTitle')}
          description={t('phrases.notFoundDescription')}
          action={(
            <Button asChild>
              <Link to={getLocalizedPath(locale, '/travel-phrases')}>{t('phrases.backToHome')}</Link>
            </Button>
          )}
        />
      </AppShell>
    )
  }

  const audioNotice = pack.audioCoverage === 'all'
    ? t('phrases.aiAudioNotice')
    : pack.audioCoverage === 'partial'
      ? t('phrases.audioPartialNotice')
      : t('phrases.audioComingSoon')

  return (
    <AppShell locale={locale} title={pack.title} description={pack.description} activeTool="travel-phrases">
      <audio ref={audioRef} preload="none" className="hidden" aria-hidden="true" />

      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                {t('phrases.countryMetric', { country: pack.country, language: pack.languageName, count: pack.phrases.length })}
              </Badge>
              <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                <span className="text-3xl" aria-hidden="true">{pack.flag}</span>
                {pack.country}
              </CardTitle>
              <CardDescription className="max-w-3xl text-pretty text-sm leading-6 md:text-base">{pack.description}</CardDescription>
            </div>
            <div className="rounded-2xl border border-border bg-[color:var(--surface-floating)] px-4 py-3">
              <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Languages className="size-4 text-primary" />
                {pack.languageName}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {audioNotice}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {pack.intro || pack.travelTips.length ? (
        <Card>
          <CardHeader className="gap-4">
            <div className="space-y-2">
              <CardTitle>{t('phrases.quickTipsTitle')}</CardTitle>
              {introCopy.lead ? (
                <CardDescription className="max-w-4xl text-sm leading-6 md:text-base">
                  {introCopy.lead}
                </CardDescription>
              ) : null}
            </div>

            {visibleTravelTips.length ? (
              <ul className="grid gap-2 md:grid-cols-3">
                {visibleTravelTips.map((tip) => (
                  <li
                    key={tip}
                    className="rounded-2xl border border-border bg-[color:var(--surface-floating)] px-4 py-3 text-sm leading-5 text-foreground/85"
                  >
                    {tip}
                  </li>
                ))}
              </ul>
            ) : null}

            {introCopy.rest || overflowTravelTips.length ? (
              <details className="rounded-2xl border border-dashed border-border bg-[color:var(--surface-floating)] px-4 py-3">
                <summary className="cursor-pointer list-none text-sm font-medium text-foreground">
                  {t('phrases.quickTipsExpand')}
                </summary>
                <div className="mt-3 space-y-3 text-sm leading-6 text-muted-foreground md:text-base">
                  {introCopy.rest ? (
                    <p>{introCopy.rest}</p>
                  ) : null}
                  {overflowTravelTips.length ? (
                    <ul className="space-y-2">
                      {overflowTravelTips.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </details>
            ) : null}
          </CardHeader>
        </Card>
      ) : null}

      <div
        ref={categoryJumpRef}
        className={cn(
          'sticky z-20 w-full min-w-0 max-w-full',
          isCategoryJumpCompact ? 'top-2 md:top-4' : 'top-2 md:top-4',
        )}
      >
        <Card
          className={cn(
            'w-full max-w-full overflow-hidden transition-all duration-200',
            isCategoryJumpCompact && 'border-border/80 bg-card/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-card/80',
          )}
        >
          <CardHeader className={cn('min-w-0 transition-all duration-200', isCategoryJumpCompact ? 'gap-2 px-3 py-3 md:px-4' : 'gap-3')}>
            <div
              className={cn(
                'space-y-1 overflow-hidden transition-all duration-200',
                isCategoryJumpCompact ? 'max-h-0 -translate-y-2 opacity-0 pointer-events-none' : 'max-h-24 opacity-100',
              )}
              aria-hidden={isCategoryJumpCompact}
            >
              <CardTitle>{t('phrases.categoryJumpTitle')}</CardTitle>
              <CardDescription>{t('phrases.categoryJumpDescription')}</CardDescription>
            </div>
            <nav
              aria-label={t('phrases.categoryJumpStickyLabel')}
              className={cn(
                'flex w-full min-w-0 max-w-full gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                isCategoryJumpCompact ? 'flex-nowrap' : 'flex-nowrap md:flex-wrap md:overflow-visible md:pb-0',
              )}
            >
              {phraseSections
                .filter((section) => section.phrases.length)
                .map((section) => (
                  <a
                    key={section.category}
                    href={`#${section.category}-phrases`}
                    className={cn(
                      'inline-flex h-10 shrink-0 whitespace-nowrap items-center justify-center rounded-xl border border-border bg-[color:var(--surface-floating)] px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted',
                      isCategoryJumpCompact && 'h-9 rounded-full px-3 text-xs md:text-sm',
                    )}
                  >
                    {t(categoryLabelKey[section.category])}
                  </a>
                ))}
            </nav>
          </CardHeader>
        </Card>
      </div>

      {phraseSections.some((section) => section.phrases.length) ? (
        <div className="space-y-6">
          {phraseSections.map((section) => (
            section.phrases.length ? (
              <section key={section.category} id={`${section.category}-phrases`} className="space-y-4 scroll-mt-40 md:scroll-mt-32">
                <div className="space-y-2">
                  <Badge variant="outline">{t(categoryLabelKey[section.category])}</Badge>
                  <h2 className="display text-2xl font-semibold text-foreground md:text-3xl">
                    {t('phrases.categorySectionTitle', {
                      country: pack.country,
                      category: t(categoryLabelKey[section.category]),
                    })}
                  </h2>
                  <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                    {t(categoryDescriptionKey[section.category], {
                      country: pack.country,
                      category: t(categoryLabelKey[section.category]),
                    })}
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {section.phrases.map((phrase) => renderPhraseCard(phrase))}
                </div>
              </section>
            ) : null
          ))}
        </div>
      ) : (
        <PageState
          title={t('phrases.emptyTitle')}
          description={t('phrases.emptyDescription')}
          action={(
            <Button asChild variant="secondary">
              <Link to={getLocalizedPath(locale, '/travel-phrases')}>{t('phrases.backToHome')}</Link>
            </Button>
          )}
        />
      )}

      {pack.extraPhrases.length ? (
        <section className="space-y-4">
          <div className="space-y-2">
            <Badge variant="outline">{pack.country}</Badge>
            <h2 className="display text-2xl font-semibold text-foreground md:text-3xl">
              {t('phrases.extraPhrasesTitle')}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {pack.extraPhrases.map((phrase) => renderPhraseCard(phrase))}
          </div>
        </section>
      ) : null}

      {pack.faq.length ? (
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="display text-2xl font-semibold text-foreground md:text-3xl">
              {t('phrases.faqTitle')}
            </h2>
          </div>
          <div className="grid gap-4">
            {pack.faq.map((item) => (
              <Card key={item.question}>
                <CardHeader className="gap-2">
                  <CardTitle className="text-xl">{item.question}</CardTitle>
                  <CardDescription className="text-sm leading-6 md:text-base">
                    {item.answer}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {pack.relatedCountries.length ? (
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="display text-2xl font-semibold text-foreground md:text-3xl">
              {t('phrases.relatedCountriesTitle')}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {pack.relatedCountries.map((country) => (
              <Card key={country.slug}>
                <CardHeader className="gap-3">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <span className="text-2xl" aria-hidden="true">{country.flag}</span>
                    {country.country}
                  </CardTitle>
                  <CardDescription>{country.teaser || country.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="secondary" className="w-full justify-between">
                    <Link to={getLocalizedPath(locale, `/travel-phrases/${country.slug}`)}>
                      {country.title}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </AppShell>
  )

  function renderPhraseCard(phrase: PhraseCard) {
    const isPlaying = activePhraseId === phrase.id
    const isLoading = loadingPhraseId === phrase.id
    const audioDisabled = !phrase.audioKey

    return (
      <Card key={phrase.id} className="h-full">
        <CardHeader className="gap-3">
          <div className="space-y-2">
            <CardTitle className="text-balance text-3xl md:text-4xl">{phrase.nativeText}</CardTitle>
            {phrase.romanization ? (
              <CardDescription className="text-base font-medium text-foreground/75">
                {phrase.romanization}
              </CardDescription>
            ) : null}
            <p className="text-pretty text-sm leading-6 text-muted-foreground">{phrase.translation}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            type="button"
            variant={isPlaying ? 'default' : 'secondary'}
            size="lg"
            className="w-full justify-center"
            aria-label={audioDisabled
              ? t('phrases.audioComingSoonShort')
              : isLoading
                ? t('phrases.loadingAudio')
                : isPlaying
                  ? t('phrases.stopAudio')
                  : t('phrases.playAudio')}
            disabled={audioDisabled || isLoading}
            onPointerDown={() => {
              if (!audioDisabled) {
                void primePhraseAudio(phrase)
              }
            }}
            onClick={() => void togglePlayback(phrase)}
          >
            {audioDisabled ? (
              <Volume2 className="size-4" />
            ) : isLoading ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : isPlaying ? (
              <Square className="size-4" />
            ) : (
              <Play className="size-4" />
            )}
            {audioDisabled
              ? t('phrases.audioComingSoonShort')
              : isLoading
                ? t('phrases.loadingAudio')
                : isPlaying
                  ? t('phrases.stopAudio')
                  : t('phrases.playAudio')}
          </Button>
          {errorPhraseId === phrase.id ? (
            <InlineStatus tone="danger" title={t('phrases.audioUnavailable')} />
          ) : null}
        </CardContent>
      </Card>
    )
  }
}
