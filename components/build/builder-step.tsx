'use client'

import { OptionTile } from '@/components/option-tile'
import {
  BUNS,
  PROTEINS,
  CHEESES,
  VEGETABLES,
  SAUCES,
  EXTRAS,
} from '@/lib/burger-options'
import type { BurgerSelection } from '@/lib/types'

function toggle(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
}

export function BuilderStep({
  burger,
  setBurger,
}: {
  burger: BurgerSelection
  setBurger: (b: BurgerSelection) => void
}) {
  return (
    <div className="flex flex-col gap-7">
      <Group title="Bun" hint="Choose one">
        {BUNS.map((o) => (
          <OptionTile
            key={o.id}
            label={o.label}
            desc={o.desc}
            image={o.imgTop}
            swatch={o.color}
            selected={burger.bun === o.id}
            onClick={() => setBurger({ ...burger, bun: o.id })}
          />
        ))}
      </Group>

      <Group title="Protein" hint="Choose one">
        {PROTEINS.map((o) => (
          <OptionTile
            key={o.id}
            label={o.label}
            desc={o.desc}
            image={o.img}
            swatch={o.color}
            selected={burger.protein === o.id}
            onClick={() => setBurger({ ...burger, protein: o.id })}
          />
        ))}
      </Group>

      <Group title="Cheese" hint="Choose one">
        {CHEESES.map((o) => (
          <OptionTile
            key={o.id}
            label={o.label}
            desc={o.desc}
            image={o.img}
            swatch={o.color}
            selected={burger.cheese === o.id}
            onClick={() => setBurger({ ...burger, cheese: o.id })}
          />
        ))}
      </Group>

      <Group title="Vegetables" hint="Pick any">
        {VEGETABLES.map((o) => (
          <OptionTile
            key={o.id}
            label={o.label}
            image={o.img}
            swatch={o.color}
            selected={burger.vegetables.includes(o.id)}
            onClick={() => setBurger({ ...burger, vegetables: toggle(burger.vegetables, o.id) })}
          />
        ))}
      </Group>

      <Group title="Sauces" hint="Pick any">
        {SAUCES.map((o) => (
          <OptionTile
            key={o.id}
            label={o.label}
            swatch={o.color}
            selected={
              o.id === 'none'
                ? burger.sauces.length === 0
                : burger.sauces.includes(o.id)
            }
            onClick={() =>
              o.id === 'none'
                ? setBurger({ ...burger, sauces: [] })
                : setBurger({ ...burger, sauces: toggle(burger.sauces, o.id) })
            }
          />
        ))}
      </Group>

      <Group title="Extras" hint="Pick any">
        {EXTRAS.map((o) => (
          <OptionTile
            key={o.id}
            label={o.label}
            image={o.img}
            swatch={o.color}
            selected={burger.extras.includes(o.id)}
            onClick={() => setBurger({ ...burger, extras: toggle(burger.extras, o.id) })}
          />
        ))}
      </Group>
    </div>
  )
}

function Group({
  title,
  hint,
  children,
}: {
  title: string
  hint: string
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="font-heading text-lg font-bold">{title}</h3>
        <span className="text-xs text-muted-foreground">{hint}</span>
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">{children}</div>
    </section>
  )
}
