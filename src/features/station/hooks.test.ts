import { describe, expect, it, vi } from 'vitest'
import { useMarkManyFilled } from './hooks'

const h = vi.hoisted(() => ({ markFilled: vi.fn() }))

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
  useMutation: (opts: unknown) => opts,
  useQuery: vi.fn(),
}))
vi.mock('../auth/api', () => ({ getMyStation: vi.fn() }))
vi.mock('./api', () => ({
  markFilled: h.markFilled,
  createStationOrder: vi.fn(),
  fetchActiveOrders: vi.fn(),
  fetchAllOrders: vi.fn(),
  fetchAnalytics: vi.fn(),
}))

describe('useMarkManyFilled', () => {
  it('reports every failure in one error', async () => {
    h.markFilled.mockImplementation(async (id: string) => {
      if (id !== 'b') throw new Error(`bad ${id}`)
    })
    const { mutationFn } = useMarkManyFilled() as unknown as { mutationFn: (ids: string[]) => Promise<void> }
    await expect(mutationFn(['a', 'b', 'c'])).rejects.toThrow('2 of 3 orders failed: bad a; bad c')
  })
})
