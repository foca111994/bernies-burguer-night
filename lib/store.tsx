'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { BurgerSelection, Order, OrderStatus, Resident, SideChoice, DrinkChoice, Event } from './types'
import { generateBurgerName } from './burger-options'

const STORAGE_KEY = 'bernies-orders-v1'
const DEVICE_KEY = 'bernies-device-orders-v1'

export const EVENT: Event = {
  id: 'evt-oak-dam-burger-night',
  name: "Bernie's Burger Night",
  venue: 'Oak Dam Village',
  date: 'Friday, 18 July · 5:30 PM to 8:00 PM',
  acceptingOrders: true,
  estimatedWaitMinutes: 15,
}

function now() {
  return new Date().toISOString()
}

function minutesAgo(min: number) {
  return new Date(Date.now() - min * 60_000).toISOString()
}

/** Seeded realistic mock orders so chef + kitchen views look alive on first load. */
function seedOrders(): Order[] {
  const base: Omit<Order, 'orderNumber' | 'id' | 'burgerName'>[] = [
    {
      resident: { firstName: 'Mark', lastName: 'Thompson', company: 'BHP', roomNumber: 'B-114', notes: '' },
      burger: { bun: 'sesame', protein: 'angus', cheese: 'cheddar', vegetables: ['lettuce', 'tomato', 'onion'], sauces: ['bbq'], extras: ['bacon'] },
      side: 'chips', drink: 'coca-cola', status: 'ready', createdAt: minutesAgo(22), updatedAt: minutesAgo(4),
    },
    {
      resident: { firstName: 'Chris', lastName: 'Bennett', company: 'ISS', roomNumber: 'A-007', notes: 'No onion please' },
      burger: { bun: 'brioche', protein: 'beef', cheese: 'american', vegetables: ['lettuce', 'pickles'], sauces: ['burger-sauce'], extras: [] },
      side: 'chips', drink: 'sprite', status: 'ready', createdAt: minutesAgo(19), updatedAt: minutesAgo(3),
    },
    {
      resident: { firstName: 'Lucas', lastName: 'Doyle', company: 'Programmed', roomNumber: 'C-231', notes: '' },
      burger: { bun: 'brioche', protein: 'double-beef', cheese: 'cheddar', vegetables: ['lettuce', 'tomato', 'onion', 'jalapenos'], sauces: ['bbq', 'aioli'], extras: ['bacon', 'extra-cheese'] },
      side: 'chips', drink: 'coca-cola-zero', status: 'preparing', createdAt: minutesAgo(11), updatedAt: minutesAgo(2),
    },
    {
      resident: { firstName: 'Sarah', lastName: 'Mills', company: 'ISS', roomNumber: 'A-118', notes: '' },
      burger: { bun: 'classic', protein: 'chicken', cheese: 'swiss', vegetables: ['lettuce', 'tomato'], sauces: ['aioli'], extras: ['fried-egg'] },
      side: 'salad', drink: 'fanta', status: 'preparing', createdAt: minutesAgo(9), updatedAt: minutesAgo(1),
    },
    {
      resident: { firstName: 'Dale', lastName: 'Roberts', company: 'Onsite Rental Group', roomNumber: 'D-045', notes: 'Extra crispy bacon' },
      burger: { bun: 'sesame', protein: 'beef', cheese: 'cheddar', vegetables: ['onion', 'pickles'], sauces: ['bbq'], extras: ['bacon'] },
      side: 'chips', drink: 'coke-no-sugar', status: 'pending', createdAt: minutesAgo(5), updatedAt: minutesAgo(5),
    },
    {
      resident: { firstName: 'Priya', lastName: 'Sharma', company: 'BHP', roomNumber: 'B-220', notes: '' },
      burger: { bun: 'brioche', protein: 'veggie', cheese: 'none', vegetables: ['lettuce', 'tomato', 'onion'], sauces: ['aioli'], extras: [] },
      side: 'salad', drink: 'none', status: 'pending', createdAt: minutesAgo(3), updatedAt: minutesAgo(3),
    },
    {
      resident: { firstName: 'Jake', lastName: 'Nguyen', company: 'ISS', roomNumber: 'A-052', notes: '' },
      burger: { bun: 'sesame', protein: 'minced-pork', cheese: 'american', vegetables: ['lettuce', 'onion'], sauces: ['mustard', 'tomato'], extras: ['double-patty'] },
      side: 'chips', drink: 'coca-cola', status: 'collected', createdAt: minutesAgo(34), updatedAt: minutesAgo(20),
    },
    {
      resident: { firstName: 'Emma', lastName: 'Wright', company: 'Programmed', roomNumber: 'C-103', notes: '' },
      burger: { bun: 'classic', protein: 'beef', cheese: 'cheddar', vegetables: ['lettuce', 'tomato', 'pickles'], sauces: ['burger-sauce'], extras: [] },
      side: 'none', drink: 'sprite', status: 'collected', createdAt: minutesAgo(40), updatedAt: minutesAgo(25),
    },
  ]
  return base.map((o, i) => ({
    ...o,
    id: `seed-${i + 1}`,
    orderNumber: 121 + i,
    burgerName: generateBurgerName(o.resident.firstName, o.burger),
  }))
}

