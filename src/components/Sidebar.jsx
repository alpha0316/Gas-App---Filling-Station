import { Home, Package, Map, BarChart3, ChevronsUpDown } from "lucide-react";

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: Home },
  { key: "orders", label: "Orders", icon: Package },
  { key: "map", label: "Map", icon: Map },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="w-[257px] shrink-0 h-screen sticky top-0 bg-surface border-r border-border flex flex-col">
      <div className="flex items-center gap-2 px-5 pt-6 pb-5">
        <div className="w-7 h-7 rounded-[8px] bg-accent" />
        <span className="font-bold text-[17px] tracking-tight">Gears</span>
      </div>

      <button className="mx-4 mb-4 flex items-center justify-between gap-2 rounded-[10px] border border-border bg-page px-3 py-2.5 text-left hover:bg-[#eceef0] transition-colors">
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">Adum Gas Station</p>
          <span className="inline-block mt-1 text-[11px] font-medium text-accent bg-accent-tint px-2 py-0.5 rounded-full">
            Filling Station
          </span>
        </div>
        <ChevronsUpDown size={16} className="text-muted shrink-0" />
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
              <Icon size={18} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-border flex items-center gap-3">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-accent-tint text-accent flex items-center justify-center font-semibold text-sm">
            AO
          </div>
          <span className="absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-surface" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">Afia Owusu</p>
          <p className="text-xs text-muted truncate">afia.owusu@gasapp.gh</p>
        </div>
      </div>
    </aside>
  );
}
