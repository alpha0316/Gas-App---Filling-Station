import { HomeIcon, OrdersIcon, MapIcon } from "./icons";

const TABS = [
  { key: "home", label: "Home", Icon: HomeIcon },
  { key: "orders", label: "Orders", Icon: OrdersIcon },
  { key: "map", label: "Map", Icon: MapIcon },
];

export default function TabBar({ active, onChange }) {
  return (
    <div
      className="max-w-[250px] mx-auto flex items-center justify-between p-0.5 bg-white/90 rounded-[36px] shadow-[0_1px_4px_rgba(12,12,13,0.05),0_1px_4px_rgba(12,12,13,0.10)]"
    >
      {TABS.map(({ key, label, Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`flex-1 flex flex-col items-center gap-1 py-1 rounded-[32px] transition-colors ${
              isActive ? "bg-[#F4F4F4] px-2 shadow-[0_1px_4px_rgba(12,12,13,0.05),0_1px_4px_rgba(12,12,13,0.10)]" : "px-4"
            }`}
            style={isActive ? { outline: "2px solid white", outlineOffset: "-2px" } : undefined}
          >
            <Icon active={isActive} />
            <span className={`text-xs ${isActive ? "text-accent" : "text-black/50"}`}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
