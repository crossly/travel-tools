import { getRawPhraseCountryPack } from '@/lib/travel-phrases'

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status })
}

export async function servePhraseAudio(
  env: Pick<CloudflareEnv, 'PHRASE_AUDIO'>,
  country: string,
  phraseId: string,
  options: { headOnly?: boolean } = {},
) {
  const { headOnly = false } = options
  const pack = getRawPhraseCountryPack(country)
  if (!pack) {
    return jsonError('PHRASE_PACK_NOT_FOUND', 404)
  }

  const phrase = pack.phrases.find((entry) => entry.id === phraseId)
  if (!phrase) {
    return jsonError('PHRASE_NOT_FOUND', 404)
  }

  if (!phrase.audioKey) {
    return jsonError('PHRASE_AUDIO_DISABLED', 404)
  }

  if (!env.PHRASE_AUDIO) {
    return jsonError('PHRASE_AUDIO_UNAVAILABLE', 503)
  }

  const object = headOnly && typeof env.PHRASE_AUDIO.head === 'function'
    ? await env.PHRASE_AUDIO.head(phrase.audioKey)
    : await env.PHRASE_AUDIO.get(phrase.audioKey)

  if (!object || (!headOnly && !('body' in object && object.body))) {
    return jsonError('PHRASE_AUDIO_NOT_FOUND', 404)
  }

  const headers = new Headers({
    'Content-Type': object.httpMetadata?.contentType || 'audio/mpeg',
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Accept-Ranges': 'bytes',
    ETag: object.httpEtag,
  })

  if (typeof object.size === 'number') {
    headers.set('Content-Length', String(object.size))
  }

  const body = 'body' in object ? (object.body as BodyInit | null) : null

  return new Response(headOnly ? null : body, {
    status: 200,
    headers,
  })
}
