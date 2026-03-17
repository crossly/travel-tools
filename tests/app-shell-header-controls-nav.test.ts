// @vitest-environment jsdom
import { createElement } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, ...props }: { children?: React.ReactNode; to?: string } & Record<string, unknown>) =>
    createElement('a', { ...props, href: typeof to === 'string' ? to : '#' }, children),
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
        'nav.desktopToolNavigation': 'Tool navigation',
      })[key] ?? key,
  }),
}))

describe('DesktopToolNav semantics', () => {
  it('sets aria-current on the active tool link', async () => {
    const { DesktopToolNav } = await import('@/components/app/app-shell-header-controls')

    render(
      createElement(DesktopToolNav, {
        locale: 'en-US',
        activeTool: 'local-apps',
      }),
    )

    expect(screen.getByRole('link', { name: 'Local Apps' }).getAttribute('aria-current')).toBe('page')
    expect(screen.getByRole('link', { name: 'Currency' }).getAttribute('aria-current')).toBeNull()
  })
})
