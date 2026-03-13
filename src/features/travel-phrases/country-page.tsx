import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Languages, Play, Square, Volume2 } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { InlineStatus } from '@/components/app/inline-status'
import { PageState } from '@/components/app/page-state'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useI18n } from '@/lib/i18n'
import { getLocalizedPath } from '@/lib/site'
import { buildPhraseAudioPath, PHRASE_CATEGORIES } from '@/lib/travel-phrases'
import { writeLastTool } from '@/lib/storage'
import type { Locale, PhraseCard, PhraseCategory, PhraseCountryPack } from '@/lib/types'

const categoryLabelKey: Record<PhraseCategory, string> = {
  basics: 'phrases.category.basics',
  transport: 'phrases.category.transport',
  hotel: 'phrases.category.hotel',
  dining: 'phrases.category.dining',
  shopping: 'phrases.category.shopping',
  emergency: 'phrases.category.emergency',
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
  const [activeCategory, setActiveCategory] = useState<PhraseCategory>('basics')
  const [activePhraseId, setActivePhraseId] = useState<string | null>(null)
  const [errorPhraseId, setErrorPhraseId] = useState<string | null>(null)

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
    if (!pack?.hasAudio || typeof fetch !== 'function' || typeof URL.createObjectURL !== 'function') {
      return
    }

    for (const phrase of pack.phrases) {
      void primePhraseAudio(phrase)
    }
  }, [pack])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => setActivePhraseId(null)
    const handleError = () => {
      setErrorPhraseId((current) => current ?? activePhraseIdRef.current)
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

  const visiblePhrases = useMemo(
    () => pack?.phrases.filter((phrase) => phrase.category === activeCategory) ?? [],
    [activeCategory, pack],
  )

  function changeCategory(nextCategory: PhraseCategory) {
    stopPlayback()
    setErrorPhraseId(null)
    setActiveCategory(nextCategory)
  }

  function stopPlayback() {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
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
    audio.pause()
    audio.currentTime = 0

    const audioSrc = await primePhraseAudio(phrase)
    audio.src = audioSrc
    setActivePhraseId(phrase.id)

    try {
      await audio.play()
    } catch {
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
                {pack.hasAudio ? t('phrases.aiAudioNotice') : t('phrases.audioComingSoon')}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs
        value={activeCategory}
        onValueChange={(nextValue) => {
          changeCategory(nextValue as PhraseCategory)
        }}
      >
        <TabsList>
          {PHRASE_CATEGORIES.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => changeCategory(category)}
            >
              {t(categoryLabelKey[category])}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory}>
          {visiblePhrases.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {visiblePhrases.map((phrase) => {
                const isPlaying = activePhraseId === phrase.id
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
                          : isPlaying
                            ? t('phrases.stopAudio')
                            : t('phrases.playAudio')}
                        disabled={audioDisabled}
                        onPointerDown={() => {
                          if (!audioDisabled) {
                            void primePhraseAudio(phrase)
                          }
                        }}
                        onClick={() => void togglePlayback(phrase)}
                      >
                        {audioDisabled ? <Volume2 className="size-4" /> : isPlaying ? <Square className="size-4" /> : <Play className="size-4" />}
                        {audioDisabled ? t('phrases.audioComingSoonShort') : isPlaying ? t('phrases.stopAudio') : t('phrases.playAudio')}
                      </Button>
                      {errorPhraseId === phrase.id ? (
                        <InlineStatus tone="danger" title={t('phrases.audioUnavailable')} />
                      ) : null}
                    </CardContent>
                  </Card>
                )
              })}
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
        </TabsContent>
      </Tabs>
    </AppShell>
  )
}
