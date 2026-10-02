'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useOrders, EVENT } from '@/lib/store'
import { STATUS_META } from '@/lib/analytics'
import { labelFor, SIDES, DRINKS } from '@/lib/burger-options'
import { cn } from '@/lib/utils'
import { ClipboardList, ChevronRight, Flame, CheckCircle2 } from 'lucide-react'
import type { Order } from '@/lib/types'

export default function TrackPage() {
  const { orders, deviceOrderIds, hydrated } = useOrders()

  const myOrders = orders
    .filter((o) => deviceOrderIds.includes(o.id))
    .sort((a, b) => b.orderNumber - a.orderNumber)

  const { preparing, ready } = useMemo(() => {
    const sorted = [...orders].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )
    return {
      preparing: sorted.filter((o) => o.status === 'preparing'),
      ready: sorted.filter((o) => o.status === 'ready'),
    }
  }, [orders])

  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <ClipboardList className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-bold">Track Order</h1>
            <p className="text-sm text-muted-foreground">
              Live order board for {EVENT.name} at {EVENT.venue}.
            </p>
          </div>
        </div>

        {/* My orders */}
        {hydrated && myOrders.length > 0 && (
          <section className="mt-6">
            <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Your Orders
            </h2>
            <ul className="flex flex-col gap-3">
              {myOrders.map((o) => {
                const meta = STATUS_META[o.status]
                return (
                  <li key={o.id}>
                    <Link
                      href={`/order?id=${encodeURIComponent(o.id)}`}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                    >
                      <span className="flex flex-col items-center">
                        <span className="font-mono text-xs text-muted-foreground">ORDER</span>
                        <span className="font-heading text-xl font-bold text-primary">
                          #{o.orderNumber}
                        </span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold">{o.burgerName}</span>
                        <span className="block truncate text-sm text-muted-foreground">
                          {labelFor(SIDES, o.side)} · {labelFor(DRINKS, o.drink)}
                        </span>
                      </span>
                      <Badge variant="outline" className={cn('gap-1.5 border-border', meta.tone)}>
                        <span className={cn('h-2 w-2 rounded-full', meta.dot)} />
                        {meta.label}
                      </Badge>
                      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {/* Public live board */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <BoardColumn
            tone="preparing"
            title="Preparing"
            icon={<Flame className="h-5 w-5" />}
            orders={preparing}
            empty="No burgers cooking right now"
            hydrated={hydrated}
          />
          <BoardColumn
            tone="ready"
            title="Ready For Pickup"
            icon={<CheckCircle2 className="h-5 w-5" />}
            orders={ready}
            empty="Nothing ready just yet"
            hydrated={hydrated}
          />
        </section>

        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Collect your order from the {`Bernie's Café`} counter when your number turns green.
          </p>
          <Button asChild className="rounded-full">
            <Link href="/build">Build Another Burger</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function BoardColumn({
  tone,
  title,
  icon,
  orders,
  empty,
  hydrated,
}: {
  tone: 'preparing' | 'ready'
  title: string
  icon: React.ReactNode
  orders: Order[]
  empty: string
  hydrated: boolean
}) {
  const accent = tone === 'preparing' ? 'text-warning' : 'text-success'
  return (
    <div
      className={cn(
        'rounded-3xl border-2 p-4',
        tone === 'preparing' ? 'border-warning/30 bg-warning/5' : 'border-success/40 bg-success/5',
      )}
    >
      <div className={cn('mb-3 flex items-center gap-2', accent)}>
        {icon}
        <h2 className="font-heading text-lg font-extrabold uppercase tracking-wide">{title}</h2>
        <span className="ml-auto font-heading text-lg font-extrabold opacity-70">
          {orders.length}
        </span>
      </div>
      <ul className="flex flex-col gap-2.5">
        {hydrated && orders.length === 0 ? (
          <li className="rounded-2xl border border-dashed border-border py-8 text-center text-sm font-medium text-muted-foreground">
            {empty}
          </li>
        ) : (
          orders.map((o) => (
            <li
              key={o.id}
              className={cn(
                'flex items-center justify-between gap-3 rounded-2xl border bg-card px-4 py-3',
                tone === 'ready' && 'border-success/40',
              )}
            >
              <span className={cn('font-heading text-2xl font-extrabold tabular-nums', accent)}>
                #{o.orderNumber}
              </span>
              <span className="truncate text-right text-base font-bold">
                {o.resident.firstName} {o.resident.lastName.charAt(0)}.
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
