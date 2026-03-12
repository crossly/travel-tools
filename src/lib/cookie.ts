const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function encodeCookieValue(value: string) {
  return encodeURIComponent(value)
}

function decodeCookieValue(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export function parseCookieHeader(cookieHeader: string | null | undefined) {
  const cookies = new Map<string, string>()
  if (!cookieHeader) return cookies

  for (const part of cookieHeader.split(';')) {
    const trimmed = part.trim()
    if (!trimmed) continue
    const separator = trimmed.indexOf('=')
    if (separator === -1) continue
    const key = trimmed.slice(0, separator).trim()
    const value = trimmed.slice(separator + 1).trim()
    cookies.set(key, decodeCookieValue(value))
  }

  return cookies
}

export function buildPersistentCookieString(key: string, value: string) {
  return `${key}=${encodeCookieValue(value)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
}
