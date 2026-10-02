"use client"

import { RotateCcw, Power, Clock } from "lucide-react"
import { toast } from "sonner"
import { ChefShell } from "@/components/chef/chef-shell"
import { Button } from "@/components/ui/button"
import { EVENT, useOrders } from "@/lib/store"

const WAIT_OPTIONS = [5, 10, 15, 20, 30]

export default function SettingsPage() {
  const {
    acceptingOrders,
    setAcceptingOrders,
    estimatedWaitMinutes,
    setEstimatedWaitMinutes,
    resetDemo,
  } = useOrders()

  return (
    <ChefShell>
      <div className="mx-auto max-w-2xl">
        <header>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight md:text-3xl">Event Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Control the event workflow and live ordering.</p>
        </header>

        {/* Event info */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-5">
          <h2 className="font-heading text-lg font-bold">{EVENT.name}</h2>
          <p className="text-sm text-muted-foreground">{EVENT.venue}</p>
          <p className="mt-2 text-sm font-medium text-foreground/80">{EVENT.date}</p>
        </section>

        {/* Accepting orders toggle */}
        <section className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-start gap-3">
            <Power className="mt-0.5 size-5 text-primary" />
            <div>
              <h3 className="font-semibold">Accept New Orders</h3>
              <p className="text-sm text-muted-foreground">
                {acceptingOrders ? "Residents can submit orders." : "Ordering is paused for residents."}
              </p>
            </div>
          </div>
          <Button
            variant={acceptingOrders ? "default" : "secondary"}
            onClick={() => {
              setAcceptingOrders(!acceptingOrders)
              toast.success(acceptingOrders ? "Ordering paused" : "Ordering opened")
            }}
          >
            {acceptingOrders ? "Open" : "Paused"}
          </Button>
        </section>

        {/* Wait time */}
        <section className="mt-4 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 size-5 text-primary" />
            <div>
              <h3 className="font-semibold">Estimated Wait Time</h3>
              <p className="text-sm text-muted-foreground">Shown to residents tracking their order.</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {WAIT_OPTIONS.map((m) => (
              <button
                key={m}
                onClick={() => setEstimatedWaitMinutes(m)}
                className={
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
                  (estimatedWaitMinutes === m
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground")
                }
              >
                {m} min
              </button>
            ))}
          </div>
        </section>

        {/* Reset demo */}
        <section className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
          <div className="flex items-start gap-3">
            <RotateCcw className="mt-0.5 size-5 text-destructive" />
            <div className="flex-1">
              <h3 className="font-semibold">Reset Demo Data</h3>
              <p className="text-sm text-muted-foreground">
                Restore the seeded sample orders. Useful before a live demonstration.
              </p>
            </div>
          </div>
          <Button
            variant="destructive"
            className="mt-4"
            onClick={() => {
              resetDemo()
              toast.success("Demo data reset")
            }}
          >
            Reset to sample orders
          </Button>
        </section>

        {/* Supabase note */}
        <p className="mt-6 rounded-xl border border-border bg-muted/40 p-4 text-xs leading-relaxed text-muted-foreground">
          This prototype stores orders on-device for demonstration. The data models for
          Events, Residents, Orders, Ingredients and Analytics are structured to map directly
          onto Supabase tables when backend integration is added.
        </p>
      </div>
    </ChefShell>
  )
}
