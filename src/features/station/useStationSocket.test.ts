import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useStationSocket } from './useStationSocket'

const h = vi.hoisted(() => ({
  invalidate: vi.fn(),
  socket: null as null | {
    connected: boolean
    handlers: Record<string, () => void>
    on: (e: string, f: () => void) => void
    off: (e: string, f: () => void) => void
  },
}))

vi.mock('react', () => ({ useEffect: (fn: () => void) => fn() }))
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries: h.invalidate }),
}))
vi.mock('../../lib/socket', () => ({ getSocket: () => h.socket }))
vi.mock('./uiStore', () => ({ useUiStore: () => vi.fn() }))
vi.mock('./hooks', () => ({ stationKeys: { all: ['station'] } }))

const makeSocket = (connected: boolean) => {
  const handlers: Record<string, () => void> = {}
  return {
    connected,
    handlers,
    on: (e: string, f: () => void) => {
      handlers[e] = f
    },
    off: (e: string) => {
      delete handlers[e]
    },
  }
}

describe('useStationSocket', () => {
  beforeEach(() => h.invalidate.mockClear())

  it('refetches when the socket reconnects', () => {
    h.socket = makeSocket(true)
    useStationSocket()
    h.socket.handlers.connect()
    expect(h.invalidate).toHaveBeenCalledWith({ queryKey: ['station'] })
  })

  it('does not refetch on the first connect', () => {
    h.socket = makeSocket(false)
    useStationSocket()
    h.socket.handlers.connect()
    expect(h.invalidate).not.toHaveBeenCalled()
    h.socket.handlers.connect()
    expect(h.invalidate).toHaveBeenCalledTimes(1)
  })
})
