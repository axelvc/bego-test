import { Order } from '@/services/orders/orders.types'
import { create } from 'zustand'

interface OrderState {
  orders: Order[]
  filteredOrders: Order[]
  setOrders: (orders: Order[]) => void
  setFilteredOrders: (orders: Order[]) => void
}

export const useOrderState = create<OrderState>((set) => ({
  orders: [],
  filteredOrders: [],
  setOrders(orders) {
    set({ orders, filteredOrders: orders })
  },
  setFilteredOrders(filteredOrders) {
    set({ filteredOrders })
  },
}))
