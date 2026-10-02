"use client"

import { Clock, MapPin, StickyNote, UtensilsCrossed, CupSoda } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { burgerSummary } from "@/lib/burger-options"
import { labelFor } from "@/lib/analytics"
import { SIDES, DRINKS } from "@/lib/burger-options"
import type { Order, OrderStatus } from "@/lib/types"

const NEXT: Record<OrderStatus, { label: string; status: OrderStatus } | null> = {
  pending: { label: "Start Preparing", status: "preparing" },
  preparing: { label: "Mark Ready", status: "ready" },
  ready: { label: "Mark Collected", status: "collected" },
  collected: null,
}

function elapsed(iso: string) {
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000))
  if (mins < 1) return "just now"
  if (mins === 1) return "1 min ago"
  return `${mins} mins ago`
}

export function OrderCard({
  order,
  onAdvance,
  onRevert,
}: {
  order: Order
  onAdvance: (id: string, status: OrderStatus) => void
  onRevert?: (id: string, status: OrderStatus) => void
}) {
  const next = NEXT[order.status]

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <header className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-primary">#{order.orderNumber}</span>
            <h3 className="font-heading text-base font-bold leading-tight">
              {order.resident.firstName} {order.resident.lastName}
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{order.burgerName}</p>
        </div>
        <StatusBadge status={order.status} />
      </header>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1 font-medium text-foreground/80">{order.resident.company}</span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="size-3" /> {order.resident.roomNumber}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" /> {elapsed(order.createdAt)}
        </span>
      </div>

      <p className="rounded-lg bg-muted/50 px-3 py-2 text-xs leading-relaxed text-foreground/90">
        {burgerSummary(order.burger)}
      </p>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <UtensilsCrossed className="size-3" /> {labelFor(SIDES, order.side)}
        </span>
        <span className="inline-flex items-center gap-1">
          <CupSoda className="size-3" /> {labelFor(DRINKS, order.drink)}
        </span>
      </div>

      {order.resident.notes ? (
        <p className="inline-flex items-start gap-1.5 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-xs font-medium text-warning-foreground">
          <StickyNote className="mt-0.5 size-3 shrink-0 text-warning" />
          {order.resident.notes}
        </p>
      ) : null}

      <div className="mt-auto flex items-center gap-2 pt-1">
        {next ? (
          <Button size="sm" className="flex-1" onClick={() => onAdvance(order.id, next.status)}>
            {next.label}
          </Button>
        ) : (
          <Button size="sm" variant="secondary" className="flex-1" disabled>
            Completed
          </Button>
        )}
        {onRevert && order.status !== "pending" ? (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              const order2: Record<OrderStatus, OrderStatus> = {
                preparing: "pending",
                ready: "preparing",
                collected: "ready",
                pending: "pending",
              }
              onRevert(order.id, order2[order.status])
            }}
          >
            Undo
          </Button>
        ) : null}
      </div>
    </article>
  )
}
