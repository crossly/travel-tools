import { useEffect, useMemo, useState } from 'react'
import {
  clearActivePackingListId,
  readActivePackingListId,
  readPackingLists,
  writeActivePackingListId,
  writePackingLists,
} from '@/lib/storage'
import type { PackingList } from '@/lib/types'

const PACKING_PERSIST_DELAY_MS = 250

function resolveActivePackingListId(lists: PackingList[], storedActiveId: string | null) {
  return lists.find((list) => list.id === storedActiveId)?.id ?? lists[0]?.id ?? null
}

export function usePackingLists() {
  const [lists, setLists] = useState<PackingList[]>([])
  const [activeListId, setActiveListId] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const storedLists = readPackingLists()
    setLists(storedLists)
    setActiveListId(resolveActivePackingListId(storedLists, readActivePackingListId()))
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

  const activeList = useMemo(
    () => lists.find((list) => list.id === activeListId) ?? null,
    [activeListId, lists],
  )

  return {
    activeList,
    activeListId,
    lists,
    setActiveListId,
    setLists,
  }
}
