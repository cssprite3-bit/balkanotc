"use client";

import { useId, useState } from "react";
import type { Asset } from "@/lib/types";
import { TICKER_SYMBOLS, getAsset, toEur } from "@/lib/markets";
import { formatDateTime, formatPercent, formatPrice } from "@/lib/format";

export function MarketBar({
  assets,
  eurPerUsd,
  fetchedAt,
}: {
  assets: Asset[];
  eurPerUsd: number;
  fetchedAt: string;
}) {
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD");
  const id = useId();
  const rows = TICKER_SYMBOLS.map((symbol) => getAsset(assets, symbol)).filter(
    (asset): asset is Asset => Boolean(asset),
  );

  return (
    <div className="border-b border-ink/15 bg-ink text-surface">
      <div className="wrap flex items-center gap-3 py-1.5">
        <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex min-w-max items-center gap-5">
            <li className="flex shrink-0 items-baseline gap-1 whitespace-nowrap border-r border-surface/25 pr-3 font-mono text-[9.5px] uppercase tracking-[0.1em] text-surface/60 sm:pr-4 md:text-[10px]">
              {rows.length === 0 ? "Podaci nedostupni" : `Presek · ${formatDateTime(fetchedAt)}`}
            </li>
            {rows.map((asset) => {
              const up = asset.change24h >= 0;
              const price = currency === "EUR" ? toEur(asset.priceUsd, eurPerUsd) : asset.priceUsd;
              return (
                <li key={asset.symbol} className="flex items-baseline gap-2 whitespace-nowrap">
                  <span className="font-mono text-[11px] tracking-[0.08em] text-surface/70">{asset.symbol}</span>
                  <span className="num font-mono text-[12.5px] text-surface">{formatPrice(price, currency)}</span>
                  <span className={`num font-mono text-[11px] ${up ? "text-[#7ebfa6]" : "text-[#e79a95]"}`}>
                    {up ? "▲" : "▼"} {formatPercent(asset.change24h)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <label htmlFor={id} className="sr-only">
            Valuta prikaza
          </label>
          <select
            id={id}
            value={currency}
            onChange={(event) => setCurrency(event.target.value === "EUR" ? "EUR" : "USD")}
            className="border border-surface/30 bg-transparent px-1.5 py-0.5 font-mono text-[11px] text-surface"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>
    </div>
  );
}
