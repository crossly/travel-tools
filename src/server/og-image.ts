import { buildOgImageUrl } from '@/lib/og-image'

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function wrapText(value: string, options: { maxChars: number; maxLines: number }) {
  const text = value.trim().replace(/\s+/g, ' ')
  if (!text) return []

  const tokens = text.includes(' ') ? text.split(' ') : Array.from(text)
  const lines: string[] = []
  let current = ''

  for (const token of tokens) {
    const separator = current && text.includes(' ') ? ' ' : ''
    const next = `${current}${separator}${token}`

    if (next.length <= options.maxChars) {
      current = next
      continue
    }

    if (current) {
      lines.push(current)
      current = token
    } else {
      lines.push(token.slice(0, options.maxChars))
      current = token.slice(options.maxChars)
    }

    if (lines.length === options.maxLines) {
      return lines.map((line, index) => index === lines.length - 1 ? `${line.slice(0, Math.max(0, line.length - 1))}…` : line)
    }
  }

  if (current) lines.push(current)

  if (lines.length <= options.maxLines) return lines

  return lines.slice(0, options.maxLines).map((line, index, array) =>
    index === array.length - 1 ? `${line.slice(0, Math.max(0, line.length - 1))}…` : line,
  )
}

export { buildOgImageUrl }

export function serveOgImage(request: Request) {
  const url = new URL(request.url)
  const variant = url.searchParams.get('variant')?.trim() || 'default'
  const brand = url.searchParams.get('brand')?.trim() || 'Route Crate'
  const title = url.searchParams.get('title')?.trim() || brand
  const description = url.searchParams.get('description')?.trim() || 'Travel tools for currency, phrases, and bill splitting.'
  const locale = url.searchParams.get('locale')?.trim() || 'en-US'

  const titleLines = wrapText(title, { maxChars: locale.startsWith('zh') ? 12 : 22, maxLines: 3 })
  const descriptionLines = wrapText(description, { maxChars: locale.startsWith('zh') ? 22 : 38, maxLines: 3 })

  const titleSvg = titleLines
    .map((line, index) => `<text x="84" y="${218 + index * 86}" fill="#251A12" font-size="72" font-weight="700">${escapeXml(line)}</text>`)
    .join('')

  const descriptionSvg = descriptionLines
    .map((line, index) => `<text x="84" y="${504 + index * 44}" fill="#6F5E50" font-size="32" font-weight="500">${escapeXml(line)}</text>`)
    .join('')

  const variantBadge = variant === 'home'
    ? { label: 'Three travel tools', accent: '#D86F20', panel: '#FFF1E4' }
    : variant === 'country'
      ? { label: 'Country pack', accent: '#1E7A63', panel: '#E8F7F1' }
      : variant === 'tool'
        ? { label: 'Tool spotlight', accent: '#1B5FC1', panel: '#EAF2FF' }
        : { label: 'Travel-ready', accent: '#6F5E50', panel: '#FFF8F1' }

  const body = [
    '<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">',
    `  <title id="title">${escapeXml(title)}</title>`,
    `  <desc id="desc">${escapeXml(description)}</desc>`,
    '  <rect width="1200" height="630" rx="48" fill="#F4EFE8"/>',
    '  <rect x="34" y="34" width="1132" height="562" rx="40" fill="#FCFAF6" stroke="#E4D8CA" stroke-width="4"/>',
    '  <circle cx="1032" cy="112" r="96" fill="#E9D5C5"/>',
    '  <circle cx="104" cy="548" r="132" fill="#EFE2D5"/>',
    `  <rect x="84" y="76" width="220" height="52" rx="26" fill="${variantBadge.accent}"/>`,
    `  <text x="110" y="111" fill="#FCFAF6" font-size="28" font-weight="700">${escapeXml(brand)}</text>`,
    '  <text x="1018" y="104" text-anchor="end" fill="#7A6757" font-size="24" font-weight="600">routecrate.com</text>',
    '  <g font-family="\'SF Pro Display\', \'PingFang SC\', \'Noto Sans CJK SC\', \'Segoe UI\', sans-serif">',
    `    ${titleSvg}`,
    `    ${descriptionSvg}`,
    '  </g>',
    `  <rect x="84" y="396" width="160" height="8" rx="4" fill="${variantBadge.accent}"/>`,
    `  <rect x="852" y="424" width="244" height="104" rx="28" fill="${variantBadge.panel}" stroke="#E4D8CA" stroke-width="3"/>`,
    `  <text x="886" y="486" fill="#251A12" font-size="28" font-weight="600">${escapeXml(variantBadge.label)}</text>`,
    variant === 'home'
      ? '  <text x="886" y="520" fill="#6F5E50" font-size="22" font-weight="500">Currency · Phrases · Split</text>'
      : variant === 'country'
        ? '  <text x="886" y="520" fill="#6F5E50" font-size="22" font-weight="500">Local phrases with context</text>'
        : variant === 'tool'
          ? '  <text x="886" y="520" fill="#6F5E50" font-size="22" font-weight="500">Fast, focused, shareable</text>'
          : '  <text x="886" y="520" fill="#6F5E50" font-size="22" font-weight="500">Travel-ready utility</text>',
    '</svg>',
  ].join('\n')

  return new Response(body, {
    headers: {
      'content-type': 'image/svg+xml; charset=utf-8',
      'cache-control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
