"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, Star } from "lucide-react";
import { toEur } from "@/lib/markets";
import { formatCompact, formatPercent, formatPrice } from "@/lib/format";
import { useWatchlist } from "@/lib/local-store";
import type { Asset } from "@/lib/types";

type SortKey = "symbol" | "price" | "change" | "volume";

export function MarketTable({ assets, eurPerUsd }: { assets: Asset[]; eurPerUsd: number }) {
  const { has, toggle, ready } = useWatchlist();
  const [query, setQuery] = useState("");
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "volume", dir: "desc" });
  const [onlyWatched, setOnlyWatched] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = assets.filter((a) => {
      const match = q === "" || a.symbol.toLowerCase().includes(q) || a.name.toLowerCase().includes(q);
      const watched = !onlyWatched || has(a.symbol);
      return match && watched;
    });
    const price = (a: Asset) => (currency === "EUR" ? toEur(a.priceUsd, eurPerUsd) : a.priceUsd);
    const value = (a: Asset): number | string => {
      if (sort.key === "symbol") return a.symbol;
      if (sort.key === "price") return price(a);
      if (sort.key === "change") return a.change24h;
      return a.volumeUsd;
    };
    return [...filtered].sort((a, b) => {
      const av = value(a);
      const bv = value(b);
      const cmp = typeof av === "string" && typeof bv === "string" ? av.localeCompare(bv) : Number(av) - Number(bv);
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [query, currency, sort, onlyWatched, has, assets, eurPerUsd]);

  const setSortKey = (key: SortKey) => {
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: key === "symbol" ? "asc" : "desc" }));
  };
  // RENDER
  return (
    <div>
      <div className="flex flex-wrap items-end gap-3 border-b border-line pb-3">
        <div className="min-w-[180px] flex-1">
          <label htmlFor="market-search" className="kicker block">
            Pretraga
          </label>
          <input
            id="market-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Naziv ili simbol"
            className="field mt-1"
            type="search"
          />
        </div>
        <div>
          <label htmlFor="market-currency" className="kicker block">
            Valuta
          </label>
          <select
            id="market-currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value === "EUR" ? "EUR" : "USD")}
            className="field mt-1 w-[96px]"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <label className="flex cursor-pointer items-center gap-2 pb-2 text-[13px] text-ink">
          <input type="checkbox" checked={onlyWatched} onChange={(e) => setOnlyWatched(e.target.checked)} className="h-4 w-4 accent-[#bc402b]" />
          Samo lista praćenja
        </label>
      </div>
      {/* TABLE */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-left">
          <caption className="sr-only">Tržišna tabela. Kolone se mogu sortirati.</caption>
          <thead>
            <tr className="border-b border-ink text-[11px] uppercase tracking-[0.12em] text-muted">
              <th scope="col" className="py-2 pr-3 font-normal">Instrument</th>
              <th scope="col" className="py-2 pr-3 text-right font-normal">
                <button onClick={() => setSortKey("price")} className="inline-flex items-center gap-1 hover:text-ink">
                  Cena <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                </button>
              </th>
              <th scope="col" className="py-2 pr-3 text-right font-normal">
                <button onClick={() => setSortKey("change")} className="inline-flex items-center gap-1 hover:text-ink">
                  24h <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                </button>
              </th>
              <th scope="col" className="py-2 pr-3 text-right font-normal">
                <button onClick={() => setSortKey("volume")} className="inline-flex items-center gap-1 hover:text-ink">
                  Obim <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                </button>
              </th>
              <th scope="col" className="py-2 text-right font-normal">Lista</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((asset) => {
              const up = asset.change24h >= 0;
              const value = currency === "EUR" ? toEur(asset.priceUsd, eurPerUsd) : asset.priceUsd;
              const watched = ready && has(asset.symbol);
              return (
                <tr key={asset.id} className="border-b border-line transition-colors duration-160 hover:bg-surface">
                  <th scope="row" className="py-2.5 pr-3 font-normal">
                    <span className="font-mono text-[12px] tracking-[0.06em] text-muted">{asset.symbol}</span>
                    <span className="ml-2 text-[14px] text-ink">{asset.name}</span>
                  </th>
                  <td className="num py-2.5 pr-3 text-right font-mono text-[13.5px] text-ink">
                    {formatPrice(value, currency)}
                  </td>
                  <td className={`num py-2.5 pr-3 text-right font-mono text-[13px] ${up ? "text-positive" : "text-negative"}`}>
                    {up ? "▲" : "▼"} {formatPercent(asset.change24h)}
                  </td>
                  <td className="num py-2.5 pr-3 text-right font-mono text-[12.5px] text-muted">
                    {formatCompact(asset.volumeUsd)}
                  </td>
                  <td className="py-2.5 text-right">
                    <button
                      onClick={() => toggle(asset.symbol)}
                      aria-pressed={watched}
                      aria-label={`${watched ? "Ukloni" : "Dodaj"} ${asset.name} ${watched ? "sa" : "na"} listu praćenja`}
                      className="inline-flex h-8 w-8 items-center justify-center border border-transparent text-muted transition-colors duration-160 hover:border-line hover:text-ink"
                    >
                      <Star className={`h-4 w-4 ${watched ? "fill-[#bc402b] text-[#bc402b]" : ""}`} aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
        {rows.length === 0 ? (
          <p className="border-t border-line py-6 text-[13.5px] text-muted">
            Nijedan instrument ne odgovara filteru. Obriši pretragu ili isključi opciju „Samo lista praćenja“.
          </p>
        ) : null}
      </div>

    </div>
  );
}

