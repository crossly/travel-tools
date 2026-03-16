import type { Messages } from '@/lib/i18n/types'

export const settingsMessages: Messages = {
  'zh-CN': {
    'settings.exportCurrentTrip': '导出当前行程',
    'settings.exportAction': '导出',
    'settings.exportPending': '正在导出',
    'settings.exportSuccess': 'JSON 已下载',
    'settings.noTripToExport': '没有可导出的当前行程',
    'settings.importTitle': '导入 JSON',
    'settings.importPlaceholder': '粘贴导出的 JSON',
    'settings.importAction': '导入',
    'settings.importPending': '正在导入',
    'settings.importSuccess': '导入成功',
    'settings.noTripToImport': '没有可导入的当前行程',
  },
  'en-US': {
    'settings.exportCurrentTrip': 'Export current trip',
    'settings.exportAction': 'Export',
    'settings.exportPending': 'Exporting',
    'settings.exportSuccess': 'JSON downloaded',
    'settings.noTripToExport': 'No active trip to export',
    'settings.importTitle': 'Import JSON',
    'settings.importPlaceholder': 'Paste exported JSON',
    'settings.importAction': 'Import',
    'settings.importPending': 'Importing',
    'settings.importSuccess': 'Imported',
    'settings.noTripToImport': 'No active trip to import',
  },
}
