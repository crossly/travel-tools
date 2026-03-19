import { Briefcase, Clock3, Home, Languages, ReceiptText, Smartphone, WalletCards } from 'lucide-react'
import type { ToolDefinition } from '@/lib/types'

type NavItem = {
  key: string
  icon: typeof Home
  path: string
  tool?: ToolDefinition['slug']
}

export const TOOL_NAV_ITEMS: NavItem[] = [
  { key: 'nav.currency', icon: WalletCards, path: '/currency', tool: 'currency' },
  { key: 'nav.splitBill', icon: ReceiptText, path: '/bill-splitter', tool: 'split-bill' },
  { key: 'nav.packingList', icon: Briefcase, path: '/packing-list', tool: 'packing-list' },
  { key: 'nav.travelPhrases', icon: Languages, path: '/travel-phrases', tool: 'travel-phrases' },
  { key: 'nav.localApps', icon: Smartphone, path: '/local-apps', tool: 'local-apps' },
  { key: 'nav.jetLag', icon: Clock3, path: '/jet-lag', tool: 'jet-lag' },
]

export const MOBILE_NAV_ITEMS: NavItem[] = [
  { key: 'nav.home', icon: Home, path: '/' },
  ...TOOL_NAV_ITEMS,
]
