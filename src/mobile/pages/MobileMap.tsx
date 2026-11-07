import Header from "../components/Header";

export default function MobileMap() {
  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <Header title="Map" />
      <div className="flex-1 mx-5 mb-5 rounded-card border border-border bg-[#eaeef1] flex items-center justify-center">
        <p className="text-sm text-muted">Live delivery map</p>
      </div>
    </div>
  );
}
