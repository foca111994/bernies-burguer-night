"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Tv } from "lucide-react"
import { ChefShell } from "@/components/chef/chef-shell"
import { OrderCard } from "@/components/chef/order-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useOrders } from "@/lib/store"
import type { OrderStatus } from "@/lib/types"

type Filter = "active" | OrderStatus | "all"

const FILTERS: { id: Filter; label: string }[] = [
  { id: "active", label: "Active" },
  { id: "pending", label: "Pending" },
  { id: "preparing", label: "Preparing" },
  { id: "ready", label: "Ready" },
  { id: "collected", label: "Collected" },
  { id: "all", label: "All" },
]

export default function ChefOrdersPage() {
  const { orders, updateStatus, acceptingOrders, hydrated } = useOrders()
  const [filter, setFilter] = useState<Filter>("active")

  const counts = useMemo(() => {
    const c: Record<string, number> = { pending: 0, preparing: 0, ready: 0, collected: 0 }
    for (const o of orders) c[o.status]++
    return c
  }, [orders])

  const filtered = useMemo(() => {
    const sorted = [...orders].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )
    if (filter === "all") return sorted
    if (filter === "active") return sorted.filter((o) => o.status === "pending" || o.status === "preparing" || o.status === "ready")
    return sorted.filter((o) => o.status === filter)
  }, [orders, filter])

  return (
    <ChefShell>
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight md:text-3xl">Live Orders</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {acceptingOrders ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 animate-pulse rounded-full bg-success" /> Accepting new orders
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-destructive" /> Orders paused
                </span>
              )}
            </p>
          </div>
          <Button variant="secondary" asChild>
            <Link href="/kitchen-display" target="_blank">
              <Tv className="size-4" /> Open Kitchen Display
            </Link>
          </Button>
        </header>

        {/* Stat strip */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Pending", value: counts.pending, tone: "text-muted-foreground" },
            { label: "Preparing", value: counts.preparing, tone: "text-warning" },
            { label: "Ready", value: counts.ready, tone: "text-success" },
            { label: "Collected", value: counts.collected, tone: "text-muted-foreground" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
              <p className={cn("font-heading text-3xl font-extrabold", s.tone)}>{s.value}</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                filter === f.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Orders grid */}
        {!hydrated ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">Loading orders…</p>
        ) : filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center">
            <p className="text-sm font-medium text-muted-foreground">No orders in this view.</p>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((o) => (
              <OrderCard key={o.id} order={o} onAdvance={updateStatus} onRevert={updateStatus} />
            ))}
          </div>
        )}
      </div>
    </ChefShell>
  )
}
