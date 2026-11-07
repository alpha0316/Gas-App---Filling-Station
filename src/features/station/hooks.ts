import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMyStation } from '../auth/api'
import {
  createStationOrder,
  fetchActiveOrders,
  fetchAllOrders,
  fetchAnalytics,
  markFilled,
} from './api'

export const stationKeys = {
  all: ['station'] as const,
  active: ['station', 'orders', 'active'] as const,
  history: (page: number) => ['station', 'orders', 'all', page] as const,
  analytics: (from?: string, to?: string) => ['station', 'analytics', from, to] as const,
}

export const useMyStation = () =>
  useQuery({ queryKey: ['station', 'me'] as const, queryFn: getMyStation, staleTime: 5 * 60_000 })

export const useActiveOrders = () => useQuery({ queryKey: stationKeys.active, queryFn: fetchActiveOrders })

export const useAllOrders = (page: number) =>
  useQuery({ queryKey: stationKeys.history(page), queryFn: () => fetchAllOrders(page) })

export const useAnalytics = (range?: { from: string; to: string }) =>
  useQuery({
    queryKey: stationKeys.analytics(range?.from, range?.to),
    queryFn: () => fetchAnalytics(range),
  })

export function useMarkFilled() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: markFilled,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: stationKeys.all }),
  })
}

// Marks several orders. A failed order does not stop the others.
export function useMarkManyFilled() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (ids: string[]) => {
      const results = await Promise.allSettled(ids.map(markFilled))
      const failed = results.filter((r) => r.status === 'rejected')
      if (failed.length > 0) {
        const messages = failed.map((r) => (r.reason instanceof Error ? r.reason.message : String(r.reason)))
        throw new Error(`${failed.length} of ${ids.length} orders failed: ${messages.join('; ')}`)
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: stationKeys.all }),
  })
}

export function useCreateStationOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createStationOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: stationKeys.all }),
  })
}
