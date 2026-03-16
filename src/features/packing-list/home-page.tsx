import '@/lib/i18n/messages/packing'
import { useEffect, useState } from 'react'
import { Briefcase, Check, Circle, ListChecks, Plus } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { ConfirmActionDialog } from '@/components/app/confirm-action-dialog'
import { InlineStatus } from '@/components/app/inline-status'
import { FieldGroup } from '@/components/app/field-group'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  countPackingProgress,
  createCustomPackingItem,
  createPackingListFromTemplate,
  getEssentialPackingItems,
  getPackingItemLabel,
  listPackingTemplates,
  replacePackingSection,
} from '@/lib/packing-list'
import { useI18n } from '@/lib/i18n'
import {
  clearActivePackingListId,
  readActivePackingListId,
  readPackingLists,
  writeActivePackingListId,
  writeLastTool,
  writePackingLists,
} from '@/lib/storage'
import { cn } from '@/lib/utils'
import type { Locale, PackingList, PackingSectionId } from '@/lib/types'

const sectionIds: PackingSectionId[] = ['documents', 'clothing', 'toiletries', 'electronics', 'medicine', 'misc']
const PACKING_PERSIST_DELAY_MS = 250

function createEmptyDrafts() {
  return {
    documents: '',
    clothing: '',
    toiletries: '',
    electronics: '',
    medicine: '',
    misc: '',
  } satisfies Record<PackingSectionId, string>
}

