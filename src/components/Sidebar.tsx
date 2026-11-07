import { NavLink } from "react-router-dom";
import { ChartBarIcon, FlameIcon, SignOutIcon } from "@phosphor-icons/react";
import { HomeIcon, OrdersIcon, MapIcon, type NavIconProps } from "./NavIcons";
import { useAuthStore } from "../features/auth/store";
import { useMyStation } from "../features/station/hooks";
import { formatCoords } from "../features/station/format";

function AnalyticsIcon({ active, size = 22 }: NavIconProps) {
  return (
    <ChartBarIcon
      size={size}
      weight={active ? "fill" : "regular"}
      color={active ? "#0088FF" : "rgba(0,0,0,0.5)"}
    />
  );
}

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: HomeIcon },
  { to: "/orders", label: "Orders", icon: OrdersIcon },
  { to: "/map", label: "Map", icon: MapIcon },
  { to: "/analytics", label: "Analytics", icon: AnalyticsIcon },
];

export default function Sidebar() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const { data: station } = useMyStation();
  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : "";

  return (
    <aside className="w-[257px] shrink-0 h-screen sticky top-0 bg-surface border-r border-border flex flex-col">
      <div className="flex items-center gap-2 px-5 pt-6 pb-5">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <rect x="6" y="2" width="8" height="16" rx="3" fill="#1a73e8" />
          <rect x="8" y="0" width="4" height="4" rx="1.5" fill="#1a73e8" />
        </svg>
        <span className="font-bold text-[17px] tracking-tight">Gears</span>
      </div>

      <div className="mx-4 mb-4 flex items-center gap-2.5 rounded-[10px] border border-border bg-page px-3 py-2.5 min-w-0">
        <div className="w-8 h-8 rounded-[9px] bg-surface border border-border flex items-center justify-center shrink-0 shadow-sm">
          <FlameIcon size={15} weight="fill" color="#F2461A" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{station?.name ?? "Filling Station"}</p>
          {station && <p className="text-xs text-muted truncate">{formatCoords(station.lat, station.lng)}</p>}
        </div>
      </div>

      <nav className="flex-1 px-3 flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent-tint text-accent"
                  : "text-muted hover:bg-page hover:text-ink"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} active={isActive} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-border flex items-center gap-3">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-accent-tint text-accent flex items-center justify-center font-semibold text-sm">
            {(user?.firstName[0] ?? "").toUpperCase()}
          </div>
          <span className="absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-surface" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold truncate">{fullName}</p>
          <p className="text-xs text-muted truncate">{user?.email ?? user?.phoneNumber}</p>
        </div>
        <button onClick={signOut} aria-label="Sign out" className="text-muted hover:text-ink">
          <SignOutIcon size={18} />
        </button>
      </div>
    </aside>
  );
}
