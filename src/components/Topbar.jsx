import { Search, Bell, Settings, HelpCircle } from "lucide-react";

const CRUMBS = {
  home: "Home",
  orders: "Orders",
  map: "Map",
  analytics: "Analytics",
};

export default function Topbar({ activePage, hasNewOrder, onBellClick }) {
  return (
    <header className="sticky top-0 z-10 bg-page/80 backdrop-blur-sm pt-6 pb-4 px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-ink font-medium">{CRUMBS[activePage]}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search orders, riders…"
              className="w-64 pl-9 pr-3 py-2 text-sm rounded-[8px] border border-border bg-surface outline-none focus:border-accent transition-colors"
            />
          </div>

          <button
            onClick={onBellClick}
            className="relative w-9 h-9 flex items-center justify-center rounded-[8px] border border-border bg-surface hover:bg-page transition-colors"
          >
            <Bell size={17} className="text-muted" />
            {hasNewOrder && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center">
                <span className="absolute w-3.5 h-3.5 rounded-full bg-accent animate-ping opacity-60" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-accent border-2 border-page" />
              </span>
            )}
          </button>

          <button className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-border bg-surface hover:bg-page transition-colors">
            <Settings size={17} className="text-muted" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-border bg-surface hover:bg-page transition-colors">
            <HelpCircle size={17} className="text-muted" />
          </button>
        </div>
      </div>
    </header>
  );
}
