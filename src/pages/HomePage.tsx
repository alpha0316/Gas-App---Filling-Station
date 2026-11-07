import { useState } from "react";
import StatCard from "../components/StatCard";
import OrderCard from "../components/OrderCard";
import StatusChip from "../components/StatusChip";
import { useAuthStore } from "../features/auth/store";
import { useActiveOrders, useAllOrders } from "../features/station/hooks";
import { useStats } from "../features/station/useStats";
import { orderRef, relativeTime, riderName, uiStatus, utcDay } from "../features/station/format";
import { formatMoney } from "../lib/money";

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function HomePage() {
  const user = useAuthStore((s) => s.user);
  const stats = useStats();
  const active = useActiveOrders();
  const history = useAllOrders(1);

  const activeIds = new Set((active.data ?? []).map((o) => o.id));
  const [today] = useState(() => utcDay(new Date()));
  const earlierFilled = (history.data?.orders ?? []).filter(
    (o) => !activeIds.has(o.id) && uiStatus(o) === "filled" && o.createdAt.startsWith(today),
  );

  return (
    <div className="px-8 pb-10">
      <h1 className="text-2xl font-bold tracking-tight mb-6">
        {greeting()}, {user?.firstName}
      </h1>

      <div className="flex bg-page rounded-card mb-8 overflow-hidden">
        <StatCard label="Total Orders" value={stats.totalOrders} />
        <StatCard label="Orders Today" value={stats.ordersToday} />
        <StatCard label="Total Revenue" value={stats.totalRevenue} />
        <StatCard label="Today's Revenue" value={stats.todayRevenue} last />
      </div>

      <section className="mb-8">
        <h2 className="text-base font-semibold mb-4">Today's Orders</h2>
        {active.isError && <p role="alert" className="text-sm text-danger">Could not load orders.</p>}
        {active.data?.length === 0 && <p className="text-sm text-muted">No orders here yet.</p>}
        <div className="flex flex-wrap gap-4">
          {(active.data ?? []).map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </section>

      {earlierFilled.length > 0 && (
        <section>
          <h2 className="text-base font-semibold mb-4">Earlier Today</h2>
          <div className="bg-surface border border-border rounded-card divide-y divide-border">
            {earlierFilled.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="font-medium text-sm">{orderRef(order)}</p>
                  <p className="text-xs text-muted">
                    {riderName(order)} · {relativeTime(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold">{formatMoney(order.gasTotal, order.currency)}</span>
                  <StatusChip status={uiStatus(order)} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
