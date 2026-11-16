"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { search, type SearchHit } from "@/lib/search";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setHits([]);
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    setHits(search(query));
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[8vh]" role="dialog" aria-modal="true" aria-label="Pretraga portala">
      <button className="absolute inset-0 bg-ink/45" aria-label="Zatvori pretragu" onClick={onClose} tabIndex={-1} />
      <div className="relative w-full max-w-[640px] border border-ink bg-surface shadow-[0_18px_60px_-30px_rgba(19,28,25,0.55)]">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-4 w-4 text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Traži članke, lekcije i pojmove"
            aria-label="Unesi pojam za pretragu"
            className="w-full bg-transparent py-3 text-[15px] outline-none placeholder:text-muted"
          />
          <button onClick={onClose} className="p-1 text-muted transition-colors hover:text-ink" aria-label="Zatvori">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="max-h-[52vh] overflow-y-auto">
          {query.trim().length < 2 ? (
            <p className="px-4 py-6 text-[13px] text-muted">Ukucaj najmanje dva znaka. Pretraga radi lokalno, bez mreže.</p>
          ) : hits.length === 0 ? (
            <div className="px-4 py-6">
              <p className="text-[14px] text-ink">Nema rezultata za „{query.trim()}“.</p>
              <p className="mt-1 text-[13px] text-muted">Probaj kraći pojam, naziv instrumenta ili pojam iz rečnika.</p>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {hits.map((hit) => (
                <li key={hit.id}>
                  <Link href={hit.href} onClick={onClose} className="block px-4 py-3 transition-colors hover:bg-paper">
                    <span className="kicker">{hit.context}</span>
                    <span className="mt-1 block text-[15px] leading-snug text-ink">{hit.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
