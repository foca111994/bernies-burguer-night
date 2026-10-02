"use client"

import type React from "react"
import { useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutGrid, BarChart3, Tv, Settings, ExternalLink, LogOut, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { BerniesHomeLink } from "@/components/brand"
import { useChefAuth } from "@/lib/chef-auth"

const nav = [
  { href: "/chef", label: "Orders", icon: LayoutGrid },
  { href: "/chef/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/kitchen-display", label: "Kitchen Display", icon: Tv, external: true },
  { href: "/chef/settings", label: "Event Settings", icon: Settings },
]

export function ChefShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthed, ready, signOut } = useChefAuth()

  useEffect(() => {
    if (ready && !isAuthed) {
      router.replace(`/chef/login?from=${encodeURIComponent(pathname)}`)
    }
  }, [ready, isAuthed, pathname, router])

  if (!ready || !isAuthed) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-background text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="text-sm font-medium">Checking chef access</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card/40 px-4 py-6 lg:flex">
        <div className="px-2">
          <BerniesHomeLink size="md" />
          <p className="mt-1 text-xs font-medium text-muted-foreground">Chef Operations</p>
        </div>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {nav.map((item) => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
                {item.external && <ExternalLink className="ml-auto size-3.5 opacity-60" />}
              </Link>
            )
          })}
        </nav>
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={signOut}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Exit to resident site
          </Link>
        </div>
      </aside>

      {/* Mobile top nav */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card/80 px-4 py-3 backdrop-blur lg:hidden">
        <BerniesHomeLink size="sm" />
        <nav className="flex items-center gap-1">
          {nav.map((item) => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                aria-label={item.label}
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg transition-colors",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                )}
              >
                <Icon className="size-4" />
              </Link>
            )
          })}
          <button
            type="button"
            onClick={signOut}
            aria-label="Sign out"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
          >
            <LogOut className="size-4" />
          </button>
        </nav>
      </div>

      <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
    </div>
  )
}
