import { readdir, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'

const SITE_URL = 'https://www.routecrate.com'
const locales = ['en-us', 'zh-cn']
const staticPaths = ['', '/currency', '/bill-splitter', '/travel-phrases']

async function main() {
  const countryFiles = await readdir(join(process.cwd(), 'src/data/travel-phrases'))
  const countrySlugs = countryFiles
    .filter((file) => file.endsWith('.json') && file !== 'phrase-definitions.json')
    .map((file) => basename(file, '.json'))
    .sort((left, right) => left.localeCompare(right))

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
