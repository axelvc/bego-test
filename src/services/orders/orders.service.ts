import { Order, OrdersResponse, OrderDetailsResponse, OrderDetails } from './orders.types'
export * from './orders.types'

const API = 'https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/'

export async function getOrders(): Promise<Order[]> {
  const res = await fetch(`${API}/orders/upcoming`)
  const json: OrdersResponse = await res.json()

  return json.result
}

export async function getOrder(_id: string): Promise<OrderDetails> {
  const res = await fetch(`${API}/orders/`)
  const json: OrderDetailsResponse = await res.json()

  return json.result
}
