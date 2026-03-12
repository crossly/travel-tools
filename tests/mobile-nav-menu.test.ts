// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const navigateMock = vi.fn()
const setThemeMock = vi.fn()
const setLocaleMock = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children?: React.ReactNode } & Record<string, unknown>) => createElement('a', props, children),
  useLocation: () => ({ pathname: '/zh-CN/tools/currency', search: '' }),
  useNavigate: () => navigateMock,
}))

vi.mock('@/lib/theme', () => ({
  useTheme: () => ({ theme: 'system', setTheme: setThemeMock }),
}))

vi.mock('@/lib/i18n', () => ({
  useI18n: () => ({
    locale: 'zh-CN',
    setLocale: setLocaleMock,
    t: (key: string) =>
      ({
        'app.name': 'Travel Tools',
        'site.mobileMenu': '菜单',
        'site.mobileCloseMenu': '关闭菜单',
        'nav.home': '首页',
        'nav.currency': '汇率',
        'nav.splitBill': 'AA',
        'nav.settings': '设置',
        'settings.language': '语言',
        'settings.appearance': '外观',
        'settings.themeLight': '亮色',
        'settings.themeDark': '暗色',
      })[key] ?? key,
  }),
}))

describe('MobileNavMenu', () => {
  it('opens a flat menu with nav items and top-level controls', async () => {
    const { MobileNavMenu } = await import('@/components/app/mobile-nav-menu')

    render(
      createElement(MobileNavMenu, {
        locale: 'zh-CN',
        activeTool: 'currency',
        title: '汇率',
      }),
    )

    fireEvent.click(screen.getByRole('button', { name: '菜单' }))

    expect(screen.getByRole('button', { name: '首页' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '汇率' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'AA' })).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: '暗色' }))
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en-US' } })

    expect(setThemeMock).toHaveBeenCalledWith('dark')
    expect(setLocaleMock).toHaveBeenCalledWith('en-US')
  })
})
