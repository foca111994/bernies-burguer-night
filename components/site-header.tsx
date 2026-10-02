'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BerniesHomeLink } from './brand'
import { cn } from '@/lib/utils'
import { ClipboardList, ChefHat, Tv } from 'lucide-react'

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <BerniesHomeLink size="sm" />
        <nav className="flex items-center gap-1">
          <HeaderLink href="/track" active={pathname?.startsWith('/track')}>
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Track Order</span>
          </HeaderLink>
          <HeaderLink href="/chef/login" active={pathname?.startsWith('/chef')}>
            <ChefHat className="h-4 w-4" />
            <span className="hidden sm:inline">Chef Login</span>
          </HeaderLink>
          <HeaderLink href="/kitchen-display" active={pathname?.startsWith('/kitchen-display')}>
            <Tv className="h-4 w-4" />
            <span className="hidden sm:inline">Display</span>
          </HeaderLink>
        </nav>
      </div>
    </header>
  )
}

function HeaderLink({
  href,
  active,
  children,
}: {
  href: string
  active?: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex min-h-11 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors',
        active
          ? 'bg-secondary text-foreground'
          : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
      )}
    >
      {children}
    </Link>
  )
}
