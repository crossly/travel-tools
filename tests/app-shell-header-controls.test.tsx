// @vitest-environment jsdom
import { createElement } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children?: React.ReactNode } & Record<string, unknown>) => createElement('a', props, children),
  useLocation: () => ({ pathname: '/en-US/local-apps' }),
}))

vi.mock('@/lib/i18n', () => ({
  useI18n: () => ({
    t: (key: string) =>
      ({
        'nav.home': 'Home',
        'nav.currency': 'Currency',
        'nav.travelPhrases': 'Phrases',
        'nav.localApps': 'Local Apps',
        'nav.splitBill': 'Bill Splitter',
        'nav.packingList': 'Packing',
        'nav.jetLag': 'Jet Lag',
        'nav.settings': 'Settings',
      })[key] ?? key,
  }),
}))

describe('DesktopToolNav', () => {
  it('renders tool tabs without duplicating home in the desktop navigation row', async () => {
    const { DesktopToolNav } = await import('@/components/app/app-shell-header-controls')

    render(
      createElement(DesktopToolNav, {
        locale: 'en-US',
        activeTool: 'local-apps',
      }),
    )

    expect(screen.getByRole('navigation', { name: 'Desktop tool navigation' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Local Apps' })).toBeTruthy()
    expect(screen.queryByRole('link', { name: 'Home' })).toBeNull()
  })
})
