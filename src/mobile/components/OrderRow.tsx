import { useRef } from "react";
import { CheckIcon } from "@phosphor-icons/react";
import { formatMoney } from "../../lib/money";
import { orderRef, relativeTime, riderName, sizeLabel } from "../../features/station/format";
import type { StationOrder } from "../../features/station/types";

const LONG_PRESS_MS = 500;

interface OrderRowProps {
  order: StationOrder;
  selected: boolean;
  onSelect: (order: StationOrder) => void;
  onLongPress: (order: StationOrder) => void;
}

export default function OrderRow({ order, selected, onSelect, onLongPress }: OrderRowProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
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
          <CheckIcon size={12} weight="bold" />
        </span>
      ) : (
        <span className="w-5 h-5 rounded-full border-[1.5px] border-black/15 shrink-0" />
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{orderRef(order)}</p>
        <p className="text-xs text-muted truncate">
          {sizeLabel(order.cylinderSize)} · {riderName(order)}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className="text-sm font-semibold">{formatMoney(order.gasTotal, order.currency)}</p>
        <p className="text-xs text-muted">{relativeTime(order.createdAt)}</p>
      </div>
    </button>
  );
}
