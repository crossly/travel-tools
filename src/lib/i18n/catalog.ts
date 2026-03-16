import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/lib/site'
import { coreMessages } from '@/lib/i18n/catalog/core'
import { currencyMessages } from '@/lib/i18n/catalog/currency'
import { phrasesMessages } from '@/lib/i18n/catalog/phrases'
import { localAppsMessages } from '@/lib/i18n/catalog/local-apps'
import { packingMessages } from '@/lib/i18n/catalog/packing'
import { jetLagMessages } from '@/lib/i18n/catalog/jet-lag'
import { routeMetaMessages } from '@/lib/i18n/catalog/route-meta'
import { splitBillMessages } from '@/lib/i18n/catalog/split-bill'
import type { Messages } from '@/lib/i18n/types'

function mergeMessageCatalogs(catalogs: Messages[]) {
  const merged: Messages = {
    'zh-CN': {},
    'en-US': {},
  }

  for (const catalog of catalogs) {
    for (const locale of SUPPORTED_LOCALES) {
      Object.assign(merged[locale], catalog[locale] ?? {})
    }
  }

  return merged
}

export function validateMessageCatalog() {
  const mergedCatalog = mergeMessageCatalogs([
    coreMessages,
    routeMetaMessages,
    currencyMessages,
    phrasesMessages,
    localAppsMessages,
    packingMessages,
    jetLagMessages,
    splitBillMessages,
  ])
  const defaultKeys = new Set(Object.keys(mergedCatalog[DEFAULT_LOCALE]))
  const issues: string[] = []

  for (const locale of SUPPORTED_LOCALES) {
    const localeKeys = new Set(Object.keys(mergedCatalog[locale]))

    for (const key of defaultKeys) {
      if (!localeKeys.has(key)) {
        issues.push(`${locale}: missing "${key}"`)
      }
    }

    for (const key of localeKeys) {
      if (!defaultKeys.has(key)) {
        issues.push(`${locale}: unexpected "${key}"`)
      }
    }
  }

  return issues.sort()
}
