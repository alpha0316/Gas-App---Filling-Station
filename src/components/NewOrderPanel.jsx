import { X, Bike, MapPin, Flame, Check } from "lucide-react";
import { PRICES } from "../data/mockData";

export default function NewOrderPanel({ order, open, onClose, onAccept, onDecline, accepted }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 transition-opacity z-40 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`fixed top-0 right-0 h-screen w-[380px] bg-surface border-l border-border z-50 shadow-xl transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <p className="font-semibold">New Order</p>
          <button onClick={onClose} className="text-muted hover:text-ink">
            <X size={18} />
          </button>
        </div>

        {order && (
          <div className="flex-1 overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold text-[15px]">{order.customer}</p>
                <p className="text-sm text-muted">{order.phone}</p>
              </div>
              <span className="inline-flex items-center text-xs font-semibold text-accent bg-accent-tint px-2.5 py-1 rounded-full">
                {order.id}
              </span>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-3 text-sm">
                <Bike size={16} className="text-muted shrink-0" />
                <span className="text-muted w-20 shrink-0">Rider</span>
                <span className="font-medium">{order.rider}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-muted shrink-0" />
                <span className="text-muted w-20 shrink-0">Deliver to</span>
                <span className="font-medium">{order.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Flame size={16} className="text-muted shrink-0" />
                <span className="text-muted w-20 shrink-0">Product</span>
                <span className="font-medium">
                  {order.cylinders} × {order.size} · ₵{PRICES[order.size]} each
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-b border-border mb-5">
              <span className="text-sm text-muted">Total</span>
              <span className="font-bold text-[17px]">₵{order.price + order.tip}</span>
            </div>

            {accepted ? (
              <div className="flex items-center justify-center gap-2 py-3 rounded-button bg-success-tint text-success font-semibold text-sm">
                <Check size={16} /> Order accepted
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={onDecline}
                  className="flex-1 py-3 rounded-button border border-border text-sm font-semibold text-muted hover:bg-page transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={onAccept}
                  className="flex-1 py-3 rounded-button bg-accent text-white text-sm font-semibold hover:bg-[#1558b0] transition-colors"
                >
                  Accept
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
