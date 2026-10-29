import Header from "../components/Header";
import StatCards from "../components/StatCards";
import OrderList from "../components/OrderList";
import { INCOMING_ORDERS } from "../data";

export default function MobileHome({ selectedIds, onSelect, onLongPress }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <Header title="Home" />
      <StatCards />
      <OrderList
        orders={INCOMING_ORDERS}
        selectedIds={selectedIds}
        onSelect={onSelect}
        onLongPress={onLongPress}
      />
    </div>
  );
}
