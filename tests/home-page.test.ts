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
    t: (key: string) => ({
      'site.homeTitle': '旅行箱',
      'site.homeDescription': '旅行中真正常用的小工具：汇率换算、旅行短语卡、AA 记账。适合弱网、移动端和多币种出行场景。',
      'site.tagline': '旅行箱',
      'site.heroTitle': '旅行常用的汇率、短语和 AA 记账工具',
      'site.heroDescription': '一个站解决旅行中的汇率换算、现场沟通和多人分账，弱网和移动端也能顺手使用。',
      'site.heroEyebrow': '为移动中和弱网场景而做',
      'site.heroHighlights': '弱网优先 · 多币种 · 移动端顺手',
      'site.heroLabelRate': '汇率',
      'site.heroLabelSplit': 'AA 记账',
      'site.heroLabelSettle': '结算',
      'site.exploreTools': '查看工具',
      'site.currencyPreview': '实时汇率，适合付款前快速确认',
      'site.phrasesPreview': '常用短语卡片，带发音，适合现场出示和播放',
      'site.phrasesMetric': '20 个国家包 · 720 条短语',
      'site.splitPreview': '多人出行记账与结算',
      'site.currencyMetric': '100 美元 → 728.42 人民币',
      'site.splitMetric': '6 人 · 2 个币种',
      'site.heroMetricRate': '100 美元 → 728 人民币',
      'site.heroMetricSplit': '4 人 · 2 笔支出',
      'site.heroMetricSettle': '2 笔转账',
      'tool.currency.name': '汇率换算',
      'tool.travelPhrases.name': '旅行短语卡',
      'tool.splitBill.name': '旅行 AA',
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

    expect(screen.getByRole('heading', { level: 1, name: '旅行常用的汇率、短语和 AA 记账工具' })).toBeTruthy()
    expect(screen.getByText('一个站解决旅行中的汇率换算、现场沟通和多人分账，弱网和移动端也能顺手使用。')).toBeTruthy()
    expect(screen.getByText('弱网优先 · 多币种 · 移动端顺手')).toBeTruthy()
    expect(screen.getByText('6 人 · 2 个币种')).toBeTruthy()
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
    expect(screen.getByText('20 个国家包 · 720 条短语')).toBeTruthy()
  })
})
