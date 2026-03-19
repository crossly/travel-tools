// @vitest-environment jsdom
import { createElement } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const HOME_PAGE_STATS = {
  phrasePackCount: 12,
  totalPhraseCount: 240,
  packingTemplateCount: 4,
  localAppsReadyCount: 41,
  localAppsTrackedCount: 41,
  timeZoneCount: 21,
}

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, ...props }: { children?: React.ReactNode; to?: string } & Record<string, unknown>) =>
    createElement('a', { ...props, href: typeof to === 'string' ? to : '#' }, children),
}))

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: React.ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/lib/storage', () => ({
  readLastTool: () => null,
}))

vi.mock('@/data/packing-list/templates', () => {
  throw new Error('HomePage should receive packing metrics instead of importing template definitions')
})

vi.mock('@/lib/local-apps', () => {
  throw new Error('HomePage should receive local app metrics instead of importing local app data')
})

vi.mock('@/lib/travel-phrases', () => {
  throw new Error('HomePage should receive phrase metrics instead of importing phrase data')
})

vi.mock('@/lib/jet-lag', () => {
  throw new Error('HomePage should receive jet lag metrics instead of importing timezone data')
})

vi.mock('@/lib/i18n', async () => {
  const actual = await vi.importActual<typeof import('@/lib/i18n')>('@/lib/i18n')

  return {
    ...actual,
    useI18n: () => ({
      t: (key: string, values?: Record<string, string | number>) => actual.translate('zh-CN', key, values),
    }),
  }
})

describe('HomePage', () => {
  it('does not render hero CTA buttons', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN', stats: HOME_PAGE_STATS }))

    expect(screen.queryByText('继续使用')).toBeNull()
    expect(screen.queryByText('查看工具')).toBeNull()
  })

  it('renders the updated hero copy', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN', stats: HOME_PAGE_STATS }))

    expect(screen.getByRole('heading', { level: 1, name: '旅行中真正常用的小工具' })).toBeTruthy()
    expect(screen.queryByRole('heading', { level: 1, name: '旅行常用的汇率、短语和 AA 记账工具' })).toBeNull()
    expect(screen.queryByText('一个站解决旅行中的汇率换算、现场沟通和多人分账，弱网和移动端也能顺手使用。')).toBeNull()
    expect(screen.queryByText('弱网优先 · 多币种 · 移动端顺手')).toBeNull()
    expect(screen.getByText('付款前先看汇率')).toBeTruthy()
    expect(screen.getByText('同行记账时先打开')).toBeTruthy()
    expect(screen.getByRole('heading', { name: '先处理会立刻影响决策的事' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: '再补足沟通、落地和恢复节奏' })).toBeTruthy()
  })

  it('surfaces three primary tool shortcuts inside the first-viewport rail', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN', stats: HOME_PAGE_STATS }))

    expect(screen.getByTestId('home-priority-rail')).toBeTruthy()
    expect(screen.getAllByTestId('home-priority-item')).toHaveLength(3)
    expect(screen.queryByText('先打开这些')).toBeNull()
  })

  it('renders companion tools in an editorial list section', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN', stats: HOME_PAGE_STATS }))

    expect(screen.getByTestId('home-companion-list')).toBeTruthy()
    expect(screen.getAllByTestId('home-companion-item')).toHaveLength(3)
  })

  it('does not render the future expansion card', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN', stats: HOME_PAGE_STATS }))

    expect(screen.queryByText('后续还会继续扩展')).toBeNull()
    expect(screen.queryByText('未来可以继续接入退税、小费、打包等旅行工具。')).toBeNull()
  })

  it('renders the travel phrase tool card', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN', stats: HOME_PAGE_STATS }))

    expect(screen.getAllByText('旅行短语卡')).toHaveLength(2)
    expect(screen.getByText('现场沟通时先打开')).toBeTruthy()
  })

  it('does not surface the paused visa entry and tipping tools on the homepage', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN', stats: HOME_PAGE_STATS }))

    expect(screen.queryByText('签证 / 入境')).toBeNull()
    expect(screen.queryByText('小费速查')).toBeNull()
  })

  it('renders the packing list tool card', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN', stats: HOME_PAGE_STATS }))

    expect(screen.getByText('行李清单')).toBeTruthy()
    expect(screen.getByText('出发前先对照清单')).toBeTruthy()
    expect(screen.getByText('付款前先看汇率')).toBeTruthy()
    expect(screen.getByText('同行记账时先打开')).toBeTruthy()
    expect(screen.getByText('打包')).toBeTruthy()
    expect(screen.getByText('应用')).toBeTruthy()
    expect(screen.getByText('时区')).toBeTruthy()
  })

  it('renders the local apps tool card', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN', stats: HOME_PAGE_STATS }))

    expect(screen.getAllByText('本地 App')).toHaveLength(2)
    expect(screen.getByText('落地前先看官方入口')).toBeTruthy()
  })

  it('renders the jet lag tool card', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN', stats: HOME_PAGE_STATS }))

    expect(screen.getAllByText('倒时差')).toHaveLength(2)
    expect(screen.getByText('落地后先调作息')).toBeTruthy()
  })
})
