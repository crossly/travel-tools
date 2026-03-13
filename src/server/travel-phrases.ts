import { getRawPhraseCountryPack } from '@/lib/travel-phrases'

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status })
}

export async function servePhraseAudio(
  env: Pick<CloudflareEnv, 'PHRASE_AUDIO'>,
  country: string,
  phraseId: string,
) {
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

  const object = await env.PHRASE_AUDIO.get(phrase.audioKey)
  if (!object?.body) {
    return jsonError('PHRASE_AUDIO_NOT_FOUND', 404)
  }

  return new Response(object.body, {
    status: 200,
    headers: {
      'Content-Type': object.httpMetadata?.contentType || 'audio/mpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
      ETag: object.httpEtag,
    },
  })
}
