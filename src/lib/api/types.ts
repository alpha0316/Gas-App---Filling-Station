// Types match the JSON the gasapp API sends (gasapp-backend/docs/API.md).
export type Role = 'customer' | 'rider' | 'admin' | 'station'
export type OtpChannel = 'sms' | 'email'

export interface User {
  id: string
  role: Role
  phoneNumber?: string
  email?: string
  firstName: string
  lastName: string
}

export interface Station {
  id: string
  name: string
  lat: number
  lng: number
}

export type CylinderSize = 'small' | 'medium' | 'large'

export type OrderStatus =
  | 'pending_payment'
  | 'awaiting_rider'
  | 'rider_assigned'
  | 'picked_up'
  | 'filling'
  | 'en_route_to_customer'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
