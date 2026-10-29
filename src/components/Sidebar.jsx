import { ChartBarIcon, CaretUpDownIcon, FlameIcon } from "@phosphor-icons/react";
import { HomeIcon, OrdersIcon, MapIcon } from "../mobile/components/icons";

function AnalyticsIcon({ active, size = 22 }) {
  return (
    <ChartBarIcon
      size={size}
      weight={active ? "fill" : "regular"}
      color={active ? "#0088FF" : "rgba(0,0,0,0.5)"}
    />
  );
}

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: HomeIcon },
  { key: "orders", label: "Orders", icon: OrdersIcon },
  { key: "map", label: "Map", icon: MapIcon },
  { key: "analytics", label: "Analytics", icon: AnalyticsIcon },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="w-[257px] shrink-0 h-screen sticky top-0 bg-surface border-r border-border flex flex-col">
      <div className="flex items-center gap-2 px-5 pt-6 pb-5">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="6" y="2" width="8" height="16" rx="3" fill="#1a73e8" />
          <rect x="8" y="0" width="4" height="4" rx="1.5" fill="#1a73e8" />
        </svg>
        <span className="font-bold text-[17px] tracking-tight">Gears</span>
      </div>

      <button className="mx-4 mb-4 flex items-center justify-between gap-2 rounded-[10px] border border-border bg-page px-3 py-2.5 text-left hover:bg-[#eceef0] transition-colors">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-[9px] bg-surface border border-border flex items-center justify-center shrink-0 shadow-sm">
            <FlameIcon size={15} weight="fill" color="#F2461A" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">Adum Gas Station</p>
            <p className="text-xs text-muted truncate">Adum Kumasi</p>
          </div>
        </div>
        <CaretUpDownIcon size={16} className="text-muted shrink-0" />
      </button>

      <nav className="flex-1 px-3 flex flex-col gap-1">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const active = activePage === key;
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-colors ${
                active
                  ? "bg-accent-tint text-accent"
                  : "text-muted hover:bg-page hover:text-ink"
              }`}
            >
              <Icon size={18} active={active} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-border flex items-center gap-3">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-accent-tint text-accent flex items-center justify-center font-semibold text-sm">
            E
          </div>
          <span className="absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-surface" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">Essandoh Prince</p>
          <p className="text-xs text-muted truncate">Princeessandoh@gmail.com</p>
        </div>
      </div>
    </aside>
  );
}
