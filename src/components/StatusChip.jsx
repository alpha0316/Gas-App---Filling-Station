const STYLES = {
  incoming: "bg-accent-tint text-accent",
  filled: "bg-success-tint text-success",
  cancelled: "bg-danger-tint text-danger",
};

const LABELS = {
  incoming: "Incoming",
  filled: "Filled",
  cancelled: "Cancelled",
};

export default function StatusChip({ status }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
