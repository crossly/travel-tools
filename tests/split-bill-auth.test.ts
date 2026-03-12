import { describe, expect, it } from 'vitest'
import { getDeviceId } from '@/server/split-bill'

describe('split bill device auth', () => {
  it('prefers the explicit device header', () => {
    const request = new Request('https://example.com/api/split-bill/trips', {
      headers: {
        'x-device-id': 'dev_header',
        cookie: 'tt_split_bill_device_id=dev_cookie; tt_split_bill_device_name=%F0%9F%90%BC%20Panda',
      },
    })

    expect(getDeviceId(request)).toBe('dev_header')
  })

  it('falls back to the device cookie when the header is missing', () => {
    const request = new Request('https://example.com/api/split-bill/trips', {
      headers: {
        cookie: 'tt_split_bill_device_id=dev_cookie; tt_split_bill_device_name=%F0%9F%90%BC%20Panda',
      },
    })

    expect(getDeviceId(request)).toBe('dev_cookie')
  })

  it('returns null when neither header nor cookie identity exists', () => {
    const request = new Request('https://example.com/api/split-bill/trips')

    expect(getDeviceId(request)).toBeNull()
  })
})
