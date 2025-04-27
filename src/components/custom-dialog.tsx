import * as React from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type DialogProps = {
  trigger?: React.ReactNode
  triggerVariant?: ButtonProps['variant']
  triggerClassName?: string
  title: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  contentClassName?: string
}

export function CustomDialog({
  trigger,
  triggerVariant = 'default',
  triggerClassName,
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
  contentClassName,
}: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          {typeof trigger === 'string' ? (
            <Button variant={triggerVariant} className={triggerClassName}>
              {trigger}
            </Button>
          ) : (
            trigger
          )}
        </DialogTrigger>
      )}

      <DialogContent className={cn('max-w-[425px]', contentClassName)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children && <div className="py-4">{children}</div>}

        {footer || (
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="neutral">Отмена</Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
