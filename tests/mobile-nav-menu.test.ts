// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

const navigateMock = vi.fn()
const setThemeMock = vi.fn()
const setLocaleMock = vi.fn()

beforeAll(() => {
  if (!HTMLElement.prototype.scrollIntoView) {
    HTMLElement.prototype.scrollIntoView = () => {}
  }
  if (!HTMLElement.prototype.hasPointerCapture) {
    HTMLElement.prototype.hasPointerCapture = () => false
  }
  if (!HTMLElement.prototype.setPointerCapture) {
    HTMLElement.prototype.setPointerCapture = () => {}
  }
  if (!HTMLElement.prototype.releasePointerCapture) {
    HTMLElement.prototype.releasePointerCapture = () => {}
  }
})

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, ...props }: { children?: React.ReactNode; to?: string } & Record<string, unknown>) =>
    createElement('a', { ...props, href: typeof to === 'string' ? to : '#' }, children),
  useLocation: () => ({ pathname: '/zh-CN/currency', search: '' }),
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
        'app.name': '旅行箱',
        'site.mobileMenu': '菜单',
        'site.mobileCloseMenu': '关闭菜单',
        'nav.home': '首页',
        'nav.currency': '汇率',
        'nav.travelPhrases': '短语卡',
        'nav.localApps': '本地 App',
        'nav.splitBill': 'AA',
        'nav.packingList': '行李',
        'nav.jetLag': '时差',
        'nav.settings': '设置',
        'settings.language': '语言',
        'settings.languageChinese': '中文',
        'settings.languageEnglish': 'English',
        'settings.appearance': '外观',
        'settings.themeLight': '亮色',
        'settings.themeDark': '暗色',
      })[key] ?? key,
  }),
}))

vi.mock('@/components/app/locale-switcher', () => ({
  LocaleSwitcher: ({
    className,
    onAfterChange,
  }: {
    className?: string
    onAfterChange?: () => void
  }) =>
    createElement(
      'button',
      {
        type: 'button',
        className,
        'aria-label': '语言',
        onClick: () => {
          setLocaleMock('en-US')
          onAfterChange?.()
        },
      },
      'English',
    ),
}))

vi.mock('@/components/app/theme-toggle', () => ({
  ThemeToggle: ({
    className,
    onAfterChange,
  }: {
    className?: string
    onAfterChange?: () => void
  }) =>
    createElement(
      'button',
      {
        type: 'button',
        className,
        'aria-label': '外观',
        onClick: () => {
          setThemeMock('dark')
          onAfterChange?.()
        },
      },
      '暗色',
    ),
}))

describe('MobileNavMenu', () => {
  it('shows quick-switch tool links before opening the full menu and closes after theme or locale changes', async () => {
    const { MobileNavMenu } = await import('@/components/app/mobile-nav-menu')

    render(
      createElement(MobileNavMenu, {
        locale: 'zh-CN',
        activeTool: 'currency',
      }),
    )

    expect(screen.getByRole('link', { name: '汇率' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'AA' })).toBeTruthy()
    expect(screen.getByRole('link', { name: '行李' })).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: '菜单' }))

    expect(screen.getByRole('link', { name: '首页' })).toBeTruthy()
    expect(screen.getByRole('link', { name: '短语卡' })).toBeTruthy()
    expect(screen.getByRole('link', { name: '本地 App' })).toBeTruthy()
    expect(screen.getByRole('link', { name: '时差' })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: '外观' }))
    expect(screen.queryByTestId('mobile-nav-panel')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: '菜单' }))
    fireEvent.click(screen.getByRole('button', { name: '语言' }))
    expect(screen.queryByTestId('mobile-nav-panel')).toBeNull()

    expect(setThemeMock).toHaveBeenCalledWith('dark')
    expect(setLocaleMock).toHaveBeenCalledWith('en-US')
  })
})
