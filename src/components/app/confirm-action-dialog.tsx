import { useState, type ReactNode } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ConfirmActionDialogProps = {
  triggerLabel: ReactNode
  title: string
  description: string
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void | Promise<void>
  triggerVariant?: ButtonProps['variant']
  triggerSize?: ButtonProps['size']
  triggerDisabled?: boolean
  triggerClassName?: string
  pendingLabel?: ReactNode
}

export function ConfirmActionDialog({
  triggerLabel,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  triggerVariant = 'destructive',
  triggerSize = 'default',
  triggerDisabled = false,
  triggerClassName,
  pendingLabel,
}: ConfirmActionDialogProps) {
  const [open, setOpen] = useState(false)
  const [isPending, setIsPending] = useState(false)

  async function handleConfirm(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (isPending) return

    try {
      setIsPending(true)
      await onConfirm()
      setOpen(false)
    } catch {
      // Keep the dialog open when the action throws so the caller can recover.
    } finally {
      setIsPending(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={(nextOpen) => {
      if (isPending) return
      setOpen(nextOpen)
    }}>
      <AlertDialogTrigger asChild>
        <Button type="button" variant={triggerVariant} size={triggerSize} disabled={triggerDisabled || isPending} className={cn(triggerClassName)}>
          {triggerLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isPending} aria-busy={isPending}>
            {isPending ? pendingLabel ?? confirmLabel : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
