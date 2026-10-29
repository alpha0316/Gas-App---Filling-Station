import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { REVENUE_7DAY, TOP_PRODUCTS, PEAK_HOURS } from "../data/mockData";

function TooltipBox({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-ink text-white text-xs px-3 py-2 rounded-[8px] shadow-lg">
      <p className="font-semibold mb-0.5">{label}</p>
      <p>₵{payload[0].value.toLocaleString()}</p>
    </div>
  );
}

export default function AnalyticsPage() {
  const maxPeak = Math.max(...PEAK_HOURS.map((p) => p.value));

  return (
    <div className="px-8 pb-10">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2 bg-surface border border-border rounded-card p-5">
          <h2 className="text-sm font-semibold mb-4">Revenue — Last 7 Days</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_7DAY} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
                <CartesianGrid vertical={false} stroke="#e4e6ea" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#5f6672" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#5f6672" }} axisLine={false} tickLine={false} width={50} tickFormatter={(v) => `₵${v}`} />
                <Tooltip content={<TooltipBox />} />
                <Line type="monotone" dataKey="revenue" stroke="#1a73e8" strokeWidth={2.5} dot={{ r: 3, fill: "#1a73e8" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-card p-5">
          <h2 className="text-sm font-semibold mb-4">Revenue Breakdown</h2>
          <div className="space-y-4">
            {[
              { label: "Station cut", pct: 68, color: "bg-accent" },
              { label: "Rider", pct: 20, color: "bg-success" },
              { label: "GasApp", pct: 12, color: "bg-muted" },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-muted">{row.label}</span>
                  <span className="font-semibold">{row.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-page overflow-hidden">
                  <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-surface border border-border rounded-card p-5">
          <h2 className="text-sm font-semibold mb-4">Top Products by Volume</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TOP_PRODUCTS} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
                <CartesianGrid vertical={false} stroke="#e4e6ea" />
                <XAxis dataKey="size" tick={{ fontSize: 12, fill: "#5f6672" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#5f6672" }} axisLine={false} tickLine={false} width={40} />
                <Tooltip cursor={{ fill: "#f5f5f7" }} content={({ active, payload, label }) =>
                  active && payload?.length ? (
                    <div className="bg-ink text-white text-xs px-3 py-2 rounded-[8px] shadow-lg">
                      <p className="font-semibold mb-0.5">{label}</p>
                      <p>{payload[0].value} cylinders</p>
                    </div>
                  ) : null
                } />
                <Bar dataKey="volume" fill="#1a73e8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-card p-5">
          <h2 className="text-sm font-semibold mb-4">Peak Hours</h2>
          <div className="flex items-end justify-between gap-2 h-56 px-1">
            {PEAK_HOURS.map((p) => (
              <div key={p.hour} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-[6px]"
                  style={{
                    height: `${(p.value / maxPeak) * 160}px`,
                    backgroundColor: `rgba(26,115,232,${0.25 + 0.65 * (p.value / maxPeak)})`,
                  }}
                  title={`${p.value} orders`}
                />
                <span className="text-[11px] text-muted">{p.hour}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
