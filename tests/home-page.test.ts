// @vitest-environment jsdom
import { createElement } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children?: React.ReactNode } & Record<string, unknown>) => createElement('a', props, children),
}))

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: React.ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/lib/storage', () => ({
  readLastTool: () => null,
}))

vi.mock('@/lib/i18n', () => ({
  useI18n: () => ({
    t: (key: string, values?: Record<string, string | number>) => ({
      'site.homeTitle': '旅行中真正常用的小工具',
      'site.homeDescription': '统一壳、统一交互、统一主题。现在覆盖汇率、短语卡、本地 App、旅行 AA、行李清单和倒时差。',
      'site.tagline': '旅行箱',
      'site.heroTitle': '把旅行里的高频判断，装进一个随手可用的小站',
      'site.heroDescription': '在信号不稳、时间很赶、币种很杂的时候，也能快速看清数字、继续记账、完成结算。',
      'site.heroEyebrow': '为移动中和弱网场景而做',
      'site.heroHighlights': '弱网优先 · 多币种 · 移动端顺手',
      'site.primaryToolsBadge': '现场动作',
      'site.primaryToolsTitle': '先处理会立刻影响决策的事',
      'site.primaryToolsDescription': '付款前先看汇率，多人同行先记账，出发前先把必带的东西收好。这些工具都偏输入和执行，适合路上快速打开。',
      'site.companionToolsBadge': '出发前后',
      'site.companionToolsTitle': '再补足沟通、落地和恢复节奏',
      'site.companionToolsDescription': '短语卡适合现场沟通，本地 App 帮你先装对入口，倒时差适合落地后调整节奏，都是更偏落地后执行的小工具。',
      'site.exploreTools': '查看工具',
      'site.currencyPreview': '实时汇率，适合付款前快速确认',
      'site.phrasesPreview': '常用短语卡片，带发音，适合现场出示和播放',
      'site.phrasesMetric': `${values?.packs} 个国家包 · ${values?.phrases} 条短语`,
      'site.splitPreview': '多人出行记账与结算',
      'site.packingPreview': '出发前的打包清单，按模板快速开箱',
      'site.localAppsPreview': '先看一个国家里更值得装的衣食住行 App 和官方入口',
      'site.jetLagPreview': '跨时区飞行后的倒时差建议，适合落地后快速执行',
      'site.currencyMetric': '100 美元 → 728.42 人民币',
      'site.splitMetric': '6 人 · 2 个币种',
      'site.packingMetric': `${values?.count} 个模板 · 本地保存`,
      'site.localAppsMetric': `${values?.ready} 个国家已整理 · ${values?.tracked} 国同步`,
      'site.jetLagMetric': `${values?.count} 个时区 · 本地计算`,
      'site.heroMetricRate': '100 美元 → 728 人民币',
      'site.heroMetricSplit': '4 人 · 2 笔支出',
      'site.heroMetricSettle': '2 笔转账',
      'tool.currency.name': '汇率换算',
      'tool.travelPhrases.name': '旅行短语卡',
      'tool.splitBill.name': '旅行 AA',
      'tool.packingList.name': '行李清单',
      'tool.localApps.name': '本地 App',
      'tool.jetLag.name': '倒时差',
    })[key] ?? key,
  }),
}))

describe('HomePage', () => {
  it('does not render hero CTA buttons', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN' }))

    expect(screen.queryByText('继续使用')).toBeNull()
    expect(screen.queryByText('查看工具')).toBeNull()
  })

  it('renders the updated hero copy', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN' }))

    expect(screen.getByText('把旅行里的高频判断，装进一个随手可用的小站')).toBeTruthy()
    expect(screen.getByText('在信号不稳、时间很赶、币种很杂的时候，也能快速看清数字、继续记账、完成结算。')).toBeTruthy()
    expect(screen.getByText('弱网优先 · 多币种 · 移动端顺手')).toBeTruthy()
    expect(screen.getByText('6 人 · 2 个币种')).toBeTruthy()
    expect(screen.getByRole('heading', { name: '先处理会立刻影响决策的事' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: '再补足沟通、落地和恢复节奏' })).toBeTruthy()
  })

  it('does not render the future expansion card', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN' }))

    expect(screen.queryByText('后续还会继续扩展')).toBeNull()
    expect(screen.queryByText('未来可以继续接入退税、小费、打包等旅行工具。')).toBeNull()
  })

  it('renders the travel phrase tool card', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN' }))

    expect(screen.getAllByText('旅行短语卡')).toHaveLength(2)
    expect(screen.getByText(/个国家包 · .*条短语/)).toBeTruthy()
  })

  it('renders the packing list tool card', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN' }))

    expect(screen.getAllByText('行李清单')).toHaveLength(2)
    expect(screen.getByText('4 个模板 · 本地保存')).toBeTruthy()
  })

  it('renders the local apps tool card', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN' }))

    expect(screen.getAllByText('本地 App')).toHaveLength(2)
    expect(screen.getByText('41 个国家已整理 · 41 国同步')).toBeTruthy()
  })

  it('renders the jet lag tool card', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN' }))

    expect(screen.getAllByText('倒时差')).toHaveLength(2)
    expect(screen.getByText('21 个时区 · 本地计算')).toBeTruthy()
  })

})
