import type { CylinderSize, OrderStatus } from '../../lib/api/types'

export interface StationOrder {
  id: string
  status: OrderStatus
  source: 'app' | 'station'
  cylinderSize: CylinderSize
  cylinderCount: number
  isFullFill: boolean
  gasAmount: number
  gasTotal: number
  currency: string
  filledAt: string | null
  createdAt: string
  rider: {
    firstName: string
    lastName: string
    plateNumber?: string
    vehicleType?: string
  } | null
}

export interface OrdersPage {
  orders: StationOrder[]
  page: number
  hasMore: boolean
}

export interface StationAnalytics {
  range: { from: string; to: string; days: number }
  currency: string
  totals: { revenue: number; orders: number; cylinders: number; avgOrderValue: number }
  previous: { revenue: number; orders: number; cylinders: number }
  daily: { date: string; revenue: number; orders: number }[]
  topProducts: { size: CylinderSize; orders: number; cylinders: number; revenue: number }[]
  peakHours: { hour: number; orders: number }[]
}

export interface CreateStationOrderInput {
  customerPhone: string
  customerName?: string
  size: CylinderSize
  fullFill?: true
  gasAmount?: number
  cylinderCount?: number
  deliveryAddress: { label: string; lat: number; lng: number }
  riderInstructions?: string
}

export interface StationOrderPricing {
  gasAmount: number
  gasTotal: number
  distanceFee: number
  serviceFee: number
  tip: number
  total: number
  currency: string
}
