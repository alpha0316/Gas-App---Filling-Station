import { useState } from "react";
import { Search, Calendar } from "lucide-react";
import Header, { HeaderBadge } from "../components/Header";
import OrderList from "../components/OrderList";
import { MOBILE_ORDERS } from "../data";

const TABS = [
  { key: "incoming", label: "Incoming" },
  { key: "filled", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function MobileOrders({ selectedIds, onSelect, onLongPress }) {
  const [tab, setTab] = useState("incoming");
  const orders = MOBILE_ORDERS.filter((o) => o.status === tab);

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <Header
        title="Orders"
        right={
          <button className="w-9 h-9 flex items-center justify-center">
            <Search size={18} className="text-ink" />
          </button>
        }
      />

      <div className="flex items-center gap-2 px-5 pb-3">
        <div className="flex-1 flex items-center gap-1 bg-[#ECECEC] rounded-full p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-1.5 rounded-full text-sm font-medium transition-colors ${
                tab === t.key ? "bg-white text-ink shadow-sm" : "text-muted"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <HeaderBadge>
          <Calendar size={15} className="text-muted" />
        </HeaderBadge>
      </div>

      <OrderList
        orders={orders}
        selectedIds={selectedIds}
        onSelect={onSelect}
        onLongPress={onLongPress}
        showHeading={false}
      />
    </div>
  );
}
