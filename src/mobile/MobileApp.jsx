import { useState } from "react";
import StatusBar from "./components/StatusBar";
import TabBar from "./components/TabBar";
import MarkFilledBar from "./components/MarkFilledBar";
import OrderDetailsCard from "./components/OrderDetailsCard";
import MobileHome from "./pages/MobileHome";
import MobileOrders from "./pages/MobileOrders";
import MobileMap from "./pages/MobileMap";
import { NEW_ORDER_REQUEST } from "./data";

const PAGES = {
  home: MobileHome,
  orders: MobileOrders,
  map: MobileMap,
};

const SELECTABLE_TABS = ["home", "orders"];

export default function MobileApp() {
  const [tab, setTab] = useState("home");
  const [selectedIds, setSelectedIds] = useState([]);
  const [detailsOrder, setDetailsOrder] = useState(null);

  const Page = PAGES[tab];

  function handleSelect(order) {
    setSelectedIds((ids) =>
      ids.includes(order.id) ? ids.filter((id) => id !== order.id) : [...ids, order.id]
    );
  }

  function handleLongPress() {
    setDetailsOrder(NEW_ORDER_REQUEST);
  }

  function closeDetails() {
    setDetailsOrder(null);
  }

  function handleMarkFilled() {
    setDetailsOrder(null);
    setSelectedIds([]);
  }

  function handleTabChange(key) {
    setTab(key);
    setSelectedIds([]);
    setDetailsOrder(null);
  }

  let footer;
  if (detailsOrder) {
    footer = <OrderDetailsCard order={detailsOrder} onMarkFilled={handleMarkFilled} />;
  } else if (selectedIds.length > 0 && SELECTABLE_TABS.includes(tab)) {
    footer = <MarkFilledBar onMarkFilled={handleMarkFilled} />;
  } else {
    footer = <TabBar active={tab} onChange={handleTabChange} />;
  }

  return (
    <div className="min-h-dvh bg-page sm:bg-[#d8dadd] sm:flex sm:items-center sm:justify-center sm:py-8">
      <div className="w-full h-dvh sm:w-93.75 sm:h-195 bg-page sm:rounded-[36px] sm:border sm:border-[#c4c7cc] sm:shadow-xl overflow-hidden flex flex-col relative">
        <div className="hidden sm:block">
          <StatusBar />
        </div>

        {SELECTABLE_TABS.includes(tab) ? (
          <Page selectedIds={selectedIds} onSelect={handleSelect} onLongPress={handleLongPress} />
        ) : (
          <Page />
        )}

        {detailsOrder && (
          <div onClick={closeDetails} className="absolute inset-0 bg-black/40 z-30" />
        )}

        <div className="relative z-40 px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {footer}
        </div>

        <div className="hidden sm:flex justify-center pb-2">
          <span className="w-33.5 h-1.25 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}
