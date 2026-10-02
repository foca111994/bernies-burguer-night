import type { BurgerSelection, DrinkChoice, SideChoice } from './types'

export interface Option {
  id: string
  label: string
  /** layer fill color for the pseudo-3D burger stack (CSS color) */
  color?: string
  /** secondary color for shading */
  shade?: string
  thickness?: number
  desc?: string
  /** realistic layer image (single layer ingredients) */
  img?: string
  /** realistic bun crown image */
  imgTop?: string
  /** realistic bun heel image */
  imgBottom?: string
}

const ING = '/ingredients'

export const BUNS: Option[] = [
  { id: 'classic', label: 'Classic Sesame Bun', color: '#d59b56', shade: '#b97f3c', desc: 'Soft & toasted', imgTop: `${ING}/bun-classic-top.png`, imgBottom: `${ING}/bun-classic-bottom.png` },
  { id: 'brioche', label: 'Brioche Bun', color: '#e0aa5e', shade: '#c48d44', desc: 'Buttery & golden', imgTop: `${ING}/bun-brioche-top.png`, imgBottom: `${ING}/bun-brioche-bottom.png` },
  { id: 'sesame', label: 'Potato Bun', color: '#e6cfa3', shade: '#cdb487', desc: 'Soft & pillowy', imgTop: `${ING}/bun-potato-top.png`, imgBottom: `${ING}/bun-potato-bottom.png` },
]

export const PROTEINS: Option[] = [
  { id: 'beef', label: 'Beef Patty', color: '#6e3d24', shade: '#552d19', thickness: 22, desc: 'House char grilled', img: `${ING}/patty-beef.png` },
  { id: 'angus', label: 'Angus Beef', color: '#5f3320', shade: '#462415', thickness: 24, desc: 'Premium 150g', img: `${ING}/patty-beef.png` },
  { id: 'minced-beef', label: 'Minced Beef', color: '#73422a', shade: '#592f1c', thickness: 20, desc: 'Seasoned mince', img: `${ING}/patty-beef.png` },
  { id: 'minced-pork', label: 'Minced Pork', color: '#9a6147', shade: '#7c4a34', thickness: 20, desc: 'Juicy & tender', img: `${ING}/patty-pork.png` },
  { id: 'chicken', label: 'Chicken Patty', color: '#c79a5b', shade: '#a87f44', thickness: 20, desc: 'Crispy fillet', img: `${ING}/patty-chicken.png` },
  { id: 'veggie', label: 'Vegetarian Patty', color: '#7d8a3f', shade: '#63702f', thickness: 20, desc: 'Plant based', img: `${ING}/patty-veggie.png` },
  { id: 'double-beef', label: 'Double Beef', color: '#6e3d24', shade: '#552d19', thickness: 40, desc: 'Two stacked patties', img: `${ING}/patty-beef.png` },
]

export const CHEESES: Option[] = [
  { id: 'cheddar', label: 'Cheddar', color: '#f2a83a', shade: '#d68f2a', thickness: 8, desc: 'Sharp & melty', img: `${ING}/cheese-cheddar.png` },
  { id: 'american', label: 'American Cheese', color: '#f7b94d', shade: '#e0a437', thickness: 8, desc: 'Classic melt', img: `${ING}/cheese-american.png` },
  { id: 'swiss', label: 'Swiss Cheese', color: '#f3d98a', shade: '#dcc06a', thickness: 8, desc: 'Nutty & mild', img: `${ING}/cheese-swiss.png` },
  { id: 'none', label: 'No Cheese', thickness: 0, desc: 'Skip the cheese' },
]

export const VEGETABLES: Option[] = [
  { id: 'lettuce', label: 'Lettuce', color: '#7cb342', shade: '#5f9230', thickness: 7, img: `${ING}/veg-lettuce.png` },
  { id: 'tomato', label: 'Tomato', color: '#d6452f', shade: '#b53623', thickness: 7, img: `${ING}/veg-tomato.png` },
  { id: 'onion', label: 'Onion', color: '#e7d6e3', shade: '#cbb6c6', thickness: 5, img: `${ING}/veg-onion.png` },
  { id: 'pickles', label: 'Pickles', color: '#8a9a3a', shade: '#6e7c2d', thickness: 5, img: `${ING}/veg-pickles.png` },
  { id: 'jalapenos', label: 'Jalapeños', color: '#4f8f2e', shade: '#3c7022', thickness: 5, img: `${ING}/veg-jalapenos.png` },
]

export const SAUCES: Option[] = [
  { id: 'bbq', label: 'BBQ Sauce', color: '#6b2d18', shade: '#522111', thickness: 4 },
  { id: 'tomato', label: 'Tomato Sauce', color: '#c0341f', shade: '#9e2917', thickness: 4 },
  { id: 'mustard', label: 'Mustard', color: '#e0b020', shade: '#c39717', thickness: 4 },
  { id: 'aioli', label: 'Aioli', color: '#f0e6c4', shade: '#d8cda6', thickness: 4 },
  { id: 'burger-sauce', label: 'Burger Sauce', color: '#f2a65a', shade: '#d88f45', thickness: 4 },
  { id: 'none', label: 'No Sauce', thickness: 0 },
]

