import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { getSocket } from '../../lib/socket'
import { stationKeys } from './hooks'
import { useUiStore } from './uiStore'

// Refetches station data on every status change of an order at the station.
export function useStationSocket(): void {
  const queryClient = useQueryClient()
  const flagNewOrder = useUiStore((s) => s.flagNewOrder)

  useEffect(() => {
    const socket = getSocket()
    if (!socket) return
    const onOrder = () => {
      flagNewOrder()
      void queryClient.invalidateQueries({ queryKey: stationKeys.all })
    }
    // Events sent while the socket was down are lost, so refetch on reconnect.
    // The first connect is skipped because the queries already fetch on mount.
    let seenConnect = socket.connected
    const onConnect = () => {
      if (!seenConnect) {
        seenConnect = true
        return
      }
      void queryClient.invalidateQueries({ queryKey: stationKeys.all })
    }
    socket.on('station:order', onOrder)
    socket.on('connect', onConnect)
    return () => {
      socket.off('station:order', onOrder)
      socket.off('connect', onConnect)
    }
  }, [queryClient, flagNewOrder])
}
