import { BicycleIcon, FlameIcon, PackageIcon } from "@phosphor-icons/react";
import { formatMoney } from "../lib/money";
import { canMarkFilled, orderRef, riderName, sizeLabel } from "../features/station/format";
import type { StationOrder } from "../features/station/types";
import { useMarkFilled } from "../features/station/hooks";
import { errorMessage } from "../lib/api/client";

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-8 h-8 rounded-[10px] bg-[#FAFAFA] flex items-center justify-center shrink-0">
      {children}
    </span>
  );
}

export default function OrderCard({ order }: { order: StationOrder }) {
  const markFilled = useMarkFilled();
  const filled = order.filledAt !== null;

  return (
    <div className="bg-surface border border-border rounded-card overflow-hidden w-[334px]">
      <div className="bg-[#FAFAFA] px-3 pt-3 pb-2">
        <div className="flex items-center justify-between px-1 mb-2">
          <div>
            <p className="font-medium text-sm">{orderRef(order)}</p>
          </div>
        </div>

        <div className="bg-surface rounded-[12px] border-t border-black/5 shadow-[0_1px_4px_rgba(12,12,13,0.05),0_1px_4px_rgba(12,12,13,0.10)] p-2 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-black/40 text-xs">
              <PackageIcon size={14} />
              <span>Order</span>
            </div>
            <p className="text-xs">
              <span className="font-medium text-ink">{order.cylinderCount} </span>
              <span className="text-black/50">cylinder{order.cylinderCount > 1 ? "s" : ""}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <IconBadge>
              <BicycleIcon size={16} className="text-accent" />
            </IconBadge>
            <div>
              <p className="text-[11px] uppercase text-black/50">Rider</p>
              <p className="text-[13px] font-medium">{riderName(order)}</p>
            </div>
          </div>

          <div className="h-px bg-black/10" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconBadge>
                <FlameIcon size={16} className="text-[#F2A71A]" />
              </IconBadge>
              <p className="text-sm">{sizeLabel(order.cylinderSize)} Size</p>
            </div>
            <p className="text-base font-semibold">{formatMoney(order.gasTotal, order.currency)}</p>
          </div>
        </div>
      </div>

      <div className="px-2 py-2 bg-[#FAFAFA] border-t border-black/5">
        {markFilled.error && (
          <p role="alert" className="text-xs text-danger px-2 pb-2">
            {errorMessage(markFilled.error)}
          </p>
        )}
        <button
          onClick={() => markFilled.mutate(order.id)}
          disabled={filled || !canMarkFilled(order) || markFilled.isPending}
          className={`w-full py-3 rounded-[20px] text-sm font-bold transition-colors ${
            filled
              ? "bg-success-tint text-success cursor-default"
              : "bg-accent text-white hover:bg-[#1558b0] disabled:opacity-50 disabled:hover:bg-accent"
          }`}
        >
          {filled ? "✓ Filled" : "Mark As Filled"}
        </button>
      </div>
    </div>
  );
}
