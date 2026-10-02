'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { SiteHeader } from '@/components/site-header'
import { BurgerStack } from '@/components/burger-stack'
import { BuilderStep } from '@/components/build/builder-step'
import { SidesDrinksStep } from '@/components/build/sides-drinks-step'
import { DetailsStep } from '@/components/build/details-step'
import { OrderSummary } from '@/components/order-summary'
import { Button } from '@/components/ui/button'
import { useOrders } from '@/lib/store'
import {
  DEFAULT_BURGER,
  generateBurgerName,
  estimateBurgerSize,
  SIDES,
  DRINKS,
} from '@/lib/burger-options'
import type { BurgerSelection, DrinkChoice, Resident, SideChoice } from '@/lib/types'
import { ArrowLeft, ArrowRight, Ruler } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = ['Burger', 'Sides & Drink', 'Details', 'Review'] as const

export default function BuildPage() {
  const router = useRouter()
  const { addOrder, acceptingOrders } = useOrders()

  const [step, setStep] = useState(0)
  const [burger, setBurger] = useState<BurgerSelection>(DEFAULT_BURGER)
  const [side, setSide] = useState<SideChoice>('chips')
  const [drink, setDrink] = useState<DrinkChoice>('coca-cola')
  const [resident, setResident] = useState<Resident>({
    firstName: '',
    lastName: '',
    company: '',
    roomNumber: '',
    notes: '',
  })

  const burgerName = useMemo(
    () => generateBurgerName(resident.firstName, burger),
    [resident.firstName, burger],
  )
  const size = useMemo(() => estimateBurgerSize(burger), [burger])

  const detailsValid =
    resident.firstName.trim() &&
    resident.lastName.trim() &&
    resident.company &&
    resident.roomNumber.trim()

  function next() {
    if (step === 2 && !detailsValid) {
      toast.error('Please complete your name, company and room number.')
      return
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function back() {
    if (step === 0) {
      router.push('/')
      return
    }
    setStep((s) => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function submit() {
    if (!acceptingOrders) {
      toast.error('Orders are currently closed for this event.')
      return
    }
    const order = addOrder({ resident, burger, side, drink })
    router.push(`/order?id=${encodeURIComponent(order.id)}&new=1`)
  }

  return (
    <div className="min-h-dvh">
      <SiteHeader />

      {/* Step indicator */}
      <div className="sticky top-16 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:px-6">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors',
                    i < step && 'bg-primary text-primary-foreground',
                    i === step && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
                    i > step && 'bg-secondary text-muted-foreground',
                  )}
                >
                  {i + 1}
                </span>
                <span
                  className={cn(
                    'hidden text-sm font-medium sm:inline',
                    i === step ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span
                  className={cn(
                    'h-0.5 flex-1 rounded-full transition-colors',
                    i < step ? 'bg-primary' : 'bg-border',
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_360px] lg:py-10">
        {/* Live preview — first on mobile, sticky on desktop */}
        <aside className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-36">
            {/* Derive selected side/drink images for the meal preview */}
            {(() => {
              const sideData = SIDES.find((s) => s.id === side)
              const drinkData = DRINKS.find((d) => d.id === drink)
              const hasSide = !!sideData?.img
              const hasDrink = !!drinkData?.img
              return (
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-glow">
                  {/* Meal preview — burger centered, side left, drink right */}
                  <div className="relative bg-grid pb-4 pt-6">
                    <div
                      className="absolute inset-x-0 top-0 h-40 bg-primary/10 blur-2xl"
                      aria-hidden
                    />
                    {/* Burger is always the centered hero */}
                    <div className="relative flex justify-center">
                      <BurgerStack burger={burger} size="lg" />
                    </div>

                    {/* Side (left) and Drink (right): absolutely anchored to bottom of preview */}
                    {(hasSide || hasDrink) && (
                      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-end justify-between px-4 sm:px-6">

                        {/* Side — normalized 96×96 display box */}
                        <div
                          className="burger-float h-24 w-24 shrink-0"
                          style={{ animationDelay: '0.15s', animationDuration: '4.4s' }}
                        >
                          {hasSide && (
                            <img
                              src={sideData!.img}
                              alt={sideData!.label}
                              className="h-full w-full object-contain drop-shadow-xl"
                              draggable={false}
                              style={{
                                WebkitTouchCallout: 'none',
                                WebkitUserSelect: 'none',
                                userSelect: 'none',
                                pointerEvents: 'none',
                              }}
                            />
                          )}
                        </div>

                        {/* Drink — normalized 80×96 display box (all cans same size) */}
                        <div
                          className="burger-float h-24 w-20 shrink-0"
                          style={{ animationDelay: '0.35s', animationDuration: '3.8s' }}
                        >
                          {hasDrink && (
                            <img
                              src={drinkData!.img}
                              alt={drinkData!.label}
                              className="h-full w-full object-contain drop-shadow-xl"
                              draggable={false}
                              style={{
                                WebkitTouchCallout: 'none',
                                WebkitUserSelect: 'none',
                                userSelect: 'none',
                                pointerEvents: 'none',
                              }}
                            />
                          )}
                        </div>

                      </div>
                    )}
                  </div>

                  {/* Info strip */}
                  <div className="border-t border-border/60 p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Now building
                    </p>
                    <p className="font-heading text-lg font-bold text-primary">{burgerName}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <Ruler className="h-4 w-4" />
                      Est. height {size}mm
                      {hasSide && (
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                          + {sideData!.label}
                        </span>
                      )}
                      {hasDrink && (
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                          + {drinkData!.label}
                        </span>
                      )}
                      <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-xs">
                        {burger.extras.length + burger.vegetables.length + burger.sauces.length} toppings
                      </span>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </aside>

        {/* Step content */}
        <main className="order-2 min-w-0 lg:order-1">
          {step === 0 && <BuilderStep burger={burger} setBurger={setBurger} />}
          {step === 1 && (
            <SidesDrinksStep side={side} setSide={setSide} drink={drink} setDrink={setDrink} />
          )}
          {step === 2 && <DetailsStep resident={resident} setResident={setResident} />}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-heading text-xl font-bold">Review your order</h3>
                <p className="text-sm text-muted-foreground">
                  Make sure everything looks right before you submit.
                </p>
              </div>
              <OrderSummary
                burger={burger}
                burgerName={burgerName}
                side={side}
                drink={drink}
                resident={resident}
              />
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-8 flex items-center gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={back}
              className="h-13 min-h-13 rounded-full px-5"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button
                size="lg"
                onClick={next}
                className="h-13 min-h-13 flex-1 rounded-full text-base font-semibold"
              >
                Continue
                <ArrowRight className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={submit}
                className="h-13 min-h-13 flex-1 rounded-full text-base font-semibold shadow-glow"
              >
                Submit Order
              </Button>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
