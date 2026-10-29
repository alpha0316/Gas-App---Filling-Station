import StatCard from "../components/StatCard";
import OrderCard from "../components/OrderCard";
import StatusChip from "../components/StatusChip";
import { TODAY_ORDERS, ALL_ORDERS, totalRevenue } from "../data/mockData";

export default function HomePage() {
  const todayRevenue = totalRevenue(TODAY_ORDERS);
  const allRevenue = totalRevenue(ALL_ORDERS);
  const incoming = TODAY_ORDERS.filter((o) => o.status === "incoming");
  const earlierFilled = TODAY_ORDERS.filter((o) => o.status === "filled");

  return (
    <div className="px-8 pb-10">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Good Afternoon, Afia</h1>

      <div className="flex bg-surface border border-border rounded-card mb-8 overflow-hidden">
        <StatCard label="Total Orders" value={ALL_ORDERS.length} />
        <StatCard label="Orders Today" value={TODAY_ORDERS.length} />
        <StatCard label="Total Revenue" value={`₵${allRevenue.toLocaleString()}`} />
        <StatCard label="Today's Revenue" value={`₵${todayRevenue.toLocaleString()}`} last />
      </div>

      <section className="mb-8">
        <h2 className="text-base font-semibold mb-4">Today's Orders</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {incoming.map((order) => (
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
                  <p className="font-medium text-sm">{order.customer}</p>
                  <p className="text-xs text-muted">
                    {order.id} · {order.rider} · {order.time}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold">₵{order.price + order.tip}</span>
                  <StatusChip status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
