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

vi.mock('@/lib/i18n', () => ({
  registerMessages: () => {},
  useI18n: () => ({
    t: (key: string, values?: Record<string, string | number>) => ({
      'site.homeTitle': '旅行中真正常用的小工具',
      'site.homeDescription': '统一壳、统一交互、统一主题。现在覆盖汇率、短语卡、本地 App、旅行 AA、行李清单和倒时差。',
      'site.tagline': '旅行箱',
      'site.heroTitle': '旅行常用的汇率、短语和 AA 记账工具',
      'site.heroDescription': '一个站解决旅行中的汇率换算、现场沟通和多人分账，弱网和移动端也能顺手使用。',
      'site.heroEyebrow': '为移动中和弱网场景而做',
      'site.heroHighlights': '弱网优先 · 多币种 · 移动端顺手',
      'site.heroLabelRate': '汇率',
      'site.heroLabelSplit': 'AA 记账',
      'site.heroLabelSettle': '结算',
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
      'site.quickToolsLabel': '先打开这些',
      'site.toolBadgeCurrency': '汇率卡',
      'site.toolBadgeSplitBill': '同行卡',
      'site.toolBadgePacking': '打包卡',
      'site.toolBadgeLocalApps': '应用卡',
      'site.toolBadgeJetLag': '时区卡',
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

    render(createElement(HomePage, { locale: 'zh-CN', stats: HOME_PAGE_STATS }))

    expect(screen.queryByText('继续使用')).toBeNull()
    expect(screen.queryByText('查看工具')).toBeNull()
  })

  it('renders the updated hero copy', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN', stats: HOME_PAGE_STATS }))

    expect(screen.getByRole('heading', { level: 1, name: '旅行常用的汇率、短语和 AA 记账工具' })).toBeTruthy()
    expect(screen.getByText('一个站解决旅行中的汇率换算、现场沟通和多人分账，弱网和移动端也能顺手使用。')).toBeTruthy()
    expect(screen.getByText('弱网优先 · 多币种 · 移动端顺手')).toBeTruthy()
    expect(screen.getByText('6 人 · 2 个币种')).toBeTruthy()
    expect(screen.getByRole('heading', { name: '先处理会立刻影响决策的事' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: '再补足沟通、落地和恢复节奏' })).toBeTruthy()
  })

  it('surfaces three primary tool shortcuts inside the first-viewport rail', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN', stats: HOME_PAGE_STATS }))

    expect(screen.getByTestId('home-priority-rail')).toBeTruthy()
    expect(screen.getAllByTestId('home-priority-item')).toHaveLength(3)
    expect(screen.getByText('先打开这些')).toBeTruthy()
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
    expect(screen.getByText(/个国家包 · .*条短语/)).toBeTruthy()
  })

  it('renders the packing list tool card', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN', stats: HOME_PAGE_STATS }))

    expect(screen.getByText('行李清单')).toBeTruthy()
    expect(screen.getByText('4 个模板 · 本地保存')).toBeTruthy()
    expect(screen.getByText('汇率卡')).toBeTruthy()
    expect(screen.getByText('同行卡')).toBeTruthy()
    expect(screen.getByText('打包卡')).toBeTruthy()
    expect(screen.getByText('应用卡')).toBeTruthy()
    expect(screen.getByText('时区卡')).toBeTruthy()
  })

  it('renders the local apps tool card', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN', stats: HOME_PAGE_STATS }))

    expect(screen.getAllByText('本地 App')).toHaveLength(2)
    expect(screen.getByText('41 个国家已整理 · 41 国同步')).toBeTruthy()
  })

  it('renders the jet lag tool card', async () => {
    const { HomePage } = await import('@/features/site/home-page')

    render(createElement(HomePage, { locale: 'zh-CN', stats: HOME_PAGE_STATS }))

    expect(screen.getAllByText('倒时差')).toHaveLength(2)
    expect(screen.getByText('21 个时区 · 本地计算')).toBeTruthy()
  })
})
