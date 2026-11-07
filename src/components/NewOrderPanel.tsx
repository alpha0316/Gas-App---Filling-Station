import { XIcon, BicycleIcon, FlameIcon, CheckIcon } from "@phosphor-icons/react";
import { formatMoney } from "../lib/money";
import { errorMessage } from "../lib/api/client";
import { canMarkFilled, orderRef, riderName, sizeLabel } from "../features/station/format";
import { useMarkFilled } from "../features/station/hooks";
import type { StationOrder } from "../features/station/types";

interface NewOrderPanelProps {
  order: StationOrder | null;
  open: boolean;
  onClose: () => void;
}

export default function NewOrderPanel({ order, open, onClose }: NewOrderPanelProps) {
  const markFilled = useMarkFilled();

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 transition-opacity z-40 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        role="dialog"
        aria-label="New Order"
        aria-hidden={!open}
        inert={!open}
        className={`fixed top-0 right-0 h-screen w-95 bg-surface border-l border-border z-50 shadow-xl transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <p className="font-semibold">New Order</p>
          <button onClick={onClose} aria-label="Close" className="text-muted hover:text-ink">
            <XIcon size={18} />
          </button>
        </div>

        {order ? (
          <div className="flex-1 overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-[15px]">{orderRef(order)}</p>
              <span className="inline-flex items-center text-xs font-semibold text-accent bg-accent-tint px-2.5 py-1 rounded-full">
                {order.source === "station" ? "Station" : "App"}
              </span>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-3 text-sm">
                <BicycleIcon size={16} className="text-muted shrink-0" />
                <span className="text-muted w-20 shrink-0">Rider</span>
                <span className="font-medium">{riderName(order)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FlameIcon size={16} className="text-muted shrink-0" />
                <span className="text-muted w-20 shrink-0">Product</span>
                <span className="font-medium">
                  {order.cylinderCount} × {sizeLabel(order.cylinderSize)} ·{" "}
                  {formatMoney(order.gasAmount, order.currency)} each
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-b border-border mb-5">
              <span className="text-sm text-muted">Total</span>
              <span className="font-bold text-[17px]">{formatMoney(order.gasTotal, order.currency)}</span>
            </div>

            {markFilled.error && (
              <p role="alert" className="text-sm text-danger mb-3">
                {errorMessage(markFilled.error)}
              </p>
            )}

            {order.filledAt ? (
              <div className="flex items-center justify-center gap-2 py-3 rounded-button bg-success-tint text-success font-semibold text-sm">
                <CheckIcon size={16} /> Filled
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-button border border-border text-sm font-semibold text-muted hover:bg-page transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => markFilled.mutate(order.id)}
                  disabled={!canMarkFilled(order) || markFilled.isPending}
                  className="flex-1 py-3 rounded-button bg-accent text-white text-sm font-semibold hover:bg-[#1558b0] transition-colors disabled:opacity-50"
                >
                  Mark As Filled
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="p-5 text-sm text-muted">No active orders.</p>
        )}
      </div>
    </>
  );
}
