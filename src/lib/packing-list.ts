import { PACKING_TEMPLATE_DEFINITIONS } from '@/data/packing-list/templates'
import type { PackingItem, PackingList, PackingSection, PackingTemplate } from '@/lib/types'

export const PACKING_ESSENTIAL_ITEM_KEYS = [
  'packing.item.passport',
  'packing.item.visa',
  'packing.item.cards',
  'packing.item.charger',
  'packing.item.adapter',
  'packing.item.dailyMeds',
] as const

export function listPackingTemplates(): PackingTemplate[] {
  return PACKING_TEMPLATE_DEFINITIONS.map(({ id, nameKey, descriptionKey }) => ({
    id,
    nameKey,
    descriptionKey,
  }))
}

export function getPackingTemplate(templateId: string) {
  return PACKING_TEMPLATE_DEFINITIONS.find((template) => template.id === templateId) ?? null
}

export function createPackingListFromTemplate({
  templateId,
  name,
  resolveLabel,
}: {
  templateId: string
  name: string
  resolveLabel: (key: string) => string
}): PackingList {
  const template = getPackingTemplate(templateId)
  if (!template) {
    throw new Error(`Unknown packing template: ${templateId}`)
  }

  const now = new Date().toISOString()

  return {
    id: createId('packing-list'),
    name,
    templateId,
    createdAt: now,
    updatedAt: now,
    sections: template.sections.map((section) => ({
      id: section.id,
      items: section.items.map((item) => ({
        id: createId(section.id),
        label: resolveLabel(item.builtinKey),
        builtinKey: item.builtinKey,
        quantity: item.quantity ?? 1,
        checked: false,
        note: '',
        builtIn: true,
      })),
    })),
  }
}

export function countPackingProgress(list: PackingList | null) {
  const items = list?.sections.flatMap((section) => section.items) ?? []
  const packed = items.filter((item) => item.checked).length
  const total = items.length
  return {
    total,
    packed,
    remaining: Math.max(total - packed, 0),
  }
}

export function getEssentialPackingItems(list: PackingList | null) {
  if (!list) return []

  const itemMap = new Map<string, PackingItem>()

  for (const section of list.sections) {
    for (const item of section.items) {
      if (item.builtinKey && PACKING_ESSENTIAL_ITEM_KEYS.includes(item.builtinKey as typeof PACKING_ESSENTIAL_ITEM_KEYS[number])) {
        itemMap.set(item.builtinKey, item)
      }
    }
  }

  return PACKING_ESSENTIAL_ITEM_KEYS
    .map((key) => itemMap.get(key))
    .filter((item): item is PackingItem => Boolean(item))
}

export function getPackingItemLabel(
  item: Pick<PackingItem, 'label' | 'builtinKey'>,
  resolveBuiltin: (key: string) => string,
) {
  return item.builtinKey ? resolveBuiltin(item.builtinKey) : item.label
}

export function updatePackingListTimestamp(list: PackingList): PackingList {
  return {
    ...list,
    updatedAt: new Date().toISOString(),
  }
}

export function replacePackingSection(list: PackingList, nextSection: PackingSection): PackingList {
  return updatePackingListTimestamp({
    ...list,
    sections: list.sections.map((section) => (section.id === nextSection.id ? nextSection : section)),
  })
}

export function createCustomPackingItem(label: string): PackingItem {
  return {
    id: createId('packing-item'),
    label,
    builtinKey: null,
    quantity: 1,
    checked: false,
    note: '',
    builtIn: false,
  }
}

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}
