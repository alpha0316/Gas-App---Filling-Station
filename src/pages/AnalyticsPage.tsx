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
import { useAnalytics } from "../features/station/hooks";
import { sizeLabel } from "../features/station/format";
import { formatMoney } from "../lib/money";

interface ChartTooltipProps {
  active?: boolean;
  payload?: { value?: number }[];
  label?: string | number;
  format: (value: number) => string;
}

function TooltipBox({ active, payload, label, format }: ChartTooltipProps) {
  const value = payload?.[0]?.value;
  if (!active || value === undefined) return null;
  return (
    <div className="bg-ink text-white text-xs px-3 py-2 rounded-[8px] shadow-lg">
      <p className="font-semibold mb-0.5">{label}</p>
      <p>{format(value)}</p>
    </div>
  );
}

const DAY_FORMAT = new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "UTC" });
const hourLabel = (h: number) => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? "am" : "pm"}`;

export default function AnalyticsPage() {
  const { data, isError } = useAnalytics();
  if (isError) return <p role="alert" className="px-8 text-sm text-danger">Could not load analytics.</p>;
  if (!data) return <div className="px-8" aria-busy="true" />;

  const currency = data.currency;
  const money = (minor: number) => formatMoney(minor, currency);
  // Chart axes use whole currency units. Division is for display only.
  const daily = data.daily.map((d) => ({
    day: DAY_FORMAT.format(new Date(`${d.date}T00:00:00Z`)),
    revenue: d.revenue / 100,
  }));
  const products = data.topProducts.map((p) => ({ size: sizeLabel(p.size), volume: p.cylinders }));
  const peaks = data.peakHours.map((p) => ({ hour: hourLabel(p.hour), value: p.orders }));
  const maxPeak = Math.max(1, ...peaks.map((p) => p.value));
  const summary = [
    { label: "Revenue", now: money(data.totals.revenue), before: money(data.previous.revenue) },
    { label: "Orders", now: String(data.totals.orders), before: String(data.previous.orders) },
    { label: "Cylinders", now: String(data.totals.cylinders), before: String(data.previous.cylinders) },
    { label: "Average order", now: money(data.totals.avgOrderValue), before: "" },
  ];

  return (
    <div className="px-8 pb-10">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2 bg-surface border border-border rounded-card p-5">
          <h2 className="text-sm font-semibold mb-4">Revenue — Last {data.range.days} Days</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={daily} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
                <CartesianGrid vertical={false} stroke="#e4e6ea" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#5f6672" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#5f6672" }} axisLine={false} tickLine={false} width={50} tickFormatter={(v) => `₵${v}`} />
                <Tooltip content={<TooltipBox format={(v) => `₵${v.toLocaleString()}`} />} />
                <Line type="monotone" dataKey="revenue" stroke="#1a73e8" strokeWidth={2.5} dot={{ r: 3, fill: "#1a73e8" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-card p-5">
          <h2 className="text-sm font-semibold mb-4">Revenue Breakdown</h2>
          <div className="space-y-4">
            {summary.map((row) => (
              <div key={row.label} className="flex items-center justify-between text-sm">
                <span className="text-muted">{row.label}</span>
                <span className="font-semibold">
                  {row.now}
                  {row.before && <span className="text-xs font-normal text-muted"> (before: {row.before})</span>}
                </span>
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
              <BarChart data={products} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
                <CartesianGrid vertical={false} stroke="#e4e6ea" />
                <XAxis dataKey="size" tick={{ fontSize: 12, fill: "#5f6672" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#5f6672" }} axisLine={false} tickLine={false} width={40} />
                <Tooltip cursor={{ fill: "#f5f5f7" }} content={<TooltipBox format={(v) => `${v} cylinders`} />} />
                <Bar dataKey="volume" fill="#1a73e8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-card p-5">
          <h2 className="text-sm font-semibold mb-4">Peak Hours</h2>
          <div className="flex items-end justify-between gap-2 h-56 px-1">
            {peaks.map((p, i) => (
              <div key={p.hour} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-[6px]"
                  style={{
                    height: `${(p.value / maxPeak) * 160}px`,
                    backgroundColor: `rgba(26,115,232,${0.25 + 0.65 * (p.value / maxPeak)})`,
                  }}
                  title={`${p.value} orders`}
                />
                <span className="text-[11px] text-muted h-3">{i % 3 === 0 ? p.hour : ""}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
