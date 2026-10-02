'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { BurgerStack } from '@/components/burger-stack'
import { OrderTracker } from '@/components/order-tracker'
import { OrderSummary } from '@/components/order-summary'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useOrders, EVENT } from '@/lib/store'
import { STATUS_META } from '@/lib/analytics'
import { CheckCircle2, Clock, PartyPopper } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function OrderPage() {
  const { orders, hydrated, estimatedWaitMinutes } = useOrders()
  const [id, setId] = useState('')
  const [queryReady, setQueryReady] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setId(searchParams.get('id') ?? '')
    const newOrder = searchParams.get('new') === '1'
    setIsNew(newOrder)
    setShowConfetti(newOrder)
    setQueryReady(true)
  }, [])

  const order = orders.find((o) => o.id === id)

  useEffect(() => {
    if (!showConfetti) return
    const t = setTimeout(() => setShowConfetti(false), 2500)
    return () => clearTimeout(t)
  }, [showConfetti])

  if (!hydrated || !queryReady) {
    return (
      <div className="min-h-dvh">
        <SiteHeader />
        <div className="mx-auto max-w-2xl px-4 py-20 text-center text-muted-foreground">
          Loading order…
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-dvh">
        <SiteHeader />
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <h1 className="font-heading text-2xl font-bold">Order not found</h1>
          <p className="mt-2 text-muted-foreground">
            We couldn&apos;t find that order. It may have been reset.
          </p>
          <Button asChild className="mt-6 rounded-full">
            <Link href="/build">Build a new burger</Link>
          </Button>
        </div>
      </div>
    )
  }

  const meta = STATUS_META[order.status]
  const waitLabel =
    order.status === 'ready'
      ? 'Ready now'
      : order.status === 'collected'
        ? 'Collected'
        : `~${estimatedWaitMinutes} min`

  return (
    <div className="min-h-dvh">
      <SiteHeader />

      {showConfetti && <Confetti />}

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {isNew && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-success/40 bg-success/10 p-4">
            <CheckCircle2 className="h-6 w-6 text-success" />
            <div>
              <p className="font-heading text-lg font-bold text-success">Order Received</p>
              <p className="text-sm text-muted-foreground">
                The kitchen has your order. Hang tight!
              </p>
            </div>
          </div>
        )}

        {/* Status hero card */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-glow">
          <div className="flex flex-col items-center gap-4 border-b border-border/60 bg-grid p-6 sm:flex-row sm:items-stretch">
            <div className="flex w-full items-center justify-center sm:w-44">
              <BurgerStack burger={order.burger} size="sm" />
            </div>
            <div className="flex flex-1 flex-col items-center text-center sm:items-start sm:text-left">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-muted-foreground">
                  Order #{order.orderNumber}
                </span>
                <Badge
                  variant="outline"
                  className={cn('gap-1.5 border-border', meta.tone)}
                >
                  <span className={cn('h-2 w-2 rounded-full', meta.dot)} />
                  {meta.label}
                </Badge>
              </div>
              <h1 className="mt-1 font-heading text-2xl font-bold text-primary">
                {order.burgerName}
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {order.resident.firstName} {order.resident.lastName} · Room{' '}
                {order.resident.roomNumber}
              </p>
              <div className="mt-3 flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Estimated wait:</span>
                <span className="font-semibold">{waitLabel}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="mb-4 font-heading text-lg font-bold">Order status</h2>
            <OrderTracker status={order.status} />
          </div>
        </div>

        {/* Full summary */}
        <div className="mt-6">
          <h2 className="mb-3 font-heading text-lg font-bold">Order details</h2>
          <OrderSummary
            burger={order.burger}
            burgerName={order.burgerName}
            side={order.side}
            drink={order.drink}
            resident={order.resident}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outline" className="h-12 min-h-12 flex-1 rounded-full">
            <Link href="/track">Track Order board</Link>
          </Button>
          <Button asChild className="h-12 min-h-12 flex-1 rounded-full">
            <Link href="/build">Order another</Link>
          </Button>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {EVENT.name} · {EVENT.venue}. This page updates live as the kitchen works through orders.
        </p>
      </div>
    </div>
  )
}

function Confetti() {
  const pieces = Array.from({ length: 40 })
  const colors = ['#f2a83a', '#d6452f', '#7cb342', '#f7b94d', '#e0aa5e']
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-24 -translate-x-1/2">
        <PartyPopper className="h-8 w-8 text-primary" />
      </div>
      {pieces.map((_, i) => (
        <span
          key={i}
          className="absolute top-0 block h-2 w-2 animate-[fall_2.4s_ease-in_forwards] rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            background: colors[i % colors.length],
            animationDelay: `${Math.random() * 0.6}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
      <style>{`@keyframes fall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }`}</style>
    </div>
  )
}
