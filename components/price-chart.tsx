"use client";

import { useEffect, useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Period, Point } from "@/lib/types";
import { formatDateShort, formatHour, formatPercent, formatPrice, periodLabel } from "@/lib/format";

const PERIODS: Period[] = ["24h", "7d", "30d"];

export function PriceChart({
  symbol,
  name,
  series,
}: {
  symbol: string;
  name: string;
  series: Record<Period, Point[]>;
}) {
  const [period, setPeriod] = useState<Period>("30d");
  // First paint must never depend on an animation frame: draw the line
  // immediately, then animate only the deliberate period switches.
  const [animate, setAnimate] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const data = useMemo(
    () =>
      series[period].map((p) => ({
        t: p.t,
        v: p.v,
        label: period === "24h" ? formatHour(p.t) : formatDateShort(p.t),
      })),
    [series, period],
  );

  const peak = useMemo(
    () => data.reduce((best, p) => (p.v > best.v ? p : best), data[0] ?? { v: 0, t: "", label: "" }),
    [data],
  );
  const first = data[0]?.v ?? 0;
  const last = data[data.length - 1]?.v ?? 0;
  const change = first === 0 ? 0 : ((last - first) / first) * 100;
  const values = data.map((p) => p.v);
  const hi = Math.max(...values);
  const lo = Math.min(...values);
  const pad = (hi - lo || hi * 0.02) * 0.2;

  return (
    <figure className="border border-line bg-surface">
      <figcaption className="flex flex-wrap items-end justify-between gap-3 border-b border-line px-4 py-3">
        <div>
          <p className="kicker">Presek · {symbol} · {name}</p>
          <p className="num mt-1 font-mono text-[22px] leading-none text-ink">
            {formatPrice(last, "USD")}
            <span className={`ml-3 align-middle text-[12px] ${change >= 0 ? "text-positive" : "text-negative"}`}>
              {change >= 0 ? "▲" : "▼"} {formatPercent(change)}
            </span>
          </p>
        </div>
        <div role="group" aria-label="Izbor perioda" className="flex items-center gap-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => {
                setPeriod(p);
                setAnimate(true);
              }}
              aria-pressed={period === p}
              className={`border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-160 ${
                period === p ? "border-ink bg-ink text-surface" : "border-line text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </figcaption>
      {/* CHART */}
      <div className="px-2 pb-1 pt-4">
        <div className="h-[280px] w-full sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 18, bottom: 4, left: 4 }}>
              <CartesianGrid stroke="#d8d5cb" strokeDasharray="2 4" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#606660", fontSize: 10, fontFamily: "var(--font-plex-mono)" }}
                tickLine={false}
                axisLine={{ stroke: "#d8d5cb" }}
                minTickGap={28}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[lo - pad, hi + pad]}
                tick={{ fill: "#606660", fontSize: 10, fontFamily: "var(--font-plex-mono)" }}
                tickFormatter={(value: number) => `$${value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toFixed(2)}`}
                tickLine={false}
                axisLine={false}
                width={54}
              />
              <Tooltip content={<ChartTip />} cursor={{ stroke: "#bc402b", strokeDasharray: "3 3" }} />
              <ReferenceLine
                x={peak.label}
                stroke="#bc402b"
                strokeDasharray="4 4"
                label={{
                  value: "vrh perioda",
                  position: "insideTopRight",
                  fill: "#bc402b",
                  fontSize: 9,
                  fontFamily: "var(--font-plex-mono)",
                }}
              />
              <Line
                type="monotone"
                dataKey="v"
                stroke="#18201d"
                strokeWidth={1.75}
                dot={false}
                activeDot={{ r: 3, fill: "#bc402b", stroke: "none" }}
                isAnimationActive={animate && !reduceMotion}
                animationDuration={900}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="border-t border-line px-4 py-3">
        <p className="text-[12.5px] leading-relaxed text-muted">
          Linija pokazuje cenu u USD na kraju svakog uzorka za poslednjih {periodLabel(period)}. Najviši nivo u
          izabranom periodu je <span className="num text-ink">{formatPrice(peak.v, "USD")}</span>, a promena u periodu{" "}
          <span className="num text-ink">{formatPercent(change)}</span>. Ose su linearno skalirane, bez prekida.
        </p>
      </div>
    </figure>
  );
}

function ChartTip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { label: string; v: number } }> }) {
  const point = payload?.[0]?.payload;
  if (!active || !point) return null;
  return (
    <div className="border border-ink bg-surface px-2 py-1 font-mono text-[11px] text-ink">
      {point.label} · {formatPrice(point.v, "USD")}
    </div>
  );
}


