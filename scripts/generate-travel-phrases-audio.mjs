import { execFile } from 'node:child_process'
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { basename, join, resolve } from 'node:path'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

const DATA_DIR = resolve('src/data/travel-phrases')
const OUTPUT_ROOT = resolve(process.env.PHRASE_AUDIO_OUTPUT_DIR || '.generated/travel-phrases-audio')
const shouldUpload = process.argv.includes('--upload')
const shouldForce = process.argv.includes('--force')
const BUCKET = process.env.PHRASE_AUDIO_BUCKET || 'route-crate-phrase-audio'
const provider = process.env.PHRASE_TTS_PROVIDER || 'macos'
const onlyCountryArgIndex = process.argv.indexOf('--country')
const onlyCountry = onlyCountryArgIndex >= 0 ? process.argv[onlyCountryArgIndex + 1] : null

const MODEL = process.env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts'
const ENDPOINT = process.env.OPENAI_TTS_ENDPOINT || 'https://api.openai.com/v1/audio/speech'
const API_KEY = process.env.OPENAI_API_KEY

const macVoiceByLanguage = {
  'en-US': 'Samantha',
  'en-SG': 'Daniel',
  'en-CA': 'Samantha',
  'en-AU': 'Karen',
  'en-NZ': 'Karen',
  'en-PH': 'Samantha',
  'es-ES': 'Mónica',
  'es-MX': 'Paulina',
  'es-AR': 'Paulina',
  'es-CL': 'Paulina',
  'es-PE': 'Paulina',
  'es-CO': 'Paulina',
  'es-CR': 'Paulina',
  'pt-PT': 'Joana',
  'pt-BR': 'Luciana',
  'fr-FR': 'Thomas',
  'fr-CA': 'Amélie',
  'de-DE': 'Anna',
  'de-AT': 'Anna',
  'de-CH': 'Anna',
  'it-IT': 'Alice',
  'nl-NL': 'Xander',
  'el-GR': 'Melina',
  'ja-JP': 'Kyoko',
  'ko-KR': 'Yuna',
  'th-TH': 'Kanya',
  'vi-VN': 'Linh',
  'id-ID': 'Damayanti',
  'ms-MY': 'Amira',
  'zh-CN': 'Tingting',
  'zh-TW': 'Meijia',
  'zh-HK': 'Sinji',
  'ar_001': 'Majed',
  'hi-IN': 'Lekha',
  'tr-TR': 'Yelda',
}

const openAiVoiceByLanguage = {
  'en-US': 'alloy',
  'en-SG': 'alloy',
  'en-CA': 'alloy',
  'en-AU': 'alloy',
  'en-NZ': 'alloy',
  'en-PH': 'alloy',
  'es-ES': 'verse',
  'es-MX': 'verse',
  'es-AR': 'verse',
  'es-CL': 'verse',
  'es-PE': 'verse',
  'es-CO': 'verse',
  'es-CR': 'verse',
  'pt-PT': 'coral',
  'pt-BR': 'coral',
  'fr-FR': 'shimmer',
  'fr-CA': 'shimmer',
  'de-DE': 'ash',
  'de-AT': 'ash',
  'de-CH': 'ash',
  'it-IT': 'sage',
  'nl-NL': 'ash',
  'el-GR': 'shimmer',
  'ja-JP': 'alloy',
  'ko-KR': 'verse',
  'th-TH': 'coral',
  'vi-VN': 'sage',
  'id-ID': 'alloy',
  'ms-MY': 'alloy',
  'zh-CN': 'alloy',
  'zh-TW': 'alloy',
  'zh-HK': 'alloy',
  'ar_001': 'alloy',
  'hi-IN': 'alloy',
  'tr-TR': 'alloy',
}

