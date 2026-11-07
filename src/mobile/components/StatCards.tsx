import { useStats } from "../../features/station/useStats";

export default function StatCards() {
  const stats = useStats();
  return (
    <div className="mx-5 mb-3 bg-surface rounded-card shadow-sm flex">
      <div className="flex-1 px-5 py-4">
        <p className="text-[11px] font-semibold tracking-wide text-muted mb-1.5">ORDERS TODAY</p>
        <p className="text-xl font-bold">{stats.ordersToday}</p>
      </div>
      <div className="w-px my-4 border-l border-dashed border-border" />
      <div className="flex-1 px-5 py-4">
        <p className="text-[11px] font-semibold tracking-wide text-muted mb-1.5">TODAY'S REVENUE</p>
        <p className="text-xl font-bold">{stats.todayRevenue}</p>
      </div>
    </div>
  );
}
