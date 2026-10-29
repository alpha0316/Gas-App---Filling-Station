import { MagnifyingGlassIcon, BellIcon, QuestionIcon, SquaresFourIcon } from "@phosphor-icons/react";

const CRUMBS = {
  home: "Home",
  orders: "Orders",
  map: "Map",
  analytics: "Analytics",
};

export default function Topbar({ activePage, hasNewOrder, onBellClick }) {
  return (
    <header className="sticky top-0 z-10 bg-surface/80 backdrop-blur-sm pt-6 pb-4 px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <span>{CRUMBS[activePage]}</span>
          <span className="w-1 h-1 rounded-full bg-muted" />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <MagnifyingGlassIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search"
              className="w-64 pl-9 pr-14 py-2 text-sm rounded-[8px] border border-border bg-page outline-none focus:border-accent transition-colors"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-medium text-muted bg-page border border-border rounded-[5px] px-1.5 py-0.5">
              ⌘K
            </span>
          </div>

          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-page border border-border hover:bg-[#eceef0] transition-colors">
            <QuestionIcon size={17} className="text-muted" />
          </button>

          <button
            onClick={onBellClick}
            className="relative w-9 h-9 flex items-center justify-center rounded-full bg-page border border-border hover:bg-[#eceef0] transition-colors"
          >
            <BellIcon size={17} className="text-muted" />
            {hasNewOrder && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center">
                <span className="absolute w-3.5 h-3.5 rounded-full bg-accent animate-ping opacity-60" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-accent border-2 border-page" />
              </span>
            )}
          </button>

          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-page border border-border hover:bg-[#eceef0] transition-colors">
            <SquaresFourIcon size={16} className="text-muted" />
          </button>
        </div>
      </div>
    </header>
  );
}
