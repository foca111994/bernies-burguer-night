"use client"

/**
 * Prototype chef authentication.
 *
 * This is intentionally simple and client side only. It is structured so it can
 * be swapped for Supabase Auth later: replace `signIn` / `signOut` with Supabase
 * calls and back the session with a Supabase session instead of localStorage.
 */
import { createContext, useCallback, useContext, useEffect, useState } from "react"

// NOTE: prototype demo credentials. Replace with Supabase Auth before production.
export const DEMO_CHEF = {
  username: "chef_oakdam",
  password: "dam1234chef",
}

const STORAGE_KEY = "bernies.chef.session"

type ChefAuthContextValue = {
  isAuthed: boolean
  ready: boolean
  signIn: (username: string, password: string) => { ok: boolean; error?: string }
  signOut: () => void
}

const ChefAuthContext = createContext<ChefAuthContextValue | null>(null)

export function ChefAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      setIsAuthed(localStorage.getItem(STORAGE_KEY) === "active")
    } catch {
      // ignore
    }
    setReady(true)
  }, [])

  const signIn = useCallback((username: string, password: string) => {
    if (username.trim() === DEMO_CHEF.username && password === DEMO_CHEF.password) {
      try {
        localStorage.setItem(STORAGE_KEY, "active")
      } catch {
        // ignore
      }
      setIsAuthed(true)
      return { ok: true }
    }
    return { ok: false, error: "Incorrect username or password." }
  }, [])

  const signOut = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    setIsAuthed(false)
  }, [])

  return (
    <ChefAuthContext.Provider value={{ isAuthed, ready, signIn, signOut }}>
      {children}
    </ChefAuthContext.Provider>
  )
}

export function useChefAuth() {
  const ctx = useContext(ChefAuthContext)
  if (!ctx) throw new Error("useChefAuth must be used within ChefAuthProvider")
  return ctx
}
