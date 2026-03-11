import { Moon, Monitor, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme'
import type { SiteTheme } from '@/lib/types'

const ITEMS: Array<{ value: SiteTheme; icon: typeof Sun }> = [
  { value: 'light', icon: Sun },
  { value: 'dark', icon: Moon },
  { value: 'system', icon: Monitor },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
      {ITEMS.map(({ value, icon: Icon }) => (
        <Button
          key={value}
          type="button"
          variant={theme === value ? 'default' : 'ghost'}
          size="icon"
          className="h-9 w-9 rounded-full"
          onClick={() => setTheme(value)}
          aria-label={value}
        >
          <Icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  )
}
