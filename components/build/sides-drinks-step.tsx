'use client'

import { SIDES, DRINKS } from '@/lib/burger-options'
import type { SideChoice, DrinkChoice } from '@/lib/types'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

function SideCard({
  label,
  desc,
  img,
  selected,
  onClick,
}: {
  label: string
  desc: string
  img?: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200',
        selected
          ? 'border-primary bg-primary/10 shadow-glow ring-2 ring-primary/40'
          : 'border-border bg-card hover:border-primary/40 hover:bg-card/80',
      )}
    >
      {selected && (
        <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          ✓
        </span>
      )}
      {img ? (
        <div className="flex h-24 w-full items-center justify-center">
          <img
            src={img}
            alt={label}
            className="h-24 w-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
            draggable={false}
          />
        </div>
      ) : (
        <div className="flex h-24 w-full items-center justify-center rounded-xl bg-secondary/60">
          <span className="text-3xl text-muted-foreground">—</span>
        </div>
      )}
      <div className="w-full text-center">
        <p className="font-heading text-sm font-bold">{label}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
      </div>
    </button>
  )
}

function DrinkCard({
  label,
  desc,
  img,
  price,
  selected,
  onClick,
}: {
  label: string
  desc?: string
  img?: string
  price: number
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-3.5 text-left transition-all duration-200',
        selected
          ? 'border-primary bg-primary/10 shadow-glow ring-2 ring-primary/40'
          : 'border-border bg-card hover:border-primary/40 hover:bg-card/80',
      )}
    >
      {/* product image */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-secondary/40">
        {img ? (
          <img
            src={img}
            alt={label}
            className="h-16 w-16 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
            draggable={false}
          />
        ) : (
          <span className="text-2xl text-muted-foreground">∅</span>
        )}
      </div>

      {/* text */}
      <div className="min-w-0 flex-1">
        <p className="font-heading text-sm font-bold leading-tight">{label}</p>
        {desc && <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>}
        {price > 0 && (
          <p className="mt-1 text-sm font-semibold text-primary">${price.toFixed(2)}</p>
        )}
      </div>

      {selected && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          ✓
        </span>
      )}
    </button>
  )
}

export function SidesDrinksStep({
  side,
  setSide,
  drink,
  setDrink,
}: {
  side: SideChoice
  setSide: (s: SideChoice) => void
  drink: DrinkChoice
  setDrink: (d: DrinkChoice) => void
}) {
  return (
    <div className="flex flex-col gap-8">
      {/* Sides */}
      <section>
        <h3 className="mb-1 font-heading text-lg font-bold">Pick a side</h3>
        <p className="mb-3 text-xs text-muted-foreground">Goes great with your burger</p>
        <div className="grid grid-cols-3 gap-3">
          {SIDES.map((o) => (
            <SideCard
              key={o.id}
              label={o.label}
              desc={o.desc}
              img={o.img}
              selected={side === o.id}
              onClick={() => setSide(o.id)}
            />
          ))}
        </div>
      </section>

      {/* Drinks */}
      <section>
        <h3 className="mb-1 font-heading text-lg font-bold">Add a drink</h3>
        <p className="mb-3 text-xs text-muted-foreground">All drinks are $3.50 · Ice cold cans</p>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {DRINKS.map((o) => (
            <DrinkCard
              key={o.id}
              label={o.label}
              desc={o.desc}
              img={o.img}
              price={o.price}
              selected={drink === o.id}
              onClick={() => setDrink(o.id)}
            />
          ))}
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-border bg-secondary/40 p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Beverages are available from Bernie&apos;s Café. For payment and availability, please
            speak with the Retail Supervisor.
          </p>
        </div>
      </section>
    </div>
  )
}
