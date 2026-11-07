import { beforeEach, describe, expect, it } from 'vitest'
import { readToken } from '../../lib/api/tokenStorage'
import type { User } from '../../lib/api/types'
import { NotStationError, useAuthStore } from './store'

const user = (role: User['role']): User => ({ id: 'u1', role, firstName: 'Ama', lastName: 'Mensah' })

describe('auth store', () => {
  beforeEach(() => useAuthStore.getState().signOut())

  it('stores the token and user for a station account', () => {
    useAuthStore.getState().signIn({ token: 't1', user: user('station') })
    expect(useAuthStore.getState().user?.role).toBe('station')
    expect(readToken()).toBe('t1')
  })

  it('rejects other roles and stores nothing', () => {
    expect(() => useAuthStore.getState().signIn({ token: 't2', user: user('customer') })).toThrow(NotStationError)
    expect(useAuthStore.getState().user).toBeNull()
    expect(readToken()).toBeNull()
  })

  it('clears user and token on sign out', () => {
    useAuthStore.getState().signIn({ token: 't3', user: user('station') })
    useAuthStore.getState().signOut()
    expect(useAuthStore.getState().user).toBeNull()
    expect(readToken()).toBeNull()
  })
})
