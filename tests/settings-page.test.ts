// @vitest-environment jsdom
import { createElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: React.ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/components/app/theme-toggle', () => ({
  ThemeToggle: () => createElement('div', null, 'theme-toggle'),
}))

const exportTrip = vi.fn()
const importTrip = vi.fn()

vi.mock('@/lib/api/client', () => ({
  exportTrip,
  importTrip,
}))

const readActiveTripId = vi.fn(() => 'trip_123')

vi.mock('@/lib/storage', () => ({
  readActiveTripId,
}))

vi.mock('@/lib/i18n', () => ({
  useI18n: () => ({
    t: (key: string) => ({
      'settings.title': '设置',
      'settings.appearance': '外观',
      'settings.theme': '主题',
      'settings.exportCurrentTrip': '导出当前行程',
      'settings.exportPending': '正在导出',
      'settings.importTitle': '导入 JSON',
      'settings.importPlaceholder': '粘贴导出的 JSON',
      'settings.importAction': '导入',
      'settings.importPending': '正在导入',
      'settings.exportSuccess': '导出成功',
      'settings.importSuccess': '导入成功',
      'settings.noTripToExport': '没有可导出的当前行程',
      'settings.noTripToImport': '没有可导入的当前行程',
    })[key] ?? key,
    tError: (code: string) => `错误:${code}`,
  }),
}))

describe('SettingsPage', () => {
  it('shows an inline field error when import content is empty', async () => {
    const { SettingsPage } = await import('@/features/site/settings-page')

    render(createElement(SettingsPage, { locale: 'zh-CN' }))
    fireEvent.click(screen.getByRole('button', { name: '导入' }))

    expect(await screen.findByText('错误:MISSING_IMPORT_CONTENT')).toBeTruthy()
  })

  it('shows an inline field error when import json is invalid', async () => {
    importTrip.mockRejectedValueOnce(new Error('INVALID_JSON_FORMAT'))
    const { SettingsPage } = await import('@/features/site/settings-page')

    render(createElement(SettingsPage, { locale: 'zh-CN' }))
    fireEvent.change(screen.getByPlaceholderText('粘贴导出的 JSON'), { target: { value: '{bad json' } })
    fireEvent.click(screen.getByRole('button', { name: '导入' }))

    expect(await screen.findByText('错误:INVALID_JSON_FORMAT')).toBeTruthy()
  })

  it('shows a unified error status when export fails', async () => {
    exportTrip.mockRejectedValueOnce(new Error('REQUEST_FAILED'))
    const { SettingsPage } = await import('@/features/site/settings-page')

    render(createElement(SettingsPage, { locale: 'zh-CN' }))
    fireEvent.click(screen.getByRole('button', { name: '导出当前行程' }))

    expect(await screen.findByText('错误:REQUEST_FAILED')).toBeTruthy()
  })

  it('shows local warning state when no active trip exists for import', async () => {
    readActiveTripId.mockReturnValueOnce('')
    const { SettingsPage } = await import('@/features/site/settings-page')

    render(createElement(SettingsPage, { locale: 'zh-CN' }))
    fireEvent.change(screen.getByPlaceholderText('粘贴导出的 JSON'), { target: { value: '{"ok":true}' } })
    fireEvent.click(screen.getByRole('button', { name: '导入' }))

    expect(await screen.findByText('没有可导入的当前行程')).toBeTruthy()
  })
})
