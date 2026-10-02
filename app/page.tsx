import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { BerniesWordmark, BerniesHomeLink, PoweredByIss } from '@/components/brand'
import { Button } from '@/components/ui/button'
import { EVENT } from '@/lib/store'
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  UtensilsCrossed,
  CupSoda,
  Sparkles,
  ClipboardList,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
        <div
          className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div className="flex flex-col items-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Village Event · Limited Seats
            </span>

            <div className="mt-6">
              <BerniesWordmark size="lg" className="block" />
              <PoweredByIss className="mt-2" />
            </div>

            <h1 className="mt-6 text-pretty font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Build Your Perfect Burger
            </h1>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Create your custom burger for Bernie&apos;s Burger Night at Oak Dam Village. No more
              walking the village. Order from your phone and track it live.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground">
                <CalendarDays className="h-4 w-4 text-primary" />
                {EVENT.date}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {EVENT.venue}
              </span>
            </div>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-13 min-h-13 rounded-full px-7 text-base font-semibold shadow-glow"
              >
                <Link href="/build">
                  Build My Burger
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 min-h-13 rounded-full px-7 text-base"
              >
                <Link href="/track">
                  <ClipboardList className="h-5 w-5" />
                  Track My Order
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero illustration */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 scale-90 rounded-full bg-primary/20 blur-3xl" aria-hidden />
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border bg-card shadow-glow">
              <Image
                src="/hero-burger.png"
                alt="A gourmet stacked cheeseburger with melted cheese, beef patty and fresh toppings"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 28rem"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-3 backdrop-blur-md">
                <div>
                  <p className="text-xs text-muted-foreground">Tonight&apos;s special</p>
                  <p className="font-heading font-bold">The Oak Dam Stacker</p>
                </div>
                <span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
                  Chef&apos;s pick
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-24">
        <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
          How burger night works
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm leading-relaxed text-muted-foreground">
          Three quick steps from craving to collection.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <StepCard
            icon={<UtensilsCrossed className="h-5 w-5" />}
            step="01"
            title="Build it your way"
            desc="Stack your bun, protein, cheese, veg, sauces and extras with a live visual preview."
          />
          <StepCard
            icon={<CupSoda className="h-5 w-5" />}
            step="02"
            title="Add sides & a drink"
            desc="Pick chips or a garden salad and grab a cold drink from Bernie's Café."
          />
          <StepCard
            icon={<ClipboardList className="h-5 w-5" />}
            step="03"
            title="Track to pickup"
            desc="Submit and watch your order move from pending to ready, right on your phone."
          />
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center sm:px-6">
          <BerniesHomeLink size="sm" />
          <PoweredByIss />
          <p className="text-xs text-muted-foreground">
            Powered by ISS · Oak Dam Village · Created by Lucas De Rossa
          </p>
        </div>
      </footer>
    </div>
  )
}

function StepCard({
  icon,
  step,
  title,
  desc,
}: {
  icon: React.ReactNode
  step: string
  title: string
  desc: string
}) {
  return (
    <div className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          {icon}
        </span>
        <span className="font-mono text-sm text-muted-foreground">{step}</span>
      </div>
      <h3 className="mt-4 font-heading text-lg font-bold">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  )
}
