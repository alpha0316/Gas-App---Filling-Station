import { Menu, Flame } from "lucide-react";

export function HeaderBadge({ children }) {
  return (
    <div className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center shadow-sm">
      {children}
    </div>
  );
}

export default function Header({ title, right }) {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <button className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center shadow-sm">
        <Menu size={16} className="text-ink" />
      </button>
      <h1 className="text-[17px] font-bold">{title}</h1>
      {right ?? (
        <HeaderBadge>
          <Flame size={17} className="text-[#F2461A]" fill="#F2461A" />
        </HeaderBadge>
      )}
    </div>
  );
}
