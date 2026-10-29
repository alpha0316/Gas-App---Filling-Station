import { useState } from "react";
import { Check, User, Bike, MapPin, Flame } from "lucide-react";
import { PRICES } from "../data/mockData";

export default function OrderCard({ order }) {
  const [filled, setFilled] = useState(order.status === "filled");

  return (
    <div className="bg-surface border border-border rounded-card p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="font-semibold text-[15px]">{order.customer}</p>
          <p className="text-sm text-muted">{order.phone}</p>
        </div>
        {order.tip > 0 && (
          <span className="inline-flex items-center text-xs font-semibold text-success bg-success-tint px-2.5 py-1 rounded-full whitespace-nowrap">
            +₵{order.tip} tip
          </span>
        )}
      </div>

      <p className="text-sm font-medium text-muted mb-4">
        Order {order.id} · {order.cylinders} cylinder{order.cylinders > 1 ? "s" : ""}
      </p>

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
            {order.size} cylinder · ₵{PRICES[order.size]} each
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted">Total</p>
          <p className="font-bold text-[16px]">₵{order.price + order.tip}</p>
        </div>
        <button
          onClick={() => setFilled(true)}
          disabled={filled}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-button text-sm font-semibold transition-colors ${
            filled
              ? "bg-success-tint text-success cursor-default"
              : "bg-accent text-white hover:bg-[#1558b0]"
          }`}
        >
          {filled && <Check size={16} />}
          {filled ? "Filled" : "Mark As Filled"}
        </button>
      </div>
    </div>
  );
}
