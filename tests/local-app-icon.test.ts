// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LocalAppIcon } from '@/features/local-apps/app-icon'

describe('LocalAppIcon', () => {
  it('shows a placeholder first and only switches to the favicon after the image loads', () => {
    const view = render(createElement(LocalAppIcon, {
      appId: 'navitime',
      appName: 'NAVITIME',
      links: [{ platform: 'official', url: 'https://example.com' }],
    }))

    const favicon = view.container.querySelector('img[src="https://favicon.is/example.com?larger=true"]')
    expect(favicon).toBeTruthy()
    expect(view.container.querySelector('[data-app-icon-id="navitime"][data-icon-state="loading"]')).toBeTruthy()

    fireEvent.load(favicon as HTMLImageElement)

    expect(view.container.querySelector('[data-app-icon-id="navitime"][data-icon-state="image"]')).toBeTruthy()
  })
})
