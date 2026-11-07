import { BicycleIcon, FlameIcon, PackageIcon } from "@phosphor-icons/react";
import { formatMoney } from "../../lib/money";
import { canMarkFilled, orderRef, riderName, sizeLabel } from "../../features/station/format";
import type { StationOrder } from "../../features/station/types";

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-8 h-8 rounded-[12px] bg-[#FAFAFA] flex items-center justify-center shrink-0">
      {children}
    </span>
  );
}

export default function OrderDetailsCard({ order, onMarkFilled, pending }: { order: StationOrder; onMarkFilled: () => void; pending: boolean }) {
  return (
    <div className="bg-white rounded-[24px] shadow-[0_4px_4px_-4px_rgba(12,12,13,0.05),0_16px_32px_-4px_rgba(12,12,13,0.10)] overflow-hidden pt-4">
      <h2 className="px-4 text-[18px] font-semibold mb-3">Order Details</h2>

      <div className="mx-4 bg-[#FAFAFA] rounded-[20px] border border-black/5 pt-3 pb-2">
        <div className="flex items-center justify-between px-3 mb-2">
          <div>
            <p className="text-sm font-medium">{orderRef(order)}</p>
          </div>
        </div>

        <div className="mx-2 bg-white rounded-[12px] shadow-[0_1px_4px_rgba(12,12,13,0.05),0_1px_4px_rgba(12,12,13,0.10)] border-t border-black/5 p-2 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-black/40 text-xs">
              <PackageIcon size={14} />
              <span>Order</span>
            </div>
            <p className="text-xs">
              <span className="font-medium text-black">{order.cylinderCount} </span>
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

      <div className="px-2 pt-3 pb-2 mt-1 bg-[#FAFAFA] border-t border-black/5">
        <button
          onClick={onMarkFilled}
          disabled={!canMarkFilled(order) || pending}
          className="w-full py-4 rounded-[24px] bg-accent text-white font-bold hover:bg-[#1558b0] transition-colors disabled:opacity-50"
        >
          Mark As Filled
        </button>
      </div>
    </div>
  );
}
