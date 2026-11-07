import { create } from 'zustand'
import type { StationOrder } from './types'

interface UiState {
  panelOpen: boolean
  // Set when a station:order event arrives. Cleared when the user opens the panel.
  hasNewOrder: boolean
  // Mobile: orders ticked in a list, and the order shown in the details sheet.
  selectedIds: string[]
  detailsOrder: StationOrder | null
  openPanel: () => void
  closePanel: () => void
  flagNewOrder: () => void
  toggleSelected: (id: string) => void
  clearSelection: () => void
  showDetails: (order: StationOrder) => void
  hideDetails: () => void
}

export const useUiStore = create<UiState>((set) => ({
  panelOpen: false,
  hasNewOrder: false,
  selectedIds: [],
  detailsOrder: null,
  openPanel: () => set({ panelOpen: true, hasNewOrder: false }),
  closePanel: () => set({ panelOpen: false }),
  flagNewOrder: () => set({ hasNewOrder: true }),
  toggleSelected: (id) =>
    set((s) => ({
      selectedIds: s.selectedIds.includes(id) ? s.selectedIds.filter((x) => x !== id) : [...s.selectedIds, id],
    })),
  clearSelection: () => set({ selectedIds: [] }),
  showDetails: (order) => set({ detailsOrder: order }),
  hideDetails: () => set({ detailsOrder: null }),
}))