export function PackingListPage({ locale }: { locale: Locale }) {
  const { t } = useI18n()
  const templates = listPackingTemplates()
  const [lists, setLists] = useState<PackingList[]>([])
  const [activeListId, setActiveListId] = useState<string | null>(null)
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0]?.id ?? 'weekend')
  const [newListName, setNewListName] = useState('')
  const [itemDrafts, setItemDrafts] = useState<Record<PackingSectionId, string>>(createEmptyDrafts)
  const [hydrated, setHydrated] = useState(false)
  const [status, setStatus] = useState<{ tone: 'warning'; title: string; description?: string } | null>(null)

  useEffect(() => {
    writeLastTool('packing-list')
    const storedLists = readPackingLists()
    const storedActiveId = readActivePackingListId()
    const nextActiveId = storedLists.find((list) => list.id === storedActiveId)?.id ?? storedLists[0]?.id ?? null

    setLists(storedLists)
    setActiveListId(nextActiveId)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    const timeoutId = window.setTimeout(() => {
      writePackingLists(lists)
      if (activeListId) {
        writeActivePackingListId(activeListId)
      } else {
        clearActivePackingListId()
      }
    }, PACKING_PERSIST_DELAY_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [activeListId, hydrated, lists])

  const activeList = lists.find((list) => list.id === activeListId) ?? null
  const stats = countPackingProgress(activeList)
  const essentials = getEssentialPackingItems(activeList)

  function updateActiveList(updater: (list: PackingList) => PackingList) {
    setLists((current) => current.map((list) => (list.id === activeListId ? updater(list) : list)))
  }

  function onCreateList() {
    const trimmedName = newListName.trim()
    if (!trimmedName) {
      setStatus({ tone: 'warning', title: t('packing.nameRequired') })
      return
    }

    const nextList = createPackingListFromTemplate({
      templateId: selectedTemplateId,
      name: trimmedName,
      resolveLabel: (key) => t(key),
    })

    setLists((current) => [nextList, ...current])
    setActiveListId(nextList.id)
    setNewListName('')
    setItemDrafts(createEmptyDrafts())
    setStatus(null)
  }

  function toggleItem(sectionId: PackingSectionId, itemId: string) {
    updateActiveList((list) => {
      const section = list.sections.find((entry) => entry.id === sectionId)
      if (!section) return list

      return replacePackingSection(list, {
        ...section,
        items: section.items.map((item) => (
          item.id === itemId
            ? { ...item, checked: !item.checked }
            : item
        )),
      })
    })
  }

  function updateItemQuantity(sectionId: PackingSectionId, itemId: string, rawValue: string) {
    const quantity = Math.max(1, Number.parseInt(rawValue || '1', 10) || 1)
    updateActiveList((list) => {
      const section = list.sections.find((entry) => entry.id === sectionId)
      if (!section) return list

      return replacePackingSection(list, {
        ...section,
        items: section.items.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
      })
    })
  }

  function updateItemNote(sectionId: PackingSectionId, itemId: string, note: string) {
    updateActiveList((list) => {
      const section = list.sections.find((entry) => entry.id === sectionId)
      if (!section) return list

      return replacePackingSection(list, {
        ...section,
        items: section.items.map((item) => (item.id === itemId ? { ...item, note } : item)),
      })
    })
  }

  function addCustomItem(sectionId: PackingSectionId) {
    const label = itemDrafts[sectionId].trim()
    if (!label) {
      setStatus({ tone: 'warning', title: t('packing.itemNameRequired') })
      return
    }

    updateActiveList((list) => {
      const section = list.sections.find((entry) => entry.id === sectionId)
      if (!section) return list

      return replacePackingSection(list, {
        ...section,
        items: [...section.items, createCustomPackingItem(label)],
      })
    })

    setItemDrafts((current) => ({ ...current, [sectionId]: '' }))
    setStatus(null)
  }

  function removeCustomItem(sectionId: PackingSectionId, itemId: string) {
    updateActiveList((list) => {
      const section = list.sections.find((entry) => entry.id === sectionId)
      if (!section) return list

      return replacePackingSection(list, {
        ...section,
        items: section.items.filter((item) => item.id !== itemId),
      })
    })
  }

  return (
    <AppShell locale={locale} title={t('packing.title')} description={t('packing.description')} activeTool="packing-list">
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-balance">{t('packing.createTitle')}</CardTitle>
            <CardDescription className="text-pretty">{t('packing.createDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {lists.length ? (
              <FieldGroup label={t('packing.currentList')}>
                <select
                  value={activeListId ?? ''}
                  onChange={(event) => setActiveListId(event.target.value || null)}
                  className="h-11 w-full rounded-xl border border-border bg-[var(--input)] px-3 text-sm text-foreground shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {lists.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  ))}
                </select>
              </FieldGroup>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-2">
              {templates.map((template) => {
                const selected = template.id === selectedTemplateId
                return (
                  <button
                    key={template.id}
                    type="button"
                    className={cn(
                      'rounded-2xl border border-border bg-[color:var(--surface-floating)] p-4 text-left shadow-sm transition-colors',
                      selected && 'border-primary/40 bg-primary/10',
                    )}
                    onClick={() => setSelectedTemplateId(template.id)}
                  >
                    <p className="font-semibold text-foreground">{t(template.nameKey)}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t(template.descriptionKey)}</p>
                  </button>
                )
              })}
            </div>

            <FieldGroup label={t('packing.listName')} error={status?.tone === 'warning' ? status.title : undefined}>
              <Input
                value={newListName}
                placeholder={t('packing.listNamePlaceholder')}
                onChange={(event) => {
                  setNewListName(event.target.value)
                  if (status?.tone === 'warning') setStatus(null)
                }}
              />
            </FieldGroup>

            <Button type="button" size="lg" className="w-full" onClick={onCreateList}>
              <Plus className="h-4 w-4" />
              {t('packing.createAction')}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-balance">{t('packing.essentialsTitle')}</CardTitle>
            <CardDescription className="text-pretty">{t('packing.essentialsDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard icon={ListChecks} label={t('packing.statsTotal')} value={stats.total} />
              <StatCard icon={Check} label={t('packing.statsPacked')} value={stats.packed} />
              <StatCard icon={Circle} label={t('packing.statsRemaining')} value={stats.remaining} />
            </div>

            {!activeList ? (
              <InlineStatus tone="default" title={t('packing.emptyTitle')} description={t('packing.emptyDescription')} />
            ) : (
              <div className="grid gap-3">
                {essentials.map((item) => {
                  const packed = item.checked
                  return (
                    <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-[color:var(--surface-floating)] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={cn('flex size-10 items-center justify-center rounded-full border', packed ? 'border-primary/30 bg-primary/10 text-primary' : 'border-border text-muted-foreground')}>
                          {packed ? <Check className="size-4" /> : <Briefcase className="size-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{getPackingItemLabel(item, (key) => t(key))}</p>
                          <p className="text-sm text-muted-foreground">{packed ? t('packing.essentialsReady') : t('packing.essentialsMissing')}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant={packed ? 'secondary' : 'outline'}
                        size="sm"
                        onClick={() => {
                          const section = activeList.sections.find((entry) => entry.items.some((entryItem) => entryItem.id === item.id))
                          if (section) toggleItem(section.id, item.id)
                        }}
                      >
                        {packed ? t('packing.markUnpacked') : t('packing.markPacked')}
                      </Button>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {status?.tone === 'warning' ? <InlineStatus tone="warning" title={status.title} /> : null}

      {activeList ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {sectionIds.map((sectionId) => {
            const section = activeList.sections.find((entry) => entry.id === sectionId)
            const items = section?.items ?? []

            return (
              <Card key={sectionId}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardTitle className="text-balance">{t(`packing.section.${sectionId}`)}</CardTitle>
                      <CardDescription>
                        <span className="tabular-nums">{items.filter((item) => item.checked).length}</span> / <span className="tabular-nums">{items.length}</span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {items.length ? items.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        'grid gap-3 rounded-2xl border border-border bg-[color:var(--surface-floating)] p-4 md:grid-cols-[auto_minmax(0,1fr)_5.5rem_minmax(0,1fr)]',
                        !item.builtIn && 'md:grid-cols-[auto_minmax(0,1fr)_5.5rem_minmax(0,1fr)_auto]',
                      )}
                    >
                      <Button
                        type="button"
                        variant={item.checked ? 'default' : 'outline'}
                        size="icon"
                        className="rounded-full"
                        aria-label={item.checked ? t('packing.markUnpacked') : t('packing.markPacked')}
                        onClick={() => toggleItem(sectionId, item.id)}
                      >
                        {item.checked ? <Check className="size-4" /> : <Circle className="size-4" />}
                      </Button>
                      <div className="min-w-0">
                        <p className={cn('font-medium text-foreground', item.checked && 'text-muted-foreground line-through')}>
                          {getPackingItemLabel(item, (key) => t(key))}
                        </p>
                      </div>
                      <FieldGroup label={t('packing.quantity')} className="min-w-0">
                        <Input
                          value={String(item.quantity)}
                          inputMode="numeric"
                          className="tabular-nums"
                          onChange={(event) => updateItemQuantity(sectionId, item.id, event.target.value)}
                        />
                      </FieldGroup>
                      <FieldGroup label={t('packing.note')} className="min-w-0">
                        <Input
                          value={item.note}
                          placeholder={t('packing.notePlaceholder')}
                          onChange={(event) => updateItemNote(sectionId, item.id, event.target.value)}
                        />
                      </FieldGroup>
                      {!item.builtIn ? (
                        <div className="flex items-end justify-end">
                          <ConfirmActionDialog
                            triggerLabel={t('packing.deleteItem')}
                            title={t('packing.deleteItemTitle')}
                            description={t('packing.deleteItemDescription')}
                            confirmLabel={t('packing.deleteItem')}
                            cancelLabel={t('common.cancel')}
                            onConfirm={() => removeCustomItem(sectionId, item.id)}
                            triggerVariant="outline"
                            triggerSize="sm"
                          />
                        </div>
                      ) : null}
                    </div>
                  )) : (
                    <div className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">{t('packing.noItems')}</p>
                      <p className="mt-1">{t('packing.noItemsDescription')}</p>
                    </div>
                  )}

                  <div className="rounded-2xl border border-dashed border-border p-4">
                    <p className="font-medium text-foreground">{t('packing.addItemTitle')}</p>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <Input
                        value={itemDrafts[sectionId]}
                        placeholder={t('packing.addItemPlaceholder')}
                        onChange={(event) => {
                          setItemDrafts((current) => ({ ...current, [sectionId]: event.target.value }))
                          if (status?.tone === 'warning') setStatus(null)
                        }}
                      />
                      <Button type="button" variant="secondary" onClick={() => addCustomItem(sectionId)}>
                        <Plus className="h-4 w-4" />
                        {t('packing.addItemAction')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : null}
    </AppShell>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Briefcase
  label: string
  value: number
}) {
  return (
    <div className="rounded-2xl border border-border bg-[color:var(--surface-floating)] p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4 text-primary" />
        {label}
      </div>
      <p className="mt-3 text-3xl font-semibold tabular-nums text-foreground">{value}</p>
    </div>
  )
}
