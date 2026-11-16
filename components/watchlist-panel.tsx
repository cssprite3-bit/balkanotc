"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { getAsset } from "@/lib/markets";
import { formatCompact, formatDateTime, formatPercent, formatPrice } from "@/lib/format";
import { useWatchlist } from "@/lib/local-store";
import type { Asset } from "@/lib/types";

export function WatchlistPanel({
  assets,
  eurPerUsd,
  fetchedAt,
}: {
  assets: Asset[];
  eurPerUsd: number;
  fetchedAt: string;
}) {
  const { symbols, ready, toggle } = useWatchlist();
  const rows = symbols
    .map((symbol) => getAsset(assets, symbol))
    .filter((asset): asset is Asset => Boolean(asset));

  if (!ready) {
    return <p className="py-8 text-[13.5px] text-muted">Učitavanje lokalne liste…</p>;
  }

  if (rows.length === 0) {
    return (
      <div className="border-t border-line py-10">
        <p className="font-serif text-[21px] text-ink">Lista je prazna.</p>
        <p className="mt-2 max-w-[52ch] text-[13.5px] leading-relaxed text-muted">
          Dodaj instrument zvezdicom u tabeli tržišta. Lista se čuva u ovom pregledaču i ne šalje se nigde — nema
          naloga, nema sinhronizacije, nema servera.
        </p>
        <Link href="/trziste" className="btn mt-4">Otvori tabelu tržišta</Link>
      </div>
    );
  }

  return (
    <div>
      <p className="border-b border-line pb-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
        {rows.length} instrumenta · presek {formatDateTime(fetchedAt)}
      </p>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Instrumenti sačuvani u lokalnoj listi praćenja</caption>
        <thead>
          <tr className="border-b border-ink text-[11px] uppercase tracking-[0.12em] text-muted">
            <th scope="col" className="py-2 pr-3 font-normal">Instrument</th>
            <th scope="col" className="py-2 pr-3 text-right font-normal">Cena</th>
            <th scope="col" className="py-2 pr-3 text-right font-normal">24h</th>
            <th scope="col" className="py-2 pr-3 text-right font-normal">Obim</th>
            <th scope="col" className="py-2 text-right font-normal">Lista</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => {
            const up = a.change24h >= 0;
            return (
              <tr key={a.id} className="border-b border-line">
                <th scope="row" className="py-2.5 pr-3 font-normal">
                  <span className="font-mono text-[12px] tracking-[0.06em] text-muted">{a.symbol}</span>
                  <span className="ml-2 text-[14px] text-ink">{a.name}</span>
                </th>
                <td className="num py-2.5 pr-3 text-right font-mono text-[13.5px]">{formatPrice(a.priceUsd, "USD")}</td>
                <td className={`num py-2.5 pr-3 text-right font-mono text-[13px] ${up ? "text-positive" : "text-negative"}`}>
                  {up ? "▲" : "▼"} {formatPercent(a.change24h)}
                </td>
                <td className="num py-2.5 pr-3 text-right font-mono text-[12.5px] text-muted">{formatCompact(a.volumeUsd)}</td>
                <td className="py-2.5 text-right">
                  <button
                    onClick={() => toggle(a.symbol)}
                    aria-label={`Ukloni ${a.name} sa liste praćenja`}
                    className="inline-flex h-8 w-8 items-center justify-center border border-transparent text-muted transition-colors duration-160 hover:border-line hover:text-ink"
                  >
                    <Star className="h-4 w-4 fill-[#bc402b] text-[#bc402b]" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-4 text-[12.5px] leading-relaxed text-muted">
        Prikaz u evrima koristi kurs 1 USD = {eurPerUsd} EUR (ECB referentni kurs, osvežava se sa presekom).
      </p>
    </div>
  );
}
