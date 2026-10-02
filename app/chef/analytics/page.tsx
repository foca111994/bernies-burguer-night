"use client"

import { useMemo } from "react"
import { ShoppingBag, Beef, CupSoda, UtensilsCrossed, Trophy } from "lucide-react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChefShell } from "@/components/chef/chef-shell"
import { UsageBar } from "@/components/chef/usage-bar"
import { useOrders } from "@/lib/store"
import { buildAnalytics } from "@/lib/analytics"

const PIE_COLORS = ["#f5a623", "#e0742a", "#c2410c", "#7cb342", "#d6452f", "#9a6147", "#dcc06a"]

export default function AnalyticsPage() {
  const { orders, hydrated } = useOrders()
  const a = useMemo(() => buildAnalytics(orders), [orders])

  const stats = [
    { label: "Total Orders", value: a.totalOrders, icon: ShoppingBag },
    { label: "Total Burgers", value: a.totalBurgers, icon: Beef },
    { label: "Total Drinks", value: a.totalDrinks, icon: CupSoda },
    { label: "Total Sides", value: a.totalSides, icon: UtensilsCrossed },
  ]

  return (
    <ChefShell>
      <div className="mx-auto max-w-6xl">
        <header>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight md:text-3xl">Event Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Live operational insights for {`Bernie's Burger Night`} · Oak Dam Village
          </p>
        </header>

        {!hydrated ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">Loading analytics…</p>
        ) : (
          <>
            {/* Stat cards */}
            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {stats.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
                    <Icon className="size-5 text-primary" />
                    <p className="mt-3 font-heading text-3xl font-extrabold">{s.value}</p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {/* Protein donut */}
              <section className="rounded-2xl border border-border bg-card p-5">
                <h2 className="font-heading text-lg font-bold">Protein Popularity</h2>
                <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
                  <div className="h-48 w-48 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={a.proteins}
                          dataKey="count"
                          nameKey="label"
                          innerRadius={48}
                          outerRadius={80}
                          paddingAngle={2}
                          stroke="none"
                        >
                          {a.proteins.map((_, i) => (
                            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: 12,
                            fontSize: 12,
                            color: "var(--foreground)",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <ul className="flex-1 space-y-2">
                    {a.proteins.map((p, i) => (
                      <li key={p.label} className="flex items-center justify-between gap-2 text-sm">
                        <span className="inline-flex items-center gap-2">
                          <span className="size-3 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                          {p.label}
                        </span>
                        <span className="font-semibold tabular-nums text-muted-foreground">{p.pct}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Cheese + sauce + side bars */}
              <section className="rounded-2xl border border-border bg-card p-5">
                <h2 className="font-heading text-lg font-bold">Cheese Selection</h2>
                <div className="mt-3 space-y-3">
                  {a.cheeses.map((c) => (
                    <UsageBar key={c.label} item={c} accent="bg-[#f7b94d]" />
                  ))}
                </div>
                <h2 className="mt-6 font-heading text-lg font-bold">Sauce Selection</h2>
                <div className="mt-3 space-y-3">
                  {a.sauces.map((c) => (
                    <UsageBar key={c.label} item={c} accent="bg-[#c2410c]" />
                  ))}
                </div>
              </section>
            </div>

            {/* Sides */}
            <section className="mt-4 rounded-2xl border border-border bg-card p-5">
              <h2 className="font-heading text-lg font-bold">Sides</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {a.sides.map((s) => (
                  <UsageBar key={s.label} item={s} accent="bg-success" />
                ))}
              </div>
            </section>

            {/* Ingredient usage */}
            <section className="mt-4 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-baseline justify-between">
                <h2 className="font-heading text-lg font-bold">Ingredient Usage</h2>
                <span className="text-xs font-medium text-muted-foreground">For inventory planning</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Consumption across all orders, so you can plan stock for the next event.
              </p>
              <div className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {a.ingredientUsage.map((item) => (
                  <UsageBar key={item.label} item={item} />
                ))}
              </div>
            </section>

            {/* Event summary report */}
            <section className="mt-4 rounded-2xl border border-primary/30 bg-primary/5 p-5">
              <div className="flex items-center gap-2">
                <Trophy className="size-5 text-primary" />
                <h2 className="font-heading text-lg font-bold">Event Summary Report</h2>
              </div>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { k: "Total Orders", v: String(a.totalOrders) },
                  { k: "Most Popular Burger", v: a.mostPopularBurger },
                  { k: "Most Popular Protein", v: a.mostPopularProtein },
                  { k: "Most Popular Side", v: a.mostPopularSide },
                  { k: "Most Popular Drink", v: a.mostPopularDrink },
                  { k: "Top Ingredient", v: a.ingredientUsage[0]?.label ?? "N/A" },
                ].map((row) => (
                  <div key={row.k} className="rounded-xl border border-border bg-card p-4">
                    <dt className="text-xs font-medium text-muted-foreground">{row.k}</dt>
                    <dd className="mt-1 font-heading text-base font-bold text-pretty">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </>
        )}
      </div>
    </ChefShell>
  )
}
