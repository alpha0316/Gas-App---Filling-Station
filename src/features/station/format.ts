import type { StationOrder } from './types'

export type UiStatus = 'incoming' | 'filled' | 'cancelled'

const SIZE_LABEL = { small: 'Small', medium: 'Medium', large: 'Large' } as const

export const sizeLabel = (size: StationOrder['cylinderSize']) => SIZE_LABEL[size]

export function uiStatus(order: StationOrder): UiStatus {
  if (order.status === 'cancelled' || order.status === 'refunded') return 'cancelled'
  if (order.filledAt || order.status === 'en_route_to_customer' || order.status === 'delivered') return 'filled'
  return 'incoming'
}

export const orderRef = (order: StationOrder) => `#${order.id.slice(-6).toUpperCase()}`

export const riderName = (order: StationOrder) =>
  order.rider ? `${order.rider.firstName} ${order.rider.lastName}`.trim() : 'Waiting for rider'

export function relativeTime(iso: string, now = Date.now()): string {
  const minutes = Math.max(0, Math.round((now - new Date(iso).getTime()) / 60_000))
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.floor(hours / 24)
  return days === 1 ? 'Yesterday' : `${days} days ago`
}

// Mark As Filled works only while the rider is at the station.
export const canMarkFilled = (order: StationOrder) => order.status === 'filling' && !order.filledAt

export function utcDay(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export const formatCoords = (lat: number, lng: number) => `${lat.toFixed(4)}, ${lng.toFixed(4)}`
