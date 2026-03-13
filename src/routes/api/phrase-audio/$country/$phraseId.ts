import { createFileRoute } from '@tanstack/react-router'
import { getEnv } from '@/server/context'
import { servePhraseAudio } from '@/server/travel-phrases'

export const Route = createFileRoute('/api/phrase-audio/$country/$phraseId')({
  server: {
    handlers: {
      GET: ({ params, context }: any) => servePhraseAudio(getEnv(context), params.country, params.phraseId),
    },
  },
})
