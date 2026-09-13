"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TOOLTIP_STYLE = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
  color: "var(--foreground)",
};

const AXIS_TICK = { fill: "var(--muted)", fontSize: 12 };

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function HorizontalBarChart({
  title,
  data,
}: {
  title: string;
  data: { label: string; value: number }[];
}) {
  const height = Math.max(data.length * 40, 120);

  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24 }}>
          <CartesianGrid horizontal={false} stroke="var(--border)" />
          <XAxis type="number" allowDecimals={false} tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <YAxis
            type="category"
            dataKey="label"
            width={140}
            tick={AXIS_TICK}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip cursor={{ fill: "var(--border)", opacity: 0.3 }} contentStyle={TOOLTIP_STYLE} />
          <Bar dataKey="value" fill="var(--accent)" barSize={20} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function PublishTimelineChart({ data }: { data: { month: string; count: number }[] }) {
  return (
    <ChartCard title="Published per month">
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ left: 8, right: 16, top: 8 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={AXIS_TICK} axisLine={false} tickLine={false} width={28} />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Area
            type="monotone"
            dataKey="count"
            stroke="var(--accent)"
            strokeWidth={2}
            fill="var(--accent)"
            fillOpacity={0.1}
            dot={{ r: 4, fill: "var(--accent)", stroke: "var(--card)", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
