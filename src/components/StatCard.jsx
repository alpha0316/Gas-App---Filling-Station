export default function StatCard({ label, value, last }) {
  return (
    <div className={`flex-1 px-6 py-4 ${!last ? "border-r border-black/10" : ""}`}>
      <p className="text-[11px] font-semibold tracking-wide text-muted uppercase mb-1.5">{label}</p>
      <p className="text-xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
