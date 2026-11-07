import { api } from '../../lib/api/client'
import type {
  CreateStationOrderInput,
  OrdersPage,
  StationAnalytics,
  StationOrder,
  StationOrderPricing,
} from './types'

export const fetchActiveOrders = () =>
  api<{ orders: StationOrder[] }>('/station/orders', { query: { scope: 'active' } }).then((r) => r.orders)

export const fetchAllOrders = (page: number) =>
  api<OrdersPage>('/station/orders', { query: { scope: 'all', page } })

export const markFilled = (orderId: string) =>
  api<{ order: StationOrder }>(`/station/orders/${orderId}/filled`, { method: 'POST' }).then((r) => r.order)

export const fetchAnalytics = (range?: { from: string; to: string }) =>
  api<StationAnalytics>('/station/analytics', { query: range })

export const createStationOrder = (input: CreateStationOrderInput) =>
  api<{ order: StationOrder; pricing: StationOrderPricing }>('/station/orders', {
    method: 'POST',
    body: input,
  })
