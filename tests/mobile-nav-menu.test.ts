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
        'site.mobileBrowse': '导航',
        'site.mobileTools': '工具',
        'site.mobilePreferences': '偏好',
        'nav.home': '首页',
        'nav.currency': '汇率',
        'nav.splitBill': 'AA',
        'nav.settings': '设置',
        'settings.language': '语言',
        'settings.theme': '主题',
        'settings.themeLight': '亮色',
        'settings.themeDark': '暗色',
        'settings.themeSystem': '跟随系统',
      })[key] ?? key,
  }),
}))

describe('MobileNavMenu', () => {
  it('opens menu and exposes accordion sections for tools and preferences', async () => {
    const { MobileNavMenu } = await import('@/components/app/mobile-nav-menu')

    render(
      createElement(MobileNavMenu, {
        locale: 'zh-CN',
        activeTool: 'currency',
        title: '汇率',
      }),
    )

    fireEvent.click(screen.getByRole('button', { name: '菜单' }))

    expect(screen.getByRole('button', { name: '导航' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '工具' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '偏好' })).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: '偏好' }))
    fireEvent.click(screen.getByRole('button', { name: '暗色' }))
    fireEvent.click(screen.getByRole('button', { name: 'English' }))

    expect(setThemeMock).toHaveBeenCalledWith('dark')
    expect(setLocaleMock).toHaveBeenCalledWith('en-US')
  })
})
