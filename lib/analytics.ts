import type { Order } from './types'
import {
  PROTEINS,
  CHEESES,
  SAUCES,
  VEGETABLES,
  EXTRAS,
  DRINKS,
  SIDES,
  labelFor,
} from './burger-options'

export interface Tally {
  label: string
  count: number
  pct: number
}

function tally(
  orders: Order[],
  pick: (o: Order) => string[],
  options: { id: string; label: string }[],
): Tally[] {
  const counts = new Map<string, number>()
  for (const o of orders) {
    for (const id of pick(o)) counts.set(id, (counts.get(id) ?? 0) + 1)
  }
  const total = orders.length || 1
  return options
    .map((opt) => {
      const count = counts.get(opt.id) ?? 0
      return { label: opt.label, count, pct: Math.round((count / total) * 100) }
    })
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count)
}

export function buildAnalytics(orders: Order[]) {
  const totalOrders = orders.length
  const totalDrinks = orders.filter((o) => o.drink !== 'none').length
  const totalSides = orders.filter((o) => o.side !== 'none').length
  const totalBurgers = orders.length // one burger per order in this flow

  const proteins = tally(orders, (o) => [o.burger.protein], PROTEINS)
  const cheeses = tally(
    orders,
    (o) => (o.burger.cheese === 'none' ? [] : [o.burger.cheese]),
    CHEESES,
  )
  const sauces = tally(
    orders,
    (o) => o.burger.sauces.filter((s) => s !== 'none'),
    SAUCES,
  )
  const sides = tally(orders, (o) => [o.side], SIDES as { id: string; label: string }[])
  const drinks = tally(orders, (o) => [o.drink], DRINKS as { id: string; label: string }[])

  // Ingredient usage = vegetables + cheeses + sauces + extras consumption
  const ingredientUsage = tally(
    orders,
    (o) => [
      ...o.burger.vegetables,
      ...(o.burger.cheese !== 'none' ? [o.burger.cheese] : []),
      ...o.burger.sauces.filter((s) => s !== 'none'),
      ...o.burger.extras,
    ],
    [...VEGETABLES, ...CHEESES, ...SAUCES, ...EXTRAS] as { id: string; label: string }[],
  )

  const mostPopularProtein = proteins[0]?.label ?? '—'
  const mostPopularSide = sides[0]?.label ?? '—'
  const mostPopularDrink = drinks.filter((d) => d.label !== 'No Drink')[0]?.label ?? '—'

  // Most popular burger name pattern (by protein + key extras)
  const nameCounts = new Map<string, number>()
  for (const o of orders) {
    const key = o.burgerName.replace(/^[^ ]+ /, '') // strip owner possessive
    nameCounts.set(key, (nameCounts.get(key) ?? 0) + 1)
  }
  const mostPopularBurger =
    [...nameCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'

  return {
    totalOrders,
    totalBurgers,
    totalDrinks,
    totalSides,
    proteins,
    cheeses,
    sauces,
    sides,
    drinks,
    ingredientUsage,
    mostPopularProtein,
    mostPopularSide,
    mostPopularDrink,
    mostPopularBurger,
  }
}

export const STATUS_META: Record<
  Order['status'],
  { label: string; tone: string; dot: string }
> = {
  pending: { label: 'Pending', tone: 'text-muted-foreground', dot: 'bg-muted-foreground' },
  preparing: { label: 'Preparing', tone: 'text-warning', dot: 'bg-warning' },
  ready: { label: 'Ready for Pickup', tone: 'text-success', dot: 'bg-success' },
  collected: { label: 'Collected', tone: 'text-muted-foreground', dot: 'bg-muted-foreground' },
}

export { labelFor }
