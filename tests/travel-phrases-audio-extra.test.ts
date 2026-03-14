import { afterEach, describe, expect, it, vi } from 'vitest'

function createAudioStream() {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array([1, 2, 3]))
      controller.close()
    },
  })
}

afterEach(() => {
  vi.resetModules()
  vi.doUnmock('@/lib/travel-phrases')
})

describe('travel phrase audio serving for extra phrases', () => {
  it('serves audio for extra phrase cards when an audio key exists', async () => {
    vi.doMock('@/lib/travel-phrases', () => ({
      getRawPhraseCountryPack: vi.fn().mockResolvedValue({
        slug: 'testland',
        phrases: [],
        extraPhrases: [
          {
            id: 'bonus_phrase',
            category: 'transport',
            nativeText: '追加です',
            translation: {
              'en-US': 'Bonus phrase',
              'zh-CN': '补充短语',
            },
            romanization: 'Tsuika desu',
            audioKey: 'travel-phrases/testland/bonus_phrase.mp3',
          },
        ],
      }),
    }))

    const { servePhraseAudio } = await import('@/server/travel-phrases')
    const env = {
      PHRASE_AUDIO: {
        get: vi.fn().mockResolvedValue({
          body: createAudioStream(),
          httpMetadata: { contentType: 'audio/mpeg' },
          httpEtag: '"extra123"',
          size: 3,
        }),
      },
    } as unknown as Pick<CloudflareEnv, 'PHRASE_AUDIO'>

    const response = await servePhraseAudio(env, 'testland', 'bonus_phrase')

    expect(response.status).toBe(200)
    expect(env.PHRASE_AUDIO?.get).toHaveBeenCalledWith('travel-phrases/testland/bonus_phrase.mp3')
  })
})
