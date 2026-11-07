export default function MarkFilledBar({ onMarkFilled, disabled }: { onMarkFilled: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onMarkFilled}
      disabled={disabled}
      className="w-full py-4 rounded-3xl bg-accent text-white text-[15px] font-bold hover:bg-[#1558b0] transition-colors disabled:opacity-50"
    >
      Mark As Filled
    </button>
  );
}
