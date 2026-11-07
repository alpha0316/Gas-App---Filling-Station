import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import NewOrderPanel from "../components/NewOrderPanel";
import { useActiveOrders } from "../features/station/hooks";
import { useUiStore } from "../features/station/uiStore";

const TITLES: Record<string, string> = {
  "/": "Home",
  "/orders": "Orders",
  "/map": "Map",
  "/analytics": "Analytics",
};

export default function DesktopShell() {
  const { pathname } = useLocation();
  const panelOpen = useUiStore((s) => s.panelOpen);
  const hasNewOrder = useUiStore((s) => s.hasNewOrder);
  const openPanel = useUiStore((s) => s.openPanel);
  const closePanel = useUiStore((s) => s.closePanel);
  const { data: active = [] } = useActiveOrders();

  // The panel shows the most recently created active order.
  const latest = [...active].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] ?? null;

  return (
    <div className="flex min-h-screen bg-page">
      <Sidebar />

      <main className="flex-1 min-w-0 bg-surface">
        <Topbar title={TITLES[pathname] ?? ""} hasNewOrder={hasNewOrder} onBellClick={openPanel} />
        <Outlet />
      </main>

      <NewOrderPanel order={latest} open={panelOpen} onClose={closePanel} />
    </div>
  );
}
