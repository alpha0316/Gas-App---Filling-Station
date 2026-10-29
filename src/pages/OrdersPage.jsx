import { useState, Fragment } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import StatusChip from "../components/StatusChip";
import { ALL_ORDERS, PRICES } from "../data/mockData";

const TABS = [
  { key: "all", label: "All" },
  { key: "incoming", label: "Incoming" },
  { key: "filled", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function OrdersPage() {
  const [tab, setTab] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const orders = ALL_ORDERS.filter((o) => tab === "all" || o.status === tab);

  return (
    <div className="px-8 pb-10">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Orders</h1>

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

      <div className="bg-surface border border-border rounded-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted text-xs uppercase tracking-wide">
              <th className="py-3 px-5 font-medium">Customer</th>
              <th className="py-3 px-5 font-medium">Rider</th>
              <th className="py-3 px-5 font-medium">Address</th>
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
                    <td className="py-3.5 px-5 font-medium">{order.customer}</td>
                    <td className="py-3.5 px-5 text-muted">{order.rider}</td>
                    <td className="py-3.5 px-5 text-muted">{order.address}</td>
                    <td className="py-3.5 px-5 text-muted">{order.size}</td>
                    <td className="py-3.5 px-5 font-medium">₵{order.price + order.tip}</td>
                    <td className="py-3.5 px-5 text-muted">{order.time}</td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <StatusChip status={order.status} />
                        <CaretDownIcon
                          size={14}
                          className={`text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="border-b border-border last:border-0 bg-page/40">
                      <td colSpan={7} className="px-5 py-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-xs text-muted mb-1">Order ID</p>
                            <p className="font-medium">{order.id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted mb-1">Phone</p>
                            <p className="font-medium">{order.phone}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted mb-1">Cylinders</p>
                            <p className="font-medium">
                              {order.cylinders} × {order.size} (₵{PRICES[order.size]} each)
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted mb-1">Tip</p>
                            <p className="font-medium">{order.tip > 0 ? `₵${order.tip}` : "—"}</p>
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
      </div>
    </div>
  );
}
