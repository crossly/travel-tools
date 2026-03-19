import { readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const SITE_URL = 'https://www.routecrate.com'
const locales = ['en-us', 'zh-cn']
const staticPaths = ['', '/currency', '/bill-splitter', '/travel-phrases', '/packing-list', '/jet-lag', '/local-apps', '/tipping', '/visa-entry']
const regionOrder = { asia: 0, 'middle-east': 1, europe: 2, americas: 3, africa: 4, oceania: 5 }

function resolveAudioCoverage(entries = []) {
  if (!entries.length) {
    return 'none'
  }

  const audioCount = entries.filter((entry) => Boolean(entry.audioKey)).length
  if (audioCount === 0) {
    return 'none'
  }
  if (audioCount === entries.length) {
    return 'all'
  }
  return 'partial'
}

async function main() {
  const countriesDir = join(process.cwd(), 'src/data/travel-phrases')
  const localAppsGuidesDir = join(process.cwd(), 'src/data/local-apps/country-guides')
  const tippingCountriesDir = join(process.cwd(), 'src/data/tipping/countries')
  const visaEntryCountriesDir = join(process.cwd(), 'src/data/visa-entry/countries')
  const countryFiles = (await readdir(countriesDir))
    .filter((file) => file.endsWith('.json') && file !== 'phrase-definitions.json' && file !== 'index.json')

  const countryPacks = await Promise.all(
    countryFiles.map(async (file) => {
      const filePath = join(countriesDir, file)
      const [pack, fileStat] = await Promise.all([
        readFile(filePath, 'utf8').then((content) => JSON.parse(content)),
        stat(filePath),
      ])

      return {
        ...pack,
        lastModified: fileStat.mtime.toISOString().slice(0, 10),
      }
    }),
  )

  const [localAppSlugs, tippingSlugs, visaEntrySlugs] = await Promise.all([
    listSlugsFromDirectory(localAppsGuidesDir),
    listSlugsFromDirectory(tippingCountriesDir),
    listSlugsFromDirectory(visaEntryCountriesDir),
  ])

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
    description: pack.description,
    teaser: pack.teaser,
    highlights: pack.highlights,
    featured: Boolean(pack.featured),
    phraseCount: pack.phrases.length,
    audioCoverage: resolveAudioCoverage([...(pack.phrases ?? []), ...(pack.extraPhrases ?? [])]),
  }))

  const buildDate = new Date().toISOString().slice(0, 10)
  const urls = [
    ...buildLocalizedUrls(staticPaths, buildDate),
    ...buildLocalizedUrls(
      countryPacks.map((pack) => ({ path: `/travel-phrases/${pack.slug}`, lastModified: pack.lastModified })),
    ),
    ...buildLocalizedUrls(
      localAppSlugs.map((slug) => ({ path: `/local-apps/${slug}`, lastModified: buildDate })),
    ),
    ...buildLocalizedUrls(
      tippingSlugs.map((slug) => ({ path: `/tipping/${slug}`, lastModified: buildDate })),
    ),
    ...buildLocalizedUrls(
      visaEntrySlugs.map((slug) => ({ path: `/visa-entry/${slug}`, lastModified: buildDate })),
    ),
  ]

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${url.loc}</loc><lastmod>${url.lastmod}</lastmod></url>`),
    '</urlset>',
    '',
  ].join('\n')

  await writeFile(join(process.cwd(), 'public/sitemap.xml'), xml)
  await writeFile(join(countriesDir, 'index.json'), `${JSON.stringify(indexPayload, null, 2)}\n`)
}

function buildLocalizedUrls(paths, defaultLastmod) {
  return locales.flatMap((locale) =>
    paths.map((entry) => {
      const path = typeof entry === 'string' ? entry : entry.path
      const lastmod = typeof entry === 'string' ? defaultLastmod : entry.lastModified
      return {
        loc: `${SITE_URL}/${locale}${path}`,
        lastmod,
      }
    }),
  )
}

async function listSlugsFromDirectory(directory) {
  return (await readdir(directory))
    .filter((file) => file.endsWith('.ts'))
    .map((file) => file.replace(/\.ts$/, ''))
    .sort()
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
