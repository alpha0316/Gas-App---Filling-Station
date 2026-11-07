import Header from "../components/Header";
import StatCards from "../components/StatCards";
import OrderList from "../components/OrderList";
import { useActiveOrders } from "../../features/station/hooks";
import { useUiStore } from "../../features/station/uiStore";

export default function MobileHome() {
  const { data: orders = [] } = useActiveOrders();
  const selectedIds = useUiStore((s) => s.selectedIds);
  const toggleSelected = useUiStore((s) => s.toggleSelected);
  const showDetails = useUiStore((s) => s.showDetails);

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <Header title="Home" />
      <StatCards />
      <OrderList
        orders={orders}
        selectedIds={selectedIds}
        onSelect={(o) => toggleSelected(o.id)}
        onLongPress={showDetails}
      />
    </div>
  );
}
