"use client"

import { useEffect, useMemo, useState } from "react"
import { Flame, CheckCircle2 } from "lucide-react"
import { BerniesHomeLink } from "@/components/brand"
import { useOrders } from "@/lib/store"
import { EVENT } from "@/lib/store"
import type { Order } from "@/lib/types"

function Clock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{time}</span>
}

function Ticket({ order, tone }: { order: Order; tone: "preparing" | "ready" }) {
  return (
    <li
      className={
        "flex items-center justify-between gap-4 rounded-2xl border-2 px-5 py-4 md:px-6 md:py-5 " +
        (tone === "preparing"
          ? "border-warning/40 bg-warning/10"
          : "border-success/50 bg-success/10 animate-[pulse_2.5s_ease-in-out_infinite]")
      }
    >
      <span
        className={
          "font-heading text-4xl font-extrabold tabular-nums md:text-5xl " +
          (tone === "preparing" ? "text-warning" : "text-success")
        }
      >
        #{order.orderNumber}
      </span>
      <span className="truncate text-right text-2xl font-bold text-foreground md:text-3xl">
        {order.resident.firstName} {order.resident.lastName.charAt(0)}.
      </span>
    </li>
  )
}

export default function KitchenDisplayPage() {
  const { orders, hydrated } = useOrders()

  const { preparing, ready } = useMemo(() => {
    const sorted = [...orders].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )
    return {
      preparing: sorted.filter((o) => o.status === "preparing"),
      ready: sorted.filter((o) => o.status === "ready"),
    }
  }, [orders])

  return (
    <main className="flex min-h-screen flex-col bg-background p-6 md:p-10">
      {/* Header */}
      <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <div className="flex flex-col gap-1">
          <BerniesHomeLink size="xl" />
          <span className="text-sm font-semibold text-muted-foreground md:text-base">
            Burger Night · {EVENT.venue}
          </span>
        </div>
        <div className="font-heading text-2xl font-bold tabular-nums text-muted-foreground md:text-3xl">
          <Clock />
        </div>
      </header>

      {/* Columns */}
      <div className="grid flex-1 grid-cols-1 gap-6 pt-6 md:grid-cols-2 md:gap-8">
        {/* Now preparing */}
        <section className="flex flex-col">
          <div className="mb-4 flex items-center gap-3">
            <Flame className="size-7 text-warning md:size-8" />
            <h2 className="font-heading text-2xl font-extrabold uppercase tracking-wide text-warning md:text-3xl">
              Now Preparing
            </h2>
            <span className="ml-auto font-heading text-2xl font-extrabold text-warning/70">
              {preparing.length}
            </span>
          </div>
          <ul className="flex flex-col gap-3 md:gap-4">
            {hydrated && preparing.length === 0 ? (
              <li className="rounded-2xl border-2 border-dashed border-border py-10 text-center text-xl font-medium text-muted-foreground">
                No burgers cooking right now
              </li>
            ) : (
              preparing.map((o) => <Ticket key={o.id} order={o} tone="preparing" />)
            )}
          </ul>
        </section>

        {/* Ready for pickup */}
        <section className="flex flex-col">
          <div className="mb-4 flex items-center gap-3">
            <CheckCircle2 className="size-7 text-success md:size-8" />
            <h2 className="font-heading text-2xl font-extrabold uppercase tracking-wide text-success md:text-3xl">
              Ready for Pickup
            </h2>
            <span className="ml-auto font-heading text-2xl font-extrabold text-success/70">
              {ready.length}
            </span>
          </div>
          <ul className="flex flex-col gap-3 md:gap-4">
            {hydrated && ready.length === 0 ? (
              <li className="rounded-2xl border-2 border-dashed border-border py-10 text-center text-xl font-medium text-muted-foreground">
                Nothing ready yet
              </li>
            ) : (
              ready.map((o) => <Ticket key={o.id} order={o} tone="ready" />)
            )}
          </ul>
        </section>
      </div>

      {/* Footer ticker */}
      <footer className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm font-medium text-muted-foreground">
        <span>Collect your order from {`Bernie's Café`} counter when your number turns green</span>
        <span className="hidden sm:inline">Powered by ISS · {EVENT.venue}</span>
      </footer>
    </main>
  )
}
