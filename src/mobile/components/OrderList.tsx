import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import OrderRow from "./OrderRow";
import type { StationOrder } from "../../features/station/types";

interface OrderListProps {
  orders: StationOrder[];
  selectedIds: string[];
  onSelect: (order: StationOrder) => void;
  onLongPress: (order: StationOrder) => void;
  title?: string;
  showHeading?: boolean;
}

export default function OrderList({ orders, selectedIds, onSelect, onLongPress, title = "Incoming Orders", showHeading = true }: OrderListProps) {
  return (
    <div className="flex-1 min-h-0 flex flex-col">
      {showHeading && (
        <div className="flex items-center justify-between px-5 py-2">
          <h2 className="text-[15px] font-bold">{title}</h2>
          <MagnifyingGlassIcon size={17} className="text-muted" aria-hidden />
        </div>
      )}

      <div className="flex-1 overflow-y-auto divide-y divide-border border-t border-border">
        {orders.map((order) => (
          <OrderRow
            key={order.id}
            order={order}
            selected={selectedIds.includes(order.id)}
            onSelect={onSelect}
            onLongPress={onLongPress}
          />
        ))}
        {orders.length === 0 && (
          <p className="text-center text-sm text-muted py-10">No orders here yet.</p>
        )}
      </div>
    </div>
  );
}
