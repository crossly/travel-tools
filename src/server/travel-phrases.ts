import { getRawPhraseCountryPack } from '@/lib/travel-phrases'

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status })
}

export async function servePhraseAudio(
  env: Pick<CloudflareEnv, 'PHRASE_AUDIO'>,
  country: string,
  phraseId: string,
  options: { headOnly?: boolean; requestHeaders?: Headers } = {},
) {
  const { headOnly = false, requestHeaders } = options
  const pack = await getRawPhraseCountryPack(country)
  if (!pack) {
    return jsonError('PHRASE_PACK_NOT_FOUND', 404)
  }

  const phrase = pack.phrases.find((entry) => entry.id === phraseId)
    ?? pack.extraPhrases?.find((entry) => entry.id === phraseId)
  if (!phrase) {
    return jsonError('PHRASE_NOT_FOUND', 404)
  }

  if (!phrase.audioKey) {
    return jsonError('PHRASE_AUDIO_DISABLED', 404)
  }

  if (!env.PHRASE_AUDIO) {
    return jsonError('PHRASE_AUDIO_UNAVAILABLE', 503)
  }

  const rangeHeader = requestHeaders?.get('range')
  const object = headOnly && typeof env.PHRASE_AUDIO.head === 'function'
    ? await env.PHRASE_AUDIO.head(phrase.audioKey)
    : rangeHeader
      ? await env.PHRASE_AUDIO.get(phrase.audioKey, { range: requestHeaders })
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

  const isPartial = Boolean(rangeHeader)
  if (isPartial) {
    headers.set('Content-Range', buildContentRange(rangeHeader!, object.size))
  }

  const body = 'body' in object ? (object.body as BodyInit | null) : null

  return new Response(headOnly ? null : body, {
    status: isPartial ? 206 : 200,
    headers,
  })
}

function buildContentRange(rangeHeader: string, size?: number) {
  if (typeof size !== 'number' || !rangeHeader.startsWith('bytes=')) {
    return 'bytes */*'
  }

  const [startRaw = '', endRaw = ''] = rangeHeader.slice('bytes='.length).split('-', 2)
  let start = startRaw ? Number(startRaw) : Number.NaN
  let end = endRaw ? Number(endRaw) : Number.NaN

  if (Number.isNaN(start)) {
    const suffixLength = Number(endRaw)
    start = Number.isFinite(suffixLength) ? Math.max(size - suffixLength, 0) : 0
    end = size - 1
  } else {
    end = Number.isNaN(end) ? size - 1 : Math.min(end, size - 1)
  }

  if (start < 0 || start >= size || end < start) {
    return `bytes */${size}`
  }

  return `bytes ${start}-${end}/${size}`
}
