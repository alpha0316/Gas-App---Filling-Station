import { api } from '../../lib/api/client'
import type { OtpChannel, Station, User } from '../../lib/api/types'

export interface AuthResult {
  token: string
  user: User
}

export const requestOtp = (channel: OtpChannel, target: string) =>
  api<void>('/auth/otp/request', { method: 'POST', body: { channel, target } })

export const verifyOtp = (input: { channel: OtpChannel; target: string; code: string }) =>
  api<AuthResult>('/auth/otp/verify', { method: 'POST', body: input })

export const passwordLogin = (input: { identifier: string; password: string }) =>
  api<AuthResult>('/auth/login', { method: 'POST', body: input })

export const getMe = () => api<{ user: User }>('/me').then((r) => r.user)

// `station` is only present for role `station`.
export const getMyStation = () => api<{ station?: Station }>('/me').then((r) => r.station ?? null)
