import {
  BUNS,
  PROTEINS,
  CHEESES,
  VEGETABLES,
  SAUCES,
  EXTRAS,
  DRINKS,
  SIDES,
  labelFor,
} from '@/lib/burger-options'
import type { BurgerSelection, SideChoice, DrinkChoice, Resident } from '@/lib/types'

function joinLabels(list: { id: string; label: string }[], ids: string[]) {
  if (ids.length === 0) return 'None'
  return ids.map((id) => labelFor(list, id)).join(', ')
}

export function BurgerSummaryRows({ burger }: { burger: BurgerSelection }) {
  return (
    <dl className="grid gap-2 text-sm">
      <Row label="Bun" value={labelFor(BUNS, burger.bun)} />
      <Row label="Protein" value={labelFor(PROTEINS, burger.protein)} />
      <Row label="Cheese" value={labelFor(CHEESES, burger.cheese)} />
      <Row label="Vegetables" value={joinLabels(VEGETABLES, burger.vegetables)} />
      <Row label="Sauces" value={burger.sauces.length ? joinLabels(SAUCES, burger.sauces) : 'No Sauce'} />
      <Row label="Extras" value={joinLabels(EXTRAS, burger.extras)} />
    </dl>
  )
}

export function OrderSummary({
  burger,
  burgerName,
  side,
  drink,
  resident,
}: {
  burger: BurgerSelection
  burgerName: string
  side: SideChoice
  drink: DrinkChoice
  resident?: Resident
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Your burger</p>
        <p className="mt-0.5 font-heading text-lg font-bold text-primary">{burgerName}</p>
        <div className="mt-3 border-t border-border/60 pt-3">
          <BurgerSummaryRows burger={burger} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Side</p>
          <p className="mt-1 font-semibold">{labelFor(SIDES, side)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Drink</p>
          <p className="mt-1 font-semibold">{labelFor(DRINKS, drink)}</p>
        </div>
      </div>

      {resident && (
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Resident</p>
          <p className="mt-1 font-semibold">
            {resident.firstName} {resident.lastName}
          </p>
          <p className="text-sm text-muted-foreground">
            {resident.company} · Room {resident.roomNumber}
          </p>
          {resident.notes && (
            <p className="mt-2 rounded-lg bg-secondary/60 px-3 py-2 text-sm text-muted-foreground">
              “{resident.notes}”
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  )
}
