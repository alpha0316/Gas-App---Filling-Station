import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import StatusBar from "./components/StatusBar";
import TabBar from "./components/TabBar";
import MarkFilledBar from "./components/MarkFilledBar";
import OrderDetailsCard from "./components/OrderDetailsCard";
import { useMarkManyFilled } from "../features/station/hooks";
import { useUiStore } from "../features/station/uiStore";

const SELECTABLE_PATHS = ["/", "/orders"];
const PATH_TO_TAB: Record<string, string> = { "/": "home", "/orders": "orders", "/map": "map" };
const TAB_TO_PATH: Record<string, string> = { home: "/", orders: "/orders", map: "/map" };

export default function MobileShell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const selectedIds = useUiStore((s) => s.selectedIds);
  const detailsOrder = useUiStore((s) => s.detailsOrder);
  const hideDetails = useUiStore((s) => s.hideDetails);
  const clearSelection = useUiStore((s) => s.clearSelection);
  const markMany = useMarkManyFilled();

  const selectable = SELECTABLE_PATHS.includes(pathname);

  useEffect(() => {
    if (!detailsOrder) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hideDetails();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [detailsOrder, hideDetails]);

  function markFilled(ids: string[]) {
    markMany.mutate(ids, {
      onSuccess: () => {
        hideDetails();
        clearSelection();
      },
    });
  }

  function handleTabChange(key: string) {
    clearSelection();
    hideDetails();
    navigate(TAB_TO_PATH[key] ?? "/");
  }

  let footer;
  if (detailsOrder) {
    footer = (
      <OrderDetailsCard
        order={detailsOrder}
        onMarkFilled={() => markFilled([detailsOrder.id])}
        pending={markMany.isPending}
      />
    );
  } else if (selectedIds.length > 0 && selectable) {
    footer = <MarkFilledBar onMarkFilled={() => markFilled(selectedIds)} disabled={markMany.isPending} />;
  } else {
    footer = <TabBar active={PATH_TO_TAB[pathname] ?? "home"} onChange={handleTabChange} />;
  }

  return (
    <div className="min-h-dvh bg-page sm:bg-[#d8dadd] sm:flex sm:items-center sm:justify-center sm:py-8">
      <div className="w-full h-dvh sm:w-93.75 sm:h-195 bg-page sm:rounded-[36px] sm:border sm:border-[#c4c7cc] sm:shadow-xl overflow-hidden flex flex-col relative">
        <div className="hidden sm:block">
          <StatusBar />
        </div>

        <Outlet />

        {detailsOrder && (
          <div aria-hidden="true" onClick={hideDetails} className="absolute inset-0 bg-black/40 z-30" />
        )}

        <div className="relative z-40 px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {markMany.error && (
            <p role="alert" className="text-xs text-danger pb-2 text-center">
              {markMany.error.message}
            </p>
          )}
          {footer}
        </div>

        <div className="hidden sm:flex justify-center pb-2">
          <span className="w-33.5 h-1.25 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}
