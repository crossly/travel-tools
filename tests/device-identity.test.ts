import { afterEach, describe, expect, it, vi } from 'vitest'
import { generateDeviceDisplayName } from '@/lib/device-identity'
import { bootstrapDevice } from '@/server/split-bill'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('device identity', () => {
  it('generates an emoji and noun display name', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    expect(generateDeviceDisplayName()).toBe('🐼 Panda')
  })

  it('bootstraps a device identity without manual input', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.55)

    const result = await bootstrapDevice()

    expect(result.deviceId).toMatch(/^dev_/)
    expect(result.displayName).toMatch(/^.+ [A-Za-z]+$/u)
  })
})
