"use client";

import { useMemo, useState } from "react";
import type { Term } from "@/lib/types";

export function GlossarySearch({ terms }: { terms: Term[] }) {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState("");

  const letters = useMemo(
    () => Array.from(new Set(terms.map((t) => t.term.charAt(0).toUpperCase()))).sort((a, b) => a.localeCompare(b, "sr-Latn-RS")),
    [terms],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return terms.filter((t) => {
      const inQuery = q === "" || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q);
      const inLetter = letter === "" || t.term.charAt(0).toUpperCase() === letter;
      return inQuery && inLetter;
    });
  }, [terms, query, letter]);

  return (
    <div id="recnik">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-3">
        <div className="min-w-[220px] flex-1">
          <label htmlFor="glossary-search" className="kicker block">Rečnik pojmova</label>
          <input
            id="glossary-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Traži pojam ili definiciju"
            className="field mt-1"
          />
        </div>
        <div role="group" aria-label="Filter po slovu" className="flex flex-wrap gap-1 pb-0.5">
          <button onClick={() => setLetter("")} aria-pressed={letter === ""} className={`border px-2 py-1 font-mono text-[11px] ${letter === "" ? "border-ink bg-ink text-surface" : "border-line text-muted hover:border-ink"}`}>Sve</button>
          {letters.map((l) => (
            <button key={l} onClick={() => setLetter(l)} aria-pressed={letter === l} className={`border px-2 py-1 font-mono text-[11px] ${letter === l ? "border-ink bg-ink text-surface" : "border-line text-muted hover:border-ink"}`}>{l}</button>
          ))}
        </div>
      </div>
      {visible.length === 0 ? (
        <p className="py-6 text-[13.5px] text-muted">Nema pojma za „{query}“. Probaj drugu reč ili obriši filter slova.</p>
      ) : (
        <dl className="mt-4 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {visible.map((t) => (
            <div key={t.term} className="border-t border-line pt-2.5">
              <dt className="font-serif text-[16.5px] text-ink">{t.term}</dt>
              <dd className="mt-1 text-[13.5px] leading-relaxed text-muted">{t.definition}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
