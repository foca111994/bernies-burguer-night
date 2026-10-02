import Link from 'next/link'
import { cn } from '@/lib/utils'

/** Bernie's wordmark that always links back to the landing page (global Home). */
export function BerniesHomeLink({
  className,
  size = 'sm',
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  return (
    <Link
      href="/"
      aria-label="Bernie's Burger Night home"
      className={cn('inline-flex items-center rounded-xl transition-opacity hover:opacity-80', className)}
    >
      <BerniesWordmark size={size} />
    </Link>
  )
}

export function BerniesWordmark({
  className,
  size = 'md',
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-5xl',
    xl: 'text-6xl sm:text-7xl',
  }
  return (
    <span
      className={cn('font-script text-neon leading-none tracking-tight', sizes[size], className)}
    >
      Bernie&apos;s
    </span>
  )
}

/** Compact wordmark used in dashboards / TV header. */
export function BrandMark({ className }: { className?: string }) {
  return <BerniesWordmark className={className} size="sm" />
}

export function PoweredByIss({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground',
        className,
      )}
    >
      Powered by
      <span className="rounded-md border border-border bg-secondary px-1.5 py-0.5 font-mono text-[0.7rem] font-bold tracking-wide text-foreground">
        ISS
      </span>
      Oak Dam Village
    </span>
  )
}
