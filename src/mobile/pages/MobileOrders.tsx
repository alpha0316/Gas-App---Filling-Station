import { useState } from "react";
import { MagnifyingGlassIcon, CalendarIcon } from "@phosphor-icons/react";
import Header, { HeaderBadge } from "../components/Header";
import OrderList from "../components/OrderList";
import { useAllOrders } from "../../features/station/hooks";
import { useUiStore } from "../../features/station/uiStore";
import { uiStatus, type UiStatus } from "../../features/station/format";

const TABS: { key: UiStatus; label: string }[] = [
  { key: "incoming", label: "Incoming" },
  { key: "filled", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function MobileOrders() {
  const [tab, setTab] = useState<UiStatus>("incoming");
  const { data } = useAllOrders(1);
  const orders = (data?.orders ?? []).filter((o) => uiStatus(o) === tab);
  const selectedIds = useUiStore((s) => s.selectedIds);
  const toggleSelected = useUiStore((s) => s.toggleSelected);
  const showDetails = useUiStore((s) => s.showDetails);

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <Header
        title="Orders"
        right={
          <button aria-label="Search" className="w-9 h-9 flex items-center justify-center">
            <MagnifyingGlassIcon size={18} className="text-ink" />
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
          <CalendarIcon size={15} className="text-muted" />
        </HeaderBadge>
      </div>

      <OrderList
        orders={orders}
        selectedIds={selectedIds}
        onSelect={(o) => toggleSelected(o.id)}
        onLongPress={showDetails}
        showHeading={false}
      />
    </div>
  );
}