export const EXTRAS: Option[] = [
  { id: 'bacon', label: 'Bacon', color: '#a8412a', shade: '#8a3320', thickness: 8, img: `${ING}/extra-bacon.png` },
  { id: 'extra-cheese', label: 'Extra Cheese', color: '#f7b94d', shade: '#e0a437', thickness: 7, img: `${ING}/cheese-cheddar.png` },
  { id: 'double-patty', label: 'Double Patty', color: '#6e3d24', shade: '#552d19', thickness: 22, img: `${ING}/patty-beef.png` },
  { id: 'fried-egg', label: 'Fried Egg', color: '#f6e7a8', shade: '#e8d27a', thickness: 9, img: `${ING}/extra-egg.png` },
]

export const SIDES: { id: SideChoice; label: string; desc: string; img?: string }[] = [
  { id: 'chips', label: 'Chips', desc: 'Golden, crispy fries', img: '/chips.png' },
  { id: 'salad', label: 'Garden Salad', desc: 'Fresh seasonal greens', img: '/garden-salad.png' },
  { id: 'none', label: 'No Side', desc: 'Just the burger' },
]

export const DRINKS: { id: DrinkChoice; label: string; price: number; color: string; img?: string; desc?: string }[] = [
  { id: 'coca-cola',      label: 'Coca-Cola',       price: 3.5, color: '#d8312b', img: '/coca-cola.png',      desc: 'Classic original' },
  { id: 'coca-cola-zero', label: 'Coca-Cola Zero',   price: 3.5, color: '#1a1a1a', img: '/coca-cola-zero.png', desc: 'Zero sugar' },
  { id: 'coke-no-sugar',  label: 'Coke No Sugar',    price: 3.5, color: '#c0c0c0', img: '/coke-no-sugar.png',  desc: 'No sugar, no calories' },
  { id: 'sprite',         label: 'Sprite',           price: 3.5, color: '#2f8f4e', img: '/sprite.png',         desc: 'Crisp lemon lime' },
  { id: 'fanta',          label: 'Fanta',            price: 3.5, color: '#f08020', img: '/fanta.png',          desc: 'Orange burst' },
  { id: 'none',           label: 'No Drink',         price: 0,   color: '#555' },
]

export const COMPANIES = ['ISS', 'BHP', 'Programmed', 'Onsite Rental Group', 'Other']

export function findOption(list: Option[], id: string): Option | undefined {
  return list.find((o) => o.id === id)
}

export function labelFor(list: { id: string; label: string }[], id: string): string {
  return list.find((o) => o.id === id)?.label ?? id
}

export const DEFAULT_BURGER: BurgerSelection = {
  bun: 'brioche',
  protein: 'beef',
  cheese: 'cheddar',
  vegetables: ['lettuce', 'tomato'],
  sauces: [],
  extras: [],
}

/** Build a dynamic, fun burger name from the selections. */
export function generateBurgerName(firstName: string, b: BurgerSelection): string {
  const owner = firstName.trim() ? `${firstName.trim()}'s` : 'The'
  const adjectives: string[] = []

  if (b.extras.includes('double-patty') || b.protein === 'double-beef') adjectives.push('Double')
  if (b.extras.includes('bacon')) adjectives.push('Smoky')
  if (b.vegetables.includes('jalapenos')) adjectives.push('Fiery')
  if (b.protein === 'veggie') adjectives.push('Garden')
  if (b.extras.includes('fried-egg')) adjectives.push('Brunch')

  const proteinWord =
    {
      beef: 'Beef',
      angus: 'Angus',
      'minced-beef': 'Beef',
      'minced-pork': 'Pork',
      chicken: 'Chicken',
      veggie: 'Veggie',
      'double-beef': 'Beef',
    }[b.protein] ?? 'Beef'

  const tier = adjectives.length >= 2 ? 'Ultimate' : adjectives.length === 1 ? 'Signature' : 'Classic'
  const adj = adjectives[0] ? `${adjectives[0]} ` : ''
  return `${owner} ${tier} ${adj}${proteinWord} Burger`
}

/** Compact human-readable summary of a burger, e.g. for chef cards. */
export function burgerSummary(b: BurgerSelection): string {
  const parts: string[] = []
  parts.push(labelFor(BUNS, b.bun))
  parts.push(labelFor(PROTEINS, b.protein))
  if (b.cheese !== 'none') parts.push(labelFor(CHEESES, b.cheese))
  if (b.vegetables.length) parts.push(b.vegetables.map((v) => labelFor(VEGETABLES, v)).join(', '))
  const sauces = b.sauces.filter((s) => s !== 'none')
  if (sauces.length) parts.push(sauces.map((s) => labelFor(SAUCES, s)).join(', '))
  if (b.extras.length) parts.push('+ ' + b.extras.map((e) => labelFor(EXTRAS, e)).join(', '))
  return parts.join(' · ')
}

/** Estimate the burger height in mm for a fun "size" readout. */
export function estimateBurgerSize(b: BurgerSelection): number {
  let mm = 40 // two buns
  mm += findOption(PROTEINS, b.protein)?.thickness ?? 20
  mm += findOption(CHEESES, b.cheese)?.thickness ?? 0
  for (const v of b.vegetables) mm += findOption(VEGETABLES, v)?.thickness ?? 0
  for (const s of b.sauces) mm += findOption(SAUCES, s)?.thickness ?? 0
  for (const e of b.extras) mm += findOption(EXTRAS, e)?.thickness ?? 0
  return mm
}
