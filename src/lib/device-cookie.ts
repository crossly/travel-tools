import { buildPersistentCookieString, parseCookieHeader } from './cookie'

export const DEVICE_COOKIE_KEYS = {
  id: 'tt_split_bill_device_id',
  displayName: 'tt_split_bill_device_name',
} as const

export function getDeviceIdentityFromCookie(cookieHeader: string | null | undefined) {
  const cookies = parseCookieHeader(cookieHeader)
  const deviceId = cookies.get(DEVICE_COOKIE_KEYS.id)?.trim() || ''
  const displayName = cookies.get(DEVICE_COOKIE_KEYS.displayName)?.trim() || ''
  if (!deviceId || !displayName) return null
  return {
    deviceId,
    displayName,
  }
}

export function buildDeviceCookieString(key: string, value: string) {
  return buildPersistentCookieString(key, value)
}
