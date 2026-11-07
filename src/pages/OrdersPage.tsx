import { useState, Fragment } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import StatusChip from "../components/StatusChip";
import NewStationOrderDialog from "../features/station/NewStationOrderDialog";
import { useAllOrders } from "../features/station/hooks";
import { orderRef, relativeTime, riderName, sizeLabel, uiStatus, type UiStatus } from "../features/station/format";
import { formatMoney } from "../lib/money";

const TABS: { key: "all" | UiStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "incoming", label: "Incoming" },
  { key: "filled", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function OrdersPage() {
  const [tab, setTab] = useState<"all" | UiStatus>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [creating, setCreating] = useState(false);
  const { data, isError } = useAllOrders(page);

  const orders = (data?.orders ?? []).filter((o) => tab === "all" || uiStatus(o) === tab);

  return (
    <div className="px-8 pb-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <button
          onClick={() => setCreating(true)}
          className="px-4 py-2 rounded-button bg-accent text-white text-sm font-semibold hover:bg-[#1558b0] transition-colors"
        >
          New Order
        </button>
      </div>

      <div className="flex gap-1.5 mb-5">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-button text-sm font-medium transition-colors ${
              tab === t.key
                ? "bg-accent text-white"
                : "bg-surface border border-border text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {isError && <p role="alert" className="text-sm text-danger mb-4">Could not load orders.</p>}

      <div className="bg-surface border border-border rounded-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted text-xs uppercase tracking-wide">
              <th className="py-3 px-5 font-medium">Order</th>
              <th className="py-3 px-5 font-medium">Rider</th>
              <th className="py-3 px-5 font-medium">Size</th>
              <th className="py-3 px-5 font-medium">Amount</th>
              <th className="py-3 px-5 font-medium">Time</th>
              <th className="py-3 px-5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const isOpen = expandedId === order.id;
              return (
                <Fragment key={order.id}>
                  <tr
                    onClick={() => setExpandedId(isOpen ? null : order.id)}
                    className="border-b border-border last:border-0 cursor-pointer hover:bg-page/60 transition-colors"
                  >
                    <td className="py-3.5 px-5 font-medium">
                      <button
                        aria-expanded={isOpen}
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(isOpen ? null : order.id);
                        }}
                      >
                        {orderRef(order)}
                      </button>
                    </td>
                    <td className="py-3.5 px-5 text-muted">{riderName(order)}</td>
                    <td className="py-3.5 px-5 text-muted">{sizeLabel(order.cylinderSize)}</td>
                    <td className="py-3.5 px-5 font-medium">{formatMoney(order.gasTotal, order.currency)}</td>
                    <td className="py-3.5 px-5 text-muted">{relativeTime(order.createdAt)}</td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <StatusChip status={uiStatus(order)} />
                        <CaretDownIcon
                          size={14}
                          className={`text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="border-b border-border last:border-0 bg-page/40">
                      <td colSpan={6} className="px-5 py-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-xs text-muted mb-1">Order ID</p>
                            <p className="font-medium">{order.id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted mb-1">Source</p>
                            <p className="font-medium">{order.source === "station" ? "Station" : "App"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted mb-1">Cylinders</p>
                            <p className="font-medium">
                              {order.cylinderCount} × {sizeLabel(order.cylinderSize)} (
                              {formatMoney(order.gasAmount, order.currency)} each)
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted mb-1">Vehicle</p>
                            <p className="font-medium">
                              {order.rider?.plateNumber
                                ? `${order.rider.vehicleType ?? ""} ${order.rider.plateNumber}`.trim()
                                : "—"}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
        {data && orders.length === 0 && (
          <p className="text-center text-sm text-muted py-10">No orders here yet.</p>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 mt-4">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-4 py-2 rounded-button bg-surface border border-border text-sm font-medium text-muted hover:text-ink disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!data?.hasMore}
          className="px-4 py-2 rounded-button bg-surface border border-border text-sm font-medium text-muted hover:text-ink disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {creating && <NewStationOrderDialog onClose={() => setCreating(false)} />}
    </div>
  );
}
