// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const navigateMock = vi.fn()
const writeLastToolMock = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useLocation: () => ({ pathname: '/zh-CN/currency', search: '?keep=1' }),
  useNavigate: () => navigateMock,
}))

vi.mock('@/lib/i18n', () => ({
  useI18n: () => ({
    t: (key: string) =>
      ({
        'site.exploreTools': '查看工具',
        'tool.currency.name': '汇率换算',
        'tool.travelPhrases.name': '旅行短语卡',
        'tool.splitBill.name': '旅行 AA',
        'tool.packingList.name': '行李清单',
        'tool.jetLag.name': '倒时差',
        'tool.localApps.name': '本地 App',
      })[key] ?? key,
  }),
}))

vi.mock('@/lib/storage', () => ({
  writeLastTool: writeLastToolMock,
}))

describe('ToolSwitcher', () => {
  it('drops the current search string when switching tools', async () => {
    const { ToolSwitcher } = await import('@/components/app/tool-switcher')

    render(createElement(ToolSwitcher, { locale: 'zh-CN', activeTool: 'currency' }))

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'local-apps' } })

    expect(navigateMock).toHaveBeenCalledWith({ to: '/zh-cn/local-apps' })
    expect(navigateMock.mock.calls[0]?.[0]).not.toHaveProperty('search')
    expect(writeLastToolMock).toHaveBeenCalledWith('local-apps')
  })
})
