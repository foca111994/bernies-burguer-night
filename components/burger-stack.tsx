'use client'

import { cn } from '@/lib/utils'
import {
  BUNS,
  CHEESES,
  EXTRAS,
  PROTEINS,
  VEGETABLES,
  findOption,
} from '@/lib/burger-options'
import type { BurgerSelection } from '@/lib/types'

type StackLayer = { kind: 'img'; key: string; src: string; band: number; widthPct: number; alt: string }

/**
 * Build the burger layers from top to bottom for an exploded / separated view:
 * top bun → vegetables → cheese → extras → protein → bottom bun.
 * Sauces are intentionally not rendered as visual layers.
 */
function buildLayers(b: BurgerSelection): StackLayer[] {
  const layers: StackLayer[] = []
  const bun = findOption(BUNS, b.bun)

  // top bun crown
  if (bun?.imgTop) {
    layers.push({ kind: 'img', key: 'top-bun', src: bun.imgTop, band: 92, widthPct: 100, alt: `${bun.label} top` })
  }

  // vegetables
  for (const v of b.vegetables) {
    const o = findOption(VEGETABLES, v)
    if (o?.img)
      layers.push({
        kind: 'img',
        key: `veg-${v}`,
        src: o.img,
        band: v === 'lettuce' ? 46 : 38,
        widthPct: v === 'lettuce' ? 104 : 96,
        alt: o.label,
      })
  }

  // cheese
  if (b.cheese !== 'none') {
    const o = findOption(CHEESES, b.cheese)
    if (o?.img) layers.push({ kind: 'img', key: 'cheese', src: o.img, band: 40, widthPct: 102, alt: o.label })
  }

  // extras
  for (const e of b.extras) {
    const o = findOption(EXTRAS, e)
    if (o?.img)
      layers.push({
        kind: 'img',
        key: `extra-${e}`,
        src: o.img,
        band: e === 'double-patty' ? 56 : e === 'fried-egg' ? 46 : 38,
        widthPct: 98,
        alt: o.label,
      })
  }

  // protein
  const protein = findOption(PROTEINS, b.protein)
  if (protein?.img)
    layers.push({
      kind: 'img',
      key: 'protein',
      src: protein.img,
      band: b.protein === 'double-beef' ? 82 : 58,
      widthPct: 100,
      alt: protein.label,
    })

  // bottom bun heel
  if (bun?.imgBottom) {
    layers.push({ kind: 'img', key: 'bottom-bun', src: bun.imgBottom, band: 64, widthPct: 100, alt: `${bun.label} bottom` })
  }

  return layers
}

export function BurgerStack({
  burger,
  className,
  size = 'lg',
}: {
  burger: BurgerSelection
  className?: string
  size?: 'sm' | 'lg'
}) {
  const layers = buildLayers(burger)
  const width = size === 'lg' ? 300 : 168
  const scale = size === 'lg' ? 1 : 168 / 300
  // gap between separated layers (the "exploded" spacing)
  const gap = (size === 'lg' ? 14 : 9)

  return (
    <div className={cn('flex flex-col items-center justify-end', className)} aria-hidden>
      <div
        className="flex flex-col items-center"
        style={{ width, gap }}
      >
        {layers.map((l, i) => {
          const z = layers.length - i
          // stagger the float so layers bob in a gentle wave
          const delay = `${(i % 5) * 0.28}s`

          return (
            <img
              key={l.key}
              src={l.src || '/placeholder.svg'}
              alt={l.alt}
              className="burger-float animate-in fade-in zoom-in-95 duration-500 select-none"
              style={{
                width: `${l.widthPct}%`,
                height: l.band * scale,
                objectFit: 'contain',
                objectPosition: 'center',
                zIndex: z,
                animationDelay: delay,
                filter: 'drop-shadow(0 10px 9px rgba(0,0,0,0.4))',
                transition: 'all 320ms cubic-bezier(0.22, 1, 0.36, 1)',
                // Prevent iOS long-press save, drag, context menu, and selection
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          )
        })}
      </div>
      {/* floor shadow */}
      <div
        className="mt-3 rounded-[100%] bg-black/45 blur-md"
        style={{ width: width * 0.7, height: 16 * scale }}
      />
    </div>
  )
}
