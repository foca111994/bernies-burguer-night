/**
 * Bernie's Burger Night — conceptual data models.
 *
 * These types are intentionally shaped to map cleanly onto future Supabase
 * tables. Each interface below corresponds to a planned table:
 *
 *   events       -> Event
 *   residents    -> Resident   (embedded on orders for the prototype)
 *   ingredients  -> Ingredient (catalog / option list)
 *   orders       -> Order
 *   order_items  -> derived from Order.burger selections
 *
 * For this production-quality prototype all data lives client-side (see
 * lib/store.tsx) so the full workflow is demonstrable end to end without a
 * backend. Swapping the store for Supabase queries requires no UI changes.
 */

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'collected'

export type IngredientCategory =
  | 'bun'
  | 'protein'
  | 'cheese'
  | 'vegetable'
  | 'sauce'
  | 'extra'

export interface Ingredient {
  id: string
  label: string
  category: IngredientCategory
  /** relative stack height contribution, used for the live size estimate */
  thickness?: number
  /** hex/oklch token reference for the pseudo-3D layer */
  color?: string
}

export interface BurgerSelection {
  bun: string
  protein: string
  cheese: string
  vegetables: string[]
  sauces: string[]
  extras: string[]
}

export type SideChoice = 'chips' | 'salad' | 'none'
export type DrinkChoice =
  | 'coca-cola'
  | 'coca-cola-zero'
  | 'coke-no-sugar'
  | 'sprite'
  | 'fanta'
  | 'none'

export interface Resident {
  firstName: string
  lastName: string
  company: string
  roomNumber: string
  notes?: string
}

export interface Order {
  id: string
  orderNumber: number
  resident: Resident
  burger: BurgerSelection
  burgerName: string
  side: SideChoice
  drink: DrinkChoice
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

export interface Event {
  id: string
  name: string
  venue: string
  date: string
  acceptingOrders: boolean
  estimatedWaitMinutes: number
}
