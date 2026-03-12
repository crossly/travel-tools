import { describe, expect, it, vi } from 'vitest'

vi.mock('@/styles.css?url', () => ({
  default: '/styles.css',
}))

describe('route heads', () => {
  it('uses localized app metadata in the root route head', async () => {
    const { Route } = await import('@/routes/__root')
    const head = (Route as unknown as { options: { head: (args: { loaderData?: { locale: 'zh-CN' | 'en-US' } }) => { meta: Array<Record<string, string>> } } }).options.head({
      loaderData: { locale: 'zh-CN' },
    })

    expect(head.meta).toEqual(expect.arrayContaining([
      expect.objectContaining({ title: '旅行箱' }),
      expect.objectContaining({ name: 'description', content: '统一壳、统一交互、统一主题。首发汇率换算和旅行 AA。' }),
    ]))
  })
})
