import { describe, expect, it, vi } from 'vitest'
import { servePhraseAudio } from '@/server/travel-phrases'

function createAudioStream() {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array([1, 2, 3]))
      controller.close()
    },
  })
}

describe('travel phrase audio serving', () => {
  it('returns audio from R2 when the object exists', async () => {
    const env = {
      PHRASE_AUDIO: {
        get: vi.fn().mockResolvedValue({
          body: createAudioStream(),
          httpMetadata: { contentType: 'audio/mpeg' },
          httpEtag: '"abc123"',
          size: 3,
        }),
      },
    } as unknown as Pick<CloudflareEnv, 'PHRASE_AUDIO'>

    const response = await servePhraseAudio(env, 'japan', 'hello')

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('audio/mpeg')
    expect(response.headers.get('cache-control')).toBe('public, max-age=31536000, immutable')
    expect(response.headers.get('accept-ranges')).toBe('bytes')
    expect(response.headers.get('content-length')).toBe('3')
  })

  it('returns audio metadata for HEAD requests', async () => {
    const env = {
      PHRASE_AUDIO: {
        head: vi.fn().mockResolvedValue({
          httpMetadata: { contentType: 'audio/mp4' },
          httpEtag: '"head123"',
          size: 2048,
        }),
      },
    } as unknown as Pick<CloudflareEnv, 'PHRASE_AUDIO'>

    const response = await servePhraseAudio(env, 'france', 'hello', { headOnly: true })

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('audio/mp4')
    expect(response.headers.get('content-length')).toBe('2048')
    expect(response.headers.get('accept-ranges')).toBe('bytes')
    expect(await response.text()).toBe('')
  })

  it('passes through range requests and returns partial content headers', async () => {
    const env = {
      PHRASE_AUDIO: {
        get: vi.fn().mockResolvedValue({
          body: createAudioStream(),
          httpMetadata: { contentType: 'audio/mp4' },
          httpEtag: '"range123"',
          size: 8016,
        }),
      },
    } as unknown as Pick<CloudflareEnv, 'PHRASE_AUDIO'>

    const headers = new Headers({ Range: 'bytes=0-' })
    const response = await servePhraseAudio(env, 'france', 'hello', { requestHeaders: headers })

    expect(env.PHRASE_AUDIO?.get).toHaveBeenCalledWith('travel-phrases/france/hello.mp3', { range: headers })
    expect(response.status).toBe(206)
    expect(response.headers.get('content-range')).toBe('bytes 0-8015/8016')
    expect(response.headers.get('accept-ranges')).toBe('bytes')
  })

  it('returns 404 when the phrase audio object is missing', async () => {
    const env = {
      PHRASE_AUDIO: {
        get: vi.fn().mockResolvedValue(null),
      },
    } as unknown as Pick<CloudflareEnv, 'PHRASE_AUDIO'>

    const response = await servePhraseAudio(env, 'japan', 'hello')
    const body = await response.json()

    expect(response.status).toBe(404)
    expect(body).toEqual({ error: 'PHRASE_AUDIO_NOT_FOUND' })
  })

  it('returns 404 when a phrase pack intentionally has no audio', async () => {
    const env = {
      PHRASE_AUDIO: {
        get: vi.fn(),
      },
    } as unknown as Pick<CloudflareEnv, 'PHRASE_AUDIO'>

    const response = await servePhraseAudio(env, 'cambodia', 'hello')
    const body = await response.json()

    expect(response.status).toBe(404)
    expect(body).toEqual({ error: 'PHRASE_AUDIO_DISABLED' })
    expect(env.PHRASE_AUDIO?.get).not.toHaveBeenCalled()
  })
})
