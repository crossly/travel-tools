// @vitest-environment jsdom
import { createElement } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, ...props }: { children?: React.ReactNode; to?: string } & Record<string, unknown>) =>
    createElement('a', { ...props, href: typeof to === 'string' ? to : '#' }, children),
  useLocation: () => ({ pathname: '/en-US/local-apps' }),
}))

vi.mock('@/lib/i18n', async () => {
  const actual = await vi.importActual<typeof import('@/lib/i18n')>('@/lib/i18n')

  return {
    ...actual,
    useI18n: () => ({
      t: (key: string, values?: Record<string, string | number>) => actual.translate('en-US', key, values),
    }),
  }
})

describe('DesktopToolNav', () => {
  it('renders tool tabs without duplicating home in the desktop navigation row', async () => {
    const { DesktopToolNav } = await import('@/components/app/app-shell-header-controls')

    render(
      createElement(DesktopToolNav, {
        locale: 'en-US',
        activeTool: 'local-apps',
      }),
    )

    expect(screen.getByRole('navigation', { name: 'Open a tool' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Local Apps' })).toBeTruthy()
    expect(screen.queryByRole('link', { name: 'Home' })).toBeNull()
  })
})
