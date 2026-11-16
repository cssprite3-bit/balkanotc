"use client";

import { useMemo, useState } from "react";
import type { RadarItem, RadarStatus } from "@/lib/types";
import { formatDateShort } from "@/lib/format";

const STATUS_LABEL: Record<RadarStatus, string> = {
  potvrdjeno: "Potvrđeno",
  najavljeno: "Najavljeno",
  nepotvrdjeno: "Nepotvrđeno",
};

const STATUS_CLASS: Record<RadarStatus, string> = {
  potvrdjeno: "text-positive",
  najavljeno: "text-accent",
  nepotvrdjeno: "text-muted",
};

export function RadarFilter({ items, countries, topics }: { items: RadarItem[]; countries: string[]; topics: string[] }) {
  const [country, setCountry] = useState("sve");
  const [topic, setTopic] = useState("sve");

  const visible = useMemo(
    () =>
      items
        .filter((i) => (country === "sve" || i.country === country) && (topic === "sve" || i.topic === topic))
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
    [items, country, topic],
  );

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4 border-b border-line py-4">
        <div>
          <label htmlFor="radar-country" className="kicker block">Država</label>
          <select id="radar-country" value={country} onChange={(e) => setCountry(e.target.value)} className="field mt-1 w-[200px]">
            <option value="sve">Sve države</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="radar-topic" className="kicker block">Tema</label>
          <select id="radar-topic" value={topic} onChange={(e) => setTopic(e.target.value)} className="field mt-1 w-[200px]">
            <option value="sve">Sve teme</option>
            {topics.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <p className="ml-auto pb-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
          {visible.length} od {items.length} stavki
        </p>
      </div>
      {visible.length === 0 ? (
        <div className="border-b border-line py-10">
          <p className="text-[15px] text-ink">Nema stavki za ovaj izbor.</p>
          <p className="mt-1 text-[13.5px] text-muted">Vrati državu ili temu na „Sve“ da vidiš ceo radar.</p>
        </div>
      ) : (
        <ul className="divide-y divide-line border-b border-line">
          {visible.map((item) => (
            <li key={item.id} className="grid gap-2 py-5 sm:grid-cols-[190px_1fr] sm:gap-8">
              <div>
                <p className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink">{item.country}</p>
                <p className="num mt-0.5 font-mono text-[11px] text-muted">{formatDateShort(item.date)}</p>
                <p className={`mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.1em] ${STATUS_CLASS[item.status]}`}>
                  {STATUS_LABEL[item.status]}
                </p>
              </div>
              <div>
                <p className="text-[10.5px] uppercase tracking-[0.12em] font-mono text-muted">{item.topic}</p>
                <h2 className="mt-1 text-[19px] leading-snug">{item.title}</h2>
                <p className="mt-1.5 max-w-[68ch] text-[13.5px] leading-relaxed text-muted">{item.dek}</p>
                <p className="mt-1.5 text-[11.5px] text-muted">Izvor: {item.source}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

