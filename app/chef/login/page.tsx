"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChefHat, Lock, User, Eye, EyeOff } from "lucide-react"
import { BerniesHomeLink, PoweredByIss } from "@/components/brand"
import { useChefAuth } from "@/lib/chef-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ChefLoginForm() {
  const { signIn } = useChefAuth()
  const router = useRouter()
  const params = useSearchParams()
  const redirect = params.get("from") || "/chef"

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = signIn(username, password)
    if (res.ok) {
      router.replace(redirect)
    } else {
      setError(res.error ?? "Unable to sign in.")
    }
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mb-8">
        <BerniesHomeLink size="lg" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-border bg-card/80 p-6 shadow-2xl backdrop-blur sm:p-8">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <ChefHat className="h-7 w-7" />
          </span>
          <h1 className="mt-4 font-heading text-2xl font-extrabold text-foreground">Chef Login</h1>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            Sign in to manage orders, analytics and the Kitchen Display.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="px-9"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-destructive/15 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="mt-1 w-full">
            Sign In
          </Button>
        </form>
      </div>

      <div className="relative z-10 mt-8">
        <PoweredByIss />
      </div>
    </main>
  )
}

export default function ChefLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-background" />}>
      <ChefLoginForm />
    </Suspense>
  )
}
