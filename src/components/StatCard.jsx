export default function StatCard({ label, value, last }) {
  return (
    <div className={`flex-1 px-6 py-5 ${!last ? "border-r border-border" : ""}`}>
      <p className="text-sm text-muted mb-1.5">{label}</p>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
