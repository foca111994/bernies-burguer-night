'use client'

import { cn } from '@/lib/utils'
import type { OrderStatus } from '@/lib/types'
import { Check, Clock, Flame, PackageCheck, ChefHat } from 'lucide-react'

const STAGES: { id: OrderStatus; label: string; icon: typeof Clock }[] = [
  { id: 'pending', label: 'Pending', icon: Clock },
  { id: 'preparing', label: 'Preparing', icon: Flame },
  { id: 'ready', label: 'Ready for Pickup', icon: PackageCheck },
  { id: 'collected', label: 'Collected', icon: ChefHat },
]

const ORDER: OrderStatus[] = ['pending', 'preparing', 'ready', 'collected']

export function OrderTracker({ status }: { status: OrderStatus }) {
  const currentIndex = ORDER.indexOf(status)
  return (
    <ol className="relative flex flex-col gap-0">
      {STAGES.map((stage, i) => {
        const reached = i <= currentIndex
        const isCurrent = i === currentIndex
        const Icon = reached && i < currentIndex ? Check : stage.icon
        return (
          <li key={stage.id} className="relative flex items-start gap-4 pb-6 last:pb-0">
            {i < STAGES.length - 1 && (
              <span
                className={cn(
                  'absolute left-[1.375rem] top-11 h-[calc(100%-1.5rem)] w-0.5 rounded-full',
                  i < currentIndex ? 'bg-primary' : 'bg-border',
                )}
                aria-hidden
              />
            )}
            <span
              className={cn(
                'relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors',
                reached
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground',
                isCurrent && status !== 'collected' && 'ring-4 ring-primary/20',
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <div className="pt-1.5">
              <p
                className={cn(
                  'font-semibold',
                  reached ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {stage.label}
              </p>
              {isCurrent && (
                <p className="text-xs text-primary">Current status</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