interface NewOrderInput {
  resident: Resident
  burger: BurgerSelection
  side: SideChoice
  drink: DrinkChoice
}

interface StoreValue {
  orders: Order[]
  deviceOrderIds: string[]
  acceptingOrders: boolean
  estimatedWaitMinutes: number
  hydrated: boolean
  addOrder: (input: NewOrderInput) => Order
  updateStatus: (id: string, status: OrderStatus) => void
  setAcceptingOrders: (v: boolean) => void
  setEstimatedWaitMinutes: (v: number) => void
  resetDemo: () => void
}

const StoreContext = createContext<StoreValue | null>(null)

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [deviceOrderIds, setDeviceOrderIds] = useState<string[]>([])
  const [acceptingOrders, setAccepting] = useState(EVENT.acceptingOrders)
  const [estimatedWaitMinutes, setWait] = useState(EVENT.estimatedWaitMinutes)
  const [hydrated, setHydrated] = useState(false)

  // hydrate from localStorage (prototype persistence; Supabase-ready)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        setOrders(parsed.orders ?? seedOrders())
        setAccepting(parsed.acceptingOrders ?? true)
        setWait(parsed.estimatedWaitMinutes ?? EVENT.estimatedWaitMinutes)
      } else {
        setOrders(seedOrders())
      }
      const dev = localStorage.getItem(DEVICE_KEY)
      if (dev) setDeviceOrderIds(JSON.parse(dev))
    } catch {
      setOrders(seedOrders())
    }
    setHydrated(true)
  }, [])

  // persist
  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ orders, acceptingOrders, estimatedWaitMinutes }),
    )
  }, [orders, acceptingOrders, estimatedWaitMinutes, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(DEVICE_KEY, JSON.stringify(deviceOrderIds))
  }, [deviceOrderIds, hydrated])

  // cross-tab sync (resident phone, chef laptop, kitchen TV)
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          setOrders(parsed.orders ?? [])
          setAccepting(parsed.acceptingOrders ?? true)
          setWait(parsed.estimatedWaitMinutes ?? EVENT.estimatedWaitMinutes)
        } catch {}
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const addOrder = useCallback((input: NewOrderInput): Order => {
    const order: Order = {
      id: `ord-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      orderNumber: 0, // assigned in setOrders below
      resident: input.resident,
      burger: input.burger,
      burgerName: generateBurgerName(input.resident.firstName, input.burger),
      side: input.side,
      drink: input.drink,
      status: 'pending',
      createdAt: now(),
      updatedAt: now(),
    }
    setOrders((prev) => {
      const nextNumber = prev.reduce((m, o) => Math.max(m, o.orderNumber), 120) + 1
      order.orderNumber = nextNumber
      return [...prev, order]
    })
    setDeviceOrderIds((prev) => [...prev, order.id])
    return order
  }, [])

  const updateStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status, updatedAt: now() } : o)),
    )
  }, [])

  const resetDemo = useCallback(() => {
    setOrders(seedOrders())
    setDeviceOrderIds([])
    setAccepting(true)
    setWait(EVENT.estimatedWaitMinutes)
  }, [])

  const value = useMemo<StoreValue>(
    () => ({
      orders,
      deviceOrderIds,
      acceptingOrders,
      estimatedWaitMinutes,
      hydrated,
      addOrder,
      updateStatus,
      setAcceptingOrders: setAccepting,
      setEstimatedWaitMinutes: setWait,
      resetDemo,
    }),
    [orders, deviceOrderIds, acceptingOrders, estimatedWaitMinutes, hydrated, addOrder, updateStatus, resetDemo],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useOrders() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider')
  return ctx
}
