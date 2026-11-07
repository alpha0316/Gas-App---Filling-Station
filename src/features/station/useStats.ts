import { useState } from 'react'
import { formatMoney } from '../../lib/money'
import { useAnalytics } from './hooks'
import { utcDay } from './format'

const DAY_MS = 86_400_000

// The API has no all-time totals. "Total" uses the longest range it allows (366 days).
export function useStats() {
  // Fixed at mount. A page left open past midnight UTC needs a reload.
  const [{ today, start }] = useState(() => {
    const now = new Date()
    return { today: utcDay(now), start: utcDay(new Date(now.getTime() - 365 * DAY_MS)) }
  })
  const todayQuery = useAnalytics({ from: today, to: today })
  const totalQuery = useAnalytics({ from: start, to: today })

  const money = (minor: number | undefined, currency: string | undefined) =>
    minor === undefined || !currency ? '—' : formatMoney(minor, currency)

  return {
    totalOrders: totalQuery.data ? String(totalQuery.data.totals.orders) : '—',
    ordersToday: todayQuery.data ? String(todayQuery.data.totals.orders) : '—',
    totalRevenue: money(totalQuery.data?.totals.revenue, totalQuery.data?.currency),
    todayRevenue: money(todayQuery.data?.totals.revenue, todayQuery.data?.currency),
  }
}
