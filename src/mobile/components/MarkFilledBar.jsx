export default function MarkFilledBar({ onMarkFilled }) {
  return (
    <button
      onClick={onMarkFilled}
      className="w-full py-4 rounded-3xl bg-accent text-white text-[15px] font-bold hover:bg-[#1558b0] transition-colors"
    >
      Mark As Filled
    </button>
  );
}
