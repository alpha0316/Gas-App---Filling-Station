import { useRef } from "react";
import { Check } from "lucide-react";

const LONG_PRESS_MS = 500;

export default function OrderRow({ order, selected, onSelect, onLongPress }) {
  const timerRef = useRef(null);
  const firedLongPress = useRef(false);

  function startPress() {
    firedLongPress.current = false;
    timerRef.current = setTimeout(() => {
      firedLongPress.current = true;
      onLongPress(order);
    }, LONG_PRESS_MS);
  }

  function cancelPress() {
    clearTimeout(timerRef.current);
  }

  function handleClick() {
    if (firedLongPress.current) return;
    onSelect(order);
  }

  return (
    <button
      onPointerDown={startPress}
      onPointerUp={cancelPress}
      onPointerLeave={cancelPress}
      onClick={handleClick}
      className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors select-none ${
        selected ? "bg-accent-tint" : "bg-transparent"
      }`}
    >
      {selected ? (
        <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center shrink-0">
          <Check size={12} strokeWidth={3} />
        </span>
      ) : (
        <span className="w-5 h-5 rounded-full border-[1.5px] border-black/15 shrink-0" />
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{order.customer}</p>
        <p className="text-xs text-muted truncate">
          {order.size} · {order.address}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className="text-sm font-semibold">₵{order.price}</p>
        <p className="text-xs text-muted">{order.time}</p>
      </div>
    </button>
  );
}
