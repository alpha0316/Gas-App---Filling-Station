import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import NewOrderPanel from "./components/NewOrderPanel";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import MapPage from "./pages/MapPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import { TODAY_ORDERS } from "./data/mockData";

const PAGES = {
  home: HomePage,
  orders: OrdersPage,
  map: MapPage,
  analytics: AnalyticsPage,
};

const NEW_ORDER = TODAY_ORDERS[0];

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [panelOpen, setPanelOpen] = useState(false);
  const [hasNewOrder, setHasNewOrder] = useState(true);
  const [accepted, setAccepted] = useState(false);

  const Page = PAGES[activePage];

  function handleBellClick() {
    setPanelOpen(true);
    setHasNewOrder(false);
  }

  return (
    <div className="flex min-h-screen bg-page">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <main className="flex-1 min-w-0">
        <Topbar activePage={activePage} hasNewOrder={hasNewOrder} onBellClick={handleBellClick} />
        <Page />
      </main>

      <NewOrderPanel
        order={NEW_ORDER}
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        onAccept={() => setAccepted(true)}
        onDecline={() => setPanelOpen(false)}
        accepted={accepted}
      />
    </div>
  );
}
