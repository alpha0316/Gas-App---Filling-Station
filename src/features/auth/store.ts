import { create } from 'zustand'
import { setUnauthorizedHandler } from '../../lib/api/client'
import { clearToken, readToken, setToken } from '../../lib/api/tokenStorage'
import { disconnectSocket } from '../../lib/socket'
import type { User } from '../../lib/api/types'
import { getMe, type AuthResult } from './api'

export class NotStationError extends Error {
  constructor() {
    super('This account is not a station account.')
    this.name = 'NotStationError'
  }
}

interface AuthState {
  user: User | null
  // True while a stored token is checked with GET /me.
  loading: boolean
  init: () => Promise<void>
  // Throws when the account is not a station account. The token is not stored then.
  signIn: (result: AuthResult) => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: readToken() !== null,

  init: async () => {
    if (readToken() === null) {
      set({ loading: false })
      return
    }
    try {
      const user = await getMe()
      if (user.role !== 'station') {
        useAuthStore.getState().signOut()
        return
      }
      set({ user, loading: false })
    } catch {
      // A 401 already signed out through the 401 handler.
      // Other failures keep the stored token and show the login screen until reload.
      set({ loading: false })
    }
  },

  signIn: (result) => {
    if (result.user.role !== 'station') throw new NotStationError()
    setToken(result.token)
    set({ user: result.user, loading: false })
  },

  signOut: () => {
    clearToken()
    disconnectSocket()
    set({ user: null, loading: false })
  },
}))

setUnauthorizedHandler(() => useAuthStore.getState().signOut())
