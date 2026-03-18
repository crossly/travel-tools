import '@/lib/i18n/messages/packing'
import { useEffect, useMemo, useState } from 'react'
import { Briefcase, Check, Circle, ListChecks, Plus } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { ConfirmActionDialog } from '@/components/app/confirm-action-dialog'
import { InlineStatus } from '@/components/app/inline-status'
import { FieldGroup } from '@/components/app/field-group'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  countPackingProgress,
  createCustomPackingItem,
  createPackingListFromTemplate,
  getEssentialPackingItems,
  getPackingItemLabel,
  getPackingTemplate,
  listPackingTemplates,
  replacePackingSection,
} from '@/lib/packing-list'
import { useI18n } from '@/lib/i18n'
import { writeLastTool } from '@/lib/storage'
import { cn } from '@/lib/utils'
import type { Locale, PackingList, PackingSectionId } from '@/lib/types'
import { usePackingLists } from './use-packing-lists'

const sectionIds: PackingSectionId[] = ['documents', 'clothing', 'toiletries', 'electronics', 'medicine', 'misc']

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
  const { activeList, activeListId, lists, setActiveListId, setLists } = usePackingLists()
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0]?.id ?? 'weekend')
  const selectedTemplate = templates.find((template) => template.id === selectedTemplateId) ?? templates[0] ?? null
  const [newListName, setNewListName] = useState('')
  const [itemDrafts, setItemDrafts] = useState<Record<PackingSectionId, string>>(createEmptyDrafts)
  const [status, setStatus] = useState<{ tone: 'warning'; title: string; description?: string } | null>(null)

  useEffect(() => {
    writeLastTool('packing-list')
  }, [])

  const stats = countPackingProgress(activeList)
  const essentials = getEssentialPackingItems(activeList)
  const starterTemplate = useMemo(
    () => getPackingTemplate(selectedTemplateId),
    [selectedTemplateId],
  )
  const starterItems = useMemo(
    () => starterTemplate?.sections.flatMap((section) => section.items.map((item) => t(item.builtinKey))).slice(0, 6) ?? [],
    [starterTemplate, t],
  )
  const starterSections = useMemo(
    () => starterTemplate?.sections.slice(0, 4).map((section) => ({
      id: section.id,
      items: section.items.slice(0, 2).map((item) => t(item.builtinKey)),
    })) ?? [],
    [starterTemplate, t],
  )

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
            {!activeList && lists.length ? (
              <div className="space-y-2">
                <Label htmlFor="packing-current-list">{t('packing.currentList')}</Label>
                <Select value={activeListId ?? undefined} onValueChange={setActiveListId}>
                  <SelectTrigger
                    id="packing-current-list"
                    aria-label={t('packing.currentList')}
                    className="w-full justify-between rounded-xl px-3 font-medium"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {lists.map((list) => (
                      <SelectItem key={list.id} value={list.id}>
                        {list.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
        <>
          <Card tone="soft" data-testid="packing-workspace-header">
            <CardContent className="grid gap-5 pt-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="shell-brand-kicker">{t('packing.currentList')}</p>
                  <div className="max-w-sm">
                    <Select value={activeListId ?? undefined} onValueChange={setActiveListId}>
                      <SelectTrigger
                        id="packing-current-list"
                        aria-label={t('packing.currentList')}
                        className="w-full justify-between rounded-xl px-3 font-medium"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {lists.map((list) => (
                          <SelectItem key={list.id} value={list.id}>
                            {list.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{t('packing.essentialsDescription')}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <StatCard icon={ListChecks} label={t('packing.statsTotal')} value={stats.total} />
                <StatCard icon={Check} label={t('packing.statsPacked')} value={stats.packed} />
                <StatCard icon={Circle} label={t('packing.statsRemaining')} value={stats.remaining} />
              </div>
            </CardContent>
          </Card>

          <Card tone="plain">
            <CardHeader>
              <CardTitle className="text-balance">{t('packing.essentialsTitle')}</CardTitle>
              <CardDescription className="text-pretty">{t('packing.essentialsDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
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
            </CardContent>
          </Card>

          <div className="grid gap-4">
          {sectionIds.map((sectionId) => {
            const section = activeList.sections.find((entry) => entry.id === sectionId)
            const items = section?.items ?? []

            return (
              <section key={sectionId} data-testid="packing-section-group" className="packing-section-group rounded-[1.75rem] border border-border bg-[color:var(--surface-floating)] p-5 shadow-sm">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="display text-balance text-2xl font-semibold text-foreground">{t(`packing.section.${sectionId}`)}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        <span className="tabular-nums">{items.filter((item) => item.checked).length}</span> / <span className="tabular-nums">{items.length}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid gap-3">
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
                </div>
              </section>
            )
          })}
          </div>
        </>
      ) : (
        <Card className="border-dashed border-border/80 bg-[color:var(--surface-floating)]">
          <CardContent className="grid gap-6 p-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]">
            <div className="space-y-3">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl border border-border bg-background">
                <Briefcase className="size-5 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="display text-balance text-2xl font-semibold text-foreground">{t('packing.emptyTitle')}</h2>
                <p className="max-w-xl text-pretty text-sm leading-6 text-muted-foreground md:text-base">{t('packing.emptyDescription')}</p>
              </div>
              {selectedTemplate ? (
                <div className="rounded-2xl border border-border bg-background/80 p-4">
                  <p className="text-sm font-medium text-muted-foreground">{t(selectedTemplate.nameKey)}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{t(selectedTemplate.descriptionKey)}</p>
                </div>
              ) : null}
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-background/80 p-4">
                <h3 className="text-base font-semibold text-foreground">{t('packing.starterTitle')}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{t('packing.starterDescription')}</p>
                <ol className="mt-3 grid gap-2 text-sm text-foreground/90">
                  <li>{t('packing.starterStepTemplate')}</li>
                  <li>{t('packing.starterStepName')}</li>
                  <li>{t('packing.starterStepCreate')}</li>
                </ol>
                <div className="mt-4">
                  <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">{t('packing.starterItemsLabel')}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {starterItems.map((item, index) => (
                      <span key={`${item}-${index}`} className="rounded-full border border-border/80 bg-[color:var(--surface-floating)] px-2.5 py-1 text-xs text-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {starterSections.map((section) => (
                  <div key={section.id} className="rounded-2xl border border-border bg-background/80 p-4">
                    <p className="font-medium text-foreground">{t(`packing.section.${section.id}`)}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{section.items.join(' · ')}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
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
