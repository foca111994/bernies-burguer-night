'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export function OptionTile({
  label,
  desc,
  selected,
  onClick,
  swatch,
  image,
  trailing,
}: {
  label: string
  desc?: string
  selected: boolean
  onClick: () => void
  swatch?: string
  image?: string
  trailing?: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'group relative flex min-h-16 w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all active:scale-[0.98]',
        selected
          ? 'border-primary bg-primary/10 shadow-glow'
          : 'border-border bg-card hover:border-primary/40 hover:bg-secondary/40',
      )}
    >
      {image ? (
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-secondary/50"
          aria-hidden
        >
          <img
            src={image || '/placeholder.svg'}
            alt=""
            className="h-full w-full object-contain p-0.5"
            draggable={false}
          />
        </span>
      ) : swatch ? (
        <span
          className="h-9 w-9 shrink-0 rounded-xl border border-border/60"
          style={{ background: swatch }}
          aria-hidden
        />
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">{label}</span>
        {desc && <span className="block truncate text-xs text-muted-foreground">{desc}</span>}
      </span>
      {trailing}
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
          selected
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-border text-transparent',
        )}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    </button>
  )
}
