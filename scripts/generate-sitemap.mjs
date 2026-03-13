import { readFile, readdir, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'

const SITE_URL = 'https://www.routecrate.com'
const locales = ['en-us', 'zh-cn']
const staticPaths = ['', '/currency', '/bill-splitter', '/travel-phrases']
const regionOrder = { asia: 0, europe: 1, americas: 2, africa: 3 }

async function main() {
  const countriesDir = join(process.cwd(), 'src/data/travel-phrases')
  const countryFiles = (await readdir(countriesDir))
    .filter((file) => file.endsWith('.json') && file !== 'phrase-definitions.json' && file !== 'index.json')

  const countryPacks = await Promise.all(
    countryFiles.map(async (file) => JSON.parse(await readFile(join(countriesDir, file), 'utf8'))),
  )

  countryPacks.sort(
    (left, right) =>
      regionOrder[left.region] - regionOrder[right.region]
      || left.country['en-US'].localeCompare(right.country['en-US']),
  )

  const countrySlugs = countryPacks.map((pack) => pack.slug)

  const indexPayload = countryPacks.map((pack) => ({
    country: pack.country,
    slug: pack.slug,
    region: pack.region,
    languageName: pack.languageName,
    languageCode: pack.languageCode,
    flag: pack.flag,
    phraseCount: pack.phrases.length,
    hasAudio: pack.phrases.every((phrase) => Boolean(phrase.audioKey)),
  }))

  const urls = [
    ...buildLocalizedUrls(staticPaths),
    ...buildLocalizedUrls(countrySlugs.map((slug) => `/travel-phrases/${slug}`)),
  ]

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${url}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n')

  await writeFile(join(process.cwd(), 'public/sitemap.xml'), xml)
  await writeFile(join(countriesDir, 'index.json'), `${JSON.stringify(indexPayload, null, 2)}\n`)
}

function buildLocalizedUrls(paths) {
  return locales.flatMap((locale) =>
    paths.map((path) => `${SITE_URL}/${locale}${path}`),
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
