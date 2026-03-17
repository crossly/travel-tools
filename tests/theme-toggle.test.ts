// @vitest-environment jsdom
import { createElement } from 'react'
import type { ComponentType } from 'react'
import { render, screen } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/components/ui/select', () => ({
  Select: ({ children }: { children?: React.ReactNode }) => createElement('div', null, children),
  SelectContent: ({ children }: { children?: React.ReactNode }) => createElement('div', null, children),
  SelectItem: ({ children }: { children?: React.ReactNode }) => createElement('div', null, children),
  SelectTrigger: ({
    children,
    hideChevron: _hideChevron,
    ...props
  }: { children?: React.ReactNode } & Record<string, unknown>) => createElement('button', props, children),
  SelectValue: () => createElement('span', null, 'Dark'),
}))

vi.mock('@/lib/theme', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}))

vi.mock('@/lib/i18n', () => ({
  useI18n: () => ({
    t: (key: string) =>
      ({
        'settings.appearance': 'Appearance',
        'settings.themeLight': 'Light',
        'settings.themeDark': 'Dark',
        'settings.themeSystem': 'System',
      })[key] ?? key,
  }),
}))

describe('ThemeToggle', () => {
  it('renders a system placeholder on the server to avoid hydration mismatch', async () => {
    const { ThemeToggle } = await import('@/components/app/theme-toggle')
    const ThemeToggleComponent = ThemeToggle as ComponentType<{ iconOnly?: boolean }>

    const markup = renderToStaticMarkup(createElement(ThemeToggleComponent, { iconOnly: true }))

    expect(markup).toContain('Appearance: System')
  })

  it('shows the resolved client theme after hydration', async () => {
    const { ThemeToggle } = await import('@/components/app/theme-toggle')
    const ThemeToggleComponent = ThemeToggle as ComponentType<{ iconOnly?: boolean }>

    render(createElement(ThemeToggleComponent, { iconOnly: true }))

    expect(await screen.findByRole('button', { name: 'Appearance: Dark' })).toBeTruthy()
  })
})