async function main() {
  await mkdir(OUTPUT_ROOT, { recursive: true })

  const files = (await readdir(DATA_DIR))
    .filter((file) => file.endsWith('.json') && file !== 'phrase-definitions.json' && file !== 'index.json')
    .filter((file) => !onlyCountry || file === `${onlyCountry}.json`)

  for (const file of files) {
    const pack = JSON.parse(await readFile(join(DATA_DIR, file), 'utf8'))
    const countryDir = join(OUTPUT_ROOT, pack.slug)
    await mkdir(countryDir, { recursive: true })

    for (const phrase of pack.phrases) {
      if (!phrase.audioKey) {
        console.log(`skipped ${pack.slug}/${phrase.id} (audio disabled)`)
        continue
      }

      const expectedKey = `travel-phrases/${pack.slug}/${phrase.id}.mp3`
      if (phrase.audioKey !== expectedKey) {
        throw new Error(`${pack.slug}/${phrase.id}: expected audioKey "${expectedKey}"`)
      }

      const outputFile = join(countryDir, `${phrase.id}.${provider === 'macos' ? 'm4a' : 'mp3'}`)

      if (!shouldForce) {
        try {
          await readFile(outputFile)
          console.log(`skipped ${pack.slug}/${basename(outputFile)} (exists)`)
          if (shouldUpload) {
            await uploadAudioFile(outputFile, phrase.audioKey)
          }
          continue
        } catch {
          // fall through and generate the file
        }
      }

      if (provider === 'openai') {
        await synthesizeWithOpenAI({
          input: phrase.nativeText,
          languageCode: pack.languageCode,
          outputFile,
        })
      } else {
        await synthesizeWithMacOS({
          input: phrase.nativeText,
          languageCode: pack.languageCode,
          outputFile,
        })
      }

      if (shouldUpload) {
        await uploadAudioFile(outputFile, phrase.audioKey)
      }

      console.log(`${shouldUpload ? 'generated+uploaded' : 'generated'} ${pack.slug}/${basename(outputFile)} (${provider})`)
    }
  }

  console.log(`done: ${OUTPUT_ROOT}`)
}

async function synthesizeWithMacOS({ input, languageCode, outputFile }) {
  const voice = macVoiceByLanguage[languageCode]
  if (!voice) {
    throw new Error(`No macOS voice configured for ${languageCode}`)
  }

  const tempAiffFile = `${outputFile}.aiff`
  await execFileAsync('say', ['-v', voice, '-o', tempAiffFile, input])
  await execFileAsync('afconvert', [tempAiffFile, outputFile, '-f', 'm4af', '-d', 'aac'])
  await rm(tempAiffFile, { force: true })
}

async function synthesizeWithOpenAI({ input, languageCode, outputFile }) {
  const voice = openAiVoiceByLanguage[languageCode]
  if (!voice) {
    throw new Error(`No OpenAI voice configured for ${languageCode}`)
  }
  if (!API_KEY) {
    throw new Error('Missing OPENAI_API_KEY for PHRASE_TTS_PROVIDER=openai')
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      voice,
      response_format: 'mp3',
      input,
      instructions: `Speak naturally in ${languageCode} for an in-person travel phrase card.`,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`TTS request failed (${response.status}): ${body}`)
  }

  const audio = new Uint8Array(await response.arrayBuffer())
  await writeFile(outputFile, audio)
}

async function uploadAudioFile(outputFile, audioKey) {
  const contentType = outputFile.endsWith('.m4a') ? 'audio/mp4' : 'audio/mpeg'
  await retry(async () => {
    await execFileAsync('pnpm', [
      'exec',
      'wrangler',
      'r2',
      'object',
      'put',
      `${BUCKET}/${audioKey}`,
      '--remote',
      '--file',
      outputFile,
      '--content-type',
      contentType,
    ])
  }, 4)
}

await main()

async function retry(task, attempts) {
  let lastError
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await task()
    } catch (error) {
      lastError = error
      if (attempt === attempts) {
        break
      }
      const delay = attempt * 1000
      console.warn(`retrying after failure (${attempt}/${attempts}) in ${delay}ms`)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
  throw lastError
}
