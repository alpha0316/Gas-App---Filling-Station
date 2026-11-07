import { BicycleIcon } from "@phosphor-icons/react";
import { useActiveOrders } from "../features/station/hooks";
import { orderRef, riderName, sizeLabel } from "../features/station/format";

export default function MapPage() {
  const { data: orders = [] } = useActiveOrders();

  return (
    <div className="px-8 pb-10">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Map</h1>

      <div className="flex gap-6">
        <div className="flex-1 relative h-[560px] rounded-card border border-border bg-[#eaeef1] overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-40" aria-hidden>
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={`v${i}`} x1={`${i * 7.5}%`} y1="0" x2={`${i * 7.5}%`} y2="100%" stroke="#c9ced4" strokeWidth="1" />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="#c9ced4" strokeWidth="1" />
            ))}
          </svg>

          <div className="absolute bottom-4 left-4 bg-surface border border-border rounded-button px-3 py-2 text-xs text-muted shadow-sm">
            Live delivery map
          </div>
        </div>

        <div className="w-[320px] shrink-0 bg-surface border border-border rounded-card">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-sm">Active Deliveries</h2>
          </div>
          <div className="divide-y divide-border">
            {orders.map((o) => (
              <div key={o.id} className="px-5 py-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">{riderName(o)}</p>
                  <span className="text-xs font-semibold text-accent bg-accent-tint px-2 py-0.5 rounded-full">
                    {o.status === "filling" ? "Filling" : "Arrived"}
                  </span>
                </div>
                <p className="text-xs text-muted flex items-center gap-1">
                  <BicycleIcon size={12} /> {orderRef(o)} · {o.cylinderCount} × {sizeLabel(o.cylinderSize)}
                </p>
              </div>
            ))}
            {orders.length === 0 && <p className="px-5 py-4 text-sm text-muted">No orders here yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
