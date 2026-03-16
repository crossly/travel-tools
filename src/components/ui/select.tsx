import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const Select = SelectPrimitive.Root

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    hideChevron?: boolean
  }
>(({ className, children, hideChevron = false, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex h-11 shrink-0 items-center justify-between gap-2 rounded-full border border-border bg-[color:var(--surface-floating)] px-4 text-sm font-semibold text-foreground shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground data-[state=open]:border-primary/40 data-[state=open]:bg-muted',
      className,
    )}
    {...props}
  >
    {children}
    {hideChevron ? null : (
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </SelectPrimitive.Icon>
    )}
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, className, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={cn(
        'relative z-50 max-h-64 min-w-[10rem] overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-xl',
        position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="flex h-8 cursor-default items-center justify-center bg-card text-muted-foreground">
        <ChevronUp className="h-4 w-4" />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport
        className={cn(
          'max-h-64 p-1',
          position === 'popper' && 'h-[var(--radix-select-trigger-height)] min-w-[var(--radix-select-trigger-width)] w-full',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="flex h-8 cursor-default items-center justify-center bg-card text-muted-foreground">
        <ChevronDown className="h-4 w-4" />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-xl py-2.5 pl-9 pr-3 text-sm font-medium text-foreground outline-none data-[highlighted]:bg-muted data-[highlighted]:text-foreground data-[state=checked]:bg-primary/10',
      className,
    )}
    {...props}
  >
    <span className="absolute left-3 flex h-4 w-4 items-center justify-center text-primary">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
