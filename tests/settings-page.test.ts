// @vitest-environment jsdom
import { createElement } from 'react'
import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/components/app/app-shell', () => ({
  AppShell: ({ children }: { children?: React.ReactNode }) => createElement('div', null, children),
}))

vi.mock('@/components/app/theme-toggle', () => ({
  ThemeToggle: () => createElement('div', null, 'theme-toggle'),
}))

vi.mock('@/components/app/locale-switcher', () => ({
  LocaleSwitcher: () => createElement('div', null, 'locale-switcher'),
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
  registerMessages: vi.fn(),
  useI18n: () => ({
    t: (key: string) => ({
      'settings.title': '设置',
      'settings.preferencesTitle': '偏好设置',
      'settings.preferencesDescription': '语言和外观会立即生效。',
      'settings.language': '界面语言',
      'settings.languageDescription': '切换界面语言。',
      'settings.appearance': '外观主题',
      'settings.theme': '主题',
      'settings.themeDescription': '选择亮色、暗色或跟随系统。',
      'settings.tripDataTitle': '行程数据',
      'settings.tripDataDescription': '导出当前行程快照，或把 JSON 恢复到当前行程。',
      'settings.tripReadyBadge': '已连接当前行程',
      'settings.tripRequiredHint': '先在 AA 记账里创建或打开一个当前行程，再使用导入或导出。',
      'settings.tripRequiredActionHint': '当前没有行程：请先在 AA 记账创建或打开一个当前行程。',
      'settings.exportCurrentTrip': '导出当前行程',
      'settings.exportDescription': '导出当前行程为 JSON 备份。',
      'settings.exportAction': '导出',
      'settings.exportPending': '正在导出',
      'settings.importTitle': '导入 JSON',
      'settings.importDescription': '把导出的 JSON 恢复到当前行程。',
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
  afterEach(() => {
    exportTrip.mockReset()
    importTrip.mockReset()
    readActiveTripId.mockReset()
    readActiveTripId.mockReturnValue('trip_123')
  })

  it('renders only site-level preferences and does not touch trip helpers', async () => {
    const { SettingsPage } = await import('@/features/site/settings-page')

    render(createElement(SettingsPage, { locale: 'zh-CN' }))

    expect(screen.getByRole('heading', { name: '偏好设置' })).toBeTruthy()
    expect(screen.getByText('界面语言')).toBeTruthy()
    expect(screen.getByText('locale-switcher')).toBeTruthy()
    expect(screen.queryByText('行程数据')).toBeNull()
    expect(screen.queryByRole('button', { name: '导出' })).toBeNull()
    expect(screen.queryByRole('button', { name: '导入' })).toBeNull()
    expect(readActiveTripId).not.toHaveBeenCalled()
    expect(exportTrip).not.toHaveBeenCalled()
    expect(importTrip).not.toHaveBeenCalled()
  })
})
